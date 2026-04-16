"use client";

import Layout from "../components/layout";
import CustomerForm from "../components/customers/customerForm";


export default function AddCustomerPage() {
  
  return (
    <Layout
      headerTitle="Home / Customers / Add"
    >

      <CustomerForm
        editingCustomer={null}
        onCancel={() => {}}
        onSubmit={() => {}}
      />

    </Layout>
  );
}