import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const GROQ_KEY = process.env.GROQ_API_KEY || "";

export async function callGroq(messages) {
  if (!GROQ_KEY) throw new Error("GROQ_API_KEY not set");

  // ✅ Correct Groq endpoint
  const url = "https://api.groq.com/openai/v1/chat/completions";

  const payload = {
    model: "llama-3.1-70b-versatile",
    messages
  };

  const resp = await axios.post(url, payload, {
    headers: {
      Authorization: `Bearer ${GROQ_KEY}`,
      "Content-Type": "application/json"
    }
  });

  return resp.data;
}
