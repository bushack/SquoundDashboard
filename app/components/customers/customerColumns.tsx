
import Link from "next/link";

import { Customer } from "@/types/customer";


  export const columns: Column<Customer>[] = [
    {
      key: "id",
      header: "Id.",
      accessor: (c) => c.id,
    },
    {
      key: "surname",
      header: "Surname",
      accessor: (c) => c.surname,
    },
    {
      key: "forename",
      header: "Forename",
      accessor: (c) => c.forename,
    },
    {
      key: "phone",
      header: "Phone",
      accessor: (c) => c.mobile,
    },
    {
      key: "email",
      header: "Email",
      accessor: (c) => c.email,
    },
    {
      key: "view",
      header: "New tab",
      accessor: (c) => (
        <Link
          href={`/customers/${c.id}`}
          onClick={(e) => e.stopPropagation()}
          target="_blank"
          rel="noopener noreferrer"
        >
          View
        </Link>
      ),
    },
  ];