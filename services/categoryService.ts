
import { supabase } from "@/lib/supabaseClient";

import type { SafeResult } from "@/types/safeResult";


const TABLE_NAME = "categories";


export type RawCategory = {

    id: number,
    name: string
};


export async function fetchCategoriesSafe(): Promise<SafeResult<RawCategory[]>> {

    try {
        const {data, error} = await supabase
        .from(TABLE_NAME)
        .select("*")
        .order("name", { ascending: true });

        // On error or no data.
        if (error || !data) {
            console.error("Categories not found", error ? error : "Unknown error");
            return {
                success: false,
                error: error?.message ?? "Categories not found"
            };
        }

        // On success.
        console.log("Categories found", data);
        return {
            success: true,
            data
        };

    // On unknown error
    } catch (error: any) {
        console.error("Categories not found due to unknown error", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error"
        };
    };
};