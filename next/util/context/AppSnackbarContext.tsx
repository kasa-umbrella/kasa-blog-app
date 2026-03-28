"use client";

import { createContext, useContext, useState } from "react";

type SnackbarContextType = {
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
    errorMessage: string | null;
    setErrorMessage: (message: string | null) => void;
    successMessage: string | null;
    setSuccessMessage: (message: string | null) => void;
};

const SnackbarContext = createContext<SnackbarContextType | null>(null);

export const AppSnackbarProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    return (
        <SnackbarContext.Provider value={{ isLoading, setIsLoading, errorMessage, setErrorMessage, successMessage, setSuccessMessage }}>
            {children}
        </SnackbarContext.Provider>
    );
};

export const useSnackbar = (): SnackbarContextType => {
    const ctx = useContext(SnackbarContext);
    if (!ctx) throw new Error("useSnackbar must be used within AppSnackbarProvider");
    return ctx;
};
