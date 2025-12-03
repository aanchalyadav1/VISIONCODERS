export async function underwritingAgent({ salaryText }) {
  const num = (salaryText || "").match(/\d[\d,]*/);
  const salary = num ? Number(num[0].replace(/,/g, "")) : 50000;
  const score = Math.min(850, Math.round(600 + Math.min(200, salary / 1000)));
  const risk = score > 700 ? "LOW" : score > 650 ? "MEDIUM" : "HIGH";
  return { creditScore: score, risk, salary };
}
