"use client"

import { Customer } from "@/types/customer";
import { buttonStyle, cardStyle, dangerButton, primaryButton } from "@/styles/ui";
import { theme } from "@/styles/themes";


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
                <h3 style={{ fontSize: theme.fontSize.header, fontWeight: theme.fontWeight.header }}>{customer.forename} {customer.surname.toUpperCase()}</h3>
                <span style={{ fontSize: theme.fontSize.header, fontWeight: theme.fontWeight.header }}>[{customer.id}]</span>
            </div>

            {/* Address */}
            <div style={{
                marginBottom: "20px",
                color: theme.colours.text,
                fontSize: theme.fontSize.regular,
                fontWeight: theme.fontWeight.regular}}>
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
            <div style={{
                marginBottom: "20px",
                color: theme.colours.text,
                fontSize: theme.fontSize.regular,
                fontWeight: theme.fontWeight.regular}}>
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
            <div style={{
                marginBottom: "20px",
                color: theme.colours.text,
                fontSize: theme.fontSize.regular,
                fontWeight: theme.fontWeight.regular}}>
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
            <div style={{
                marginBottom: "20px",
                color: theme.colours.text,
                fontSize: theme.fontSize.regular,
                fontWeight: theme.fontWeight.regular}}>
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
                        ...buttonStyle,
                        display: "inline-block",
                        backgroundColor: theme.colours.maps,
                        color: theme.colours.textLight,
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
                        ...buttonStyle,
                        display: "inline-block",
                        backgroundColor: theme.colours.telephone,
                        color: theme.colours.textLight,
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
                        ...buttonStyle,
                        display: "inline-block",
                        backgroundColor: theme.colours.email,
                        color: theme.colours.textLight,
                    }}
                    >
                        Email
                    </a>
                )}

                {/* Edit button */}
                <button
                    style={{ ...buttonStyle, display: "inline-block" }}
                    //onClick={() => startEdit(customer)}
                >
                    Edit
                </button>

                {/* Delete button */}
                <button
                    style={{ ...dangerButton, display: "inline-block" }}
                    onClick={() => onDelete(customer.id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}