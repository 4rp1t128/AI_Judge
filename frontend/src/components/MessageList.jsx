import React from "react";

export default function MessageList({ caseDoc }) {
    if (!caseDoc) return <div className="p-6 text-gray-500">No case created yet.</div>;

    return (
        <div className="space-y-4 p-4">
            <div>
                <h4 className="font-semibold">Verdicts</h4>
                <div className="space-y-2">
                    {caseDoc.verdicts?.length ? caseDoc.verdicts.map((v, i) => (
                        <div key={i} className="p-3 bg-gray-50 border rounded text-sm">{v.text}</div>
                    )) : <div className="text-gray-400">No verdict yet.</div>}
                </div>
            </div>

            <div>
                <h4 className="font-semibold">Side A Arguments</h4>
                {caseDoc.argumentsA?.length ? caseDoc.argumentsA.map((a, i) => <div key={i} className="p-2 text-sm text-gray-700">{a.text}</div>) : <div className="text-gray-400">None</div>}
            </div>

            <div>
                <h4 className="font-semibold">Side B Arguments</h4>
                {caseDoc.argumentsB?.length ? caseDoc.argumentsB.map((b, i) => <div key={i} className="p-2 text-sm text-gray-700">{b.text}</div>) : <div className="text-gray-400">None</div>}
            </div>
        </div>
    );
}
