
import { supabase } from "@/lib/supabaseClient";

import type { SafeResult } from "@/types/safeResult";


const TABLE_NAME = "materials";


export type RawMaterial = {

    id: number,
    name: string
};


export async function fetchMaterialsSafe(): Promise<SafeResult<RawMaterial[]>> {

    try {
        const {data, error} = await supabase
        .from(TABLE_NAME)
        .select("*")
        .order("name", { ascending: true });

        // On error or no data.
        if (error || !data) {
            console.error("Materials not found", error ? error : "Unknown error");
            return {
                success: false,
                error: error?.message ?? "Materials not found"
            };
        }

        // On success.
        console.log("Materials found", data);
        return {
            success: true,
            data
        };

    // On unknown error
    } catch (error: any) {
        console.error("Materials not found due to unknown error", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error"
        };
    };
};