import { useEffect, useState } from "react";
import { Tdialog } from "../../utils/types";
import { colors } from "../../utils/constants";

export default function Dialog(props:Tdialog){

    const [display,setDisplay] = useState(
      props.children ? (props.display != null ? props.display : "flex") : "hidden"
    );
    const [opacity,setOpacity] = useState<0|100>(display=="flex" ? 100 : 0);

    const ContainerHeight = props.constainerHeight ? props.constainerHeight : "600px";
    const ContainerWidth = props.constainerWidth ? props.constainerWidth : "900px";

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
               setTimeout(()=>{ setOpacity(100);},100)
                props.onOpen?.();
            }else{
                setOpacity(0);
                props.onClose?.();
                setTimeout(()=>{
                    setDisplay("hidden")
                },500)
            }
            
        }
    }, [props.display]);


    return(<div onClick={Close} style={{opacity}} className={`fixed ${display}  transition-opacity duration-500 top-0 left-0 w-[100vw] h-[100vh] bg-background-hover-dark bg-opacity-50 flex items-center justify-center z-[9999]`}>
        <div  className={`${props.classContainer} rounded-2xl ${props.scroll == true  ? " overflow-y-auto" : "overflow-hidden"}  h-[${ContainerHeight}] w-[${ContainerWidth}]   mx-auto`} style={{backgroundColor:colors.background[props.backgrounColor ?? "none" ]}} onClick={(e) => e.stopPropagation()}>
            {props.children}
        </div>
    </div>)
}
