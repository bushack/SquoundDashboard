"use client"

import { createContext, useContext, useState, ReactNode } from "react";
import { genericDialog } from "@/app/components/genericDialog";


type DialogOptions = {
    title?: string;
    message: string;
    onConfirm?: () => void;
};


type DialogContextType = {
    showDialog: (options: DialogOptions) => void;
    closeDialog: () => void;
};


const DialogContext = createContext<DialogContextType | undefined>(undefined);


export function DialogProvider({ children }: { children: ReactNode }) {

    const [dialog, setDialog] = useState<DialogOptions | null>(null);


    const showDialog = (options: DialogOptions) => {
        setDialog(options);
    };


    const closeDialog = () => {
        setDialog(null);
    };
    

    return (
        
        <DialogContext.Provider value={{showDialog, closeDialog}}>
            {children}

            <genericDialog
                isOpen={!!dialog}
                title={dialog?.title}
                message={dialog?.message || ""}
                onClose={closeDialog}
                omCancel={closeDialog}
                onConfirm={() => {dialog?.onConfirm?.(); closeDialog();
                }}
            />
        </DialogContext.Provider>
    );
}


export function useDialog() {
    
    const context = useContext(DialogContext);

    if (!context) {
        throw new Error("useDialog must be used within DialogProvider");
    }

    return context;
}