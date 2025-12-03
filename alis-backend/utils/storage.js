import fs from "fs";
import path from "path";
import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
  });
}
const bucket = admin.storage().bucket();

const DB_FILE = path.join(process.cwd(), "backend", "db", "db.json");

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

export async function writeDB(obj) {
  fs.writeFileSync(DB_FILE, JSON.stringify(obj, null, 2));
  return obj;
}

export async function uploadFileToFirebase(localPath, destName) {
  await bucket.upload(localPath, { destination: destName, metadata: { cacheControl: "public, max-age=31536000" }});
  const file = bucket.file(destName);
  await file.makePublic();
  return `https://storage.googleapis.com/${bucket.name}/${destName}`;
}
