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
      "https://api.groq.com/v1/chat/completions",     // ✔️ correct endpoint
      {
        model: "llama-3.1-70b-versatile",             // ✔️ correct model
        messages,
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (err) {
    console.error("❌ GROQ API ERROR:", err.response?.data || err);
    throw err;
  }
}
