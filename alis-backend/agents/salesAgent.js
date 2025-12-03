export async function salesAgent({ user } = {}) {
  const base = 300000;
  const offers = [
    { plan: "Standard", amount: Math.round(base * 0.9), interest: 12, tenure: 36 },
    { plan: "Preferred", amount: base, interest: 11.5, tenure: 36 },
    { plan: "Premium", amount: Math.round(base * 1.2), interest: 10.5, tenure: 48 }
  ];
  offers.forEach(o => {
    const r = o.interest / 1200;
    const n = o.tenure;
    o.emi = Math.round((o.amount * r) / (1 - Math.pow(1 + r, -n)));
  });
  return { message: `Pre-approved offers for ${user?.name || ""}`, offers };
}
