"use client";

import { useEffect, useState } from "react";
import { fetchCustomersSafe } from "@/services/customerService";
import { dangerButton200, inputStyleStretch, inputStyle200, labelStyle, primaryButton200, untabbedCard } from "../../styles/ui";
import { columns } from "../components/customers/customerColumns";
import { useRouter } from "next/navigation";
import { mapToCustomers } from "@/mappers/customerMapper";

import { CustomerProvider, useCustomers } from "@/context/customerContext";
import { DialogProvider, useDialog } from "@/context/dialogContext";

import { MESSAGES } from "@/constants/messages";

import type { Customer } from "@/types/customer";

import ExpandablePanel from "../components/generic/expandablePanel";
import GenericTable from "../components/generic/genericTable";
import Layout from "../components/layout";


export default function CustomersPage() {

  // Data.
  //const [customers, setCustomers] = useState<Customer[]>([]);
  const {customers, setCustomers} = useCustomers();
  
  // For toggling filter visibility.
  const [showFilter, setShowFilter] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);

  const [id, setId] = useState<number | null>(null);
  const [forename, setForename] = useState<string | null>(null);
  const [surname, setSurname] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(true);

  const {showDialog} = useDialog();

  const router = useRouter();


  const handleSubmit = async () => {

    // Disallow all NULL parameters (avoids fetching all customers).
    if ([id, forename, surname].every(v => v === null)) {
      showDialog({
        title: MESSAGES.SEARCH_CUSTOMER_TITLE,
        message: MESSAGES.SEARCH_CUSTOMER_MSG,
        onConfirm: () => null
      });
      return;
    }
    
    // Hide filter and show loading label on submit.
    setShowFilter(false);
    setLoading(true);

    const result = await fetchCustomersSafe({
      id,
      forename,
      surname
    });

    if (!result.success) {
      showDialog({
        title: MESSAGES.ERROR_GENERIC_TITLE,
        message: MESSAGES.ERROR_GENERIC_MSG,
        onConfirm: () => null
      });
    } else if (result.success && result.data) {
      setCustomers(mapToCustomers(result.data));
    }

    setLoading(false);
  };


  const handleReset = async () => {
    
    // Clear filter parameters.
    setId(null);
    setForename(null);
    setSurname(null);

    // Clear array.
    //setCustomers([]);
  };


  useEffect(() => {

    if (customers?.length > 0) {
      setShowFilter(false);
    }
  }, [customers]);


  return (
    <Layout headerText="Home / Customers / Search">

      <div style={untabbedCard}>

        {/* Search input */}
        <ExpandablePanel
          heading="Customer Search"
          subheading="Search for a customer by unique id or name"
          buttonText="Filter"
          expanded={showFilter}
          onToggle={() => setShowFilter(!showFilter)}
        >

          {/* Id input */}
          <h3 style={labelStyle}>Unique id:</h3>
          <input
            id="uniqueId"
            name="uniqueIdInput"
            type="text"
            inputMode="numeric"
            placeholder="Unique id"
            value={id ?? ""}
            onChange={(e) => setId(e.target.value === "" ? null : Number(e.target.value))}
            style={inputStyle200}
          />

          {/* Forename input */}
          <h3 style={labelStyle}>Forename:</h3>
          <input
            id="forename"
            name="forenameInput"
            type="text"
            placeholder="Forename"
            value={forename ?? ""}
            onChange={(e) => setForename(e.target.value === "" ? null : e.target.value)}
            style={inputStyle200}
          />

          {/* Surname input */}
          <h3 style={labelStyle}>Surname:</h3>
          <input
            id="surname"
            name="surnameInput"
            type="text"
            placeholder="Surname"
            value={surname ?? ""}
            onChange={(e) => setSurname(e.target.value === "" ? null : e.target.value)}
            style={inputStyle200}
          />

          {/* Submit & Reset buttons */}
          <div style={{ marginTop: "10px" }}>
            <button
              type="submit"
              style={primaryButton200}
              onClick={handleSubmit}
            >
              Submit
            </button>

            <button
              type="reset"
              style={dangerButton200}
              onClick={(e) => {e.stopPropagation(); handleReset()}}
            >
              Reset
            </button>
          </div>
        </ExpandablePanel>

        <GenericTable
          data={customers}
          loading={loading}
          //hidden={showFilter}
          hidden={customers?.length === 0 && !loading}
          columns={columns}
          getRowKey={(c) => c.id}
          onRowClick={(c) => router.push(`/customers/${c.id}`)}
        />
      </div>
    </Layout>
  )
}