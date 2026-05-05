
import { Money } from "@/types/money";


export const buildPriceFilter = (
    min?: Money,
    max?: Money,
    includeNull = true
): string | null => {

    const conditions: string[] = [];

    if (min && max) {
        // Both min and max specified.
        conditions.push(`and(or(max_price_pence.gte.${min.pence},max_price_pence.is.null),or(min_price_pence.lte.${max.pence},min_price_pence.is.null))`);
    } else if (min) {
        // Only min specified.
        conditions.push(`max_price_pence.gte.${min.pence}`);
    } else if (max) {
        // Only max specified.
        conditions.push(`max_price_pence.lte.${max.pence}`);
    }

    if (includeNull) {
        conditions.push(`max_price_pence.is.null`);
    }

    if (conditions.length === 0) {
        return null;
    }

    return conditions.join(",");
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