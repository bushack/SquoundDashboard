"use client"

export type Request = {
    id: number;
    customer_id: number;
    category_id: number;
    material_id?: number;
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