// backend/agents/sanctionAgent.js
import { generateSanctionPDF } from "../utils/generatePDF.js";

export async function sanctionAgent({ name, amount, interest, tenure, refId }) {
  // Ensure reasonable defaults & caps
  const safeAmount = Math.max(5000, Math.min(1_000_000, Number(amount || 50000)));
  const safeInterest = Math.max(8.0, Math.min(24.0, Number(interest || 12.0)));
  const safeTenure = tenure || "12 months";

  const filename = await generateSanctionPDF({
    name,
    amount: safeAmount,
    interest: safeInterest,
    tenure: safeTenure,
    refId
  });

  return { filename, refId, amount: safeAmount, interest: safeInterest, tenure: safeTenure };
}
