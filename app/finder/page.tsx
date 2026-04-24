'use client';

import { useState, useEffect } from "react";
import { fetchCategories, fetchMaterials } from "@/lib/lookups"
import { searchRequests } from "@/lib/requests"
import { untabbedCard, dropdownStyle, inputStyle200, labelStyle, primaryButton200, dangerButton200, heading } from "@/styles/ui";
import Layout from "../components/layout"


export default function FinderPage() {

  // Arrays (categories/materials).
  const [categories, setCategories] = useState<any[]>([]);
  const [materials, setMaterials] = useState<any[]>([]);

  // Identifiers (categories/materials).
  const [categoryId, setCategoryId] = useState("");
  const [materialId, setMaterialId] = useState("");

  // Dimensions (width).
  const [minWidthMm, setMinWidthMm] = useState("");
  const [maxWidthMm, setMaxWidthMm] = useState("");

  // Dimensions (height).
  const [minHeightMm, setMinHeightMm] = useState("");
  const [maxHeightMm, setMaxHeightMm] = useState("");

  // Dimensions (depth).
  const [minDepthMm, setMinDepthMm] = useState("");
  const [maxDepthMm, setMaxDepthMm] = useState("");

  // Results.
  const [results, setResults] = useState<any[]>([]);


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
      min_width_mm: minWidthMm ? Number(minWidthMm) : null,
      max_width_mm: maxWidthMm ? Number(maxWidthMm) : null,
      min_height_mm: minHeightMm ? Number(minHeightMm) : null,
      max_height_mm: maxHeightMm ? Number(maxHeightMm) : null,
      min_depth_mm: minDepthMm ? Number(minDepthMm) : null,
      max_depth_mm: maxDepthMm ? Number(maxDepthMm) : null,
    });

    if (error) {
      console.error(error);
      alert("Search failed");
    } else {
      setResults(data || []);
    }
  };


  // Reset all user entered values to their defaults.
  const handleReset = async () => {
    
    // Identifiers (categories/materials).
    setCategoryId("");
    setMaterialId("");

    // Dimensions (width).
    setMinWidthMm("");
    setMaxWidthMm("");

    // Dimensions (height).
    setMinHeightMm("");
    setMaxHeightMm("");

    // Dimensions (depth).
    setMinDepthMm("");
    setMaxDepthMm("");

    // Clear results.
    setResults([]);
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

          {/* Width (min/max) inputs */}
          <h3 style={{...labelStyle, fontWeight: "bold", padding: "3px"}}>Width (min/max) (mm):</h3>
          <input
            id="minWidth"
            name="minWidthInput"
            type="number"
            placeholder="Minimum width (mm)"
            value={minWidthMm}
            onChange={(e) => setMinWidthMm(e.target.value)}
            style={inputStyle200}
          />

          <input
            id="maxWidth"
            name="maxWidthInput"
            type="number"
            placeholder="Maximum width (mm)"
            value={maxWidthMm}
            onChange={(e) => setMaxWidthMm(e.target.value)}
            style={inputStyle200}
          />

          {/* Height (min/max) inputs */}
          <h3 style={{ ...labelStyle, fontWeight: "bold", padding: "3px" }}>Height (min/max) (mm):</h3>
          <input
            id="minHeight"
            name="minHeightInput"
            type="number"
            placeholder="Minimum height (mm)"
            value={minHeightMm}
            onChange={(e) => setMinHeightMm(e.target.value)}
            style={inputStyle200}
          />

          <input
            id="maxHeight"
            name="maxHeightInput"
            type="number"
            placeholder="Maximum height (mm)"
            value={maxHeightMm}
            onChange={(e) => setMaxHeightMm(e.target.value)}
            style={inputStyle200}
          />

          {/* Depth (min/max) inputs */}
          <h3 style={{ ...labelStyle, fontWeight: "bold", padding: "3px" }}>Depth (min/max) (mm):</h3>
          <input
            id="minDepth"
            name="minDepthInput"
            type="number"
            placeholder="Minimum depth (mm)"
            value={minDepthMm}
            onChange={(e) => setMinDepthMm(e.target.value)}
            style={inputStyle200}
          />

          <input
            id="maxDepth"
            name="maxDepthInput"
            type="number"
            placeholder="Maximum depth (mm)"
            value={maxDepthMm}
            onChange={(e) => setMaxDepthMm(e.target.value)}
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
                Depth: { r.min_depth_mm || "*" }mm min - { r.max_depth_mm || "*" }mm max
              </p>
            </div>
          </a>
        ))}
      </div>}
    </Layout>
  );
};