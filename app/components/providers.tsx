"use client"

import { DialogProvider } from "@/context/dialogContext";
import { ToastProvider } from "@/context/toastContext";


export function Providers({ children }: { children: React.ReactNode }) {
    
    return (
        <ToastProvider>
            <DialogProvider>
                {children}
            </DialogProvider>
        </ToastProvider>
    );
}