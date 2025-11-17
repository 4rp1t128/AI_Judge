import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { uploadFiles } from "../controllers/uploadController.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, "../../uploads");
await import("fs").then(fs => fs.mkdirSync(uploadsDir, { recursive: true }));

const storage = multer.diskStorage({
    destination: function (req, file, cb) { cb(null, uploadsDir); },
    filename: function (req, file, cb) {
        const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, unique + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

router.post("/", upload.array("files"), uploadFiles);

export default router;
