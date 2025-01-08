import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const logMessage = (
  type: "INFO" | "ERROR" | "SUCCESS",
  message: string,
  data?: any
) => {
  const color = type === "INFO" ? "yellow" : type === "ERROR" ? "red" : "green";
  console.log(
    `%c MedicalBlackBox [${type}]: ${message}`,
    `color: ${color}`,
    data
  );
};
