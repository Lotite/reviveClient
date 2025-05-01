import { setTextColor } from "../../../utils/functions";
import { TtailwindColors } from "../../../utils/types";

export default function Link({children,href,className,color }:{children:React.ReactNode,href:string,className?:string,color?:TtailwindColors["text"]}) {
    const selectedColors = setTextColor(color || "info");
    return(
        <a 
        href={href} 
        className={`${className} ${selectedColors} hover:underline`}
        onClick={(e) => {e.stopPropagation();}}
        >
            {children}
        </a>
    )
}