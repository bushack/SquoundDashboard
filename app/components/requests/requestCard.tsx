"use client"

import { Request } from "@/types/request";
import { cardStyle, dangerButton, headerStyle, textStyle } from "@/styles/ui";
import { colours } from "@/styles/colours";


type Properties = {
    request: Request;
    onDelete: (id: number) => void;
};


export default function RequestCard({
    request,
    onDelete
}: Properties) {

    return (
        <div style={cardStyle}>

            {/* Product Material & Name */}
            <h3 style={headerStyle}>
                {[request.materials?.name, request.categories?.name].filter(Boolean).join(" ")}
            </h3>

            {/* Dimensions */}
            <div style={textStyle}>
                <p>Width: {request.min_width_mm || "*"}mm min - {request.max_width_mm || "*"}mm max</p>
                <p>Height: {request.min_height_mm || "*"}mm min - {request.max_height_mm || "*"}mm max</p>
                <p>Depth: {request.min_depth_mm || "*"}mm min - {request.max_depth_mm || "*"}mm max</p>
            </div>

            {/* Buttons */}
            <button
                style={dangerButton}
                onClick={() => {onDelete(request.id)}}
            >
                Delete
            </button>
        </div>  
    );
}