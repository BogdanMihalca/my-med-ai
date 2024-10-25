"use client";

import { useState } from "react";

const questions = [
  {
    id: 1,
    question: "Do you have a fever?",
    answers: [
      { text: "Yes, high (over 39°C/102.2°F)", nextQuestionId: 2 },
      { text: "Yes, moderate (38-39°C/100.4-102.2°F)", nextQuestionId: 2 },
      { text: "Yes, mild (37.5-38°C/99.5-100.4°F)", nextQuestionId: 2 },
      { text: "No", nextQuestionId: 3 },
    ],
  },
  {
    id: 2,
    question: "How long have you had the fever?",
    answers: [
      { text: "Less than 24 hours", nextQuestionId: 4 },
      { text: "1-3 days", nextQuestionId: 4 },
      { text: "4-7 days", nextQuestionId: 4 },
      { text: "More than 7 days", nextQuestionId: 4 },
    ],
  },
  {
    id: 3,
    question: "Do you have a sore throat?",
    answers: [
      { text: "Yes, severe with difficulty swallowing", nextQuestionId: 4 },
      { text: "Yes, moderate", nextQuestionId: 4 },
      { text: "Yes, mild", nextQuestionId: 4 },
      { text: "No", nextQuestionId: 4 },
    ],
  },
  {
    id: 4,
    question: "Do you have a cough?",
    answers: [
      { text: "Yes, dry and persistent", nextQuestionId: 5 },
      { text: "Yes, with yellow/green phlegm", nextQuestionId: 5 },
      { text: "Yes, with clear phlegm", nextQuestionId: 5 },
      { text: "Yes, with blood", nextQuestionId: 5 },
      { text: "No", nextQuestionId: 6 },
    ],
  },
  {
    id: 5,
    question: "How long have you had the cough?",
    answers: [
      { text: "Less than 1 week", nextQuestionId: 6 },
      { text: "1-2 weeks", nextQuestionId: 6 },
      { text: "2-4 weeks", nextQuestionId: 6 },
      { text: "More than 4 weeks", nextQuestionId: 6 },
    ],
  },
  {
    id: 6,
    question: "Are you experiencing shortness of breath?",
    answers: [
      { text: "Yes, severe (at rest)", nextQuestionId: 7 },
      { text: "Yes, moderate (with minimal activity)", nextQuestionId: 7 },
      { text: "Yes, mild (only with exertion)", nextQuestionId: 7 },
      { text: "No", nextQuestionId: 7 },
    ],
  },
  {
    id: 7,
    question: "Do you have chest pain or pressure?",
    answers: [
      { text: "Yes, severe", nextQuestionId: 8 },
      { text: "Yes, moderate", nextQuestionId: 8 },
      { text: "Yes, mild", nextQuestionId: 8 },
      { text: "No", nextQuestionId: 8 },
    ],
  },
  {
    id: 8,
    question: "Do you have body aches?",
    answers: [
      { text: "Yes, severe and widespread", nextQuestionId: 9 },
      { text: "Yes, moderate", nextQuestionId: 9 },
      { text: "Yes, mild", nextQuestionId: 9 },
      { text: "No", nextQuestionId: 9 },
    ],
  },
  {
    id: 9,
    question: "Select all gastrointestinal symptoms you're experiencing:",
    answers: [
      { text: "Severe nausea/vomiting", nextQuestionId: 10 },
      { text: "Mild nausea", nextQuestionId: 10 },
      { text: "Severe diarrhea", nextQuestionId: 10 },
      { text: "Mild diarrhea", nextQuestionId: 10 },
      { text: "Severe abdominal pain", nextQuestionId: 10 },
      { text: "Mild abdominal pain", nextQuestionId: 10 },
      { text: "None", nextQuestionId: 10 },
    ],
  },
  {
    id: 10,
    question: "Are you experiencing any neurological symptoms?",
    answers: [
      { text: "Severe headache", nextQuestionId: 11 },
      { text: "Mild/moderate headache", nextQuestionId: 11 },
      { text: "Confusion", nextQuestionId: 11 },
      { text: "Dizziness", nextQuestionId: 11 },
      { text: "None", nextQuestionId: 11 },
    ],
  },
  {
    id: 11,
    question: "Have you noticed any changes in your sense of taste or smell?",
    answers: [
      { text: "Complete loss", nextQuestionId: 12 },
      { text: "Partial loss", nextQuestionId: 12 },
      { text: "No change", nextQuestionId: 12 },
    ],
  },
  {
    id: 12,
    question: "Do you have any skin symptoms?",
    answers: [
      { text: "Rash - widespread", nextQuestionId: 13 },
      { text: "Rash - localized", nextQuestionId: 13 },
      { text: "Itching", nextQuestionId: 13 },
      { text: "None", nextQuestionId: 13 },
    ],
  },
  {
    id: 13,
    question: "Are you experiencing fatigue?",
    answers: [
      {
        text: "Yes, severe (can't perform daily activities)",
        nextQuestionId: 14,
      },
      {
        text: "Yes, moderate (difficult to perform daily activities)",
        nextQuestionId: 14,
      },
      { text: "Yes, mild (can perform daily activities)", nextQuestionId: 14 },
      { text: "No", nextQuestionId: 14 },
    ],
  },
  {
    id: 14,
    question: "Do you have any pre-existing medical conditions?",
    answers: [
      { text: "Heart disease", nextQuestionId: 15 },
      { text: "Lung disease", nextQuestionId: 15 },
      { text: "Diabetes", nextQuestionId: 15 },
      { text: "Immune system disorder", nextQuestionId: 15 },
      { text: "High blood pressure", nextQuestionId: 15 },
      { text: "None", nextQuestionId: 15 },
    ],
  },
  {
    id: 15,
    question: "What is your age group?",
    answers: [
      { text: "Under 18", nextQuestionId: 16 },
      { text: "18-40", nextQuestionId: 16 },
      { text: "41-60", nextQuestionId: 16 },
      { text: "Over 60", nextQuestionId: 16 },
    ],
  },
  {
    id: 16,
    question:
      "Have you been exposed to anyone with confirmed infectious disease in the past 14 days?",
    answers: [
      { text: "Yes, prolonged close contact", nextQuestionId: 17 },
      { text: "Yes, brief contact", nextQuestionId: 17 },
      { text: "Not sure", nextQuestionId: 17 },
      { text: "No", nextQuestionId: 17 },
    ],
  },
  {
    id: 17,
    question: "Have you traveled recently?",
    answers: [
      { text: "Yes, international", nextQuestionId: 18 },
      { text: "Yes, domestic", nextQuestionId: 18 },
      { text: "No", nextQuestionId: 18 },
    ],
  },
  {
    id: 18,
    question: "Are you currently taking any medications?",
    answers: [
      { text: "Yes, immunosuppressants", nextQuestionId: 19 },
      { text: "Yes, steroids", nextQuestionId: 19 },
      { text: "Yes, other medications", nextQuestionId: 19 },
      { text: "No", nextQuestionId: 19 },
    ],
  },
  {
    id: 19,
    question: "For female patients: Are you currently pregnant?",
    answers: [
      { text: "Yes", nextQuestionId: 20 },
      { text: "No", nextQuestionId: 20 },
      { text: "Not applicable", nextQuestionId: 20 },
    ],
  },
  {
    id: 20,
    question: "Have these symptoms appeared suddenly or gradually?",
    answers: [
      { text: "Suddenly (within hours)", nextQuestionId: 21 },
      { text: "Gradually (over days)", nextQuestionId: 21 },
      { text: "Not sure", nextQuestionId: 21 },
    ],
  },
  {
    id: 21,
    question: "Thank you for completing the screening.",
    answers: [],
  },
];

const ScreeningForm = () => {
  const [currentQuestionId, setCurrentQuestionId] = useState(1);

  const currentQuestion = questions.find((q) => q.id === currentQuestionId);

  const handleAnswerClick = (nextQuestionId: number) => {
    setCurrentQuestionId(nextQuestionId);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen">
      <div className=" p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">{currentQuestion?.question}</h2>
        <div className="space-y-4">
          {currentQuestion?.answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(answer.nextQuestionId)}
              className="w-full py-2 px-4 rounded hover:bg-blue-700"
            >
              {answer.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScreeningForm;
