"use client"

// Functions.
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { deleteCustomer, fetchCustomer } from "@/lib/customers";
import { deleteRequest, fetchRequests } from "@/lib/requests";
import { cardStyle, h3style, labelStyle, tabButton } from "@/styles/ui";
import { theme } from "@/styles/themes";

// UI Components.
import Layout from "../../components/layout";
import CustomerCard from "../../components/customers/customerCard";
import RequestCard from "../../components/requests/requestCard";
import RequestForm from "../../components/requests/requestForm";

// Types.
import type { Category } from "@/types/category";
import type { Customer } from "@/types/customer";
import type { Material } from "@/types/material";
import type { Request } from "@/types/request";

// Config and constants.
import { UI_MESSAGE_TIMEOUT } from "@/config/app";
import { MESSAGES } from "@/constants/messages";

type Tab = "details" | "edit" | "requests" | "newRequest";


export default function CustomerDetailPage() {

  const router = useRouter();

  // Customer data.
  const { id } = useParams();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [cleanAddress, setCleanAddress] = useState<string>();
  const [cleanPhone, setCleanPhone] = useState<string>();

  // Requests data.
  const [requests, setRequests] = useState<Request[]>([]);

  // Tabbing.
  const [activeTab, setActiveTab] = useState<Tab>("details");
  

  // Load customer details data.
  const loadCustomer = async (id: number) => {

    const { data, error } = await fetchCustomer(id);

    if (error) {
      console.error(error);
    } else if(data) {

      setCustomer(data);

      // Clean address (Note: Prioritise postcode for more efficient searching).
      setCleanAddress([
        data.postcode,
        data.address_line_1,
        data.address_line_2,
        data.town_city,
        data.region
      ]
        .map((part) => part?.trim())
        .filter(Boolean)
        .join(", ")
      );

      // Clean phone number.
      setCleanPhone(
        data.mobile ?
          data.mobile.replace(/\s+/g, "") : ""
      );

      console.log("Successfully loaded customer data");
    }
  };


  // Load customer requests data.
  const loadRequests = async (id: number) => {

    const { data, error } = await fetchRequests(id);

    if (error) {
      console.error(error);
    } else {
      setRequests(data || []);
      console.log("Successfully loaded request data");
    }
  };


  // Runs when component loads.
  // NOTE: Dependancy array [id], only re-run function if 'id' changes.
  useEffect(() => {
    
    // Check customer id is present.
    if (!id || Array.isArray(id)) {
      console.error("No Id: ", id);
      return;
    }

    // Sanitise the customer id.
    const numericId = Number(id);
    if (isNaN(numericId)) {
      console.error("Invalid Id: ", id);
      return;
    }

    // Load page data.
    loadCustomer(numericId);
    loadRequests(numericId);

  }, [id]);


  // Handle delete customer requests.
  const handleDeleteCustomer = async (id: number) =>
  {
    const confirmed = confirm(MESSAGES.CONFIRM_DELETE_CUSTOMER);
    if (confirmed == false) {
      return;
    }

    const { error } = await deleteCustomer(id);

    if (error) {
      console.error(error);
      displayErrorMessage(MESSAGES.GENERIC_ERROR);
    } else {
      displaySuccessMessage(MESSAGES.CUSTOMER_DELETED);
      router.back();
    }
  };


  // Handle 'Delete Request'.
  const handleDeleteRequest = async (id: number) =>
  {
    if (!customer) {
      return;
    }

    const confirmed = confirm(MESSAGES.CONFIRM_DELETE_REQUEST);
    if (confirmed == false) {
      return;
    }

    const { error } = await deleteRequest(id);

    if (error) {
      console.error(error);
      //displayErrorMessage(MESSAGES.GENERIC_ERROR);
    } else {
      //displaySuccessMessage(MESSAGES.REQUEST_DELETED);
      loadRequests(customer.id);
    }
  };


  // Render.
  return (
    <Layout headerTitle={`Home / Customers / ${customer?.forename} ${customer?.surname}`} sidebarTitle="Squound">

      {/* Loading label */}
      {!customer && <p style={labelStyle}>Loading...</p>}

      {customer && (
        <div>

          {/* Tab buttons */}
          <div style={{...cardStyle, display: "flex", gap: "10px"}}>

            {/* Customer Details tab */}
            <button
              onClick={() => setActiveTab("details")}
              style={{...tabButton,
                backgroundColor: activeTab === "details" ? theme.colours.selected : theme.colours.unselected}}
            >
              Details
            </button>

            {/* Edit tab */}
            <button
              onClick={() => setActiveTab("edit")}
              style={{...tabButton,
                backgroundColor: activeTab === "edit" ? theme.colours.selected : theme.colours.unselected}}
            >
              Edit
            </button>

            {/* Current Requests tab */}
            <button
              onClick={() => setActiveTab("requests")}
              style={{...tabButton,
                backgroundColor: activeTab === "requests" ? theme.colours.selected : theme.colours.unselected}}
            >
              Requests
            </button>

            {/* New Requests tab */}
            <button
              onClick={() => setActiveTab("newRequest")}
              style={{...tabButton,
                backgroundColor: activeTab === "newRequest" ? theme.colours.selected : theme.colours.unselected}}
            >
              New Request
            </button>
          </div>

          {/* Tab content */}
          <div style={{marginTop: "20px"}}>

            {/* Customer Information content */}
            {customer && activeTab === "details" && (
              <CustomerCard
                customer={customer}
                cleanAddress={cleanAddress}
                cleanPhone={cleanPhone}
                onDelete={handleDeleteCustomer}
              />
            )}
              
            {/* Existing Requests content */}
            {customer && activeTab === "requests" && (
              <div>
                {requests.map((r) => (
                  <RequestCard
                    key={r.id}
                    request={r}
                    onDelete={handleDeleteRequest}
                  />
                ))}
              </div>
            )}

            {/* Add Request content */}
            {customer && activeTab === "newRequest" && (
              <RequestForm
                customer={customer}
                onSuccess={() => loadRequests(customer.id)}
              />
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}