import { GoogleGenAI } from "@google/genai";

// Removed top-level initialization to ensure process.env is populated
export const generateQuotes = async (userData) => {
  // Initialize inside the function to ensure the vite 'define' values are ready
  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
  
  if (!apiKey || apiKey === 'PLACEHOLDER_API_KEY') {
    throw new Error("Gemini API Key is not set. Please check your .env.local file.");
  }

  const ai = new GoogleGenAI(apiKey);
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
    For 'factors', explain why the premium is what it is.
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
                  name: { type: "string" },
                  monthlyPremium: { type: "number" },
                  coverageLimit: { type: "string" },
                  deductible: { type: "string" },
                  features: { type: "array", items: { type: "string" } },
                  recommendationScore: { type: "number" },
                  aiAnalysis: { type: "string" }
                },
                required: ["name", "monthlyPremium", "coverageLimit", "deductible", "features", "recommendationScore", "aiAnalysis"]
              }
            },
            analysis: {
              type: "object",
              properties: {
                riskLevel: { type: "string", enum: ["Low", "Moderate", "High"] },
                score: { type: "number" },
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
