
type Properties = {
    message: string;
    type: "success" | "error" | "info";
};


export default function GenericToast ({
    message,
    type
}: Properties) {

    const bg =
        type ==="success"
        ? "bg-green-600"
        : type === "error"
        ? "bg-red-600"
        : "bg-grey-800";

    return (
        
        <div className={`${bg} text-white px-4 py-2 rounded shadow`}>
            {message}
        </div>
    );
}