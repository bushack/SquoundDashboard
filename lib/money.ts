
import { Money } from "@/types/money";


// Safety helper.
export const assertSameCurrency = (a: Money, b: Money) => {

    if (a.currency !== b.currency) {
        throw new Error("Currency mismatch");
    }
};


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


// Format data for UI.
export const format = (money: Money) : string => {

    return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: money.currency,
    }).format(money.pence / 100);
};


// Addition.
export const add = (a: Money, b: Money) : Money => {
    
    assertSameCurrency(a, b);
    return { pence: a.pence + b.pence, currency: a.currency };
};


// Subtraction.
export const subtract = (a: Money, b: Money) : Money => {

    assertSameCurrency(a, b);
    return { pence: a.pence - b.pence, currency: a.currency };
};


// Multiplication (rounded).
export const multiply = (money: Money, factor: number) : Money => {

    return { pence: Math.round(money.pence * factor), currency: money.currency };
};


// Division (rounded).
export const divide = (money: Money, divisor: number) : Money => {

    return { pence: Math.round(money.pence / divisor), currency: money.currency };
};


// Equality.
export const equalTo = (a: Money, b: Money) : boolean => {
    
    return (a.currency === b.currency) && (a.pence === b.pence);
};


// Greater-than.
export const greaterThan = (a: Money, b: Money) : boolean => {

    assertSameCurrency(a, b);
    return (a.pence > b.pence);
};