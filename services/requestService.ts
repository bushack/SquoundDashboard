
import type { SimpleRequest } from "@/types/request";
import type { SafeResult } from "@/types/safeResult";
import type { RequestSortOptions } from "@/sorters/requestSorter";

import { fetchRequestsSafe } from "@/repositories/requestRepository";
import { mapToSimpleRequests } from "@/mappers/requestMapper";
import { sortRequests } from "@/sorters/requestSorter";


export async function getRequests(
    filter: RequestFilter,
    options: RequestSortOptions
): Promise<SafeResult<SimpleRequest[]>> {

    const result = await fetchRequestsSafe(filter);

    if (!result.success) {
        return {
            success: false,
            error: "Unable to fetch requests"
        };
    }

    const sortedData = sortRequests(mapToSimpleRequests(result.data), options);
    return {
        success: true,
        data: sortedData
    };
};