import { NextRequest, NextResponse } from "next/server";

import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const POST = async function POST(request: NextRequest) {
  const body = await request.json();
  const symptoms = body.symptoms;
  const medicalHistory = body.medicalHistory;

  if (!symptoms || !medicalHistory) {
    return NextResponse.json(
      {
        error: "Missing symptoms or medicalHistory parameter",
      },
      { status: 400 }
    );
  }

  const formattedPrompt = `The patient has the following symptoms: ${symptoms}. The patient has the following medical history: ${medicalHistory}.`;

  const thread = await openai.beta.threads.create();
  await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: formattedPrompt,
  });

  let data = "";

  await new Promise<void>((resolve) => {
    openai.beta.threads.runs
      .stream(thread.id, {
        assistant_id: process.env.ASSISTENT_ID as string,
      })
      .on("textDone", (d) => {
        data += d.value.toString();
      })
      .on("end", () => {
        resolve();
      });
  });

  return NextResponse.json({
    result: JSON.parse(data),
    text: formattedPrompt,
  });
};
