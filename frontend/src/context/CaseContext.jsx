import React, { createContext, useState, useContext } from "react";

const CaseContext = createContext();

export function useCase() {
    return useContext(CaseContext);
}

export function CaseProvider({ children }) {
    const [currentCase, setCurrentCase] = useState(null);
    const [loading, setLoading] = useState(false);

    return (
        <CaseContext.Provider value={{ currentCase, setCurrentCase, loading, setLoading }}>
            {children}
        </CaseContext.Provider>
    );
}
