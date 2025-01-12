"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Loader2,
  MessageCircle,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";

const questions = [
  {
    id: 1,
    question: "🌡️ Do you have a fever?",
    answers: [
      {
        text: "Yes, high (over 39°C/102.2°F) 🔥",
        nextQuestionId: 2,
        possibleSymptom: "High Fever",
      },
      {
        text: "Yes, moderate (38-39°C/100.4-102.2°F) 🌞",
        nextQuestionId: 2,
        possibleSymptom: "Moderate Fever",
      },
      {
        text: "Yes, mild (37.5-38°C/99.5-100.4°F) 🌤️",
        nextQuestionId: 2,
        possibleSymptom: "Mild Fever",
      },
      { text: "No ❌", nextQuestionId: 3, possibleSymptom: "No Fever" },
    ],
  },
  {
    id: 2,
    question: "⏳ How long have you had the fever?",
    answers: [
      {
        text: "Less than 24 hours ⏱️",
        nextQuestionId: 4,
        possibleSymptom: "Recent Fever",
      },
      {
        text: "1-3 days 📅",
        nextQuestionId: 4,
        possibleSymptom: "Fever for 1-3 Days",
      },
      {
        text: "4-7 days 📆",
        nextQuestionId: 4,
        possibleSymptom: "Fever for 4-7 Days",
      },
      {
        text: "More than 7 days 📅➡️📅",
        nextQuestionId: 4,
        possibleSymptom: "Prolonged Fever",
      },
    ],
  },
  {
    id: 3,
    question: "😷 Do you have a sore throat?",
    answers: [
      {
        text: "Yes, severe with difficulty swallowing 😖",
        nextQuestionId: 4,
        possibleSymptom: "Severe Sore Throat",
      },
      {
        text: "Yes, moderate 🤒",
        nextQuestionId: 4,
        possibleSymptom: "Moderate Sore Throat",
      },
      {
        text: "Yes, mild 🤧",
        nextQuestionId: 4,
        possibleSymptom: "Mild Sore Throat",
      },
      { text: "No ❌", nextQuestionId: 4, possibleSymptom: "No Sore Throat" },
    ],
  },
  {
    id: 4,
    question: "🤧 Do you have a cough?",
    answers: [
      {
        text: "Yes, dry and persistent 🌬️",
        nextQuestionId: 5,
        possibleSymptom: "Dry Persistent Cough",
      },
      {
        text: "Yes, with yellow/green phlegm 🟢",
        nextQuestionId: 5,
        possibleSymptom: "Productive Cough (Yellow/Green Phlegm)",
      },
      {
        text: "Yes, with clear phlegm 🔵",
        nextQuestionId: 5,
        possibleSymptom: "Productive Cough (Clear Phlegm)",
      },
      {
        text: "Yes, with blood 🩸",
        nextQuestionId: 5,
        possibleSymptom: "Cough with Blood",
      },
      { text: "No ❌", nextQuestionId: 6, possibleSymptom: "No Cough" },
    ],
  },
  {
    id: 5,
    question: "⏳ How long have you had the cough?",
    answers: [
      {
        text: "Less than 1 week 📅",
        nextQuestionId: 6,
        possibleSymptom: "Recent Cough",
      },
      {
        text: "1-2 weeks 🗓️",
        nextQuestionId: 6,
        possibleSymptom: "Cough for 1-2 Weeks",
      },
      {
        text: "2-4 weeks 📅➡️📅",
        nextQuestionId: 6,
        possibleSymptom: "Cough for 2-4 Weeks",
      },
      {
        text: "More than 4 weeks 📆",
        nextQuestionId: 6,
        possibleSymptom: "Prolonged Cough",
      },
    ],
  },
  {
    id: 6,
    question: "🫁 Are you experiencing shortness of breath?",
    answers: [
      {
        text: "Yes, severe (at rest) 🚨",
        nextQuestionId: 7,
        possibleSymptom: "Severe Shortness of Breath",
      },
      {
        text: "Yes, moderate (with minimal activity) 🏃‍♂️",
        nextQuestionId: 7,
        possibleSymptom: "Moderate Shortness of Breath",
      },
      {
        text: "Yes, mild (only with exertion) 🚶‍♂️",
        nextQuestionId: 7,
        possibleSymptom: "Mild Shortness of Breath",
      },
      {
        text: "No ❌",
        nextQuestionId: 7,
        possibleSymptom: "No Shortness of Breath",
      },
    ],
  },
  {
    id: 7,
    question: "❤️ Do you have chest pain or pressure?",
    answers: [
      {
        text: "Yes, severe 😣",
        nextQuestionId: 8,
        possibleSymptom: "Severe Chest Pain",
      },
      {
        text: "Yes, moderate 🤕",
        nextQuestionId: 8,
        possibleSymptom: "Moderate Chest Pain",
      },
      {
        text: "Yes, mild 😌",
        nextQuestionId: 8,
        possibleSymptom: "Mild Chest Pain",
      },
      { text: "No ❌", nextQuestionId: 8, possibleSymptom: "No Chest Pain" },
    ],
  },
  {
    id: 8,
    question: "💪 Do you have body aches?",
    answers: [
      {
        text: "Yes, severe and widespread 😩",
        nextQuestionId: 9,
        possibleSymptom: "Severe Body Aches",
      },
      {
        text: "Yes, moderate 🥴",
        nextQuestionId: 9,
        possibleSymptom: "Moderate Body Aches",
      },
      {
        text: "Yes, mild 🤕",
        nextQuestionId: 9,
        possibleSymptom: "Mild Body Aches",
      },
      { text: "No ❌", nextQuestionId: 9, possibleSymptom: "No Body Aches" },
    ],
  },
  {
    id: 9,
    question: "🍽️ Select all gastrointestinal symptoms you're experiencing:",
    answers: [
      {
        text: "Severe nausea/vomiting 🤮",
        nextQuestionId: 10,
        possibleSymptom: "Severe Nausea/Vomiting",
      },
      {
        text: "Mild nausea 🤢",
        nextQuestionId: 10,
        possibleSymptom: "Mild Nausea",
      },
      {
        text: "Severe diarrhea 💩",
        nextQuestionId: 10,
        possibleSymptom: "Severe Diarrhea",
      },
      {
        text: "Mild diarrhea 💧",
        nextQuestionId: 10,
        possibleSymptom: "Mild Diarrhea",
      },
      {
        text: "Severe abdominal pain 🩹",
        nextQuestionId: 10,
        possibleSymptom: "Severe Abdominal Pain",
      },
      {
        text: "Mild abdominal pain 🤕",
        nextQuestionId: 10,
        possibleSymptom: "Mild Abdominal Pain",
      },
      {
        text: "None ❌",
        nextQuestionId: 10,
        possibleSymptom: "No Gastrointestinal Symptoms",
      },
    ],
  },
  {
    id: 10,
    question: "🧠 Are you experiencing any neurological symptoms?",
    answers: [
      {
        text: "Severe headache 😵",
        nextQuestionId: 11,
        possibleSymptom: "Severe Headache",
      },
      {
        text: "Mild/moderate headache 🤕",
        nextQuestionId: 11,
        possibleSymptom: "Mild/Moderate Headache",
      },
      {
        text: "Confusion 😵‍💫",
        nextQuestionId: 11,
        possibleSymptom: "Confusion",
      },
      {
        text: "Dizziness 😵",
        nextQuestionId: 11,
        possibleSymptom: "Dizziness",
      },
      {
        text: "None ❌",
        nextQuestionId: 11,
        possibleSymptom: "No Neurological Symptoms",
      },
    ],
  },
  {
    id: 11,
    question:
      "👃 Have you noticed any changes in your sense of taste or smell?",
    answers: [
      {
        text: "Complete loss 🚫👃👅",
        nextQuestionId: 12,
        possibleSymptom: "Complete Loss of Taste/Smell",
      },
      {
        text: "Partial loss 🔻👃👅",
        nextQuestionId: 12,
        possibleSymptom: "Partial Loss of Taste/Smell",
      },
      {
        text: "No change ✅",
        nextQuestionId: 12,
        possibleSymptom: "No Changes in Taste/Smell",
      },
    ],
  },
  {
    id: 12,
    question: "🩹 Do you have any skin symptoms?",
    answers: [
      {
        text: "Rash - widespread 🌍",
        nextQuestionId: 13,
        possibleSymptom: "Widespread Rash",
      },
      {
        text: "Rash - localized 📍",
        nextQuestionId: 13,
        possibleSymptom: "Localized Rash",
      },
      { text: "Itching 🐜", nextQuestionId: 13, possibleSymptom: "Itching" },
      {
        text: "None ❌",
        nextQuestionId: 13,
        possibleSymptom: "No Skin Symptoms",
      },
    ],
  },
  {
    id: 13,
    question: "😴 Are you experiencing fatigue?",
    answers: [
      {
        text: "Yes, severe (can't perform daily activities) 🛌",
        nextQuestionId: 14,
        possibleSymptom: "Severe Fatigue",
      },
      {
        text: "Yes, moderate (difficult to perform daily activities) 😔",
        nextQuestionId: 14,
        possibleSymptom: "Moderate Fatigue",
      },
      {
        text: "Yes, mild (can perform daily activities) 😊",
        nextQuestionId: 14,
        possibleSymptom: "Mild Fatigue",
      },
      { text: "No ❌", nextQuestionId: 14, possibleSymptom: "No Fatigue" },
    ],
  },
  {
    id: 14,
    question: "🏥 Do you have any pre-existing medical conditions?",
    answers: [
      {
        text: "Heart disease ❤️",
        nextQuestionId: 15,
        possibleSymptom: "Heart Disease",
      },
      {
        text: "Lung disease 🫁",
        nextQuestionId: 15,
        possibleSymptom: "Lung Disease",
      },
      { text: "Diabetes 🍬", nextQuestionId: 15, possibleSymptom: "Diabetes" },
      {
        text: "Immune system disorder 🛡️",
        nextQuestionId: 15,
        possibleSymptom: "Immune System Disorder",
      },
      {
        text: "High blood pressure 📈",
        nextQuestionId: 15,
        possibleSymptom: "High Blood Pressure",
      },
      {
        text: "None ❌",
        nextQuestionId: 15,
        possibleSymptom: "No Pre-existing Conditions",
      },
    ],
  },
  {
    id: 15,
    question: "🧓 What is your age group?",
    answers: [
      { text: "Under 18 👶", nextQuestionId: 16, possibleSymptom: "Underage" },
      { text: "18-40 🧑", nextQuestionId: 16, possibleSymptom: "Young Adult" },
      {
        text: "41-60 👨‍🦳",
        nextQuestionId: 16,
        possibleSymptom: "Middle-aged Adult",
      },
      {
        text: "Over 60 👵",
        nextQuestionId: 16,
        possibleSymptom: "Older Adult",
      },
    ],
  },
  {
    id: 16,
    question:
      "🤝 Have you been exposed to anyone with confirmed infectious disease in the past 14 days?",
    answers: [
      {
        text: "Yes, prolonged close contact 🤗",
        nextQuestionId: 17,
        possibleSymptom: "High Risk of Exposure",
      },
      {
        text: "Yes, brief contact 🤝",
        nextQuestionId: 17,
        possibleSymptom: "Moderate Risk of Exposure",
      },
      {
        text: "Not sure ❓",
        nextQuestionId: 17,
        possibleSymptom: "Uncertain Risk",
      },
      {
        text: "No ❌",
        nextQuestionId: 17,
        possibleSymptom: "No Known Exposure",
      },
    ],
  },
  {
    id: 17,
    question: "✈️ Have you traveled recently?",
    answers: [
      {
        text: "Yes, international 🌎",
        nextQuestionId: 18,
        possibleSymptom: "Recent International Travel",
      },
      {
        text: "Yes, domestic 🏠",
        nextQuestionId: 18,
        possibleSymptom: "Recent Domestic Travel",
      },
      {
        text: "No ❌",
        nextQuestionId: 18,
        possibleSymptom: "No Recent Travel",
      },
    ],
  },
  {
    id: 18,
    question: "💊 Are you currently taking any medications?",
    answers: [
      {
        text: "Yes, immunosuppressants 🛡️",
        nextQuestionId: 19,
        possibleSymptom: "Immunosuppressants Use",
      },
      {
        text: "Yes, steroids 💪",
        nextQuestionId: 19,
        possibleSymptom: "Steroid Use",
      },
      {
        text: "Yes, other medications 💊",
        nextQuestionId: 19,
        possibleSymptom: "Other Medications",
      },
      { text: "No ❌", nextQuestionId: 19, possibleSymptom: "No Medications" },
    ],
  },
  {
    id: 19,
    question: "🤰 For female patients: Are you currently pregnant?",
    answers: [
      { text: "Yes 👶", nextQuestionId: 20, possibleSymptom: "Pregnancy" },
      { text: "No ❌", nextQuestionId: 20, possibleSymptom: "Not Pregnant" },
      {
        text: "Not applicable 🚫",
        nextQuestionId: 20,
        possibleSymptom: "Not Applicable",
      },
    ],
  },
  {
    id: 20,
    question: "🕒 Have these symptoms appeared suddenly or gradually?",
    answers: [
      {
        text: "Suddenly (within hours) ⚡",
        nextQuestionId: 21,
        possibleSymptom: "Sudden Onset",
      },
      {
        text: "Gradually (over days) 🕰️",
        nextQuestionId: 21,
        possibleSymptom: "Gradual Onset",
      },
      {
        text: "Not sure ❓",
        nextQuestionId: 21,
        possibleSymptom: "Uncertain Onset",
      },
    ],
  },
  {
    id: 21,
    question: "✅ Thank you for completing the screening.",
    answers: [],
  },
];

const ScreeningForm = ({
  diagnose,
  onClose,
}: {
  diagnose: (text: string) => void;
  onClose: () => void;
}) => {
  const [currentQuestionId, setCurrentQuestionId] = useState(1);
  const [answers, setAnswers] = useState<any>([]);
  const [freeSymptoms, setFreeSymptoms] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const currentQuestion = questions.find((q) => q.id === currentQuestionId);

  useEffect(() => {
    setProgress((currentQuestionId / 21) * 100);
  }, [currentQuestionId]);

  const handleAnswerClick = async (nextQuestionId: number, sympth: string) => {
    setAnswers([...answers, sympth]);
    setCurrentQuestionId(nextQuestionId);
  };

  const handleDiagnose = async () => {
    setIsLoading(true);
    const formattedAnswers = answers
      .map((a: string) => a.toLowerCase())
      .filter(
        (a: string) =>
          !a.includes("no") && !a.includes("none") && !a.includes("not")
      );

    await new Promise((resolve) => setTimeout(resolve, 1000));
    diagnose(formattedAnswers.join(", "));
    onClose();
  };

  const handleFreeSymptoms = async () => {
    if (!freeSymptoms.trim()) return;

    setIsLoading(true);
    const formattedAnswers = freeSymptoms
      .split(",")
      .map((a) => a.trim())
      .filter(Boolean);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    diagnose(formattedAnswers.join(", "));
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-start min-h-screen text-white p-4"
    >
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">Symptom Screening</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-slate-700/50"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <Progress value={progress} className="mb-6" />

        <motion.div
          key={currentQuestionId}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-slate-800 p-6 rounded-lg shadow-lg mb-6"
        >
          <div className="flex items-start gap-3 mb-6">
            <HelpCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold mb-2">
                {currentQuestion?.question}
              </h2>
              <p className="text-sm text-slate-400">
                Question {currentQuestionId} of 21
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <AnimatePresence mode="sync">
              {currentQuestion?.answers.map((answer, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() =>
                    handleAnswerClick(
                      answer.nextQuestionId,
                      answer.possibleSymptom
                    )
                  }
                  disabled={isLoading}
                  className={`w-full py-3 px-4 rounded-lg flex items-center justify-between
                    ${
                      answer.text.toLowerCase() === "no"
                        ? "bg-slate-700 hover:bg-slate-600"
                        : "bg-slate-700/50 hover:bg-slate-600/50"
                    } transition-colors duration-200`}
                >
                  <span className="text-sm">{answer.text}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </motion.button>
              ))}
            </AnimatePresence>

            {currentQuestionId === 21 && (
              <Button
                onClick={handleDiagnose}
                disabled={isLoading}
                className="w-full py-6"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                )}
                Complete Screening
              </Button>
            )}
          </div>
        </motion.div>

        <div className="flex items-center gap-4 my-6">
          <Separator className="flex-1" />
          <span className="text-slate-400 text-sm">OR</span>
          <Separator className="flex-1" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800 p-6 rounded-lg shadow-lg"
        >
          <div className="flex items-start gap-3 mb-4">
            <MessageCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-2">Describe Your Symptoms</h3>
              <p className="text-sm text-slate-400">
                Enter your symptoms separated by commas
              </p>
            </div>
          </div>

          <Textarea
            value={freeSymptoms}
            onChange={(e) => setFreeSymptoms(e.target.value)}
            placeholder="E.g., headache, fever, sore throat"
            className="mb-4 bg-slate-900/50 border-slate-700"
            rows={4}
          />

          <Button
            onClick={handleFreeSymptoms}
            disabled={isLoading || !freeSymptoms.trim()}
            className="w-full"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <CheckCircle2 className="w-4 h-4 mr-2" />
            )}
            Submit Symptoms
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ScreeningForm;
