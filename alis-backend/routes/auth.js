import express from "express";
import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
  });
}

router.post("/verify", async (req, res) => {
  const { idToken } = req.body;
  if (!idToken) return res.status(400).json({ error: "idToken required" });

  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    const userRecord = await admin.auth().getUser(decoded.uid);
    return res.json({ ok: true, uid: decoded.uid, email: decoded.email, name: userRecord.displayName || userRecord.email });
  } catch (err) {
    console.error("auth verify error", err);
    return res.status(401).json({ error: "Invalid token", details: String(err) });
  }
});

export default router;
