
import { supabase } from "@/lib/supabaseClient";
import { CustomerFilter } from "@/filters/customerFilter";

import type { SafeResult } from "@/types/safeResult";


const TABLE_NAME = "customers";


export type RawCustomer = {

    id: number,
    forename: string,
    surname: string,
    address_line_1?: string,
    address_line_2?: string,
    town_city?: string,
    region?: string,
    postcode?: string,
    mobile?: string,
    email?: string,
    notes?: string,
};


// Note:
// Performance of ILIKE '%value%' can suffer from inefficiency on large datasets.
// Should this happen, potential solutions include:
// Trigram indexes (pg_trgm),
// Full text searches,
// Prefix-only searches (value%)
export const fetchCustomersSafe = async (filter: CustomerFilter): Promise<SafeResult<RawCustomer[]>> => {

    let query = supabase
    .from(TABLE_NAME)
    .select("*")
    .order("surname", { ascending: true })
    .order("forename", { ascending: true });

    if (filter.id != null) {
        query = query.eq("id", filter.id);
    }

    if (filter.forename != null) {
        
        // Trim whitespace and use wildcards (%${name}%)
        const cleanedForename = filter.forename.trim();

        // Note: See comment above regarding use of ILIKE '%value%'.
        query = query.ilike("forename", `%${cleanedForename}%`);
    }

    if (filter.surname != null) {
        
        // Trim whitespace.
        const cleanedSurname = filter.surname.trim();

        // Note: See comment above regarding use of ILIKE '%value%'.
        query = query.ilike("surname", `%${cleanedSurname}%`);
    }

    try {
        const { data, error } = await query;

        if (error) {
            return {
                success: false,
                error: error?.message ?? "Customers not found"
            };
        }

        return {
            success: true,
            data: data ?? []
        };

    } catch (error: any) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error"
        };
    }
};