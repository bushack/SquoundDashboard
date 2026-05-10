
export type Customer = {
    id: number;
    forename: string;
    surname: string;
    name?: string;
    address_line_1?: string;
    address_line_2?: string;
    town_city?: string;
    region?: string;
    postcode?: string;
    mobile?: string;
    email?: string;
    notes?: string;
  };