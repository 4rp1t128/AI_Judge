import React from "react";
import { CaseProvider, useCase } from "./context/CaseContext";
import SidePanel from "./components/SidePanel";
import JudgePanel from "./components/JudgePanel";
import LoadingToast from "./components/LoadingToast";

function Layout() {
    const { loading } = useCase();

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-[1200px] mx-auto grid grid-cols-3 gap-6">
                <SidePanel side="A" />
                <JudgePanel />
                <SidePanel side="B" />
            </div>
            <LoadingToast loading={loading} />
        </div>
    );
}

export default function App() {
    return (
        <CaseProvider>
            <Layout />
        </CaseProvider>
    );
}
