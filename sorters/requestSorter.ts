
import { SimpleRequest } from "@/types/request";


export type RequestSortField = 
  | "customerName"
  | "productType";


export type RequestSortDirection =
  | "asc"
  | "desc";


export interface RequestSortOptions {
  field: RequestSortField;
  direction: RequestSortDirection;
};


export function sortRequests (requests: SimpleRequest[], options: RequestSortOptions): SimpleRequest[] {

    // Destructure options variable.
    const {field, direction} = options;

    // Flips the sort direction between ascending and descending.
    const multiplier = direction === "asc" ? 1 : -1;

    if (!requests || requests.length === 0) {
        return;
    }

    return [...requests].sort((a, b) => {
        switch (field) {
        
            case "customerName":
                return multiplier * (a.customer_name ?? "").localeCompare(
                    b.customer_name ?? "",
                    undefined,
                    {sensitivity: "base"}
                );

            case "productType":
                return multiplier * (a.product_type ?? "").localeCompare(
                    b.product_type ?? "",
                    undefined,
                    {sensitivity: "base"}
                );

            default: {
                const _exhaustive: never = field;
                return _exhaustive;
            }
        }
    });
};