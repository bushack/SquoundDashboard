
import { useEffect, useState } from "react";
import { columns } from "./requestColumns";
import { deleteRequest, fetchRequestsMapped } from "@/lib/requests";
import { headingStyle, tabbedCard } from "@/styles/ui";
import { DialogProvider, useDialog } from "@/context/dialogContext";
import { ToastProvider, useToast } from "@/context/toastContext";

import GenericTable from "../../components/generic/genericTable";

import type { Customer } from "@/types/customer";

import { MESSAGES } from "@/constants/messages";


type Properties = {
    customer: Customer;
}


export default function RequestTable({
    customer
}: Properties) {

    // Data.
    const [requests, setRequests] = useState<Request[]>([]);

    // User interface.
    const { showDialog } = useDialog();
    const { showToast } = useToast();
    
    
    const loadRequests = async (id: number) => {
        
        const result = await fetchRequestsMapped(id);
    
        if (result) {
            setRequests(result || []);
            console.log("Successfully fetched request data");
        }
    };


    const handleDelete = async (id: number) => {

        if (!customer) {
            return;
        }
    
        showDialog({
            title: MESSAGES.DELETE_REQUEST_TITLE,
            message: MESSAGES.DELETE_REQUEST_MSG,
            onConfirm: async () => {
                try {
                    const { error } = await deleteRequest(id);

                    if (error) {
                        console.error(MESSAGES.ERROR_GENERIC_MSG, error);
                        showToast(MESSAGES.ERROR_GENERIC_MSG, "error");
                    } else {
                        console.log(MESSAGES.DELETE_REQUEST_SUCCESS);
                        showToast(MESSAGES.DELETE_REQUEST_SUCCESS, "success");
                        loadRequests(customer.id);
                    }
                } catch {
                    console.error(MESSAGES.DELETE_REQUEST_ERROR, error);
                    showToast(MESSAGES.DELETE_REQUEST_ERROR, "error");
                }
            },
        });
    };


    useEffect(() => {
        
        if (!customer) {
            console.error("No customer");
            return;
        }

        loadRequests(customer.id);
    });
      

    return (
        
        <div style={tabbedCard}>
            <h1 style={headingStyle}>Existing Requests</h1>
            <GenericTable
                data={requests}
                columns={columns}
                getRowKey={(r) => r.id}
                onRowClick={(r) => null}  // TODO: Open new tab?
            />
        </div>
    );
}