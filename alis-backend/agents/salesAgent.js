// backend/agents/salesAgent.js
export async function salesAgent({ user }) {
  // simple deterministic sample offers
  // In real product, use user's credit, salary etc. For now read DB in masterAgent before calling.
  const offers = [
    { plan: "Micro", amount: 5000, interest: 18.0, tenureMonths: 6, emi: Math.round((5000 * (1 + 0.18)) / 6) },
    { plan: "Personal-Small", amount: 25000, interest: 16.0, tenureMonths: 12, emi: Math.round((25000 * (1 + 0.16)) / 12) },
    { plan: "Personal-Medium", amount: 150000, interest: 14.0, tenureMonths: 36, emi: Math.round((150000 * (1 + 0.14)) / 36) }
  ];

  return { offers };
}
