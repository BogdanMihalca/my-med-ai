"use client";
import React, { useState } from "react";
import ScreeningForm from "@/components/screening-form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { motion } from "framer-motion";
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
import {
  AlertCircle,
  Plus,
  Activity,
  User,
  Calendar,
  Pill,
  AlertTriangle,
  Users,
  Coffee,
  Heart,
  Brain,
} from "lucide-react";
import SpecialistRecommendations from "@/components/specialists-recommanadation";
import QuickStatsCard from "@/components/quick-start-card";
import MedicalDataSection from "@/components/medical-section-data";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useMedicalBlackbox from "@/lib/useMedicalBlackbox";

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
  const { data: session } = useSession();
  const router = useRouter();

  if (session?.user?.role !== "PATIENT") {
    router.push("/");
  }
  const { ready, result, blackboxify } = useMedicalBlackbox();
  const [isScreeningFormOpen, setIsScreeningFormOpen] = useState(false);

  // keep track of the classification result and the model loading status
  const [result2, setResult2] = useState<{
    result: PatientData;
    text: string;
  } | null>(null);

  const [ready2, setReady2] = useState<boolean | null>(null);

  const diagnose = async (text: string) => {
    blackboxify(text);

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

  console.log(result);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-slate-950 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-12"
        >
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              My Records
            </h1>
            <p className="text-slate-400 text-lg">
              Your comprehensive health management platform
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <QuickStatsCard
            title="Health Score"
            value="85/100"
            icon={Heart}
            trend={5}
          />
          <QuickStatsCard title="Active Medications" value="3" icon={Pill} />
          <QuickStatsCard
            title="Next Appointment"
            value="2 Days"
            icon={Calendar}
          />
          <QuickStatsCard
            title="Risk Level"
            value="Low"
            icon={Activity}
            trend={-2}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="w-full mb-8 bg-gradient-to-br from-slate-900 to-slate-800/90 border-slate-700">
            <CardHeader>
              <CardTitle className="text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                AI Diagnosis Results
              </CardTitle>
              <Sheet
                open={isScreeningFormOpen}
                onOpenChange={setIsScreeningFormOpen}
              >
                <SheetTrigger asChild>
                  <Button className="overflow-hidden group bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-blue-500/25 transition-all duration-300 border-none absolute w-40 right-10">
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 to-indigo-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    <span className="relative flex items-center">
                      <AlertCircle className="w-4 h-4 mr-2 animate-pulse" />
                      Report Symptoms
                    </span>
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-300 to-indigo-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[500px] sm:max-w-[unset] bg-slate-900/95 backdrop-blur-sm border-slate-800 shadow-2xl">
                  <SheetHeader className="space-y-3">
                    <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                      Symptom Screening
                    </SheetTitle>
                    <p className="text-sm text-slate-400">
                      Securely share your symptoms for AI-powered health
                      analysis
                    </p>
                  </SheetHeader>
                  <Separator className="my-4 bg-slate-800" />
                  <ScreeningForm
                    onClose={() => setIsScreeningFormOpen(false)}
                    diagnose={diagnose}
                  />
                </SheetContent>
              </Sheet>
              <CardDescription>
                Real-time analysis of your reported symptoms
              </CardDescription>
            </CardHeader>
            <CardContent className="lg:flex items-stretch justify-start gap-4">
              {ready === false ? (
                <motion.div
                  className="w-full p-8 text-center"
                  animate={{ opacity: [0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <div className="text-slate-400">
                    Analyzing symptoms... Please wait.
                  </div>
                </motion.div>
              ) : (
                <>
                  <ScreeningResults ready={ready} result={result} />
                  <ScreeningResults2 ready={ready2} result={result2?.result} />
                </>
              )}
            </CardContent>
            {ready === true && ready2 === true && (
              <>
                <Separator className="bg-slate-700" />
                <SpecialistRecommendations diagnoses={result2?.result} />
              </>
            )}
            <Separator className="bg-slate-700" />
            <CardFooter className="bg-slate-900/50 ">
              <Alert className="bg-orange-900/20 border-orange-800/50 mt-6">
                <AlertTriangle className="h-4 w-4 text-orange-400" />
                <AlertDescription className="text-orange-200">
                  This is an AI-assisted analysis. Always consult healthcare
                  professionals for accurate medical diagnosis and treatment.
                </AlertDescription>
              </Alert>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Medical Records
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <MedicalDataSection
              title="Personal Information"
              description="Basic personal and contact details"
              data={patient.personal_info}
              icon={User}
            />
            <MedicalDataSection
              title="Current Health Status"
              description="Present illness and ongoing health concerns"
              data={patient.history_of_present_illness}
              icon={Activity}
            />
            <MedicalDataSection
              title="Medical History"
              description="Past medical conditions and procedures"
              data={patient.medical_history}
              icon={Brain}
            />
            <MedicalDataSection
              title="Current Medications"
              description="Active prescriptions and dosages"
              data={patient.medications}
              icon={Pill}
            />
            <MedicalDataSection
              title="Allergies & Reactions"
              description="Known allergies and adverse reactions"
              data={patient.allergies}
              icon={AlertTriangle}
            />
            <MedicalDataSection
              title="Family Medical History"
              description="Relevant family health conditions"
              data={patient.family_history}
              icon={Users}
            />
            <MedicalDataSection
              title="Social History"
              description="Lifestyle factors affecting health"
              data={patient.social_history}
              icon={Coffee}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
