
import { Money } from "@/types/money";


// Converts a Money object to a string object (formatted as pounds).
export const toGbp = (money: Money) : string => {

    // Validate amount.
    if (typeof money.pence !== "number" || isNaN(money.pence)) {
        throw new Error("Invalid amount");
    }

    // Validate currency.
    if (!money.currency || money.currency.length !== 3) {
        throw new Error("Invalid currency code");
    }

    return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: money.currency,
    }).format(money.pence / 100);
};


// Converts a floating point number object (as pounds) to a Money object (as pence).
// Use this function to convert currency values prior to writing to an API.
export const fromGbp = (
    pounds: number,
    currency: Money["currency"] = "GBP"
) : Money => ({
    pence: Math.round(pounds * 100),
    currency,
});


// Parses a string object (as pounds) to a Money object (as pence).
// Use this function to parse user string inputs from pounds to pence.
export const parseCurrencyInput = (pounds: string) : Money => {

    const parsedInput = parseFloat(pounds);
    if (isNaN(parsedInput)) {
        throw new Error("Value is not a number");
    }

    return fromGbp(parsedInput);
};