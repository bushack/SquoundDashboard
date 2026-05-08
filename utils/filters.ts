
import { Money } from "@/types/money";


export const buildPriceFilter = (
    min?: Money,
    max?: Money,
    includeNull = true
): string | null => {

    const conditions: string[] = [];

    if (min && max) {
        // Both min and max specified.
        conditions.push(`and(or(max_price_pence.gte.${min.pence},max_price_pence.is.null),or(min_price_pence.lte.${max.pence},min_price_pence.is.null))`
        );
    } else if (min) {
        // Only min specified.
        conditions.push(
            `or(max_price_pence.gte.${min.pence},max_price_pence.is.null)`
        );
    } else if (max) {
        // Only max specified.
        conditions.push(
            `or(min_price_pence.lte.${max.pence},min_price_pence.is.null)`
        );
    }

    if (includeNull) {
        //conditions.push(`max_price_pence.is.null`);
    }

    if (conditions.length === 0) {
        return null;
    }

    return conditions.join(",");
}


export const applyPriceFilter = (query, min?: Money, max?: Money) => {
    
    if (min) {
        //query = query.gte("max_price_pence", min_pence);
        query = query.or(`max_price_pence.gte.${min.pence},max_price_pence.is.null`);
    }

    if (max) {
        //query = query.lte("min_price_pence", max_pence);
        query = query.or(`min_price_pence.lte.${max.pence},min_price_pence.is.null`);
    }

    /*if (includeNull) {
        query = query.or("min_price_pence.is.null,max_price_pence.is.null");
    }*/

    return query;
}


export const buildDimensionFilter = (
    width?: number,
    height?: number,
    depth?: number,
    includeNull = true
): string | null => {

    const conditions: string[] = [];

    const buildSingleDimension = (
        minColumn: string,
        maxColumn: string,
        value: number
    ) => {
        
        // Early exit if no value.
        if (value == null) {
            return null;
        }
        
        // If including NULLs, return rows where:
        // minColumn <= value OR NULL AND
        // maxColumn >= value OR NULL.
        if (includeNull) {
            return `and(or(${minColumn}.lte.${value},${minColumn}.is.null),or(${maxColumn}.gte.${value},${maxColumn}.is.null))`;
        }
        
        // Else, return rows where:
        // minColumn <= value AND
        // maxColumn >= value.
        return `and(${minColumn}.lte.${value},${maxColumn}.gte.${value})`;
    };

    const widthCondition = buildSingleDimension(
        "min_width_mm",
        "max_width_mm",
        width
    );

    const heightCondition = buildSingleDimension(
        "min_height_mm",
        "max_height_mm",
        height
    );

    const depthCondition = buildSingleDimension(
        "min_depth_mm",
        "max_depth_mm",
        depth
    );

    if (widthCondition) conditions.push(widthCondition);
    if (heightCondition) conditions.push(heightCondition);
    if (depthCondition) conditions.push(depthCondition);

    if (conditions.length === 0) return null;

    // IMPORTANT: Wrap everything in AND.
    return `and(${conditions.join(",")})`;
}


export const applyDimensionFilter = (query, width_mm?: number, height_mm?: number, depth_mm?: number, includeNull = true) => {
    
    if (width_mm) {
        //query = query.gte("max_width_mm", width_mm);
        //query = query.lte("min_width_mm", width_mm);
        query = query.or(`max_width_mm.gte.${width_mm},max_width_mm.is.null`);
        query = query.or(`min_width_mm.lte.${width_mm},min_width_mm.is.null`);
    }

    if (height_mm) {
        //query = query.gte("max_height_mm", height_mm);
        //query = query.lte("min_height_mm", height_mm);
        query = query.or(`max_height_mm.gte.${height_mm},max_height_mm.is.null`);
        query = query.or(`min_height_mm.lte.${height_mm},min_height_mm.is.null`);
    }

    if (depth_mm) {
        //query = query.gte("max_depth_mm", depth_mm);
        //query = query.lte("min_depth_mm", depth_mm);
        query = query.or(`max_depth_mm.gte.${depth_mm},max_depth_mm.is.null`);
        query = query.or(`min_depth_mm.lte.${depth_mm},min_depth_mm.is.null`);
    }

    /*if (includeNull) {
        query = query.or(
            [
                "min_width_mm.is.null",
                "max_width_mm.is.null",
                "min_height_mm.is.null",
                "max_height_mm.is.null",
                "min_depth_mm.is.null",
                "max_depth_mm.is.null"
            ].join(",")
        );
    }*/

    return query;
}