import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const GROQ_KEY = process.env.GROQ_API_KEY;

export async function callGroq(messages) {
  if (!GROQ_KEY) {
    throw new Error("❌ GROQ_API_KEY missing in backend environment!");
  }

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-70b-versatile",
        messages,
        temperature: 0.2,       // ⭐ REQUIRED — without this Groq returns 400
        max_tokens: 300,        // ⭐ prevents extra-long responses
        stream: false
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_KEY}`,
          "Content-Type": "application/json",
        }
      }
    );

    return response.data;
  } catch (err) {
    console.error("❌ GROQ API ERROR:", err.response?.data || err);
    return { error: "groq_failed", info: err.response?.data || err };
  }
}
