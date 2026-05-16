
import { useEffect, useState } from "react";
import { simpleRequestColumns } from "./requestColumns";
import { headingStyle, tabbedCard } from "@/styles/ui";
import { deleteRequestSafe, fetchRequestsByCustomerSafe } from "@/repositories/requestRepository";
import { mapToSimpleRequests } from "@/mappers/requestMapper";
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
    const {showDialog} = useDialog();
    const {showToast} = useToast();
    const [loading, setLoading] = useState<boolean>(false);
    
    
    const loadRequests = async (id: number) => {
        
        setLoading(true);
        const result = await fetchRequestsByCustomerSafe(id);

        if (!result.success) {
            showDialog({
                title: MESSAGES.ERROR_GENERIC_TITLE,
                message: MESSAGES.ERROR_GENERIC_MSG,
                onConfirm: () => null
            });
        } else if (result.success && result.data) {
            setRequests(mapToSimpleRequests(result.data));
        }

        setLoading(false);
    };


    const handleDelete = async (id: number) => {

        if (!customer) {
            return;
        }
    
        showDialog({
            title: MESSAGES.DELETE_REQUEST_TITLE,
            message: MESSAGES.DELETE_REQUEST_MSG,
            onConfirm: async () => {

                const result = await deleteRequestSafe(id);

                if (!result.success) {
                    showToast(MESSAGES.DELETE_REQUEST_ERROR, "error");
                } else if (result.success && result.data) {
                    showToast(MESSAGES.DELETE_REQUEST_SUCCESS, "success");
                    loadRequests(customer.id);
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
    }, [customer]);
      

    return (
        
        <div style={tabbedCard}>
            <h1 style={headingStyle}>Existing Requests</h1>
            <GenericTable
                data={requests}
                loading={loading}
                columns={simpleRequestColumns}
                getRowKey={(r) => r.id}
                onRowClick={(r) => null}  // TODO: Open new tab?
            />
        </div>
    );
}