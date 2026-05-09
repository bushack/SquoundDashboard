
"use client"

import { useEffect, useRef, useState } from "react";
import { buttonStyle } from "@/styles/ui";


type Properties = {
    heading: string,
    subheading: string,
    expandedButtonText: string,
    collapsedButtonText: string,
    children: React.ReactNode,
    expanded: boolean,
    //defaultExpanded?: boolean,
    onToggle: () => void;
};


export default function ExpandablePanel({
    heading,
    subheading,
    expandedButtonText,
    collapsedButtonText,
    children,
    expanded,
    onToggle,
    //defaultExpanded = false
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
            <h2 style={{fontSize: "10pt", fontWeight: "normal", marginBottom: "25px"}}>{subheading}</h2>

            <button
                style={{...buttonStyle, minWidth: "200px", maxWidth: "200px"}}
                onClick={onToggle}>
                    {expanded ? expandedButtonText : collapsedButtonText}
            </button>

            <div hidden={!expanded}>
                <div ref={contentRef}>
                    {children}
                </div>
            </div>
        </div>
    );
}