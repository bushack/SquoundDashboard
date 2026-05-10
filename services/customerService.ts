
import { supabase } from "@/lib/supabaseClient";
import { CustomerFilter } from "@/filters/customerFilter";


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


export type SafeResult<T> = 
    | { success: true, data: T }
    | { success: false, error: unknown };


export const fetchCustomersSafe = async (filter: CustomerFilter): Promise<SafeResult<RawCustomer[]>> => {

    let query = supabase
    .from(TABLE_NAME)
    .select("*")
    .order("surname", { ascending: true });

    if (filter.id != null) {
        query = query.eq("id", filter.id);
    }

    if (filter.forename != null) {
        
        // Trim whitespace and use wildcards (%${name}%)
        const cleanedForename = filter.forename.trim();
        query = query.ilike("forename", `%${cleanedForename}%`);
    }

    if (filter.surname != null) {
        
        // Trim whitespace.
        const cleanedSurname = filter.surname.trim();
        query = query.ilike("surname", `%${cleanedSurname}%`);
    }

    try {
        const { data, error } = await query;

        if (error) {
            return {
                success: false,
                error
            };
        }

        return {
            success: true,
            data: data ?? []
        };

    } catch (error: any) {
        return {
            success: false,
            error
        };
    }
};