"use client";
import ScreeningForm from "@/components/screeningForm";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useState } from "react";
import ScreeningResults from "@/components/screening-results";

export default function Page() {
  const [isScreeningFormOpen, setIsScreeningFormOpen] = useState(false);

  // Keep track of the classification result and the model loading status.
  const [result, setResult] = useState<any>(null);
  const [ready, setReady] = useState<boolean | null>(null);

  const diagnose = async (text: string) => {
    if (!text) return;
    if (ready === null) setReady(false);

    // Make a request to the /classify route on the server.
    const result = await fetch(`/api/diagnose`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    // If this is the first time we've made a request, set the ready flag.
    if (!ready) setReady(true);

    const json = await result.json();
    setResult(json);
  };

  return (
    <section className="min-h-screen py-4">
      <h1 className="text-4xl font-bold">Patient Page</h1>
      <div className="flex justify-end">
        <Sheet open={isScreeningFormOpen} onOpenChange={setIsScreeningFormOpen}>
          <SheetTrigger>
            <Button className="bg-orange-500">
              <span role="img" aria-label="help icon">
                ❌
              </span>{" "}
              I don&apos;t feel so well
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[500px] sm:max-w-[unset]">
            <SheetHeader>
              <SheetTitle>Screening Form</SheetTitle>
            </SheetHeader>
            <ScreeningForm
              onClose={() => setIsScreeningFormOpen(false)}
              diagnose={diagnose}
            />
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex flex-col items-center justify-center p-12">
        {ready === false && (
          <p className="text-lg text-center text-gray-500">
            Loading the model... This might take a few seconds.
          </p>
        )}

        <Card className="w-full max-w-[500px]">
          <CardHeader>
            <CardTitle>Results</CardTitle>
            <CardDescription>
              The results of the diagnosis will be displayed here
            </CardDescription>
          </CardHeader>

          <CardFooter>
            <p className="text-sm text-red-500">
              Disclaimer - This is a demo application and should not be used for
              medical diagnosis. Please consult a medical professional for
              accurate diagnosis.
            </p>
            <p>
              <Button
                variant="secondary"
                onClick={() => setIsScreeningFormOpen(true)}
              >
                Start Screening
              </Button>
            </p>
          </CardFooter>
          <ScreeningResults ready={ready} result={result} />
        </Card>
      </div>
    </section>
  );
}
