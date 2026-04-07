/*
*   lookups.ts
*
*   Simple database lookup functions for fetching all rows from a particular table.
*/

"use client";

import { supabase } from "./supabaseClient"


// Fetches all product categories.
export const fetchCategories = async () => {
  return await supabase
  .from("categories")
  .select("*")
  .order("name", { ascending: true });
};


// Fetches all product materials.
export const fetchMaterials = async () => {
  return await supabase
  .from("materials")
  .select("*")
  .order("name", { ascending: true });
};