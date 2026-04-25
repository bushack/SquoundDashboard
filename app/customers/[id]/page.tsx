"use client"

// Functions.
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { deleteCustomerSafe, fetchCustomerSafe } from "@/lib/customers";
import { deleteRequest, fetchRequests } from "@/lib/requests";
import { labelStyle, tabButton } from "@/styles/ui";
import { theme } from "@/styles/themes";
import { DialogProvider, useDialog } from "@/context/dialogContext";

// UI Components.
import Layout from "../../components/layout";
import CustomerCard from "../../components/customers/customerCard";
import CustomerForm from "../../components/customers/customerForm";
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

  const { showDialog } = useDialog();

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

    const result = await fetchCustomerSafe(id);

    if (!result.success) {
      // TODO: Display UI message.
    }
    else if (result.success && result.data) {

      const customer = result.data;

      setCustomer(customer);

      // Clean address (Note: Prioritise postcode for more efficient searching).
      setCleanAddress([
        customer.postcode,
        customer.address_line_1,
        customer.address_line_2,
        customer.town_city,
        customer.region
      ]
        .map((part) => part?.trim())
        .filter(Boolean)
        .join(", ")
      );

      // Clean phone number.
      setCleanPhone(
        customer.mobile ?
        customer.mobile.replace(/\s+/g, "") : ""
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
  const handleDeleteCustomer = async (id: number) => {

    showDialog({
      title: MESSAGES.CONFIRM_DELETE_CUSTOMER_TITLE,
      message: MESSAGES.CONFIRM_DELETE_CUSTOMER_MSG,
      onConfirm: async () => {
        try {
          const result = await deleteCustomerSafe(id);

          if (!result.success) {
            // TODO: Handle failed delete without error?
          } else {
            router.back();
            //TODO : Display confirmation.
          }
        } catch {
          // TODO: Handle error?
          console.error(MESSAGES.CONFIRM_DELETE_CUSTOMER_ERROR, error);
        }
      },
    });
  };


  // Handle 'Delete Request'.
  const handleDeleteRequest = async (id: number) => {

    if (!customer) {
      return;
    }

    /*const confirmed = confirm(MESSAGES.CONFIRM_DELETE_REQUEST);
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
    }*/

    showDialog({
      title: MESSAGES.CONFIRM_DELETE_REQUEST_TITLE,
      message: MESSAGES.CONFIRM_DELETE_REQUEST_MSG,
      onConfirm: async () => {
        try {
          const { error } = await deleteRequest(id);

          if (error) {
            // TODO: Handle failed delete without error?
          } else {
            loadRequests(customer.id);
            //TODO : Display confirmation.
          }
        } catch {
          // TODO: Handle error?
          console.error(MESSAGES.CONFIRM_DELETE_CUSTOMER_ERROR, error);
        }
      },
    });
  };


  const handleCancel = async () => {

    //loadCustomer(id);
    setActiveTab("details");
  };


  const handleSubmit = async () => {

    loadCustomer(id);
    setActiveTab("details");
  };


  // Render.
  return (
    <Layout
      headerText={`Home / Customers / ${customer?.forename} ${customer?.surname}`}
    >

      {/* Loading label */}
      {!customer && <p style={labelStyle}>Loading...</p>}

      {customer && (
        <div>

          {/* Tab buttons */}
          <div style={{display: "flex" }}>

            {/* Customer Details tab */}
            <button
              onClick={() => setActiveTab("details")}
              style={{...tabButton,
                backgroundColor: activeTab === "details" ? theme.colours.selectedTab : theme.colours.unselectedTab,
                color: activeTab === "details" ? theme.colours.text : theme.colours.textMuted}}
            >
              Details
            </button>

            {/* Edit tab */}
            <button
              onClick={() => setActiveTab("edit")}
              style={{...tabButton,
                backgroundColor: activeTab === "edit" ? theme.colours.selectedTab : theme.colours.unselectedTab,
                color: activeTab === "edit" ? theme.colours.text : theme.colours.textMuted}}
            >
              Edit
            </button>

            {/* Current Requests tab */}
            <button
              onClick={() => setActiveTab("requests")}
              style={{...tabButton,
                backgroundColor: activeTab === "requests" ? theme.colours.selectedTab : theme.colours.unselectedTab,
                color: activeTab === "requests" ? theme.colours.text : theme.colours.textMuted}}
            >
              Requests
            </button>

            {/* New Requests tab */}
            <button
              onClick={() => setActiveTab("newRequest")}
              style={{...tabButton,
                backgroundColor: activeTab === "newRequest" ? theme.colours.selectedTab : theme.colours.unselectedTab,
                color: activeTab === "newRequest" ? theme.colours.text : theme.colours.textMuted}}
            >
              New Request
            </button>
          </div>

          {/* Tab content */}
          <div>

            {/* Customer Information content */}
            {customer && activeTab === "details" && (
              <CustomerCard
                customer={customer}
                cleanAddress={cleanAddress}
                cleanPhone={cleanPhone}
                onDelete={handleDeleteCustomer}
              />
            )}

            {/* Customer Edit content */}
            {customer && activeTab === "edit" && (
              <CustomerForm
                editingCustomer={customer}
                onCancel={() => handleCancel()}
                onSubmit={() => handleSubmit()}
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