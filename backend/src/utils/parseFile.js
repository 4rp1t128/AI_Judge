import fs from "fs/promises";
import path from "path";
import pdf from "pdf-parse";
import mammoth from "mammoth";

export async function extractTextFromFile(filePath, mimetype, originalName) {
    const ext = path.extname(originalName || filePath).toLowerCase();

    if (ext === ".pdf" || mimetype === "application/pdf") {
        const data = await fs.readFile(filePath);
        const res = await pdf(data);
        return res.text || "";
    }

    if (ext === ".docx" || mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        const result = await mammoth.extractRawText({ path: filePath });
        return result.value || "";
    }

    // fallback, try text
    try {
        const text = await fs.readFile(filePath, "utf8");
        return text;
    } catch (e) {
        return "";
    }
}
