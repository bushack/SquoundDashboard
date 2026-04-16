"use client";

import { useEffect, useState } from "react";
import { deleteCustomer, fetchCustomers } from "../../lib/customers";
import { cardStyle, inputStyleStretch, labelStyle } from "../../styles/ui";
import { useRouter } from "next/navigation";
import Layout from "../components/layout";


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


  // Handle customer deletion requests.
  const handleDelete = async (id: number) =>
  {
    const confirmed = confirm("Are you sure you want to delete this customer?\n\nThis action is permanent and not reversible.\n\nContinue?");
    if (confirmed == false) {
      return;
    }

    const { error } = await deleteCustomer(id);

    if (error) {
      console.error(error);
      alert("Error deleting customer");
    }
    else {
      await loadCustomers();
    }
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
    <Layout headerTitle="Home / Customers / Search" sidebarTitle="Squound">

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

      {/* Display fetched customers */}
      <div style={{ padding: "0px 0px", maxWidth: "800px" }}>

        {/* Search metadata */}
        { loading && <p style={{...labelStyle, padding: "3px"}}>Loading customers...</p>}
        { !loading && customers.length === 0 && <p style={{...labelStyle, padding: "3px"}}>No results</p> }
        { !loading && customers.length > 0 && <p style={{...labelStyle, padding: "3px"}}>{filteredCustomers.length} result(s)</p> }

        {/* Customer map */}
        { filteredCustomers.map((customer) => (
          <div
            key={customer.id}
            style={{...cardStyle, cursor: "pointer"}}
            onClick={() => router.push(`/customers/${customer.id}`)}
          >
            {/* Customer card */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h3 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "5px" }}>{customer.surname.toUpperCase()}, {customer.forename}</h3>
              <span style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "5px" }}>[{customer.id}]</span>
            </div>
            {/*<p><strong>Address: </strong></p><p style={{ marginBottom: "5px"}}>{customer.address || "N/A"}</p>*/}
            {/*<p><strong>Mobile: </strong></p><p style={{ fontSize: "14px", fontWeight: "normal", marginBottom: "5px"}}>{customer.mobile || "N/A"}</p>*/}
            {/*<p><strong>Email: </strong></p><p style={{ fontSize: "14px", fontWeight: "normal", marginBottom: "5px"}}>{customer.email || "N/A"}</p>*/}
            {/*<p><strong>Notes: </strong></p><p style={{ marginBottom: "5px"}}>{customer.notes || ""}</p>*/}

            {/*<div style={{ marginTop: "10px" }}>
              <button style={primaryButton}
                //onClick={() => startEdit(customer)}
              >
                Wishlist
              </button>

              <button style={primaryButton}
                //onClick={() => startEdit(customer)}
              >
                Edit
              </button>

              <button
                style={dangerButton}
                onClick={(e) => {e.stopPropagation(); handleDelete(Number(customer.id))}}
              >
                Delete
              </button>
        </div>*/}
          </div>
        ))}
      </div>
    </Layout>
  )
}