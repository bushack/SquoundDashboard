"use client";

import { useEffect, useState } from "react";
import { deleteCustomer, fetchCustomersSafe } from "../../lib/customers";
import { untabbedCard, heading, inputStyleStretch, textStyle } from "../../styles/ui";
import { useRouter } from "next/navigation";

import Layout from "../components/layout";
import { columns } from "../components/customers/customerColumns";
import GenericDialog from "../components/generic/genericDialog";
import GenericTable from "../components/generic/genericTable";


export default function CustomersPage() {

  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(true)
  const router = useRouter();
  

  const loadCustomers = async () => {

    setLoading(true);

    const result = await fetchCustomersSafe();

    if (!result.success) {
      //TODO: Display UI message.
    }
    else if (result.success && result.data) {
      setCustomers(result.data || []);
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

      <GenericTable
        data={filteredCustomers}
        loading={loading}
        columns={columns}
        getRowKey={(c) => c.id}
        onRowClick={(c) => router.push(`/customers/${c.id}`)}
      />

      <GenericDialog
        isOpen={dialogOpen}
        title={"Delete Customer"}
        message={"Are you sure you want to delete this customer?\n\n" + "This action will result in the deletion of the customer and all associated data. This action is permanent and is not reversible.\n\n" + "Continue?"}
        //onClose={() => (null)}
        onCancel={() => setDialogOpen(false)}
        onConfirm={() => setDialogOpen(false)}
      />
      
    </Layout>
  )
}