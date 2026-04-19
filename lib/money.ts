
import { Money } from "@/types/money";


// Converts a Money object to a string object (formatted as GBP).
/*export const toGbp = (money: Money) : string => {

    return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: money.currency,
    }).format(fromMoney(money));
};*/

/*export const toGbp = (pence: number) : string => {

    return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
    }).format(Math.round(pence / 100));
};*/


// Converts a number object (as pounds) to a Money object (as pence).
export const toMoney = (
    pounds: number,
    currency: Money["currency"] = "GBP"
) : Money => ({
    pence: Math.round(pounds * 100),
    currency,
});


// Converts a Money object to a number object (as pounds).
export const fromMoney = (money: Money) : string => {

    // Validate amount.
    if (typeof money.pence !== "number" || isNaN(money.pence)) {
        throw new Error("Invalid amount");
    }

    // Validate currency.
    if (!money.currency || money.currency.length !== 3) {
        throw new Error("Invalid currency code");
    }

    return Math.round(money.pence / 100);
};


// Parses a string object (as pounds) to a Money object (as pence).
// Use this function to parse user string inputs from pounds to pence.
export const parseCurrencyInput = (pounds: string) : Money => {

    const parsedInput = parseFloat(pounds);
    if (isNaN(parsedInput)) {
        throw new Error("Value is not a number");
    }

    return toMoney(parsedInput);
};