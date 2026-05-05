
import { RawRequest } from "@/services/requestService";
import { SimpleRequest } from "@/types/request";


// Maps the raw data of a single RawRequest to a SimpleRequest.
// Formats raw data and packages it in such a way that it is useful to the user interface.
export const mapToSimpleRequest = (row: RawRequest): SimpleRequest => ({

    // Request id.
    id: row.id,

    // Request min price.
    min_price: row.min_price_pence ? {
        pence: row.min_price_pence,
        currency: "GBP",
    } : null,

    // Request max price.
    max_price: row.max_price_pence ? {
        pence: row.max_price_pence,
        currency: "GBP",
    } : null,

    // Format dimensions with millimetre abbreviation.
    min_width_mm: row.min_width_mm ? `${row.min_width_mm}mm` : null,   // Optionally `-` out when not specified?
    max_width_mm: row.max_width_mm ? `${row.max_width_mm}mm` : null,
    min_height_mm: row.min_height_mm ? `${row.min_height_mm}mm` : null,
    max_height_mm: row.max_height_mm ? `${row.max_height_mm}mm` : null,
    min_depth_mm: row.min_depth_mm ? `${row.min_depth_mm}mm` : null,
    max_depth_mm: row.max_depth_mm ? `${row.max_depth_mm}mm` : null,

    // Customer id.
    customer_id: row.customers.id,

    // Computed customer name is composite of surname and forename.
    customer_name: `${row.customers.surname}, ${row.customers.forename}`,

    // Computed product type is composite of material and category names.
    product_type: `${row.materials.name} ${row.categories.name}`,
});


// Maps an array of RawRequests to an array of SimpleRequests.
export const mapToSimpleRequests = (rows: RawRequest[]): SimpleRequest[] => {

    if (rows.length === 0) {
        return;
    }
    
    return rows.map(mapToSimpleRequest);
};