import { AiOutlineEyeInvisible , AiOutlineEye } from "react-icons/ai"; 
import { useId, useState, useEffect } from "react";
import { Tinput } from "../../utils/types";
import Input from "./Input";

export default function InputPassword(props:Omit<Tinput, "type" |"readOnly">) {
    const [passVisible, setPassVisible] = useState<boolean>(false);
    const classIcon = "absolute top-8 right-3 text-2xl text-medium";
    const id = props.id ? props.id :useId();

    useEffect(() => {
        const input  = document.getElementById(id!) as HTMLInputElement | null;
        if(input && input.value.length >0 ){
            input.focus();
            const length = input.value.length;
            input.setSelectionRange(length, length);
        }
    }, [passVisible, id]);

    const onClick = () =>{
        setPassVisible(!passVisible);
    };
    const selectedIcon = passVisible ? <AiOutlineEyeInvisible className={classIcon} onClick={onClick}/> : <AiOutlineEye className={classIcon} onClick={onClick}/>;
    const children = (<>
        {selectedIcon}
        {props.children}
    </>)
    
    return <Input {...props} id={id} type={ passVisible ? "text" : "password"} children={children}/>
    }
