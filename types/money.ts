
export type Money = {

    pence: number;
    currency: "GBP" | "EUR";
};


// Instantiate a money object.
// Example : const [price, setPrice] = useState<Money>(initializeMoney());
export const initializeMoney = (
    pence: number = 0,
    currency: Money["currency"] = "GBP"
): Money => ({
    pence,
    currency,
});