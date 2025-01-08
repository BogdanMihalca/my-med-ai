"use client";

import { useToast } from "@/hooks/use-toast";
import { useCallback, useEffect, useRef, useState } from "react";
import { logMessage } from "./utils";

// Define types for result and API response
interface Result {
  label: string;
  score: number;
}

interface APIResponse {
  results: Result[];
  text: string;
}

const useMedicalBlackbox = () => {
  const worker = useRef<any>(null);

  const [result, setResult] = useState<APIResponse>();
  const [ready, setReady] = useState<boolean | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!worker.current) {
      // Create the worker if it does not yet exist.
      worker.current = new Worker(new URL("./worker.js", import.meta.url), {
        type: "module",
      });
    }

    // Attach the callback function as an event listener.
    worker.current.addEventListener("message", onMessageReceived);

    // Define a cleanup function for when the component is unmounted.
    return () =>
      worker.current.removeEventListener("message", onMessageReceived);
  });

  // Create a callback function for messages from the worker thread.
  const onMessageReceived = (e: any) => {
    switch (e.data.status) {
      case "initiate":
        setReady(false);
        break;
      case "ready":
        setReady(true);
        break;
      case "complete":
        setReady(true);
        setResult(e.data.output);
        logMessage("SUCCESS", "Result received:", e.data.output);
        break;
    }
  };

  const blackboxify = useCallback(
    async (text: string) => {
      if (!text) {
        logMessage("ERROR", "Text missing");
        toast({
          title: "Text missing",
          description: "Please enter some text or fill in the symptoms",
          variant: "destructive",
        });
        return;
      }
      setReady(false);
      try {
        logMessage("INFO", "Attempting to get result from: ", text);
        if (worker.current) {
          worker.current.postMessage({ text });
        }
      } catch (error: any) {
        logMessage("ERROR", "Error getting result:", error);
        toast({
          title: "Error getting result",
          description: error.message as string,
          variant: "destructive",
        });
        setResult(undefined);
      }
    },
    [toast]
  );

  const reset = () => {
    setResult(undefined);
    setReady(null);
  };

  return { result, ready, blackboxify, reset };
};

export default useMedicalBlackbox;
