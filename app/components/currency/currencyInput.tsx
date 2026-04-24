"use client"

import { useEffect, useState } from "react";
import { inputStyle200 } from "@/styles/ui";

import { Money } from "@/types/money";
import { parseCurrencyInput, fromMoney } from "@/lib/money";

import { CURRENCY_INPUT_MAX_DIGITS } from "@/config/app";


/* * IMPORTANT NOTE - Consider using a library to handle money (dinero.js or currency.js) * */


type Properties = {
    id: string;
    name: string;
    value: Money | null;
    onChange: (value: Money | null) => void;
    placeholder?: string;
};


// Receives integer input (as pounds).
export default function CurrencyInput({
    id,
    name,
    value,
    onChange,
    placeholder,
}: Properties) {

    const [input, setInput] = useState("");


    // Sync input when external value changes.
    useEffect(() => {
        
        const formatted = value ? fromMoney(value) : "";
        setInput(prev => (prev !== formatted ? formatted : prev));
        
    }, [value]);


    // Sanitize and parse raw input.
    const processInput = (rawInput: string) => {
        
        // Remove all non-numeric characters.
        let digits = rawInput.replace(/[^0-9]/g, "");

        // Remove leading zeros.
        digits = digits.replace(/^0+(?=\d)/, "");

        // Enforce maximum number of digits.
        digits = digits.slice(0, CURRENCY_INPUT_MAX_DIGITS);

        setInput(digits);

        // Parse the remaining input.
        let parsed: Money | null = null;
        try {
            // Note: Null unless there are digits to parse.
            parsed = digits ? parseCurrencyInput(digits) : null;
        }
        catch (e) {
            console.error("Currency parse failed", e);
            parsed = null;
        }
        finally {
            onChange(parsed);
        }
    };


    return (
        
        <input
            id={id}
            name={name}
            type="text"
            inputMode="numeric"             // Disallows decimals, shows numeric keyboard (mobile).
            placeholder={placeholder}
            value={input}
            onChange={(e) => processInput(e.target.value)}
            style={inputStyle200}
        />
    );
}