
import { supabase } from "@/lib/supabaseClient";
import { RequestFilter } from "@/filters/requestFilter";
import { QueryBuilder } from "@/utils/queryBuilder";
import { buildDimensionFilter, buildPriceFilter } from "@/utils/filters";
import { applyDimensionFilter, applyPriceFilter } from "@/utils/filters";


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


/*export const fetchRequests = async (filter: RequestFilter): Promise<RawRequest[]> => {
    
    const { data, error } = await supabase
    .from(TABLE_NAME)
    .select(`
        id,
        max_price_pence,
        customers (
            id,
            forename,
            surname
        ),
        categories (
            name
        ),
        materials (
            name
        )`
    );

    if (error) {
        console.error(error);
        throw new Error(error.message);
    }

    return data ?? [];
};*/


export const fetchRequests = async (filter: RequestFilter): Promise<RawRequest[]> => {
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
  
  /*const combinedFilterParts: string[] = [];
  // Price.
  {
    const priceFilter = buildPriceFilter(
      filter.min_price,
      filter.max_price,
      true // Include NULLs.
    );

    if (priceFilter) {
      combinedFilterParts.push(priceFilter);
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
      combinedFilterParts.push(dimensionFilter);
    }
  }

  // Append the queries in the builder to the query variable.
  query = qb.apply(query);
  
  const finalFilter = combinedFilterParts.length > 0
    ? `and(${combinedFilterParts.join(",")})`
    : null;

  if (finalFilter) {
    query = query.or(finalFilter);
  }*/

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  console.log("data size: ", data.length);

  return data ?? [];
};