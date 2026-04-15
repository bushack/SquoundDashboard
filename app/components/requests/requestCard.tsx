"use client"

import { Request } from "@/types/request";
import { cardStyle, dangerButton } from "@/styles/ui";
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
        <div style={{...cardStyle}}>
            <h3 style={{fontSize: "22px", fontWeight: "bold", marginBottom: "5px"}}>
            {[request.materials?.name, request.categories?.name].filter(Boolean).join(" ")}
            </h3>

            <p>Width: {request.min_width_mm || "*"}mm min - {request.max_width_mm || "*"}mm max</p>
            <p>Height: {request.min_height_mm || "*"}mm min - {request.max_height_mm || "*"}mm max</p>
            <p>Depth: {request.min_depth_mm || "*"}mm min - {request.max_depth_mm || "*"}mm max</p>
            <p style={{marginBottom: "20px"}}></p>

            <button
                style={dangerButton}
                onClick={() => {onDelete(request.id)}}
            >
                Delete
            </button>
        </div>  
    );
}