import Case from "../models/Case.js";
import { generateVerdictText } from "../utils/ai.js";

export async function createCase(req, res) {
    try {
        const c = new Case();
        await c.save();
        return res.json(c);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Failed to create case" });
    }
}

export async function getCase(req, res) {
    try {
        const { id } = req.params;
        const c = await Case.findById(id);
        if (!c) return res.status(404).json({ message: "Case not found" });
        res.json(c);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Failed to fetch case" });
    }
}

export async function postArgument(req, res) {
    try {
        const { caseId, side, text } = req.body;
        if (!text) return res.status(400).json({ message: "Empty text" });
        const c = await Case.findById(caseId);
        if (!c) return res.status(404).json({ message: "Case not found" });

        if (side === "A") c.argumentsA.push({ text });
        else c.argumentsB.push({ text });

        await c.save();
        res.json(c);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Failed to save argument" });
    }
}

export async function generateVerdict(req, res) {
    try {
        const { caseId } = req.body;
        const c = await Case.findById(caseId);
        if (!c) return res.status(404).json({ message: "Case not found" });

        // Combine evidence text
        const sideAEvidence = c.sideAUploads.map(f => f.text || "").join("\n\n");
        const sideBEvidence = c.sideBUploads.map(f => f.text || "").join("\n\n");

        const text = await generateVerdictText({
            sideAEvidence,
            sideBEvidence,
            argumentsA: c.argumentsA,
            argumentsB: c.argumentsB
        });

        c.verdicts.push({ text });
        await c.save();

        res.json({ verdict: text, case: c });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Failed to generate verdict", error: e.message });
    }
}

export async function postFollowup(req, res) {
    try {
        const { caseId } = req.body;
        const c = await Case.findById(caseId);
        if (!c) return res.status(404).json({ message: "Case not found" });

        if (c.followUpCount >= 5) {
            return res.status(400).json({ message: "Follow-up limit reached (5)" });
        }

        // Re-run verdict with updated arguments/evidence
        const sideAEvidence = c.sideAUploads.map(f => f.text || "").join("\n\n");
        const sideBEvidence = c.sideBUploads.map(f => f.text || "").join("\n\n");

        const text = await generateVerdictText({
            sideAEvidence,
            sideBEvidence,
            argumentsA: c.argumentsA,
            argumentsB: c.argumentsB
        });

        c.verdicts.push({ text });
        c.followUpCount += 1;
        await c.save();

        res.json({ verdict: text, case: c });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Failed followup", error: e.message });
    }
}
