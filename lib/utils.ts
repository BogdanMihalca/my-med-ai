import { clsx, type ClassValue } from "clsx";
import jsPDF from "jspdf";
import { maxBy } from "lodash";
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

export const generateReport = (results: any) => {
  const highestResult = maxBy(results, "score") as any;
  const resultedLabel = highestResult?.label || "No result";

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  doc.setFillColor("#2980b91a"); // Using hex with alpha
  doc.rect(0, 0, 210, 45, "F");

  doc.setFontSize(24);
  doc.setTextColor("#2980b9"); // Using hex
  doc.text("MediConnect", 10, 25);

  doc.setFontSize(16);
  doc.setTextColor("#646464"); // Using hex for gray
  doc.text("Screening Results Report", 10, 35);

  // Add horizontal line
  doc.setDrawColor("#c8c8c8"); // Using hex
  doc.setLineWidth(0.5);
  doc.line(10, 45, 200, 45);

  // Primary Result Box
  doc.setFillColor("#f5f7fa"); // Using hex
  doc.roundedRect(10, 50, 190, 30, 3, 3, "F");

  doc.setFontSize(14);
  doc.setTextColor("#3c3c3c"); // Using hex
  doc.text(`Primary Indication: ${resultedLabel}`, 15, 65);

  // Add risk label based on score
  const score = highestResult?.score || 0;
  const riskLabel = getRiskLabel(score);
  doc.setFontSize(12);
  doc.setTextColor(getRiskColor(score)); // Using hex from helper function
  doc.text(`Risk Level: ${riskLabel}`, 15, 73);
  doc.text(`Confidence Score: ${(score * 100).toFixed(1)}%`, 120, 73);

  // Results table header
  let yPos = 90;
  doc.setFillColor("#2980b9"); // Using hex
  doc.rect(10, yPos - 10, 190, 12, "F");
  doc.setTextColor("#ffffff"); // Using hex for white
  doc.setFontSize(12);
  doc.text("Condition", 15, yPos - 2);
  doc.text("Score", 120, yPos - 2);
  doc.text("Risk Level", 160, yPos - 2);

  // Results table content
  yPos += 5;
  results.forEach((value: { label: any; score: number }, index: number) => {
    const rowHeight = 12;
    doc.setFillColor(index % 2 === 0 ? "#fafafa" : "#ffffff"); // Using hex
    doc.rect(10, yPos, 190, rowHeight, "F");

    doc.setTextColor("#3c3c3c"); // Using hex
    doc.text(value.label, 15, yPos + 8);

    const scoreValue = (value.score * 100).toFixed(1);
    doc.setTextColor(getRiskColor(value.score));
    doc.text(`${scoreValue}%`, 120, yPos + 8);
    doc.text(getRiskLabel(value.score), 160, yPos + 8);

    yPos += rowHeight;
  });

  // Enhanced disclaimer with box
  doc.setFillColor("#fcf8e3"); // Using hex
  doc.roundedRect(10, 250, 190, 25, 3, 3, "F");
  doc.setFontSize(8);
  doc.setTextColor("#8a6d3b"); // Using hex
  const disclaimer =
    "This report is generated automatically by MediConnect AI. Results should be reviewed by a healthcare professional. Not for diagnostic purposes.";
  doc.text(disclaimer, 15, 260, { maxWidth: 180 });

  // Footer
  doc.setDrawColor("#dcdcdc"); // Using hex
  doc.line(10, 280, 200, 280);
  doc.setFontSize(8);
  doc.setTextColor("#646464"); // Using hex
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 10, 285);
  doc.text(`Page ${doc.internal.pages.length - 1}`, 180, 285);

  doc.save("mediconnect-screening-report.pdf");
};

// Helper function that returns hex colors
const getRiskColor = (score: number) => {
  if (score >= 0.7) return "#dc3545"; // High risk - Red
  if (score >= 0.4) return "#ffc107"; // Moderate risk - Yellow
  return "#28a745"; // Low risk - Green
};

const getRiskLabel = (score: number) => {
  if (score >= 0.7) return "High Risk";
  if (score >= 0.4) return "Moderate Risk";
  return "Low Risk";
};
