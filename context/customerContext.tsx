"use client"

import {
    createContext,
    useContext,
    useState,
    ReactNode,
} from "react";

import { Customer } from "@/types/customer";


type CustomerContextType = {
    customers: Customer[];
    setCustomers: (customers: Customer[]) => void;
    clearCustomers: () => void;
};


const CustomerContext = createContext<CustomerContextType | null>(null);


export const CustomerProvider = ({children,}: {children: ReactNode;}) => {
    
    const [customers, setCustomers] = useState<Customer[]>([]);


    const clearCustomers = () => setCustomers([]);


    return (
        
        <CustomerContext.Provider
            value={{
                customers,
                setCustomers,
                clearCustomers
            }}
        >
            {children}
        </CustomerContext.Provider>
    );
};


export const useCustomers = () => {

    const context = useContext(CustomerContext);

    if (!context) {
        throw new Error("useCustomers must be used within CustomerProvider");
    }
    
    return context;
};