// backend/masterAgent.js
import { v4 as uuidv4 } from "uuid";
import { callGroq } from "./utils/groqClient.js";
import { callGemini } from "./utils/geminiClient.js";
import { verifyAgent } from "./agents/verifyAgent.js";
import { underwritingAgent } from "./agents/underwritingAgent.js";
import { salesAgent } from "./agents/salesAgent.js";
import { sanctionAgent } from "./agents/sanctionAgent.js";
import { readDB, writeDB } from "./utils/storage.js";

export async function masterChat({ message = "", sessionId = null, user = { name: "Guest" } }) {
  const db = await readDB();
  if (!sessionId) {
    sessionId = uuidv4();
    db.sessions = db.sessions || {};
    db.sessions[sessionId] = { user, history: [] };
    await writeDB(db);
  }
  if (!db.sessions) db.sessions = {};
  if (!db.sessions[sessionId]) db.sessions[sessionId] = { user, history: [] };

  db.sessions[sessionId].history.push({ role: "user", text: message, ts: Date.now() });
  await writeDB(db);

  const low = (message || "").toLowerCase();

  // routing to agents
  if (low.includes("pan") || low.includes("verify")) {
    const r = await verifyAgent(message);
    db.sessions[sessionId].history.push({ role: "verify", result: r, ts: Date.now() });
    await writeDB(db);
    return { sessionId, agent: "VerificationAgent", result: r };
  }

  if (low.includes("salary") || low.includes("income") || low.includes("salary slip")) {
    const r = await underwritingAgent({ salaryText: message });
    db.sessions[sessionId].history.push({ role: "underwrite", result: r, ts: Date.now() });
    await writeDB(db);
    return { sessionId, agent: "UnderwritingAgent", result: r };
  }

  if (low.includes("loan") || low.includes("eligible") || low.includes("apply")) {
    const r = await salesAgent({ user });
    db.sessions[sessionId].history.push({ role: "sales", result: r, ts: Date.now() });
    await writeDB(db);
    return { sessionId, agent: "SalesAgent", result: r };
  }

  if (low.includes("sanction") || low.includes("pdf") || low.includes("download")) {
    const refId = `ALIS${Date.now()}`;
    const r = await sanctionAgent({ name: user.name || "Applicant", amount: 300000, interest: 11.5, tenure: "36 months", refId });
    db.sessions[sessionId].history.push({ role: "sanction", result: r, ts: Date.now() });
    await writeDB(db);
    return { sessionId, agent: "SanctionAgent", pdfInfo: r };
  }

  // Default: call primary LLM then fallback to Gemini then to canned reply
  const prompt = [{ role: "user", content: `You are ALIS - helpful loan assistant. Answer: ${message}` }];

  try {
    const groqResp = await callGroq(prompt);
    // groq normal response mapping
    const text = groqResp?.choices?.[0]?.message?.content || groqResp?.choices?.[0]?.text || groqResp?.result?.content || null;
    if (text) {
      db.sessions[sessionId].history.push({ role: "master", reply: text, ts: Date.now() });
      await writeDB(db);
      return { sessionId, agent: "MasterAgent(Groq)", reply: text };
    }
    throw new Error("No text from groq");
  } catch (gerr) {
    console.warn("GROQ failed, falling back to Gemini", gerr?.message || gerr);
    try {
      const gemResp = await callGemini(`You are ALIS - helpful loan assistant. Answer: ${message}`);
      const text = gemResp?.text || "Sorry, temporarily unavailable.";
      db.sessions[sessionId].history.push({ role: "master", reply: text, ts: Date.now() });
      await writeDB(db);
      return { sessionId, agent: "MasterAgent(Gemini)", reply: text };
    } catch (g2) {
      console.error("Both LLMs failed", g2);
      const fallback = "Service temporarily unavailable. Try again later or ask a simpler question.";
      db.sessions[sessionId].history.push({ role: "master", reply: fallback, ts: Date.now() });
      await writeDB(db);
      return { sessionId, agent: "MasterAgent", reply: fallback };
    }
  }
}
