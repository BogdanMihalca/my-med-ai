import { pipeline, env, softmax } from "@huggingface/transformers";
import labels from "./label_mapping_enhanced.json";
// Skip local model check
env.allowLocalModels = false;

// Use the Singleton pattern to enable lazy construction of the pipeline.
class PipelineSingleton {
  static task = "feature-extraction";
  static model = "mihalca/SymptoAI";
  static instance = null;

  static async getInstance(progress_callback = null) {
    if (this.instance === null) {
      this.instance = pipeline(this.task, this.model, { progress_callback });
    }
    return this.instance;
  }
}

// Listen for messages from the main thread
self.addEventListener("message", async (event) => {
  // Retrieve the classification pipeline. When called for the first time,
  // this will load the pipeline and save it for future use.
  let classifier = await PipelineSingleton.getInstance((x) => {
    // We also add a progress callback to the pipeline so that we can
    // track model loading.
    self.postMessage(x);
  });

  // Actually perform the classification
  let output = await classifier(event.data.text);
  const resultArray = softmax(output.data);
  const resultObject = {};
  for (let i = 0; i < resultArray.length; i++) {
    resultObject[labels[i]] = resultArray[i];
  }

  const filteredResults = sortedResults.slice(0, 7);
  const othersScore = 1 - filteredResults.reduce((a, b) => a + b.score, 0);
  filteredResults.push({ label: "others", score: othersScore });

  // Send the output back to the main thread
  self.postMessage({
    status: "complete",
    output: {
      results: filteredResults,
      bestResult: labels[resultArray.indexOf(Math.max(...resultArray))],
      text: text,
    },
  });
});
