import React, { useState } from "react";
import axios from "axios";
import MessageList from "./MessageList";
import { useCase } from "../context/CaseContext";

export default function JudgePanel() {
    const { currentCase, setCurrentCase, setLoading } = useCase();
    const [followText, setFollowText] = useState("");

    async function createNewCase() {
        setLoading(true);
        try {
            const res = await axios.post("http://localhost:5173/api/cases/create");
            setCurrentCase(res.data);
        } catch (e) {
            console.error(e);
            alert("Failed to create case");
        } finally {
            setLoading(false);
        }
    }

    async function generateVerdict() {
        if (!currentCase) { alert("Create a case first"); return; }
        setLoading(true);
        try {
            const res = await axios.post("http://localhost:5173/api/cases/verdict", { caseId: currentCase._id });
            setCurrentCase(res.data.case);
        } catch (e) {
            console.error(e);
            alert("Failed to generate verdict");
        } finally {
            setLoading(false);
        }
    }

    async function sendFollowup() {
        if (!currentCase) return;
        if (currentCase.followUpCount >= 5) { alert("Max follow-ups reached"); return; }
        if (!followText.trim()) return;

        setLoading(true);
        try {
            // We'll append the follow-up as argument from Side A (for demo; UI could let you choose)
            await axios.post("http://localhost:5173/api/cases/argument", {
                caseId: currentCase._id,
                side: "A",
                text: followText
            });
            const res = await axios.post("http://localhost:5173/api/cases/followup", { caseId: currentCase._id });
            setCurrentCase(res.data.case);
            setFollowText("");
        } catch (e) {
            console.error(e);
            alert("Failed follow-up");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-white rounded p-4 panel">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">AI Judge Panel</h2>
                <button onClick={createNewCase} className="bg-green-600 text-white px-3 py-1 rounded">New Case</button>
            </div>

            <div className="mb-4">
                <button onClick={generateVerdict} className="bg-gray-400 text-white px-4 py-2 rounded">Generate Verdict</button>
            </div>

            <MessageList caseDoc={currentCase} />

            <div className="mt-4">
                <textarea value={followText} onChange={(e) => setFollowText(e.target.value)} placeholder="Enter follow-up for the case..." className="w-full h-20 p-3 border rounded mb-2"></textarea>
                <button onClick={sendFollowup} className="w-full bg-purple-600 text-white py-2 rounded">Send Follow-up (Round {currentCase?.followUpCount || 0}/5)</button>
            </div>
        </div>
    );
}
