"use client"

// Functions.
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { deleteCustomerSafe, fetchCustomerSafe } from "@/lib/customers";  // DEPRECIATED (use customerService)
import { labelStyle, tabButton } from "@/styles/ui";
import { theme } from "@/styles/themes";
import { DialogProvider, useDialog } from "@/context/dialogContext";
import { ToastProvider, useToast } from "@/context/toastContext";

// User interface.
import Layout from "../../components/layout";
import CustomerCard from "../../components/customers/customerCard";
import CustomerForm from "../../components/customers/customerForm";
import RequestForm from "../../components/requests/requestForm";
import RequestTable from "../../components/requests/requestTable";

// Types.
import type { Customer } from "@/types/customer";

// Constants.
import { MESSAGES } from "@/constants/messages";

type Tab = "details" | "edit" | "requests" | "newRequest";


export default function CustomerDetailPage() {

  const router = useRouter();

  // User interface.
  const {showDialog} = useDialog();
  const {showToast} = useToast();
  const {id} = useParams();

  // Data.
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [cleanAddress, setCleanAddress] = useState<string>();
  const [cleanPhone, setCleanPhone] = useState<string>();

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

    // Load data.
    loadCustomer(numericId);
  }, [id]);
  

  const handleDelete = async (id: number) => {

    showDialog({
      title: MESSAGES.DELETE_CUSTOMER_TITLE,
      message: MESSAGES.DELETE_CUSTOMER_MSG,
      onConfirm: async () => {
        try {
          const result = await deleteCustomerSafe(id);

          if (!result.success) {
            console.error(MESSAGES.ERROR_GENERIC_MSG);
            showToast(MESSAGES.ERROR_GENERIC_MSG, "error");
          } else {
            console.log(MESSAGES.DELETE_CUSTOMER_SUCCESS);
            showToast(MESSAGES.DELETE_CUSTOMER_SUCCESS, "success");
            router.back();
          }
        } catch {
          console.error(MESSAGES.DELETE_CUSTOMER_ERROR, error);
          showToast(MESSAGES.DELETE_CUSTOMER_ERROR, "error");
        }
      },
    });
  };


  const handleCancel = async () => {
    
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
                onDelete={handleDelete}
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
            {/*{customer && activeTab === "requests" && (
              <div style={tabbedCard}>
                <GenericTable
                  data={requests}
                  //loading={loading}       // TODO: Implement loading msg
                  columns={columns}
                  getRowKey={(r) => r.id}
                  onRowClick={(r) => null}  // TODO: Open new tab?
                />
              </div>
            )}*/}

            {customer && activeTab === "requests" && (
              <RequestTable
                customer={customer}
              />
            )}

            {/* Add Request content */}
            {customer && activeTab === "newRequest" && (
              <RequestForm
                customer={customer}
                onSuccess={() => null}
              />
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}