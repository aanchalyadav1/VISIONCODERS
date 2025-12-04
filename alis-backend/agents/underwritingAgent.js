// backend/agents/underwritingAgent.js
export async function underwritingAgent({ salaryText }) {
  // parse numbers robustly
  const num = (salaryText || "").match(/\d[\d,]*/);
  const salary = num ? Number(num[0].replace(/,/g, "")) : 30000;

  // realistic score mapping for India
  // base score 300-900 simulated from salary & heuristics
  let score = Math.round(350 + Math.min(550, Math.floor(salary / 1000) * 2));
  score = Math.max(300, Math.min(900, score));

  const risk = score >= 750 ? "LOW" : score >= 650 ? "MEDIUM" : "HIGH";

  // simple affordability: allow loans up to 8x monthly salary (conservative)
  const monthlySalary = salary / 12;
  const maxLoan = Math.round(monthlySalary * 8 * 12); // yearly multiple -> convert to amount
  const minLoan = 5000;

  return {
    creditScore: score,
    risk,
    salary,
    suggestedLoanRange: { min: minLoan, max: Math.max(minLoan, Math.min(maxLoan, 1_000_000)) } // capped to 10L default
  };
}
