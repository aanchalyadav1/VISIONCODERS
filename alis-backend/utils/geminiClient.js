// backend/utils/geminiClient.js
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const GOOGLE_KEY = process.env.GOOGLE_API_KEY; // from Google Cloud / Generative AI API

export async function callGemini(prompt) {
  if (!GOOGLE_KEY) {
    throw new Error("GOOGLE_API_KEY missing in backend environment!");
  }

  const url = `https://generativelanguage.googleapis.com/v1beta2/models/gemini-1.5-flash:generateText?key=${GOOGLE_KEY}`;

  const payload = {
    temperature: 0.2,
    maxOutputTokens: 400,
    prompt: {
      text: prompt
    }
  };

  try {
    const r = await axios.post(url, payload, {
      headers: { "Content-Type": "application/json" },
      timeout: 30_000
    });
    // response structure might vary; try to map common shapes:
    if (r.data?.candidates && r.data.candidates[0]?.content) {
      return { text: r.data.candidates[0].content };
    }
    if (r.data?.output?.text) {
      return { text: r.data.output.text };
    }
    return { text: JSON.stringify(r.data).slice(0, 1000) };
  } catch (err) {
    console.error("❌ Gemini API ERROR:", err.response?.data || err.message || err);
    throw err;
  }
}
