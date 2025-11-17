import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db.js";
import uploadRoutes from "./routes/upload.js";
import caseRoutes from "./routes/cases.js";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

await connectDB();

app.use("/api/upload", uploadRoutes);
app.use("/api/cases", caseRoutes);


app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));
