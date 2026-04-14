"use client"

// Functions.
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { deleteCustomer, fetchCustomer } from "@/lib/customers";
import { fetchCategories, fetchMaterials } from "@/lib/lookups";
import { addRequest, deleteRequest, fetchRequests } from "@/lib/requests";
import { cardStyle, dangerButton, dangerButton200, dropdownStyle, h3style, inputStyle200, labelStyle, primaryButton, primaryButton200 } from "@/styles/ui";

// Components.
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


export default function CustomerDetailPage() {

  const router = useRouter();

  // Customer data.
  const { id } = useParams();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [cleanAddress, setCleanAddress] = useState<string>();
  const [cleanPhone, setCleanPhone] = useState<string>();

  // Requests data.
  const [requests, setRequests] = useState<Request[]>([]);
  /*const [categoryId, setCategoryId] = useState("");
  const [materialId, setMaterialId] = useState("");
  const [minWidthMm, setMinWidthMm] = useState("");
  const [maxWidthMm, setMaxWidthMm] = useState("");
  const [minHeightMm, setMinHeightMm] = useState("");
  const [maxHeightMm, setMaxHeightMm] = useState("");
  const [minDepthMm, setMinDepthMm] = useState("");
  const [maxDepthMm, setMaxDepthMm] = useState("");*/

  // Lookup arrays for dropdown menus.
  //const [categories, setCategories] = useState<Category[]>([]);
  //const [materials, setMaterials] = useState<Material[]>([]);

  // UI messages.
  //const [successMessage, setSuccessMessage] = useState("");
  //const [errorMessage, setErrorMessage] = useState("");

  // Anti-spam.
  //const [isBusy, setIsBusy] = useState<Boolean>(false);


  // Display UI success message.
  /*
  const displaySuccessMessage = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), UI_MESSAGE_TIMEOUT);
  };
  */


  // Display UI error message.
  /*
  const displayErrorMessage = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(""), UI_MESSAGE_TIMEOUT);
  };
  */
  

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


  // Load lookup menu data.
  /*const loadLookups = async () => {

    const [
      { data: categoryData, error: categoryError },
      { data: materialData, error: materialError }
    ] = await Promise.all([
      fetchCategories(),
      fetchMaterials()
    ]);

    if (categoryError) {
      console.error(categoryError);
    } else {
      setCategories(categoryData || []);
      console.log("Successfully loaded category data");
    }

    if (materialError) {
      console.error(materialError);
    } else {
      setMaterials(materialData || []);
      console.log("Successfully loaded material data");
    }
  };*/


  // Clear 'Add Request' form.
  /*
  const handleClearRequest = async () => {
    setCategoryId("");
    setMaterialId("");
    setMinWidthMm("");
    setMaxWidthMm("");
    setMinHeightMm("");
    setMaxHeightMm("");
    setMinDepthMm("");
    setMaxDepthMm("");
  };
  */


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
    //loadLookups();

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


  // Handle 'Add Request'.
  /*
  const handleAddRequest = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customer) {
      return;
    }

    // Validate category.
    if (!categoryId.trim()) {
      displayErrorMessage("Category is required");
      return;
    }

    // Validate width.
    if (minWidthMm && maxWidthMm && Number(minWidthMm) > Number(maxWidthMm)) {
      displayErrorMessage(MESSAGES.ERROR_WIDTH_VALIDATION);
      return;
    }

    // Validate height.
    if (minHeightMm && maxHeightMm && Number(minHeightMm) > Number(maxHeightMm)) {
      displayErrorMessage(MESSAGES.ERROR_HEIGHT_VALIDATION);
      return;
    }

    // Validate depth.
    if (minDepthMm && maxDepthMm && Number(minDepthMm) > Number(maxDepthMm)) {
      displayErrorMessage(MESSAGES.ERROR_DEPTH_VALIDATION);
      return;
    }

    // Sumbit request.
    try {
      setIsBusy(true);

      const { error } = await addRequest({
        customer_id: customer.id,
        category_id: categoryId ? Number(categoryId) : null,
        material_id: materialId ? Number(materialId) : null,
        min_width_mm: minWidthMm ? Number(minWidthMm) : null,
        max_width_mm: maxWidthMm ? Number(maxWidthMm) : null,
        min_height_mm: minHeightMm ? Number(minHeightMm) : null,
        max_height_mm: maxHeightMm ? Number(maxHeightMm) : null,
        min_depth_mm: minDepthMm ? Number(minDepthMm) : null,
        max_depth_mm: maxDepthMm ? Number(maxDepthMm) : null
      });

      if (error) {
        console.error(error);
        displayErrorMessage(MESSAGES.GENERIC_ERROR);
      } else {
        displaySuccessMessage(MESSAGES.REQUEST_CREATED);

        // Clear form.
        handleClearRequest();
    
        // Reload list.
        await loadRequests(customer.id);
      }
    } finally {
      setIsBusy(false);
    }
  };
  */


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
      displayErrorMessage(MESSAGES.GENERIC_ERROR);
    } else {
      displaySuccessMessage(MESSAGES.REQUEST_DELETED);
      loadRequests(customer.id);
    }
  };


  // Render.
  return (
    <Layout headerTitle={`Home / Customers / ${customer?.forename} ${customer?.surname}`} sidebarTitle="Squound">

        {/* Loading label */}
        {!customer && <p style={labelStyle}>Loading...</p>}

        {/* Customer Information section */}
        {customer && (
          <CustomerCard
            customer={customer}
            cleanAddress={cleanAddress}
            cleanPhone={cleanPhone}
            onDelete={handleDeleteCustomer}
          />
        )}

        {/* Existing Requests section */}
        {customer && (
          <div style={cardStyle}>
            <h3 style={h3style}>Existing Requests</h3>
            {requests.length === 0 && <p>None found</p>}
            {requests.map((r) => (
              <RequestCard
                key={r.id}
                request={r}
                onDelete={handleDeleteRequest}
              />
            ))}
          </div>
        )}

        {/* Add Request section */}
        {customer && (
          <RequestForm
            customer={customer}
            onSuccess={() => loadRequests(customer.id)}
          />
        )}
    </Layout>
  );
}