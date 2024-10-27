"use client";
import React, { useState } from "react";
import { PatientTable } from "@/components/patient-table";
import ScreeningForm from "@/components/screening-form";
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
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ScreeningResults from "@/components/screening-results";
import ScreeningResults2 from "@/components/screening-results2";
import { AlertCircle, Plus, ChevronDown, Settings } from "lucide-react";
import SpecialistRecommendations from "@/components/specialists-recommanadation";

const MedicalDataSection = ({ title, description, data, icon: Icon }: any) => (
  <Card className="w-full mb-6 bg-slate-900 border-slate-800 hover:bg-slate-800/50 transition-colors">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <div className="space-y-1">
        <CardTitle className="text-xl flex items-center gap-2">
          <Icon className="w-5 h-5 text-blue-400" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="text-xs bg-slate-800 hover:bg-slate-700"
      >
        <Settings className="w-4 h-4 mr-1" />
        Manage
      </Button>
    </CardHeader>
    <CardContent>
      <PatientTable data={data} />
    </CardContent>
  </Card>
);

const patient = {
  personal_info: [
    { type: "name", value: "Jane Smith" },
    { type: "dateOfBirth", value: "12/12/1985" },
    { type: "gender", value: "Female" },
    { type: "contact", value: "jane.smith@example.com" },
  ],
  history_of_present_illness: [{ type: "chiefComplaint", value: "Headache" }],
  medical_history: [
    { type: "condition", value: "Hypertension" },
    { type: "condition", value: "Seasonal allergies" },
    { type: "surgery", value: "Appendectomy, 2010" },
  ],
  medications: [
    { type: "Lisinopril", value: "10mg, once daily" },
    { type: "Allegra", value: "180mg, once daily" },
    { type: "Aspirin", value: "81mg, once daily" },
  ],
  allergies: [
    {
      type: "Penicillin",
      value: "Rash and itching",
    },
    {
      type: "Sulfa",
      value: "Hives",
    },
  ],

  family_history: [
    {
      type: "Mother",
      value: "Breast cancer at age 45 resulted in death at age 50",
    },
    {
      type: "Father",
      value: "Hypertension, age 60",
    },
    {
      type: "Sister",
      value: "None",
    },
    {
      type: "Brother",
      value: "None",
    },
  ],
  social_history: [
    { type: "alcohol", value: "Occasional, 1-2 drinks per week" },
    { type: "occupation", value: "Teacher" },
    { type: "exercise", value: "Regular, 3-4 times a week" },
    { type: "smoking", value: "Never" },
  ],
};

const specialists = {};

interface MedicalHistory {
  description: string;
}

interface CurrentSymptoms {
  symptom: string;
}

interface PossibleDisease {
  label: string;
  score: number;
  references: string[];
}

export interface PatientData {
  medical_history: MedicalHistory[];
  current_symptoms: CurrentSymptoms[];
  possible_diseases: PossibleDisease[];
}

export default function Page() {
  const [isScreeningFormOpen, setIsScreeningFormOpen] = useState(false);

  // Keep track of the classification result and the model loading status.
  const [result, setResult] = useState<any>(null);
  const [ready, setReady] = useState<boolean | null>(null);

  // keep track of the classification result and the model loading status
  const [result2, setResult2] = useState<{
    result: PatientData;
    text: string;
  } | null>(null);

  const [ready2, setReady2] = useState<boolean | null>(null);

  const diagnose = async (text: string) => {
    setReady(false);

    // Make a request to the /classify route on the server.
    const result = await fetch(`/api/diagnose`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    // If this is the first time we've made a request, set the ready flag.
    setReady(true);

    const json = await result.json();
    setResult(json);
    diagnose2(text);
  };

  const diagnose2 = async (text: string) => {
    setReady2(false);

    let medicalHistory = "";
    (
      [
        "history_of_present_illness",
        "medical_history",
        "medications",
        "allergies",
        "family_history",
        "social_history",
      ] as const
    ).forEach((key) => {
      (patient[key] as { type: string; value: string }[]).forEach((item) => {
        medicalHistory += `${item.type} ${item.value}. `;
      });
    });

    // Make a request to the /classify route on the server.
    const result2 = await fetch(`/api/diagnose_v2`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        symptoms: text,
        medicalHistory,
      }),
    });

    // If this is the first time we've made a request, set the ready flag.
    if (!ready2) setReady2(true);

    const json = await result2.json();
    setResult2(json);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Patient Dashboard
            </h1>
            <p className="text-slate-400 mt-2">
              Manage your health information and symptoms
            </p>
          </div>
          <Sheet
            open={isScreeningFormOpen}
            onOpenChange={setIsScreeningFormOpen}
          >
            <SheetTrigger asChild>
              <Button className="bg-red-500 hover:bg-red-600">
                <AlertCircle className="w-4 h-4 mr-2" />
                Report Symptoms
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[500px] sm:max-w-[unset] bg-slate-900">
              <SheetHeader>
                <SheetTitle>Symptom Screening</SheetTitle>
              </SheetHeader>
              <ScreeningForm
                onClose={() => setIsScreeningFormOpen(false)}
                diagnose={diagnose}
              />
            </SheetContent>
          </Sheet>
        </div>

        {/* Results Section */}
        <Card className="w-full mb-8 bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-2xl">Diagnosis Results</CardTitle>
            <CardDescription>
              AI-powered analysis of your symptoms
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-stretch justify-start gap-4">
            {ready === false ? (
              <div className="w-full p-8 text-center">
                <div className="animate-pulse text-slate-400">
                  Analyzing symptoms... Please wait.
                </div>
              </div>
            ) : (
              <>
                <ScreeningResults ready={ready} result={result} />
                <ScreeningResults2 ready={ready2} result={result2?.result} />
              </>
            )}
          </CardContent>
          {ready === true && ready2 === true && (
            <>
              <Separator className="bg-slate-800" />
              <SpecialistRecommendations diagnoses={result2?.result} />
            </>
          )}
          <Separator className="bg-slate-800" />
          <CardFooter className="bg-slate-900/50">
            <p className="text-sm text-red-400">
              <AlertCircle className="w-4 h-4 inline mr-2" />
              This is a demo application. Please consult a medical professional
              for accurate diagnosis.
            </p>
          </CardFooter>
        </Card>

        {/* Medical Data Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-slate-50">
              Medical Records
            </h2>
            <Button className="bg-blue-500 hover:bg-blue-600">
              <Plus className="w-4 h-4 mr-2" />
              Add New Record
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <MedicalDataSection
              title="Personal Information"
              description="Basic personal and contact details"
              data={patient.personal_info}
              icon={ChevronDown}
            />

            <MedicalDataSection
              title="Current Health Status"
              description="Present illness and ongoing health concerns"
              data={patient.history_of_present_illness}
              icon={ChevronDown}
            />

            <MedicalDataSection
              title="Medical History"
              description="Past medical conditions and procedures"
              data={patient.medical_history}
              icon={ChevronDown}
            />

            <MedicalDataSection
              title="Current Medications"
              description="Active prescriptions and dosages"
              data={patient.medications}
              icon={ChevronDown}
            />

            <MedicalDataSection
              title="Allergies & Reactions"
              description="Known allergies and adverse reactions"
              data={patient.allergies}
              icon={ChevronDown}
            />

            <MedicalDataSection
              title="Family Medical History"
              description="Relevant family health conditions"
              data={patient.family_history}
              icon={ChevronDown}
            />

            <MedicalDataSection
              title="Social History"
              description="Lifestyle factors affecting health"
              data={patient.social_history}
              icon={ChevronDown}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
