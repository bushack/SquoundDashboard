"use client"

import { React } from "react"
import { Customer } from "@/types/customer";
import { table, tableHeader, tableRow, untabbedCard } from "@/styles/ui";
import { useRouter } from "next/navigation";

import Link from "next/link";


type Properties = {
    customers: Customer[];
    loading: boolean;
};


type Column<T> = {
    key: string;
    header: string;
    accessor: (item: T) => React.ReactNode;
};


export default function CustomerTable({
    customers,
    loading,
}: Properties) {

    const router = useRouter();

    const columns: Column<Customer>[] = [
        { header: "Id.", accessor: (c) => c.id },
        { header: "Surname", accessor: (c) => c.surname },
        { header: "Forename", accessor: (c) => c.forename },
        { header: "Phone", accessor: (c) => c.mobile },
        { header: "Email", accessor: (c) => c.email },
        { header: "New tab", accessor: (c) => (
            <Link
                href={`/customers/${c.id}`}
                target="_blank"
                onClick={(e) => e.stopPropagation()}
            >
                View
            </Link>
        ), },
    ];
    
    return (

        <div style={untabbedCard}>

            <div style={{margin: "5px 2px", fontSize: "10pt"}}>
                { loading && <p>Loading...</p>}
                { !loading && customers.length === 0 && <p>No results</p> }
                { !loading && customers.length > 0 && <p>{customers.length} customer(s) found</p> }
            </div>
            
            <table style={table}>
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                style={tableHeader}
                            >
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {customers.map((customer) => (
                        <tr
                            key={customer.id}
                            className="hover:bg-gray-100"
                            onClick={() => router.push(`/customers/${customer.id}`)}
                        >
                            {columns.map((col) => (
                                <td key={col.key} style={tableRow}>{col.accessor(customer)}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}