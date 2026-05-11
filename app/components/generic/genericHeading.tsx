
import { headingStyle, subheadingStyle } from "@/styles/ui";


type Properties = {
    heading: string,
    subheading: string,
}


export default function GenericHeading({
    heading,
    subheading,
}: Properties) {

    return (
        
        <div>
            <h1 style={headingStyle}>{heading}</h1>
            <h2 style={subheadingStyle}>{subheading}</h2>
        </div>
    );
}