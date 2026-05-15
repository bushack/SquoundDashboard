
import { Money } from "@/types/money";


export type RequestFilter = {
    
    category_id: number;
    material_id?: number;
    min_price?: Money;
    max_price?: Money;
    width_mm?: number;
    height_mm?: number;
    depth_mm?: number;

    sort_by: string;
};