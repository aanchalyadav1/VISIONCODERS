// backend/routes/api.js
import express from "express";
import multer from "multer";
import path from "path";
import { masterChat } from "../masterAgent.js";
import { generateSanctionPDF } from "../utils/generatePDF.js";
import { uploadFileToFirebase } from "../utils/storage.js";
import { readDB, writeDB } from "../utils/storage.js";

const router = express.Router();

const upload = multer({
  dest: path.join(process.cwd(), "uploads")
});

router.post("/chat", async (req, res) => {
  try {
    const { message, sessionId, user } = req.body;
    const result = await masterChat({ message, sessionId, user });
    return res.json(result);
  } catch (err) {
    console.error("chat error", err);
    return res.status(500).json({ error: "server_error", details: String(err) });
  }
});

// upload-salary unchanged
// sanction: changed to return download link instead of immediate download (useful for CORS)
router.post("/sanction", async (req, res) => {
  try {
    const { name, amount, interest, tenure, refId } = req.body;
    const filePath = await generateSanctionPDF({ name, amount, interest, tenure, refId });
    // return file path for frontend to download via URL or fetch
    return res.json({ ok: true, path: filePath, filename: path.basename(filePath) });
  } catch (err) {
    console.error("sanction error", err);
    return res.status(500).json({ error: "pdf_error", details: String(err) });
  }
});

router.post("/upload-salary", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file" });
    const localPath = req.file.path;
    const destName = `salary_slips/${Date.now()}_${req.file.originalname}`;
    const publicUrl = await uploadFileToFirebase(localPath, destName);
    const db = await readDB();
    db.uploads = db.uploads || [];
    db.uploads.push({ originalname: req.file.originalname, path: destName, url: publicUrl, ts: Date.now() });
    await writeDB(db);
    return res.json({ status: "uploaded", url: publicUrl });
  } catch (err) {
    console.error("upload error", err);
    return res.status(500).json({ error: "upload_failed", details: String(err) });
  }
});

router.get("/admin/stats", async (req, res) => {
  try {
    const db = await readDB();
    const sessionsCount = db.sessions ? Object.keys(db.sessions).length : 0;
    return res.json({ sessions: sessionsCount, uploads: (db.uploads||[]).length });
  } catch (err) {
    return res.status(500).json({ error: "stats_error", details: String(err) });
  }
});

export default router;
