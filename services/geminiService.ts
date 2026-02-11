
import { GoogleGenAI, Type } from "@google/genai";

// Fix: Always use named parameter and directly reference process.env.API_KEY without fallbacks
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const geminiAssistant = {
  async summarizePost(content: string): Promise<string> {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Summarize this student community post in one short sentence: "${content}"`,
        config: {
          systemInstruction: "You are a helpful student assistant at a CMC campus. Keep it professional yet friendly."
        }
      });
      // Use .text property to extract output
      return response.text || "Could not summarize.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Assistant unavailable.";
    }
  },

  async suggestStudyTip(subject: string): Promise<string> {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Give one unique study tip for the field of ${subject} for CMC students.`,
        config: {
          systemInstruction: "You are a mentor for CMC (Cité des Métiers et des Compétences) students. Use a mix of Arabic (Darija) and French if needed."
        }
      });
      // Use .text property to extract output
      return response.text || "Keep studying hard!";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Focus on your goals!";
    }
  }
};
