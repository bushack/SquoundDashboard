"use client";

import { useEffect, useState } from "react";
import { deleteCustomer, fetchCustomers } from "../../lib/customers";
import { untabbedCard, heading, inputStyleStretch, textStyle } from "../../styles/ui";
import { useRouter } from "next/navigation";

import Layout from "../components/layout";
import CustomerTable from "../components/customers/customerTable";
import GenericTable from "../components/generic/genericTable";


export default function CustomersPage() {

  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  

  const loadCustomers = async () => {
    setLoading(true);
    const { data, error } = await fetchCustomers();

    if (error) {
      console.error(error);
    } else {
      setCustomers(data || []);
    }

    setLoading(false);
  };
  

  const filteredCustomers = customers.filter((customer) => {
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
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          ...inputStyleStretch,
          maxWidth: "400px"
        }}
      />

      <CustomerTable
        customers={filteredCustomers}
        loading={loading}
      />
      
    </Layout>
  )
}