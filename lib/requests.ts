"use client";

import { supabase } from "./supabaseClient";
import { Request } from "@/types/request";
//TODO: Make use of the 'Request' type instead of using type 'any'.
//TODO: Use safe functions (see 'lib/customers' for examples).

const TABLE_NAME = "requests";


export const addRequest = async (request: any) => {
  const { data, error } = await supabase
  .from(TABLE_NAME)
  .insert([request]);

  return { data, error };
};


export const deleteRequest = async (requestId: number) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq("id", requestId);

    return { data, error };
};


export const fetchRequests = async (customerId: number) => {
  const { data, error } = await supabase
  .from(TABLE_NAME)
  .select(`
    *,
    categories (name),
    materials (name)
  `)
  .eq("customer_id", customerId);

  return { data, error };
};


export const fetchRequestsMapped = async (customerId: number) : Request[] => {
  
  const { data, error } = await fetchRequests(customerId);

  return data.map((row) => ({
    id: row.id,
    customer_id: row.customer_id,
    category_id: row.category_id,
    material_id: row.material_id,
    min_price: row.min_price_pence != null ? { pence: row.min_price_pence, currency: "GBP" } : null,
    max_price: row.max_price_pence != null ? { pence: row.max_price_pence, currency: "GBP" } : null,
    min_width_mm: row.min_width_mm,
    max_width_mm: row.max_width_mm,
    min_height_mm: row.min_height_mm,
    max_height_mm: row.max_height_mm,
    min_depth_mm: row.min_depth_mm,
    max_depth_mm: row.max_depth_mm,
    description: row.description,

    // Relational joins.
    categories: { name: row.categories.name },
    materials: { name: row.materials.name },
  }));
};