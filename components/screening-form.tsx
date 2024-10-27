"use client";

import { useState } from "react";
import { Separator } from "./ui/separator";

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

  const currentQuestion = questions.find((q) => q.id === currentQuestionId);

  const handleAnswerClick = (nextQuestionId: number, sympth: string) => {
    setCurrentQuestionId(nextQuestionId);
    setAnswers([...answers, sympth]);
  };

  const handleDiagnose = () => {
    // lowercase all
    const formattedAnswers = answers.map((a: string) => a.toLowerCase());
    //remove no answers
    const filteredAnswers = formattedAnswers.filter(
      (a: string) =>
        !a.includes("no") && !a.includes("none") && !a.includes("not")
    );
    diagnose(filteredAnswers.join(", "));
    onClose();
  };

  const handleFreeSymptoms = () => {
    const formattedAnswers = freeSymptoms.split(",").map((a) => a.trim());
    diagnose(formattedAnswers.join(", "));
    onClose();
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen text-white p-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{currentQuestion?.question}</h2>
        <div className="space-y-4">
          {currentQuestion?.answers.map((answer, index) => (
            <button
              key={index}
              onClick={() =>
                handleAnswerClick(answer.nextQuestionId, answer.possibleSymptom)
              }
              className={`w-full py-2 px-4 rounded ${
                answer.text.toLowerCase() === "no"
                  ? "bg-gray-700 hover:bg-gray-800 focus:ring-gray-600"
                  : "bg-gray-900 hover:bg-gray-950 focus:ring-gray-800"
              } focus:outline-none focus:ring-2 text-start text-sm`}
            >
              {answer.text}
            </button>
          ))}

          {currentQuestionId === 21 && (
            <button
              onClick={handleDiagnose}
              className="w-full py-2 px-4 rounded bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:outline-none focus:ring-2 text-start text-sm"
            >
              Submit
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center mt-4 w-full">
        <Separator className="flex-1 mr-2 h-4" />
        OR
        <Separator className="flex-1 ml-2 h-4" />
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mt-5">
        <p className="text-sm text-gray-400">
          If you&apos;re not sure about the answer, you can skip the question
          and continue by entering the symptoms you&apos;re experiencing.
          <br /> <br />
          Enter them comma separated
        </p>

        <textarea
          className="w-full py-2 px-4 rounded bg-gray-900 hover:bg-gray-950 focus:ring-gray-800 focus:outline-none focus:ring-2 text-start text-sm mt-4"
          value={freeSymptoms}
          onChange={(e) => setFreeSymptoms(e.target.value)}
          rows={4}
        />

        <button
          onClick={handleFreeSymptoms}
          className=" py-2 px-4 rounded bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:outline-none focus:ring-2 text-center text-sm mt-4"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ScreeningForm;
