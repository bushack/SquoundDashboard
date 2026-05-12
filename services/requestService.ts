
import { supabase } from "@/lib/supabaseClient";
import { RequestFilter } from "@/filters/requestFilter";

import { buildDimensionFilter, buildPriceFilter } from "@/utils/filters";
import { applyDimensionFilter, applyPriceFilter } from "@/utils/filters";

import type { SafeResult } from "@/types/safeResult";


const TABLE_NAME = "requests";


// Matches the raw structure of the data fetched.
export type RawRequest = {
    
    id: number;
    min_price_pence?: number;
    max_price_pence?: number;
    min_width_mm?: number;
    max_width_mm?: number;
    min_height_mm?: number;
    max_height_mm?: number;
    min_depth_mm?: number;
    max_depth_mm?: number;

    customers: {
        id: number;
        forename: string;
        surname: string;
    } | null;

    categories: {
        name: string;
    } | null;

    materials: {
        name: string;
    } | null;
};


export const addRequestSafe = async (request: any): Promise<SafeResult<RawRequest>> => {
  
  try {
    const {data, error} = await supabase
    .from(TABLE_NAME)
    .insert([request])
    .select();
  
    // On error or no data.
    if (error || !data) {
      return {
        success: false,
        error: error?.message ?? "Request not created"
      };
    }

    // On success.
    return {
      success: true,
      data
    };

  // On unknown error.
  } catch (error: any) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
};


export const deleteRequestSafe = async (requestId: number): Promise<SafeResult<RawRequest>> => {
  
  try {
    const {data, error} = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq("id", requestId)
    .select();

    // On error or no data.
    if (error || !data) {
      return {
        success: false,
        error: error?.message ?? "Request not deleted"
      };
    }

    return {
      success: true,
      data
    };

  } catch (error: any) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    }
  };
};


export const fetchRequestSafe = async (requestId: number): Promise<SafeResult<RawRequest>> => {
  
  try {
    const {data, error} = await supabase
    .from(TABLE_NAME)
    .select(`
      *,
      categories (name),
      materials (name),
      customer (forename, surname)
    `)
    .eq("id", requestId)
    .single();

    // On error or no data.
    if (error || !data) {
      return {
        success: false,
        error: error?.message ?? "Request not found"
      };
    }

    // On success.
    return {
      success: true,
      data
    };

  // On unknown error.
  } catch (error: any) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
};


export const fetchRequestsSafe = async (filter: RequestFilter): Promise<SafeResult<RawRequest[]>> => {

  let query = supabase
    .from(TABLE_NAME)
    .select(`
      *,
      customers (*),
      categories (name),
      materials (name)
    `);

  // Category.
  if (filter.category_id != null) {
    //qb.addAnd("category_id", "eq", filter.category_id);
    query = query.eq("category_id", filter.category_id);
  }

  // Material.
  if (filter.material_id != null) {
    //qb.addAnd("material_id", "eq", filter.material_id);
    query = query.eq("material_id", filter.material_id);
  }
  
  query = applyPriceFilter(query, filter.min_price, filter.max_price);
  query = applyDimensionFilter(query, filter.width_mm, filter.height_mm, filter.depth_mm);

  try {
    const {data, error} = await query;

    // On error or no data.
    if (error || !data) {
      return {
        success: false,
        error: error?.message ?? "Requests not found"
      };
    }

    // On success.
    return {
      success: true,
      data
    };

  // On unknown error.
  } catch (error: any) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
};