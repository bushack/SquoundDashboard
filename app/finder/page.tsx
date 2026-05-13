'use client';

import { useEffect, useState } from "react";
import { fetchCategories, fetchMaterials } from "@/lib/lookups";
import { fetchRequestsSafe } from "@/services/requestService";
import { mapToSimpleRequests } from "@/mappers/requestMapper";
import { untabbedCard, dropdownStyle, inputStyle200, labelStyle, primaryButton200, dangerButton200 } from "@/styles/ui";
import { simpleRequestColumns } from "../components/requests/requestColumns";

import { RequestProvider, useRequests } from "@/context/requestContext";
import { DialogProvider, useDialog } from "@/context/dialogContext";

import { MESSAGES } from "@/constants/messages";

import CurrencyInput from "../components/currency/currencyInput";
import GenericTable from "../components/generic/genericTable";
import Layout from "../components/layout";
import ExpandablePanel from "../components/generic/expandablePanel";


export default function FinderPage() {

  // Data.
  const {requests, setRequests} = useRequests();

  // User interface.
  const {showDialog} = useDialog();

  // For toggling filter visibility.
  const [showFilter, setShowFilter] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  // Arrays (categories/materials).
  const [categories, setCategories] = useState<any[]>([]);
  const [materials, setMaterials] = useState<any[]>([]);

  // Identifiers (categories/materials).
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [materialId, setMaterialId] = useState<number | null>(null);

  // Price.
  const [minPrice, setMinPrice] = useState<Money | null>(null);
  const [maxPrice, setMaxPrice] = useState<Money | null>(null);

  // Dimensions.
  const [widthMm, setWidthMm] = useState<number | null>(null);
  const [heightMm, setHeightMm] = useState<number | null>(null);
  const [depthMm, setDepthMm] = useState<number | null>(null);


  // Fetch lookup data when component loads.
  useEffect(() => {

    const loadLookups = async () => {
      const { data: categoryData } = await fetchCategories();
      const { data: materialData } = await fetchMaterials();

      setCategories(categoryData || []);
      setMaterials(materialData || []);
    };

    loadLookups();
  }, []);


  // Fetch filtered data from database.
  const handleSubmit = async () => {

    // Disallow all NULL parameters (avoids fetching all requests).
    if ([categoryId, materialId, minPrice, maxPrice, widthMm, heightMm, depthMm].every(v => v === null)) {
      showDialog({
        title: MESSAGES.SEARCH_REQUESTS_TITLE,
        message: MESSAGES.SEARCH_REQUESTS_MSG,
        onConfirm: () => null
      });
      return;
    }

    // Hide filter and show loading label prior to fetching.
    setShowFilter(false);
    setLoading(true);
    const result = await fetchRequestsSafe({
      category_id: categoryId ? categoryId : null,
      material_id: materialId ? materialId : null,
      min_price: minPrice ? minPrice : null,
      max_price: maxPrice ? maxPrice : null,
      width_mm: widthMm ? widthMm : null,
      height_mm: heightMm ? heightMm : null,
      depth_mm: depthMm ? depthMm : null,
    });

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


  // Reset all user entered values to their defaults.
  const handleReset = async () => {
    
    // Identifiers (categories/materials).
    setCategoryId(null);
    setMaterialId(null);

    // Price.
    setMinPrice(null);
    setMaxPrice(null);

    // Dimensions.
    setWidthMm(null);
    setHeightMm(null);
    setDepthMm(null);

    // Clear array.
    //setRequests([]);

    // Show filter.
    //setShowFilter(true);
  };


  useEffect(() => {
    
    if (requests?.length > 0) {
      setShowFilter(false);
    }
  }, [requests]);


  return (
    <Layout headerText="Home / Customers / Find">

      <div style={untabbedCard}>

        <ExpandablePanel
          heading="Customer Finder"
          subheading="Enter the specification of a product to find potential customers"
          buttonText="Filter"
          expanded={showFilter}
          onToggle={() => setShowFilter(!showFilter)}
        >

          {/* Category dropdown menu */}
          <h3 style={labelStyle}>Category:</h3>
          <select
            id="category"
            name="categorySelect"
            value={categoryId ?? ""}
            onChange={(e) => setCategoryId(e.target.value === "" ? null : Number(e.target.value))}
            style={dropdownStyle}
          >
            <option value="">Select category</option>

            { categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            )) }
          </select>

          {/* Material dropdown menu */}
          <h3 style={labelStyle}>Material:</h3>
          <select
            id="material"
            name="materialSelect"
            value={materialId ?? ""}
            onChange={(e) => setMaterialId(e.target.value === "" ? null : Number(e.target.value))}
            style={dropdownStyle}
          >
            <option value="">Select material</option>

            { materials.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            )) }
          </select>

          {/* Price (min/max) inputs */}
          <h3 style={labelStyle}>Price (£):</h3>
          <CurrencyInput
              id="minPrice"
              name="minPriceInput"
              value={minPrice ?? ""}
              placeholder={"Minimum price (£)"}
              onChange={setMinPrice}
          />

          <CurrencyInput
              id="maxPrice"
              name="maxPriceInput"
              value={maxPrice ?? ""}
              placeholder={"Maximum price (£)"}
              onChange={setMaxPrice}
          />

          {/* Width input */}
          <h3 style={labelStyle}>Width (mm):</h3>
          <input
            id="width"
            name="widthInput"
            type="number"
            placeholder="Width (mm)"
            value={widthMm ?? ""}
            onChange={(e) => setWidthMm(e.target.value === "" ? null : Number(e.target.value))}
            style={inputStyle200}
          />

          {/* Height input */}
          <h3 style={labelStyle}>Height (mm):</h3>
          <input
            id="height"
            name="heightInput"
            type="number"
            placeholder="Height (mm)"
            value={heightMm ?? ""}
            onChange={(e) => setHeightMm(e.target.value === "" ? null : Number(e.target.value))}
            style={inputStyle200}
          />

          {/* Depth input */}
          <h3 style={labelStyle}>Depth (mm):</h3>
          <input
            id="depth"
            name="depthInput"
            type="number"
            placeholder="Depth (mm)"
            value={depthMm ?? ""}
            onChange={(e) => setDepthMm(e.target.value === "" ? null : Number(e.target.value))}
            style={inputStyle200}
          />

          {/* Submit & Reset buttons */}
          <div style={{ marginTop: "10px" }}>
            <button
              type="submit"
              style={primaryButton200}
              onClick={handleSubmit}
            >
              Submit
            </button>

            <button
              type="reset"
              style={dangerButton200}
              onClick={(e) => {e.stopPropagation(); handleReset()}}
            >
              Reset
            </button>
          </div>
        </ExpandablePanel>

        <GenericTable
          data={requests}
          loading={loading}
          //hidden={showFilter}
          hidden={requests?.length === 0 && !loading}
          columns={simpleRequestColumns}
          getRowKey={(r) => r.id}
          onRowClick={(r) => null}
        />
      </div>
    </Layout>
  );
};