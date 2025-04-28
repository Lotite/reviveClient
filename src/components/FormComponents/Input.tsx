import { Tinput } from "../../utils/types";
import { useId } from "react";
import style from "./FormStyle.module.css"


export default function Input(props: Tinput) {
    const id =props.id ||  useId();
    const classContainer  = props.className ||  "flex flex-col relative pb-6";
    const classLabel = props.classLabel || "text-medium2";
    const classInput = props.classInput || style.inputFrom + ` border ${props.error ? "border-1 border-red-500" : "border-0" }`;
    const classError = props.classError || "text-red-500 text-sm mt-1 absolute bottom-0";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.onlyRead) {
            e.preventDefault();
            return;
        }
        if (props.onChange) {
            props.onChange(e);
        }
    };

    return (
       <div className={classContainer}>
            {props.label && <label htmlFor={id} className={classLabel}>{props.label}</label>}
            <input 
                id={id}
                type={props.type || "text"}   
                className={ classInput}  
                value={props.value !== undefined ? props.value : undefined}  
                placeholder={props.placeholder || ""} 
                onChange={handleChange}
                ref={props.ref}
                onBlur={props.onBlur}
            />
            {props.children}
            {props.error && <p className={classError}>{props.error}</p>}
       </div>
    )
}
