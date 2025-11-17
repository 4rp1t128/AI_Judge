import React, { useState } from "react";
import FileUploadBox from "./FileUploadBox";
import axios from "axios";
import { useCase } from "../context/CaseContext";

export default function SidePanel({ side }) {
    const { currentCase, setCurrentCase, setLoading } = useCase();
    const [text, setText] = useState("");

    async function sendArgument() {
        if (!currentCase) {
            alert("Create a case first");
            return;
        }
        if (!text.trim()) return;
        setLoading(true);
        try {
            const res = await axios.post("http://localhost:5173/api/cases/argument", {
                caseId: currentCase._id,
                side,
                text
            });
            setCurrentCase(res.data);
            setText("");
        } catch (e) {
            console.error(e);
            alert("Failed to send");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-white rounded p-4 panel">
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Side {side}</h3>
                <span className="px-2 py-1 text-xs bg-gray-100 rounded">Active</span>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Document</label>
                <FileUploadBox side={side} caseId={currentCase?._id} onUploaded={(c) => setCurrentCase(c)} />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Uploaded Files:</label>
                <div className="text-sm text-gray-500">
                    {(side === "A" ? currentCase?.sideAUploads : currentCase?.sideBUploads)?.length ?
                        (side === "A" ? currentCase.sideAUploads : currentCase.sideBUploads).map((f, idx) => (
                            <div key={idx} className="text-sm text-gray-700">{f.originalName}</div>
                        )) : <div className="text-gray-400">No files uploaded.</div>
                    }
                </div>
            </div>

            <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={`Enter arguments or messages for Side ${side}...`} className="w-full h-32 p-3 border rounded mb-3"></textarea>

            <button onClick={sendArgument} className="w-full bg-blue-600 text-white py-2 rounded">Send Message</button>
        </div>
    );
}
