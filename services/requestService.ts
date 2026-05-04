
import { supabase } from "@/lib/supabaseClient";


const TABLE_NAME = "requests";


// Matches the raw structure of the data fetched.
export type RawRequest = {
    
    id: number;
    max_price_pence: number;

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


export const fetchRequests = async (): Promise<RawRequest[]> => {
    
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
};