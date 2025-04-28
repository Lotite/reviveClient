import { setBackgroundColor } from "../../../utils/functions";
import { Tbutton } from "../../../utils/types";
import style from "./../BaseStyleComponents.module.css";


export function Button(props: Tbutton) {

const selectedColor = props.color || "blue";

const buttonBackgroundColor = setBackgroundColor(selectedColor); 
const className =  buttonBackgroundColor + " " + style.buttonFrom + " " + props.className ;
    return(
        <button  className={className} onClick={props.onclick} disabled={props.disabled} type={props.type || "button"}>
            {props.children || props.text}
        </button>
    )
}