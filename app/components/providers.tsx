"use client"

import { CustomerProvider } from "@/context/customerContext";
import { DialogProvider } from "@/context/dialogContext";
import { RequestProvider } from "@/context/requestContext";
import { ToastProvider } from "@/context/toastContext";


// Note: Consider replacing CustomerProvider with a general DataProvider as
// the amount of data required by the project grows.
export function Providers({ children }: { children: React.ReactNode }) {
    
    return (
        <CustomerProvider>
            <RequestProvider>
                <ToastProvider>
                    <DialogProvider>
                        {children}
                    </DialogProvider>
                </ToastProvider>
            </RequestProvider>
        </CustomerProvider>
    );
}