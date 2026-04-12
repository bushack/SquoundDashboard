"use client"

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { deleteCustomer, fetchCustomer } from "@/lib/customers";
import { fetchCategories, fetchMaterials } from "@/lib/lookups";
import { addRequest, deleteRequest, fetchRequests } from "@/lib/requests";
import { cardStyle, dangerButton, dangerButton200, dropdownStyle, h3style, inputStyle200, labelStyle, primaryButton, primaryButton200 } from "@/styles/ui";

import Layout from "../../components/layout";
import type { Category } from "@/types/category";
import type { Customer } from "@/types/customer";
import type { Material } from "@/types/material";
import type { Request } from "@/types/request";

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
  const [categoryId, setCategoryId] = useState("");
  const [materialId, setMaterialId] = useState("");
  const [minWidthMm, setMinWidthMm] = useState("");
  const [maxWidthMm, setMaxWidthMm] = useState("");
  const [minHeightMm, setMinHeightMm] = useState("");
  const [maxHeightMm, setMaxHeightMm] = useState("");
  const [minDepthMm, setMinDepthMm] = useState("");
  const [maxDepthMm, setMaxDepthMm] = useState("");

  // Lookup arrays for dropdown menus.
  const [categories, setCategories] = useState<Category[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);

  // UI messages.
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Anti-spam.
  const [isBusy, setIsBusy] = useState<Boolean>(false);


  // Display UI success message.
  const displaySuccessMessage = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), UI_MESSAGE_TIMEOUT);
  };


  // Display UI error message.
  const displayErrorMessage = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(""), UI_MESSAGE_TIMEOUT);
  };
  

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
  const loadLookups = async () => {

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
  };


  // Clear 'Add Request' form.
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


  // Runs when component loads.
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
    loadLookups();

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


  // Page HTML.
  return (
    <Layout headerTitle={`Home / Customers / ${customer?.forename} ${customer?.surname}`} sidebarTitle="Squound">

        {/* Loading label */}
        {!customer && <p style={labelStyle}>Loading...</p>}

        {/* Customer details */}
        {customer && (
          <div style={cardStyle}>

            {/* Name & Id */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
              <h3 style={{ fontSize: "22px", fontWeight: "bold" }}>{customer.forename} {customer.surname.toUpperCase()}</h3>
              <span style={{ fontSize: "22px", fontWeight: "bold" }}>[{customer.id}]</span>
            </div>

            {/* Address */}
            { customer.postcode && (
              <div style={{ marginBottom: "20px"}}>
                <p><strong>Address: </strong></p>
                <p>{customer.address_line_1}</p>
                <p>{customer.address_line_2}</p>
                <p>{customer.town_city}</p>
                <p>{customer.region}</p>
                <p>{customer.postcode}</p>
              </div>
            )}

            {/* No Address */}
            { !customer.postcode && (
              <div style={{ marginBottom: "20px"}}>
                <p><strong>Address: </strong></p>
                  <p>{"Not provided"}</p>
              </div>
            )}

            {/* Phone */}
            { customer.mobile && (
              <div style={{ marginBottom: "20px" }}>
                <p><strong>Phone: </strong></p>
                  <p>
                    <a href={`tel:${cleanPhone}`}>{cleanPhone}</a>
                  </p>
              </div>
            )}

            {/* No Mobile */}
            { !customer.mobile && (
              <div style={{ marginBottom: "20px" }}>
                <p><strong>Phone: </strong></p>
                  <p>Not provided</p>
              </div>
            )}

            {/* Email */}
            { customer.email && (
              <div style={{ marginBottom: "20px" }}>
                <p><strong>Email: </strong></p>
                  <p>
                    <a href={`mailto:${customer.email}`}>{customer.email}</a>
                  </p>
              </div>
            )}

            {/* No Email */}
            { !customer.email && (
              <div style={{ marginBottom: "20px" }}>
                <p><strong>Email: </strong></p>
                  <p>Not provided</p>
              </div>
            )}

            {/* Notes */}
            <div style={{ marginBottom: "10px" }}>
              <p><strong>Notes: </strong></p><p>{customer.notes || "N/A"}</p>
            </div>

            {/* Buttons */}
            <div style={{ marginTop: "10px" }}>

              {/* Google Maps */}
              { customer.postcode && (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(String(cleanAddress))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    padding: "10px 30px",
                    backgroundColor: "#2563eB",
                    color: "white",
                    borderRadius: "6px",
                    textDecoration: "none",
                    marginTop: "10px",
                    marginRight: "10px"
                  }}
                >
                  Maps
                </a>
              )}

              {/* Telephone */}
              { cleanPhone && (
                <a
                  href={`tel:${cleanPhone}`}
                  style={{
                    display: "inline-block",
                    padding: "10px 30px",
                    backgroundColor: "#249900",
                    color: "white",
                    borderRadius: "6px",
                    textDecoration: "none",
                    marginTop: "10px",
                    marginRight: "10px"
                  }}
                >
                  Call
                </a>
              )}

              {/* Email */}
              { customer.email && (
                <a
                  href={`mailto:${customer.email}`}
                  style={{
                    display: "inline-block",
                    padding: "10px 30px",
                    backgroundColor: "#fc9003",
                    color: "white",
                    borderRadius: "6px",
                    textDecoration: "none",
                    marginTop: "10px",
                    marginRight: "10px"
                  }}
                >
                  Email
                </a>
              )}

              {/* Edit */}
              <button style={{ ...primaryButton, backgroundColor: "grey",
                    marginTop: "10px" }}
                //onClick={() => startEdit(customer)}
              >
                Edit
              </button>

              {/* Delete */}
              <button
                style={{ ...dangerButton, marginTop: "10px" }}
                onClick={(e) => {e.stopPropagation(); handleDeleteCustomer(Number(customer.id))}}
              >
                Delete
              </button>
            </div>
          </div>
        )}

        {/* Existing Requests List */}
        <div style={ cardStyle }>
          <h3 style={h3style}>Existing Requests</h3>
          {requests.length === 0 && <p>None found</p>}
          {requests.map((r) => (
            <div key={r.id} style={{ ...cardStyle, border: "3px solid #ddd" }}>

              <h3 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "5px" }}>
                {[r.materials?.name, r.categories?.name].filter(Boolean).join(" ")}
              </h3>

              <p>Width: { r.min_width_mm || "*" }mm min - { r.max_width_mm || "*" }mm max</p>
              <p>Height: { r.min_height_mm || "*" }mm min - { r.max_height_mm || "*" }mm max</p>
              <p>Depth: { r.min_depth_mm || "*" }mm min - { r.max_depth_mm || "*" }mm max</p>
              <p style={{ marginBottom: "20px" }}></p>

              <button
                style={ dangerButton }
                onClick={(e) => {e.stopPropagation(); handleDeleteRequest(Number(r.id))}}
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {/* Add Request Form */}
        <form name="Request Form" onSubmit={ handleAddRequest }>
          
          {/* Category dropdown menu */}
          <div style={ cardStyle }>

          <h3 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "10px" }}>Add Request</h3>

            {/* Category dropdown menu */}
            <div>
              <h3 style={{ ...labelStyle, fontWeight: "bold", padding: "3px" }}>Category:</h3>
              <select
                value={ categoryId }
                onChange={(e) => setCategoryId(e.target.value)}
                style={dropdownStyle}
              >
                <option value="">Select category</option>

                { categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    { c.name }
                  </option>
                )) }
              </select>
            </div>

            {/* Material dropdown menu */}
            <div>
              <h3 style={{ ...labelStyle, fontWeight: "bold", padding: "3px" }}>Material:</h3>
              <select
                value={ materialId }
                onChange={(e) => setMaterialId(e.target.value)}
                style={dropdownStyle}
              >
                <option value="">Select material</option>

                { materials.map((m) => (
                  <option key={m.id} value={m.id}>
                    { m.name }
                  </option>
                )) }
              </select>
            </div>

            {/* Width (min/max) inputs */}
            <div>
              <h3 style={{ ...labelStyle, fontWeight: "bold", padding: "3px" }}>Width (min/max) (mm):</h3>
              <input
                type="number"
                placeholder="Minimum width (mm)"
                value={minWidthMm}
                onChange={(e) => setMinWidthMm(e.target.value)}
                style={ inputStyle200 }
              />

              <input
                type="number"
                placeholder="Maximum width (mm)"
                value={maxWidthMm}
                onChange={(e) => setMaxWidthMm(e.target.value)}
                style={ inputStyle200 }
              />
            </div>

            {/* Height (min/max) inputs */}
            <div>
              <h3 style={{ ...labelStyle, fontWeight: "bold", padding: "3px" }}>Height (min/max) (mm):</h3>
              <input
                type="number"
                placeholder="Minimum height (mm)"
                value={minHeightMm}
                onChange={(e) => setMinHeightMm(e.target.value)}
                style={ inputStyle200 }
              />

              <input
                type="number"
                placeholder="Maximum height (mm)"
                value={maxHeightMm}
                onChange={(e) => setMaxHeightMm(e.target.value)}
                style={ inputStyle200 }
              />
            </div>

            {/* Depth (min/max) inputs */}
            <div>
              <h3 style={{ ...labelStyle, fontWeight: "bold", padding: "3px" }}>Depth (min/max) (mm):</h3>
              <input
                type="number"
                placeholder="Minimum depth (mm)"
                value={minDepthMm}
                onChange={(e) => setMinDepthMm(e.target.value)}
                style={ inputStyle200 }
              />

              <input
                type="number"
                placeholder="Maximum depth (mm)"
                value={maxDepthMm}
                onChange={(e) => setMaxDepthMm(e.target.value)}
                style={ inputStyle200 }
              />
            </div>

            <div style={{ marginTop: "10px" }}>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isBusy}
                style={ primaryButton200 }
              >Submit
              </button>

              {/* Reset button */}
              <button
                type="reset"
                style={ dangerButton200 }
                onClick={(e) => {e.stopPropagation(); handleClearRequest()}}
              >Reset
              </button>
              { successMessage && <span>{successMessage}</span>}
            </div>
          </div>
        </form>
    </Layout>
  );
}