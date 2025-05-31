import { useRef, useState } from "react";
import CheckBox from "../../components/FormComponents/checkBox";
import Input from "../../components/FormComponents/Input";
import InputPassword from "../../components/FormComponents/InputPassword";
import Link from "../../components/baseComponents/link/Link";
import { ButtonFrom } from "../../components/FormComponents/buttonFrom";
import Form from "../../components/FormComponents/From";
import { validateForm } from "../../utils/functions";
import { TerrorFromUser, TinputElements } from "../../utils/types";
import ServerApi from "../../services/ServerApi";
import { useNotification } from "../../contexts/NotificationContext";



export default function RegisterPage() {
    const name = useRef<HTMLInputElement>(null);
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const passwordConfirm = useRef<HTMLInputElement>(null);
    const terms = useRef<HTMLInputElement>(null);
    
   const getInputs = ():TinputElements => {return  {
    name: name.current!,
    email: email.current!,
    password: password.current!,
    passwordConfirm: passwordConfirm.current!,
    terms: terms.current!
}   } 

const {addNotification} = useNotification();



    const [error, setError] = useState<TerrorFromUser>({});



    function validateRegister(){
        const {isValid,errors} = validateForm(getInputs());
        setError(errors);
        return isValid;
    }


    async function  validateRegisterServer(){
        const request = await ServerApi.register({
            name: name.current?.value || '',
            email: email.current?.value || '',
            password: password.current?.value || '',
            passwordConfirm: passwordConfirm.current?.value || '',
            terms: terms.current?.checked || false,
        });

        if(!request.success){
            setError(request.data!);
        }

        if(request.success){
            addNotification({
                type: "success",
                message: request.message,
                duration: 3000
            });
        }

        return false;
    }

    return (
        <>
        <Form validator={validateRegister} serverValidator={validateRegisterServer} action="#">
            <h1 className="title text-center">Crear Cuenta</h1>
            <p className="text-center text-medium">Únete a Revive y comienza a disfrutar</p>
            <Input          label="Nombre"     placeholder="Ingresa tu nombre"     error={error.name}            ref={name}            onChange={()=>{setError({...error,name:undefined})}}      />
            <Input          label="Correo"     placeholder="Ingresa tu correo"     error={error?.email}           ref={email}           onChange={()=>{setError({...error,email:undefined})}}     type="email"/>
            <InputPassword  label="Contraseña" placeholder="Ingresa tu contraseña" error={error.password}        ref={password}        onChange={()=>{setError({...error,password:undefined})}}/>
            <InputPassword  label="Contraseña" placeholder="Ingresa tu contraseña" error={error.passwordConfirm} ref={passwordConfirm} onChange={()=>{setError({...error,passwordConfirm:undefined})}}      />
            <CheckBox label="Acepto términos y condiciones" error={error.terms} ref={terms} onChange={()=>{setError({...error,terms:undefined})}}>
                <label>
                    Acepto los <Link href="/terms"  color="blue">Términos y condiciones</Link>
                </label>
            </CheckBox>
            <ButtonFrom  color="blue">
                Crear cuenta 
            </ButtonFrom>
        </Form>
        <p className=" my-3 text-center">¿Ya tienes cuenta? <Link href="login" color="orange">Iniciar sesión</Link></p>
        </>

    )
}
