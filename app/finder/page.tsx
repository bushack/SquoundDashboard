'use client';

import { useState, useEffect } from "react";
import { fetchCategories, fetchMaterials } from "@/lib/lookups"
import { searchRequests } from "@/lib/requests"
import { untabbedCard, dropdownStyle, inputStyle200, labelStyle, primaryButton200, dangerButton200, heading } from "@/styles/ui";
import { simpleRequestColumns } from "../components/requests/requestColumns";

import CurrencyInput from "../components/currency/currencyInput";
import GenericTable from "../components/generic/genericTable";
import Layout from "../components/layout"

// t
import { fetchRequests } from "@/services/requestService";
import { mapRawRequests } from "@/mappers/requestMapper";
import { SimpleRequest } from "@/types/request";


export default function FinderPage() {

  // Arrays (categories/materials).
  const [categories, setCategories] = useState<any[]>([]);
  const [materials, setMaterials] = useState<any[]>([]);

  // Identifiers (categories/materials).
  const [categoryId, setCategoryId] = useState("");
  const [materialId, setMaterialId] = useState("");

  // Price.
  const [minPrice, setMinPrice] = useState<Money | null>(null);
  const [maxPrice, setMaxPrice] = useState<Money | null>(null);

  // Dimensions.
  const [widthMm, setWidthMm] = useState("");
  const [heightMm, setHeightMm] = useState("");
  const [depthMm, setDepthMm] = useState("");

  // Results.
  const [results, setResults] = useState<any[]>([]);
  const [requests, setRequests] = useState<SimpleRequest[]>([]);


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
  const handleSearch = async () => {
    const { data, error } = await searchRequests({
      category_id: categoryId ? Number(categoryId) : null,
      material_id: materialId ? Number(materialId) : null,
      min_price: minPrice ? Number(minPrice.pence) : null,
      max_price: maxPrice ? Number(maxPrice.pence) : null,
      width_mm: widthMm ? Number(widthMm) : null,
      height_mm: heightMm ? Number(heightMm) : null,
      depth_mm: depthMm ? Number(depthMm) : null,
    });

    if (error) {
      console.error(error);
      alert("Search failed");
    } else {
      setResults(data || []);
    }

    // t
    const rawRequests = await fetchRequests();
    setRequests(mapRawRequests(rawRequests));
  };


  // Reset all user entered values to their defaults.
  const handleReset = async () => {
    
    // Identifiers (categories/materials).
    setCategoryId("");
    setMaterialId("");

    // Price.
    setMinPrice(null);
    setMaxPrice(null);

    // Dimensions.
    setWidthMm("");
    setHeightMm("");
    setDepthMm("");

    // Clear results.
    setResults([]);
    setRequests([]);
  };


  return (
    <Layout headerText="Home / Customers / Find">

      {/* Dropdown menus and inputs */}
      <div style={untabbedCard}>
        <h1 style={{fontSize: "22px", fontWeight: "bold", marginBottom: "5px"}}>Customer Finder</h1>
        <h2 style={{fontSize: "10pt", fontWeight: "normal", marginBottom: "25px"}}>Match a product with potential customers</h2>

        {/* Category dropdown menu */}
        <h3 style={{...labelStyle, fontWeight: "bold", padding: "3px"}}>Category:</h3>
          <select
            id="category"
            name="categorySelect"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
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
          <h3 style={{...labelStyle, fontWeight: "bold", padding: "3px"}}>Material:</h3>
          <select
            id="material"
            name="materialSelect"
            value={materialId}
            onChange={(e) => setMaterialId(e.target.value)}
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
          <h3 style={{...labelStyle, fontWeight: "bold", padding: "3px"}}>Price (£):</h3>
          <CurrencyInput
              id="minPrice"
              name="minPriceInput"
              value={minPrice}
              placeholder={"Minimum price (£)"}
              onChange={setMinPrice}
          />

          <CurrencyInput
              id="maxPrice"
              name="maxPriceInput"
              value={maxPrice}
              placeholder={"Maximum price (£)"}
              onChange={setMaxPrice}
          />

          {/* Width input */}
          <h3 style={{...labelStyle, fontWeight: "bold", padding: "3px"}}>Width (mm):</h3>
          <input
            id="width"
            name="widthInput"
            type="number"
            placeholder="Width (mm)"
            value={widthMm}
            onChange={(e) => setWidthMm(e.target.value)}
            style={inputStyle200}
          />

          {/* Height input */}
          <h3 style={{ ...labelStyle, fontWeight: "bold", padding: "3px" }}>Height (mm):</h3>
          <input
            id="height"
            name="heightInput"
            type="number"
            placeholder="Height (mm)"
            value={heightMm}
            onChange={(e) => setHeightMm(e.target.value)}
            style={inputStyle200}
          />

          {/* Depth input */}
          <h3 style={{ ...labelStyle, fontWeight: "bold", padding: "3px" }}>Depth (mm):</h3>
          <input
            id="depth"
            name="depthInput"
            type="number"
            placeholder="Depth (mm)"
            value={depthMm}
            onChange={(e) => setDepthMm(e.target.value)}
            style={inputStyle200}
          />

          {/* Submit & Reset buttons */}
          <div style={{ marginTop: "10px" }}>
            <button
              type="submit"
              style={primaryButton200}
              onClick={handleSearch}
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
      </div>

      <GenericTable
        data={requests}
        //loading={loading}
        columns={simpleRequestColumns}
        getRowKey={(r) => r.id}
        onRowClick={(r) => null}
      />

      {/* Results map - hidden if results.length is zero */}
      {results.length > 0 && <div style={untabbedCard}>
        
        {results.length === 1 && <h3 style={heading}>1 result</h3>}
        {results.length > 1 && <h3 style={heading}>{results.length} results</h3>}

        {/* On-click launch new browser tab */}
        {results.map((r) => (
          <a
            href={`/customers/${r.customers?.id}`}
            target="_blank"
            rel="noopener noreferrer"
            key={r.id}
          >
            <div
              style={{ ...untabbedCard, cursor: "pointer", border: "3px solid #ddd" }}
            >
              <h3 style={{ fontSize: "16pt", fontWeight: "bold", marginBottom: "10px"}}>
                {r.customers?.forename} {r.customers?.surname}
              </h3>
              <p>
                <strong>{r.materials?.name} {r.categories?.name} wanted</strong><br />
                Width: { r.min_width_mm || "*" }mm min - { r.max_width_mm || "*" }mm max<br />
                Height: { r.min_height_mm || "*" }mm min - { r.max_height_mm || "*" }mm max<br />
                Depth: { r.min_depth_mm || "*" }mm min - { r.max_depth_mm || "*" }mm max<br />
                Price: { r.min_price || "*" } min - { r.max_price || "*" } max
              </p>
            </div>
          </a>
        ))}
      </div>}
    </Layout>
  );
};