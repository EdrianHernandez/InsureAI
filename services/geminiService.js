import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateQuotes = async (userData) => {
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
          type: "object",
          properties: {
            packages: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string", description: "e.g., Basic Liability, Comprehensive Gold" },
                  monthlyPremium: { type: "number" },
                  coverageLimit: { type: "string", description: "e.g., $50,000 / $100,000" },
                  deductible: { type: "string", description: "e.g., $500" },
                  features: { type: "array", items: { type: "string" } },
                  recommendationScore: { type: "number", description: "0 to 100 based on fit for user" },
                  aiAnalysis: { type: "string", description: "Short sentence on why this package fits." }
                },
                required: ["name", "monthlyPremium", "coverageLimit", "deductible", "features", "recommendationScore", "aiAnalysis"]
              }
            },
            analysis: {
              type: "object",
              properties: {
                riskLevel: { type: "string", enum: ["Low", "Moderate", "High"] },
                score: { type: "number", description: "0-100 safety score" },
                factors: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      name: { type: "string" },
                      impact: { type: "string", enum: ["Positive", "Negative"] },
                      description: { type: "string" }
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
    
    return JSON.parse(text);

  } catch (error) {
    console.error("Gemini Quote Generation Error:", error);
    throw error;
  }
};
