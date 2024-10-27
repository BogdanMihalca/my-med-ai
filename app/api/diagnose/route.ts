import { NextRequest, NextResponse } from "next/server";
import PipelineSingleton from "./pipeline";
import { softmax, Tensor } from "@xenova/transformers";
// import labels from "./label_mapping.json";
import labels from "./label_mapping_enhanced.json";

export const POST = async function POST(request: NextRequest) {
  const body = await request.json();
  const text = body.text;
  const symptomsFromScreening = body.text;

  if (!text) {
    return NextResponse.json(
      {
        error: "Missing text parameter",
      },
      { status: 400 }
    );
  }
  // Get the classification pipeline. When called for the first time,
  // this will load the pipeline and cache it for future use.
  const classifier = await PipelineSingleton.getInstance();

  // Actually perform the classification
  const result: Tensor = await classifier(symptomsFromScreening);

  // Convert the result to a JavaScript object
  const resultArray = softmax(result.data as any);
  const resultObject: any = {};
  for (let i = 0; i < resultArray.length; i++) {
    resultObject[labels[i]] = resultArray[i];
  }

  // Sort by value and return the top 5 and the remaining difference as "others"
  const sortedResults = Object.entries(resultObject)
    .sort(([, a], [, b]) => (b as number) - (a as number))
    .map(([label, score]) => ({ label, score }));

  const filteredResults = sortedResults.slice(0, 7);
  const othersScore =
    1 - filteredResults.reduce((a, b) => a + (b.score as number), 0);
  filteredResults.push({ label: "others", score: othersScore });

  return NextResponse.json({
    results: filteredResults,
    bestResult: labels[resultArray.indexOf(Math.max(...resultArray))],
    text: text,
  });
};
