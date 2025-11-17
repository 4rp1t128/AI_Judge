import React from "react";

export default function LoadingToast({ loading }) {
    if (!loading) return null;
    return (
        <div className="fixed right-4 bottom-4 bg-black text-white px-4 py-2 rounded shadow">Loading...</div>
    );
}
