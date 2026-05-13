
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


export async function addCustomerSafe(customer: any): Promise<SafeResult<RawCustomer>> {

    try {
        const {data, error} = await supabase
        .from(TABLE_NAME)
        .insert([customer])
        .select();

        // On error or no data.
        if (error || !data) {
            console.error(`Customer not created`, error ? error : "Unknown error");
            return {
                success: false,
                error: error?.message ?? "Customer not created"
            };
        }

        // On success.
        console.log(`Customer [${data.id}] created`, data);
        return {
            success: true,
            data
        };

    // On unknown error
    } catch (error: any) {
        console.error("Customer not created due to unknown error", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error"
        };
    };
};


export async function deleteCustomerSafe(id: number): Promise<SafeResult<RawCustomer>> {

    try {
        const {data, error} = await supabase
        .from(TABLE_NAME)
        .delete()
        .eq("id", id)
        .select();

        // On error or no data.
        if (error || !data) {
            console.error(`Customer [${id}] not deleted`, error ? error : "Unknown error");
            return {
                success: false,
                error: error?.message ?? "Customer not deleted"
            };
        }

        // On success.
        console.log(`Customer [${id}] deleted`, data);
        return {
            success: true,
            data
        };

    // On unknown error.
    } catch (error: any) {
        console.error(`Customer [${id}] not deleted due to unknown error`, error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error"
        };
    }
};


export async function fetchCustomerSafe(id: number): Promise<SafeResult<RawCustomer>> {

    try {
        const {data, error} = await supabase
        .from(TABLE_NAME)
        .select("*")
        .eq("id", id)
        .single();

        // On error or no data.
        if (error || !data) {
            console.error(`Customer [${id}] not found`, error ? error : "Unknown error");
            return {
                success: false,
                error: error?.message ?? "Customer not found"
            };
        }

        // On success.
        console.log(`Customer [${id}] found`, data);
        return {
            success: true,
            data
        };

    // On unknown error.
    } catch (error: any) {
        console.error(`Customer [${id}] not found due to unknown error`, error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error"
        };
    }
};


// Note:
// Performance of ILIKE '%value%' can suffer from inefficiency on large datasets.
// Should this happen, potential solutions include:
// Trigram indexes (pg_trgm),
// Full text searches,
// Prefix-only searches (value%)
export async function fetchCustomersSafe (filter: CustomerFilter): Promise<SafeResult<RawCustomer[]>> {

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
        const {data, error} = await query;

        // On error or no data.
        if (error || !data) {
            console.error(`Customers not found`, error ? error : "Unknown error");
            return {
                success: false,
                error: error?.message ?? "Customers not found"
            };
        }

        // On success.
        console.log(`Customers found`, data);
        return {
            success: true,
            data: data ?? []
        };

    // On unknown error.
    } catch (error: any) {
        console.error(`Customers not found due to unknown error`, error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error"
        };
    }
};


export async function updateCustomerSafe(customer: Partial<Customer>): Promise<SafeResult<RawCustomer>> {

    try {
        const { data, error } = await supabase
        .from(TABLE_NAME)
        .update(customer)
        .eq("id", customer.id)
        .select()
        .single();

        // On error or no data.
        if (error || !data) {
            console.error(`Customer [${customer.id}] not updated`, error ? error : "Unknown error");
            return {
                success: false,
                error: error?.message ?? `Customer [${customers.id}] not updated`
            };
        }

        // On success.
        console.log(`Customer [${customer.id}] updated`, data);
        return {
            success: true,
            data
        };

    // On unknown error.
    } catch (error: any) {
        console.error(`Customer [${customer.id}] not updated due to unknown error`, error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error"
        };
    }
};