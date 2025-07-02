// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import { GoogleGenAI } from "@google/genai";

async function main(prompt: string) {
  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_API_KEY,
  });
  const config = {
    responseMimeType: "text/plain",
  };
  console.log("API Key:", import.meta.env.VITE_API_KEY);

  const model = "gemini-2.5-flash-preview-05-20";
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: prompt,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  let full = "";
  for await (const chunk of response) {
    console.log(chunk.text); // works everywhere
    full += chunk.text; // build the complete answer
  }

  return full;
}

export default main;
