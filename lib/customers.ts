
import { supabase } from "./supabaseClient";
import { Customer } from "@/types/customer";

const TABLE_NAME = "customers";


// Fetches a single customer entry from the database.
const fetchCustomer = async (id: number) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("id", id)
    .single();
    
    return { data, error };
};


// Fetches a single customer entry from the database.
export async function fetchCustomerSafe(id: number) {

  try {
    const result = await fetchCustomer(id);
    return {
      success: true, data: result.data
    };
  } catch (error: any) {
    return {
      success: false, error
    };
  }
};


// Fetches all customer entries from the database.
const fetchCustomers = async () => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .order("surname", { ascending: true });

  return { data, error };
};


// Fetches all customer entries from the database.
export async function fetchCustomersSafe() {

  try {
    const result = await fetchCustomers();
    return {
      success: true, data: result.data
    };
  } catch (error: any) {
    return {
      success: false, error
    };
  }
};


// Add a new customer entry to the database.
const addCustomer = async (customer: any) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert([customer]);

    console.log("Add result: ", {data, error});

    return { data, error };
};


// Add a new customer entry to the database.
export async function addCustomerSafe(customer: any) {

  try {
    const result = await addCustomer(customer);
    return {
      success: true, data: result.data
    };
  } catch (error: any) {
    return {
      success: false, error
    };
  }
};


// Update an existing customer entry within the database.
const updateCustomer = async (customer: Partial<Customer>) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update(customer)
    .eq("id", customer.id)
    .select()
    .single();

    console.log("Update result: ", {customer, data, error});

    return { data, error };
};


// Update an existing customer entry within the database
export async function updateCustomerSafe(customer: Partial<Customer>) {

  try {
    const result = await updateCustomer(customer);
    return {
      success: true, data: result.data, customer: result.customer
    };
  } catch (error: any) {
    return {
      success: false, error
    };
  }
};


// Delete an existing customer entry from the database.
const deleteCustomer = async (id: number) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq("id", id);

    return { data, error };
};


// Delete an existing customer entry from the database.
export async function deleteCustomerSafe(id: number) {

  try {
    const result = await deleteCustomer(id);
    return {
      success: true, data: result.data
    };
  } catch (error: any) {
    return {
      success: false, error
    };
  }
};