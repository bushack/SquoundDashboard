
import { useEffect, useState } from "react";
import { fetchRequestSafe } from "@/services/requestService";
import { mapToSimpleRequest } from "@/mappers/requestMapper";

import { DialogProvider, useDialog } from "@/context/dialogContext";
import { ToastProvider, useToast } from "@/context/toastContext";

import type { SimpleRequest } from "@/types/request";

// User interface.
import Layout from "../../components/layout";


export default function RequestDetailPage() {

  // User interface.
	const {showDialog} = useDialog();
	const {showToast} = useToast();
	const {id} = useParams();

  // Data.
  const [request, setRequest] = useState<SimpleRequest | null>(null);
  const [loading, setLoading] = useState<boolean>(false);


  const loadRequest = async (id: number) => {

    // Show loading label prior to fetching.
    setLoading(true);
    const result = fetchRequestSafe(id);

    if (!result.success) {
      showDialog({
        title: MESSAGES.ERROR_GENERIC_TITLE,
        message: MESSAGES.ERROR_GENERIC_MSG,
        onConfirm: () => null
      });
    } else if (result.success && result.data) {
      setRequest(mapToSimpleRequest(result.data));
    }

    setLoading(false);
  };


  useEffect(() => {
    
    // Check request id is present.
    if (!id || Array.isArray(id)) {
      console.error("No Id: ", id);
      return;
    }

    // Sanitise the request id.
    const numericId = Number(id);
    if (isNaN(numericId)) {
      console.error("Invalid Id: ", id);
      return;
    }

    // Load data.
    loadRequest(numericId);
  }, [id]);


  return (
    
    <Layout
        headerText={`Home / Requests / ${id}`}>

    </Layout>
  );
}