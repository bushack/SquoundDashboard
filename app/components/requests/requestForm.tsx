"use client"

import { useEffect, useState } from "react";
import { fetchCategories, fetchMaterials } from "@/lib/lookups";
import { addRequest } from "@/lib/requests";
import { tabbedCard, dangerButton200, dropdownStyle, heading, inputStyle200, labelStyle, primaryButton200 } from "@/styles/ui";

import CurrencyInput from "../currency/currencyInput";

// Types.
import { Customer } from "@/types/customer";
import { Category } from "@/types/category";
import { Material } from "@/types/material";
import { Money } from "@/types/money";

// Config and constants.
import { UI_TOAST_TIMEOUT, CURRENCY_INPUT_MAX_DIGITS } from "@/config/app";
import { MESSAGES } from "@/constants/messages";


type Properties = {
    customer: Customer;
    onSuccess: () => void;
};


export default function RequestForm({
    customer,
    onSuccess
}: Properties) {

    // Request metadata.
    const [categoryId, setCategoryId] = useState("");
    const [materialId, setMaterialId] = useState("");
    const [minPrice, setMinPrice] = useState<Money | null>(null);
    const [maxPrice, setMaxPrice] = useState<Money | null>(null);
    const [minWidthMm, setMinWidthMm] = useState("");
    const [maxWidthMm, setMaxWidthMm] = useState("");
    const [minHeightMm, setMinHeightMm] = useState("");
    const [maxHeightMm, setMaxHeightMm] = useState("");
    const [minDepthMm, setMinDepthMm] = useState("");
    const [maxDepthMm, setMaxDepthMm] = useState("");

    // Lookup arrays for dropdown menus.
    const [categories, setCategories] = useState<Category[]>([]);
    const [materials, setMaterials] = useState<Material[]>([]);

    // Anti-spam.
    const [isBusy, setIsBusy] = useState<Boolean>(false);
    
    // UI feedback.
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Currency formatting regex (strict, enforces two decimal places).
    const priceRegex = /^\d+(\.\d{2})?$/;


    // Display UI success message.
    const displaySuccessMessage = (message: string) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(""), UI_TOAST_TIMEOUT);
    };


    // Display UI error message.
    const displayErrorMessage = (message: string) => {
        setErrorMessage(message);
        setTimeout(() => setErrorMessage(""), UI_TOAST_TIMEOUT);
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


    // Runs when component loads.
    useEffect(() => {
      
        // Check customer is present.
        if (!customer) {
            console.error("No customer");
            return;
        }
  
        // Load lookups for dropdowns.
        loadLookups();
  
    }, []);


    // Handle submit.
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!customer) {
            return;
        }

        // Validate category.
        if (!categoryId.trim()) {
            displayErrorMessage("Category is required");
            return;
        }
        
        // Validate price.
        if (minPrice && maxPrice && minPrice.pence > maxPrice.pence) {
            displayErrorMessage(MESSAGES.ERROR_PRICE_VALIDATION);
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

        try {
            setIsBusy(true);
        
            const { error } = await addRequest({
                customer_id: customer.id,
                category_id: categoryId ? Number(categoryId) : null,
                material_id: materialId ? Number(materialId) : null,
                min_price_pence: minPrice ? minPrice.pence : null,
                max_price_pence: maxPrice ? maxPrice.pence : null,
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
        
                // Reset form.
                handleReset();
            
                // Run success logic of parent component/page.
                onSuccess();
            }
        } finally {
            setIsBusy(false);
        }
    };


    // Real-time sanitization of currency input strings.
    const sanitizeCurrencyInput = (value: string) : string => {

        // Remove all non-numeric characters.
        value = value.replace(/[^0-9]/gi, "");

        // Enforce upper-limit on number of digits.
        return value.slice(0, CURRENCY_INPUT_MAX_DIGITS);
    };


    // Handle reset.
    const handleReset = async () => {
        setCategoryId("");
        setMaterialId("");
        setMinPrice(null);
        setMaxPrice(null);
        setMinWidthMm("");
        setMaxWidthMm("");
        setMinHeightMm("");
        setMaxHeightMm("");
        setMinDepthMm("");
        setMaxDepthMm("");
      };


    // Render.
    return (
        <div style={tabbedCard}>
            <h3 style={heading}>New Request</h3>
            <form
                onSubmit={handleSubmit}
            >
                {/* Category dropdown menu */}
                <h3 style={{ ...labelStyle, padding: "3px" }}>Category:</h3>

                <select
                    id="category"
                    name="categorySelect"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    style={dropdownStyle}
                >
                <option value="">Select category</option>

                {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                        { c.name }
                    </option>
                ))}
                </select>

                {/* Material dropdown menu */}
                <h3 style={{ ...labelStyle, padding: "3px" }}>Material:</h3>
                
                <select
                    id="material"
                    name="materialSelect"
                    value={materialId}
                    onChange={(e) => setMaterialId(e.target.value)}
                    style={dropdownStyle}
                >
                <option value="">Select material</option>

                {materials.map((m) => (
                    <option key={m.id} value={m.id}>
                        { m.name }
                    </option>
                ))}
                </select>

                {/* Min Price input */}
                <h3 style={{...labelStyle, padding: "3px"}}>Price (min/max) (£):</h3>
                <CurrencyInput
                    id="minPrice"
                    name="minPriceInput"
                    value={minPrice}
                    placeholder={"Minimum price (£)"}
                    onChange={setMinPrice}
                />

                {/* Max Price input */}
                <CurrencyInput
                    id="maxPrice"
                    name="maxPriceInput"
                    value={maxPrice}
                    placeholder={"Maximum price (£)"}
                    onChange={setMaxPrice}
                />

                {/* Min Width input */}
                <h3 style={{...labelStyle, padding: "3px"}}>Width (min/max) (mm):</h3>
                <input
                    id="minWidth"
                    name="minWidthInput"
                    type="number"
                    placeholder="Minimum width (mm)"
                    value={minWidthMm}
                    onChange={(e) => setMinWidthMm(e.target.value)}
                    style={inputStyle200}
                />

                {/* Max Width input */}
                <input
                    id="maxWidth"
                    name="maxWidthInput"
                    type="number"
                    placeholder="Maximum width (mm)"
                    value={maxWidthMm}
                    onChange={(e) => setMaxWidthMm(e.target.value)}
                    style={inputStyle200}
                />

                {/* Min Height input */}
                <h3 style={{...labelStyle, padding: "3px"}}>Height (min/max) (mm):</h3>
                <input
                    id="minHeight"
                    name="minHeightInput"
                    type="number"
                    placeholder="Minimum height (mm)"
                    value={minHeightMm}
                    onChange={(e) => setMinHeightMm(e.target.value)}
                    style={inputStyle200}
                />

                {/* Max Height input */}
                <input
                    id="maxHeight"
                    name="maxHeightInput"
                    type="number"
                    placeholder="Maximum height (mm)"
                    value={maxHeightMm}
                    onChange={(e) => setMaxHeightMm(e.target.value)}
                    style={inputStyle200}
                />

                {/* Min Depth input */}
                <h3 style={{...labelStyle, padding: "3px"}}>Depth (min/max) (mm):</h3>
                <input
                    id="minDepth"
                    name="minDepthInput"
                    type="number"
                    placeholder="Minimum depth (mm)"
                    value={minDepthMm}
                    onChange={(e) => setMinDepthMm(e.target.value)}
                    style={inputStyle200}
                />

                {/* Max Depth input */}
                <input
                    id="maxDepth"
                    name="maxDepthInput"
                    type="number"
                    placeholder="Maximum depth (mm)"
                    value={maxDepthMm}
                    onChange={(e) => setMaxDepthMm(e.target.value)}
                    style={inputStyle200}
                />

                {/* Buttons */}
                <div style={{ marginTop: "10px" }}>
                
                    {/* Submit button */}
                    <button
                        type="submit"
                        disabled={isBusy}
                        style={ primaryButton200 }
                    >
                        Submit
                    </button>

                    {/* Reset button */}
                    <button
                        type="reset"
                        style={ dangerButton200 }
                        onClick={() => handleReset()}
                    >
                        Reset
                    </button>

                    {/* Where to put messages? Modal/dialog box? */}
                    { successMessage && <span style={{color: "green"}}>{successMessage}</span>}
                    { errorMessage && <span style={{color: "red"}}>{errorMessage}</span>}
                </div>
            </form>
        </div>
    );
}