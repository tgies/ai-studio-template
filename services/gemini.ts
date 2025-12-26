import { GoogleGenAI } from "@google/genai";

// Initialize the API client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates text using the Gemini 3 Flash Preview model.
 */
export const generateTextContent = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    
    return response.text || "No response text generated.";
  } catch (error) {
    console.error("Text generation error:", error);
    throw error;
  }
};

/**
 * Generates an image using the Gemini Nano Banana (Flash Image) model.
 * Note: Nano Banana uses generateContent and returns image data in parts.
 */
export const generateImageContent = async (prompt: string): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image', // Mapped to Nano Banana
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
        },
        // responseMimeType is NOT supported for this model
      },
    });

    // Iterate through parts to find the image
    const parts = response.candidates?.[0]?.content?.parts;
    
    if (parts) {
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          // Construct the data URL
          return `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
        }
      }
    }

    throw new Error("No image data found in response.");
  } catch (error) {
    console.error("Image generation error:", error);
    throw error;
  }
};