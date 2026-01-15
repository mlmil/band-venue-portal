
import { GoogleGenAI } from "@google/genai";
import { BAND_INFO_MD } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function askGeminiAboutBand(userQuestion: string) {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing");
  }

  const systemInstruction = `
    You are the "Neon Blonde Concierge," an AI assistant for the band Neon Blonde. 
    You help venue managers, booking agents, and staff with information about the band.
    Base your answers STRICTLY on the following band information provided in Markdown format:
    
    ${BAND_INFO_MD}
    
    If someone asks something not in this document, politely tell them to contact the manager directly at rickey@neonblonde.com.
    Maintain a professional, helpful, and "synth-wave cool" persona.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userQuestion,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I couldn't process that. Please contact our manager.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The neon lights are flickering... (API Error). Please try again in a moment.";
  }
}
