"use client"

import { createContext, useContext, useState, ReactNode } from "react";
import GenericToast from "@/app/components/generic/genericToast";

import { UI_TOAST_TIMEOUT } from "@/config/app";

type ToastType = "success" | "error" | "info";


type ToastMessage = {
    id: number;
    message: string;
    type: ToastType;
};


type ToastContextType = {
    showToast: (message: string, type?: ToastType) => void;
};


const ToastContext = createContext<ToastContextType | undefined>(undefined);


export function ToastProvider({ children }: { children: ReactNode}) {
    
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const showToast = (message: string, type?: ToastType = "info") => {
        const id = Date.now();

        setToasts((prev) => [...prev, {id, message, type}]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, UI_TOAST_TIMEOUT);
    };


    return (
        
        <ToastContext.Provider value={{ showToast }}>
            {children}

            <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
                {toasts.map((toast) => (
                    <GenericToast
                        key={toast.id} {...toast}
                    />
                ))}
            </div>
        </ToastContext.Provider>
    );
}


export function useToast() {
    
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error("useToast must be used within ToastProvider");
    }

    return context;
}