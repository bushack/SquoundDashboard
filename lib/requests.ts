"use client";

import { supabase } from "./supabaseClient";
import { Request } from "@/types/request";
import { RequestFilter } from "@/filters/requestFilter";
import { QueryBuilder } from "@/utils/queryBuilder";
import { buildDimensionFilter, buildPriceFilter } from "@/utils/filters";
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


export const searchRequests = async (filter: RequestFilter) => {
  let query = supabase
    .from(TABLE_NAME)
    .select(`
    *,
    customers (*),
    categories (name),
    materials (name)
  `);

  const qb = new QueryBuilder();

  // Category.
  if (filter.category_id != null) {
    qb.addAnd("category_id", "eq", filter.category_id);
  }

  // Material.
  if (filter.material_id != null) {
    qb.addAnd("material_id", "eq", filter.material_id);
  }

  // Price.
  {
    const priceFilter = buildPriceFilter(
      filter.min_price,
      filter.max_price,
      true // Include NULLs.
    );

    if (priceFilter) {
      qb.addOr(priceFilter);
    }
  }

  // Dimensions.
  {
    const dimensionFilter = buildDimensionFilter(
      filter.width_mm,
      filter.height_mm,
      filter.depth_mm,
      true
    );

    if (dimensionFilter) {
      qb.addOr(dimensionFilter);
    }
  }

  // Append the queries in the builder to the query variable.
  query = qb.apply(query);

  const { data, error } = await query;

  return { data, error };
};