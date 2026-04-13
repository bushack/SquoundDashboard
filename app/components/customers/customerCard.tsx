"use client"

import { Customer } from "@/types/customer";
import { cardStyle, dangerButton, primaryButton } from "@/styles/ui";


type Properties = {
    customer: Customer;
    cleanAddress?: string;
    cleanPhone?: string;
    onDelete: (id: number) => void;
};


export default function CustomerCard({
    customer,
    cleanAddress,
    cleanPhone,
    onDelete
}: Properties) {

    return (
        <div style={cardStyle}>

            {/* Name & Id */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                <h3 style={{ fontSize: "22px", fontWeight: "bold" }}>{customer.forename} {customer.surname.toUpperCase()}</h3>
                <span style={{ fontSize: "22px", fontWeight: "bold" }}>[{customer.id}]</span>
            </div>

            {/* Address */}
            <div style={{marginBottom: "20px"}}>
                <strong>Address: </strong>
                { customer.postcode ? (
                    <>
                        <p>{customer.address_line_1}</p>
                        <p>{customer.address_line_2}</p>
                        <p>{customer.town_city}</p>
                        <p>{customer.region}</p>
                        <p>{customer.postcode}</p>
                    </>
                ) : (
                    <p>{"Not provided"}</p>
                )}
            </div>

            {/* Phone */}
            <div style={{marginBottom: "20px"}}>
                <strong>Phone: </strong>
                { cleanPhone ? (
                    <p>
                        <a href={`tel:${cleanPhone}`}>{cleanPhone}</a>
                    </p>
                ) : (
                    <p>{"Not provided"}</p>
                )}
            </div>

            {/* Email */}
            <div style={{marginBottom: "20px"}}>
                <strong>Email: </strong>
                { customer.email ? (
                    <p>
                        <a href={`mailto:${customer.email}`}>{customer.email}</a>
                    </p>
                ) : (
                    <p>{"Not provided"}</p>
                )}
            </div>

            {/* Notes */}
            <div style={{marginBottom: "20px"}}>
                <strong>Notes: </strong>
                <p>{customer.notes || "N/A"}</p>
            </div>

            {/* Buttons */}
            <div style={{ marginTop: "10px" }}>

                {/* Google Maps button */}
                { customer.postcode && (
                    <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(String(cleanAddress))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: "inline-block",
                        padding: "10px 30px",
                        backgroundColor: "#2563eB",
                        color: "white",
                        borderRadius: "6px",
                        textDecoration: "none",
                        marginTop: "10px",
                        marginRight: "10px"
                    }}
                    >
                        Maps
                    </a>
                )}

                {/* Telephone button */}
                { cleanPhone && (
                    <a
                    href={`tel:${cleanPhone}`}
                    style={{
                        display: "inline-block",
                        padding: "10px 30px",
                        backgroundColor: "#249900",
                        color: "white",
                        borderRadius: "6px",
                        textDecoration: "none",
                        marginTop: "10px",
                        marginRight: "10px"
                    }}
                    >
                        Call
                    </a>
                )}

                {/* Email button */}
                { customer.email && (
                    <a
                    href={`mailto:${customer.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: "inline-block",
                        padding: "10px 30px",
                        backgroundColor: "#fc9003",
                        color: "white",
                        borderRadius: "6px",
                        textDecoration: "none",
                        marginTop: "10px",
                        marginRight: "10px"
                    }}
                    >
                        Email
                    </a>
                )}

                {/* Edit button */}
                <button
                    style={{ ...primaryButton, backgroundColor: "grey", marginTop: "10px" }}
                    //onClick={() => startEdit(customer)}
                >
                    Edit
                </button>

                {/* Delete button */}
                <button
                    style={{ ...dangerButton, marginTop: "10px" }}
                    onClick={() => onDelete(customer.id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}