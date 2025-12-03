import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import apiRouter from "./routes/api.js";
import authRouter from "./routes/auth.js";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({ origin: "*" })); // Change origin in production
app.use(bodyParser.json({ limit: "5mb" }));
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.use("/auth", authRouter); // /auth/verify
app.use("/api", apiRouter);   // /api/chat, /api/upload-salary, /api/sanction, /api/admin/stats

app.get("/health", (req, res) => res.json({ status: "ok" }));

// ensure folders exist
if (!fs.existsSync(path.join(__dirname, "db"))) fs.mkdirSync(path.join(__dirname, "db"), { recursive: true });
if (!fs.existsSync(path.join(__dirname, "uploads"))) fs.mkdirSync(path.join(__dirname, "uploads"), { recursive: true });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`ALIS backend listening on port ${PORT}`);
});
