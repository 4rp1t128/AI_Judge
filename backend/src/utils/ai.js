import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

// Load API key
const key = process.env.GEMINI_API_KEY;

// Create client once
let client = null;

export function getAIClient() {
    if (client) return client;

    if (!key) {
        console.warn("❌ GEMINI_API_KEY not set. AI calls will fail.");
        return null;
    }

    client = new GoogleGenerativeAI(key);
    return client;
}

// ========== AI Verdict Generator ==========
export async function generateVerdictText({
    sideAEvidence,
    sideBEvidence,
    argumentsA,
    argumentsB
}) {
    const ai = getAIClient();
    if (!ai) {
        return `AI key not found. Provide GEMINI_API_KEY to get a real verdict.`;
    }

    // Construct the prompt
    const prompt = `
You are an impartial legal mock judge. Read the evidence and arguments and provide a concise verdict.
Include:
- Winner (Side A / Side B / Draw)
- Short justification
- One-paragraph summary

Side A Evidence:
${sideAEvidence || "None"}

Side B Evidence:
${sideBEvidence || "None"}

Arguments Side A:
${(argumentsA || []).map(a => "- " + a.text).join("\n") || "None"}

Arguments Side B:
${(argumentsB || []).map(b => "- " + b.text).join("\n") || "None"}

Answer in plain text (one paragraph).
`;

    try {
        // Primary fast model
        const model = ai.getGenerativeModel({
            model: "gemini-2.5-flash"
        });

        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (err) {
        console.log("⚠️ gemini-2.5-flash overloaded → using gemini-2.5-flash-lite fallback");

        // Fallback model
        const fallback = ai.getGenerativeModel({
            model: "gemini-2.5-flash-lite"
        });

        const result2 = await fallback.generateContent(prompt);
        return result2.response.text();
    }
}
