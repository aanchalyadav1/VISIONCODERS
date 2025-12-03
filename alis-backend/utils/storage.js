import fs from "fs";
import path from "path";
import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),

    // ✅ FIXED: MUST use *.appspot.com bucket
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
  });
}

const bucket = admin.storage().bucket();

// ✅ FIXED: Correct DB path (removed wrong "backend" folder)
const DB_FILE = path.join(process.cwd(), "db", "db.json");

// READ DATABASE
export async function readDB() {
  try {
    const raw = fs.readFileSync(DB_FILE, "utf8");
    return JSON.parse(raw);
  } catch (e) {
    const init = { sessions: {}, uploads: [] };
    fs.writeFileSync(DB_FILE, JSON.stringify(init, null, 2));
    return init;
  }
}

// WRITE DATABASE
export async function writeDB(obj) {
  fs.writeFileSync(DB_FILE, JSON.stringify(obj, null, 2));
  return obj;
}

// UPLOAD TO FIREBASE STORAGE
export async function uploadFileToFirebase(localPath, destName) {
  await bucket.upload(localPath, {
    destination: destName,
    metadata: { cacheControl: "public, max-age=31536000" }
  });

  const file = bucket.file(destName);
  await file.makePublic();

  return `https://storage.googleapis.com/${bucket.name}/${destName}`;
}
