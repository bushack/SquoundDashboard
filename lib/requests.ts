"use client";

import { supabase } from "./supabaseClient"

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


export const searchRequests = async (filters: any) => {
  let query = supabase
    .from("requests")
    .select(`
    *,
    customers (*),
    categories (name),
    materials (name)
  `);

  if (filters.category_id) {
    query = query.eq("category_id", filters.category_id);
  }

  if (filters.material_id) {
    query = query.eq("material_id", filters.material_id);
  }

  if (filters.min_width_mm) {
    query = query.gte("min_width_mm", filters.min_width_mm);
  }

  if (filters.max_width_mm) {
    query = query.lte("max_width_mm", filters.max_width_mm);
  }

  if (filters.min_height_mm) {
    query = query.gte("min_height_mm", filters.min_height_mm);
  }

  if (filters.max_height_mm) {
    query = query.lte("max_height_mm", filters.max_height_mm);
  }

  if (filters.min_depth_mm) {
    query = query.gte("min_depth_mm", filters.min_depth_mm);
  }

  if (filters.max_depth_mm) {
    query = query.lte("max_depth_mm", filters.max_depth_mm);
  }

  const { data, error } = await query;

  return { data, error };
};