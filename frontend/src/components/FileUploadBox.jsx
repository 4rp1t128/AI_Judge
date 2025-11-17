import React, { useRef } from "react";
import axios from "axios";

export default function FileUploadBox({ side, caseId, onUploaded }) {
    const fileRef = useRef();

    async function handleFiles(files) {
        if (!files || files.length === 0) return;
        const form = new FormData();
        for (const f of files) form.append("files", f);
        form.append("side", side);
        if (caseId) form.append("caseId", caseId);

        try {
            const res = await axios.post("http://localhost:5173/api/upload", form, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            onUploaded && onUploaded(res.data.case);
        } catch (e) {
            console.error(e);
            alert("Upload failed");
        }
    }

    return (
        <div className="p-4 border border-dashed rounded bg-white">
            <div className="text-sm text-gray-600 mb-2">Drag & drop PDF/DOCX/TXT here, or <button className="text-blue-600 underline" onClick={() => fileRef.current.click()}>browse</button></div>
            <input ref={fileRef} type="file" className="hidden" multiple onChange={(e) => handleFiles(e.target.files)} />
            <div
                onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
                onDragOver={(e) => e.preventDefault()}
                className="h-24 flex items-center justify-center text-gray-400 border border-gray-200 rounded"
            >
                Drop files here
            </div>
        </div>
    );
}
