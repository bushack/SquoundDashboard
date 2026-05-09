"use client"

import { useEffect, useRef, useState } from "react";
import { primaryButton } from "@/styles/ui";


type Properties = {
    heading: string,
    subheading: string,
    buttonText: string,
    children: React.ReactNode,
    expanded: boolean,
    onToggle: () => void;
};


export default function ExpandablePanel({
    heading,
    subheading,
    buttonText,
    children,
    expanded,
    onToggle,
}: Properties) {
    
    //const [expanded, setExpanded] = useState(defaultExpanded);
    const [height, setHeight] = useState(0);

    const contentRef = useRef<HTMLElement>(null);


    /*useEffect(() => {
        
        if (contentRef.current) {
            setHeight(expanded ? contentRef.current.scrollHeight : 0);
        }
    }, [expanded, children]);*/

    return (
        
        <div>
            <h1 style={{fontSize: "22px", fontWeight: "bold", marginBottom: "5px"}}>{heading}</h1>
            <h2 style={{fontSize: "10pt", fontWeight: "normal", marginBottom: "15px"}}>{subheading}</h2>

            <button
                hidden={expanded}
                style={{...primaryButton, minWidth: "200px", maxWidth: "200px"}}
                onClick={onToggle}
            >
                {buttonText}
            </button>

            <div hidden={!expanded}>
                <div ref={contentRef}>
                    {children}
                </div>
            </div>
        </div>
    );
}