import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
// import mime from "mime-types";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp-image-generation",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseModalities: ["image", "text"],
  responseMimeType: "text/plain",
};

export async function generateContent(prompt) {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(prompt);

    const responseData = {
      text: result.response.text(),
      images: [],
    };

    const candidates = result.response.candidates;
    for (
      let candidate_index = 0;
      candidate_index < candidates.length;
      candidate_index++
    ) {
      for (
        let part_index = 0;
        part_index < candidates[candidate_index].content.parts.length;
        part_index++
      ) {
        const part = candidates[candidate_index].content.parts[part_index];
        if (part.inlineData) {
          responseData.images.push({
            mimeType: part.inlineData.mimeType,
            data: part.inlineData.data, // base64 encoded image data
          });
        }
      }
    }
    console.log(responseData.text);

    return responseData;
  } catch (error) {
    console.error(`An error occurred: ${error}`);
    return { error: error.message }; // Return an error object
  }
}
