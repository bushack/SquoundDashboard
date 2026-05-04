"use client"

import { Money } from "@/types/money";


export type Request = {
    id: number;
    customer_id: number;
    category_id: number;
    material_id?: number;
    min_price?: Money;
    max_price?: Money;
    min_width_mm?: number;
    max_width_mm?: number;
    min_height_mm?: number;
    max_height_mm?: number;
    min_depth_mm?: number;
    max_depth_mm?: number;
    description?: string;

    // Relational joins.
    categories?: { name: string };
    materials?: { name: string };
};


export type SimpleRequest = {
  id: number;
  max_price?: Money;
  customer_id: number;
  customer_name: string;
  product_type: string;
};