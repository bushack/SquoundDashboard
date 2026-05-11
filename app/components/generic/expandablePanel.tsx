"use client"

import { useEffect, useRef, useState } from "react";
import { primaryButton } from "@/styles/ui";

import GenericHeading from "./genericHeading";


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
            
            <GenericHeading
                heading={heading}
                subheading={subheading}
            />

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