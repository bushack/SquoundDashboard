"use client";

import { useEffect, useState } from "react";
import { fetchCustomersSafe } from "@/services/customerService";
import { inputStyleStretch } from "../../styles/ui";
import { columns } from "../components/customers/customerColumns";
import { useRouter } from "next/navigation";
import { mapToCustomers } from "@/mappers/customerMapper";

import type { Customer } from "@/types/customer";

import Layout from "../components/layout";
import GenericTable from "../components/generic/genericTable";


export default function CustomersPage() {

  // Data.
  const [customers, setCustomers] = useState<Customer[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(true)
  const router = useRouter();
  

  const loadCustomers = async () => {

    // TODO: Early exit if search filter parameters are all NULL (avoids fetching all customers)

    setLoading(true);

    const result = await fetchCustomersSafe({forename: "m", surname: "coll"});  // temp testing filter!

    if (!result.success) {
      // TODO: Show dialog.
    }
    else if (result.success && result.data) {
      setCustomers(mapToCustomers(result.data));
    }

    setLoading(false);
  };
  

  // DEPRECIATED: Old basic filtering system.
  const filteredCustomers = customers?.filter((customer) => {
    const term = searchTerm.toLowerCase();

    return (
      customer.forename?.toLowerCase().includes(term) ||
      customer.surname?.toLowerCase().includes(term)
    );
  });


  // Runs code when component loads
  useEffect(() => {
    loadCustomers();
  }, []);


  return (
    <Layout headerText="Home / Customers / Search">

      {/* Search input */}
      <input
        id="search"
        name="searchInput"
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          ...inputStyleStretch,
          maxWidth: "400px"
        }}
      />

      <GenericTable
        data={filteredCustomers}
        loading={loading}
        columns={columns}
        getRowKey={(c) => c.id}
        onRowClick={(c) => router.push(`/customers/${c.id}`)}
      />
      
    </Layout>
  )
}