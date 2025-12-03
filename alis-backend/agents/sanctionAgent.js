import { generateSanctionPDF } from "../utils/generatePDF.js";

export async function sanctionAgent({ name, amount, interest, tenure, refId }) {
  const filename = await generateSanctionPDF({ name, amount, interest, tenure, refId });
  return { filename, refId };
}
