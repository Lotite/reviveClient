import { useEffect, useState } from "react";
import { Tdialog } from "../../utils/types";


export default function Dialog(props:Tdialog){

    const [display,setDisplay] = useState(
      props.children ? (props.display != null ? props.display : "flex") : "hidden"
    );

    function clickOut(){
        setDisplay("hidden");
    }

    
    function Close(){
        props.onClose?.();
        setDisplay("hidden");
    }

    function Open(){
        props.onOpen?.();
    }

    useEffect(() => {
        if(display=="flex"){
            Open();
        }else{
            Close();
        }
    }, [display]);

    useEffect(() => {
        if (props.display !== undefined) {
            setDisplay(props.display);
        }
    }, [props]);


    return(<div onClick={clickOut} className={`fixed ${ display } top-0 left-0 w-[100vw] h-[100vh] bg-background-hover-dark bg-opacity-50 flex items-center justify-center ${props.className}`}>
        <div className="h-fit w-fit mx-auto" onClick={(e) => e.stopPropagation()}>
            {props.children}
        </div>
    </div>)
}