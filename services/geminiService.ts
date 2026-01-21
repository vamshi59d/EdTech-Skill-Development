
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const generateFlashcards = async (topic: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate 5 challenging study flashcards about: ${topic}. Each card should have a clear question and a concise answer.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            answer: { type: Type.STRING },
          },
          required: ["question", "answer"],
        },
      },
    },
  });
  
  try {
    return JSON.parse(response.text || "[]");
  } catch (e) {
    console.error("Failed to parse flashcards JSON", e);
    return [];
  }
};

export const chatWithTutor = async (history: { role: 'user' | 'model', parts: { text: string }[] }[], message: string) => {
  const ai = getAI();
  const chat = ai.chats.create({
    model: "gemini-3-flash-preview",
    config: {
      systemInstruction: "You are an expert academic tutor. Explain complex concepts simply, use analogies, and encourage critical thinking. Provide sources where possible.",
      tools: [{ googleSearch: {} }]
    }
  });

  const result = await chat.sendMessage({ message });
  return {
    text: result.text,
    sources: result.candidates?.[0]?.groundingMetadata?.groundingChunks?.map(chunk => chunk.web?.uri).filter(Boolean) || []
  };
};

export const summarizeNotes = async (notes: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Summarize these lecture notes into key bullet points and a concluding takeaway: \n\n${notes}`,
  });
  return response.text;
};
