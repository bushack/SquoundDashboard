"use client"

import {
    createContext,
    useContext,
    useState,
    ReactNode,
} from "react";

import { Request } from "@/types/request";


type RequestContextType = {
    requests: Request[];
    setRequests: (requests: Request[]) => void;
    clearRequests: () => void;
};


const RequestContext = createContext<RequestContextType | null>(null);


export const RequestProvider = ({children,}: {children: ReactNode;}) => {
    
    const [requests, setRequests] = useState<Request[]>([]);


    const clearRequests = () => setRequests([]);


    return (
        
        <RequestContext.Provider
            value={{
                requests,
                setRequests,
                clearRequests
            }}
        >
            {children}
        </RequestContext.Provider>
    );
};


export const useRequests = () => {

    const context = useContext(RequestContext);

    if (!context) {
        throw new Error("useRequests must be used within RequestProvider");
    }
    
    return context;
};