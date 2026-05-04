
import { RawRequest } from "@/services/requestService";
import { SimpleRequest } from "@/types/request";


// Maps the raw data of a single RawRequest to a SimpleRequest.
// Formats raw data and packages it in such a way that it is useful to the user interface.
export const mapRawRequest = (row: RawRequest): SimpleRequest => ({

    // Request id.
    id: row.id,

    // Request max price.
    max_price: row.max_price_pence ? {
        pence: row.max_price_pence,
        currency: "GBP",
    } : null,

    // Customer id.
    customer_id: row.customers.id,

    // Computed customer name is composite of surname and forename.
    customer_name: `${row.customers.surname}, ${row.customers.forename}`,

    // Computed product type is composite of material and category names.
    product_type: `${row.materials.name} ${row.categories.name}`,
});


// Maps an array of RawRequests to an array of SimpleRequests.
export const mapRawRequests = (rows: RawRequest[]): SimpleRequest[] => rows.map(mapRawRequest);