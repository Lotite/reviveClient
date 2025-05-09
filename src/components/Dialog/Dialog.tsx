import { useEffect, useState } from "react";
import { Tdialog } from "../../utils/types";


export default function Dialog(props:Tdialog){

    const [display,setDisplay] = useState(
      props.children ? (props.display != null ? props.display : "flex") : "hidden"
    );
    const [opacity,setOpacity] = useState<0|100>(display=="flex" ? 100 : 0);

    function Close(){
        setOpacity(0);
        props.onClose?.();
        setTimeout(() => {
        setDisplay("hidden");
        }, 500);
    }    

    useEffect(() => {
        if (props.display !== undefined) {
            if(props.display == "flex"){
                setDisplay("flex");
               setTimeout(()=>{ setOpacity(100);},50)
                props.onOpen?.();
            }else{
                setOpacity(0);
                props.onClose?.();
                setTimeout(()=>{
                    setDisplay("hidden")
                },500)
            }
            
        }
    }, [props]);


    return(<div onClick={Close} className={`fixed ${display} opacity-${opacity} transition-opacity duration-500 top-0 left-0 w-[100vw] h-[100vh] bg-background-hover-dark bg-opacity-50 flex items-center justify-center ${props.className}`}>
        <div className={`h-[80%] ease-in-out w-[95%] max-w-[900px] max-h-[600px] bg-amber-300  mx-auto`} onClick={(e) => e.stopPropagation()}>
            {props.children}
        </div>
    </div>)
}