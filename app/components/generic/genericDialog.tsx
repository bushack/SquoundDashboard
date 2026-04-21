
import { buttonStyle } from "@/styles/ui";


type Properties = {
    isOpen: boolean;
    title: string;
    message: string;
    onClose?: () => void;
    onCancel?: () => void;
    onConfirm?: () => void;
};


const overlayStyle:React.CSSProperties = {
    
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0, 0, 0, 0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};


const dialogStyle:CSSProperties = {

    color: "black",
    background: "white",
    padding: "1rem",
    borderRadius: "10px",
    minWidth: "400px",
    maxWidth: "600px"
};


export default function GenericDialog ({
    isOpen,
    title,
    message,
    onClose,
    onCancel,
    onConfirm,
}: Properties) {

    if (!isOpen) {
        return null;
    }

    return (
        
        <div style={overlayStyle}>
            <div style={dialogStyle}>

                {/* Title */}
                {title && <h2 style={{display: "flex", justifyContent: "center", padding: "10px", borderRadius: "10px", color: "white", backgroundColor: "#e04410", marginBottom: "1rem", fontSize: "10pt", fontWeight: "bold"}}>{title}</h2>}
                
                {/* Message */}
                <p style={{fontSize: "10pt"}} className="mt-2 text-sm whitespace-pre-line">{message}</p>

                {/* Buttons */}
                <div style={{marginTop: "2rem", display: "flex", justifyContent: "right", fontSize: "10pt"}}>
                    
                    {/* Close button */}
                    {onClose && (
                        <button style={{...buttonStyle }} onClick={onClose}>
                            Close
                        </button>
                    )}

                    {/* Cancel button */}
                    {onCancel && (
                        <button style={{...buttonStyle, marginLeft: "0.25rem" }} onClick={onCancel}>
                            Cancel
                        </button>
                    )}

                    {/* Confirm button */}
                    {onConfirm && (
                        <button onClick={onConfirm} style={{...buttonStyle, marginLeft: "0.25rem", marginRight: "0rem"}}>
                            OK
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}