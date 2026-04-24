"use client"

import { DialogProvider } from "@/context/dialogContext";


export function Providers({ children }: { children: React.ReactNode }) {
    return <DialogProvider>{children}</DialogProvider>;
}