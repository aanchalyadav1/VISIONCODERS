// backend/utils/groqClient.js
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const GROQ_KEY = process.env.GROQ_API_KEY;

export async function callGroq(messages) {
  if (!GROQ_KEY) {
    throw new Error("GROQ_API_KEY missing in backend environment!");
  }

  try {
    const url = "https://api.groq.com/openai/v1/chat/completions"; // correct openai-like endpoint for Groq wrappers
    const payload = {
      model: "llama-3.1-8b-instant", // <-- free + fast model for production-friendly usage
      messages,
      temperature: 0.2,
      max_tokens: 400,
      stream: false
    };

    const resp = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${GROQ_KEY}`,
        "Content-Type": "application/json"
      },
      timeout: 30_000
    });

    return resp.data;
  } catch (err) {
    console.error("❌ GROQ API ERROR:", err.response?.data || err.message || err);
    // normalize error to throw so caller can fall back
    throw err;
  }
}
