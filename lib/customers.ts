"use client";

import { supabase } from "./supabaseClient";
import { Customer } from "@/types/customer";

const TABLE_NAME = "customers";


// Fetches a single customer entry from the database.
export const fetchCustomer = async (id: number) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("id", id)
    .single();
    
    return { data, error };
};


// Fetches all customer entries from the database.
export const fetchCustomers = async () => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .order("surname", { ascending: true });

  return { data, error };
};


// Add a new customer entry to the database.
export const addCustomer = async (customer: any) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert([customer]);

    console.log("Add result: ", {data, error});

    return { data, error };
};


// Update an existing customer entry within the database.
export const updateCustomer = async (customer: Partial<Customer>) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update(customer)
    .eq("id", customer.id)
    .select()
    .single();

    console.log("Update result: ", {customer, data, error});

    return { data, error };
};


// Delete an existing customer entry from the database.
export const deleteCustomer = async (id: number) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq("id", id);

    return { data, error };
};