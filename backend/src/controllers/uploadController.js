import path from "path";
import fs from "fs/promises";
import Case from "../models/Case.js";
import { extractTextFromFile } from "../utils/parseFile.js";

export async function uploadFiles(req, res) {
    try {
        const { caseId, side } = req.body;
        if (!req.files || !req.files.length) return res.status(400).json({ message: "No files" });
        let caseDoc = null;

        if (caseId) {
            caseDoc = await Case.findById(caseId);
            if (!caseDoc) return res.status(404).json({ message: "Case not found" });
        } else {
            caseDoc = new Case();
        }

        for (const f of req.files) {
            const fp = f.path;
            const text = await extractTextFromFile(fp, f.mimetype, f.originalname);
            const meta = { filename: f.filename, originalName: f.originalname, text };

            if (side === "A") caseDoc.sideAUploads.push(meta);
            else caseDoc.sideBUploads.push(meta);
        }

        await caseDoc.save();
        return res.json({ message: "uploaded", case: caseDoc });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Upload failed", error: e.message });
    }
}
