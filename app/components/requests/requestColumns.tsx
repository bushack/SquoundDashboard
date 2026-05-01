
import Link from "next/link";

import { Request } from "@/types/request";
import { format } from "@/lib/money";


  export const columns: Column<Request>[] = [
    
    // Request id.
    /*{
      key: "id",
      header: "Id.",
      accessor: (r) => r.id,
    },*/

    // Category.
    {
      key: "category",
      header: "Category",
      accessor: (r) => r.categories?.name,
    },

    // Material.
    {
      key: "material",
      header: "Material",
      accessor: (r) => r.materials?.name,
    },

    // Minimum price.
    /*{
      key: "minPrice",
      header: "Min Price (£)",
      accessor: (r) => format(r.min_price),
    },*/

    // Maximum price.
    {
      key: "maxPrice",
      header: "Max Price",
      accessor: (r) => r.max_price ? format(r.max_price) : null,
    },

    // Minimum width.
    /*{
        key: "minWidth",
        header: "Min Width (mm)",
        accessor: (r) => r.min_width_mm,
    },*/

    // Maximum width.
    {
        key: "maxWidth",
        header: "Max Width",
        accessor: (r) => r.max_width_mm ? `${r.max_width_mm}mm` : null,
    },

    // Minimum height.
    /*{
        key: "minHeight",
        header: "Min Height (mm)",
        accessor: (r) => r.min_height_mm,
    },*/

    // Maximum height.
    {
        key: "maxHeight",
        header: "Max Height",
        accessor: (r) => r.max_height_mm ? `${r.max_height_mm}mm` : null,
    },

    // Minimum depth.
    /*{
        key: "minDepth",
        header: "Min Depth (mm)",
        accessor: (r) => r.min_depth_mm,
    },*/

    // Maximum depth.
    {
        key: "maxDepth",
        header: "Max Depth",
        accessor: (r) => r.max_depth_mm ? `${r.max_depth_mm}mm` : null,
    },

    // Open in new tab.
    /*{
      key: "view",
      header: "New tab",
      accessor: (c) => (
        <Link
          href={`/customers/${c.id}`}
          onClick={(e) => e.stopPropagation()}
          target="_blank"
          rel="noopener noreferrer"
        >
          View
        </Link>
      ),
    },*/
  ];