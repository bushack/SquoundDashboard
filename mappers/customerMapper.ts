
import type { Customer } from "@/types/customer";
import type { RawCustomer } from "@/services/customerService";


// Maps the raw data of a single RawCustomer to a Customer.
// Formats raw data and packages it in such a way that it is useful to the user interface.
export const mapToCustomer = (row: RawCustomer): Customer => ({

//  Customer            Raw Customer
    id:                 row.id,
    forename:           row.forename ? row.forename : null,
    surname:            row.surname ? row.surname : null,
    //name:               row.forename && row.surname ? `${row.surname.toUpperCase()}, ${row.forename}` : null,
    name:               row.forename && row.surname ? `${row.forename} ${row.surname}` : null,
    address_line_1:     row.address_line_1 ? row.address_line_1 : null,
    address_line_2:     row.address_line_2 ? row.address_line_2 : null,
    town_city:          row.town_city ? row.town_city : null,
    region:             row.region ? row.region : null,
    postcode:           row.postcode ? row.postcode : null,
    mobile:             row.mobile ? row.mobile : null,
    email:              row.email ? row.email : null,
    notes:              row.notes ? row.notes : null,
});


// Maps an array of RawCustomers to an array of Customers.
export const mapToCustomers = (rows: RawCustomers[]): Customer[] => {
    
    if (rows.length === 0) {
        return;
    }

    return rows.map(mapToCustomer);
};