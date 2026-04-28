
type Properties = {
    message: string;
    type: "success" | "error" | "info";
};


export default function GenericToast ({
    message,
    type
}: Properties) {

    const bgColor =
        type === "success"
        ? "#479141"
        : type === "error"
        ? "red"
        : "grey";

    return (
        
        /*
        <div className={`${bg} text-white px-4 py-2 rounded shadow`}>
            {message}
        </div>
        */

        <div style={{background: `${bgColor}`, color: "white", padding: "10px 50px", borderRadius: "10px"}}>
            {message}
        </div>
    );
}