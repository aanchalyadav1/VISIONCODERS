import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function generateSanctionPDF({ name, amount, interest, tenure, refId }) {
  const outPath = path.join(process.cwd(), "backend", `sanction_${refId}.pdf`);
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const stream = fs.createWriteStream(outPath);
    doc.pipe(stream);

    try {
      const logo = path.join(__dirname, "../assets/logo.png");
      if (fs.existsSync(logo)) doc.image(logo, 50, 40, { width: 80 });
    } catch (e) {}

    doc.fontSize(18).text("Agentic Loan Intelligence System (ALIS)", 150, 60, { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text("Sanction Letter", { align: "center" });
    doc.moveDown(2);

    doc.fontSize(12).text(`Reference ID: ${refId}`);
    doc.moveDown();
    doc.text(`Applicant Name: ${name}`);
    doc.text(`Sanctioned Amount: ₹${amount}`);
    doc.text(`Interest Rate: ${interest}%`);
    doc.text(`Tenure: ${tenure}`);
    doc.moveDown();
    doc.text("This sanction letter has been auto-generated for demonstration purposes and does not represent a real sanction.");
    doc.moveDown(3);
    doc.text("Regards,");
    doc.text("VisionCoders - ALIS Team");

    doc.end();
    stream.on("finish", () => resolve(outPath));
    stream.on("error", reject);
  });
}
