import { GoogleGenAI, Type } from "@google/genai";
import { UserData, QuoteResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateQuotes = async (userData: UserData): Promise<QuoteResult> => {
  const model = "gemini-3-flash-preview";

  const systemInstruction = `
    You are an expert senior insurance underwriter and risk analyst.
    Your goal is to analyze user data and generate realistic, simulated insurance quotes.
    You must output strictly structured JSON data matching the requested schema.
    Assess risk factors intelligently based on age, location (simulate based on zip), and asset details.
  `;

  const prompt = `
    Generate 3 distinct insurance quote packages (Basic, Standard, Premium) and a risk analysis for a user with the following profile:
    ${JSON.stringify(userData, null, 2)}

    For the 'riskLevel', choose from 'Low', 'Moderate', or 'High'.
    For 'factors', explain why the premium is what it is (e.g., 'New car safety features', 'Young driver risk', 'High property value').
    Currency should be in USD.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            packages: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: "e.g., Basic Liability, Comprehensive Gold" },
                  monthlyPremium: { type: Type.NUMBER },
                  coverageLimit: { type: Type.STRING, description: "e.g., $50,000 / $100,000" },
                  deductible: { type: Type.STRING, description: "e.g., $500" },
                  features: { type: Type.ARRAY, items: { type: Type.STRING } },
                  recommendationScore: { type: Type.NUMBER, description: "0 to 100 based on fit for user" },
                  aiAnalysis: { type: Type.STRING, description: "Short sentence on why this package fits." }
                },
                required: ["name", "monthlyPremium", "coverageLimit", "deductible", "features", "recommendationScore", "aiAnalysis"]
              }
            },
            analysis: {
              type: Type.OBJECT,
              properties: {
                riskLevel: { type: Type.STRING, enum: ["Low", "Moderate", "High"] },
                score: { type: Type.NUMBER, description: "0-100 safety score" },
                factors: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      impact: { type: Type.STRING, enum: ["Positive", "Negative"] },
                      description: { type: Type.STRING }
                    },
                    required: ["name", "impact", "description"]
                  }
                }
              },
              required: ["riskLevel", "score", "factors"]
            }
          },
          required: ["packages", "analysis"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");
    
    return JSON.parse(text) as QuoteResult;

  } catch (error) {
    console.error("Gemini Quote Generation Error:", error);
    throw error;
  }
};
