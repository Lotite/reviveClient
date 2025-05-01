import { useRef } from "react";
import CheckBox from "../../components/FormComponents/checkBox";
import Input from "../../components/FormComponents/Input";
import InputPassword from "../../components/FormComponents/InputPassword";
import Link from "../../components/baseComponents/link/Link";
import { ButtonFrom } from "../../components/FormComponents/buttonFrom";
import Form from "../../components/FormComponents/From";



export default function RegisterPage() {
    const pass = useRef<HTMLInputElement>(null);

    return (
        <>
        <Form >
            <h1 className="title text-center">Crear Cuenta</h1>
            <p className="text-center text-medium">Únete a Revive y comienza a disfrutar</p>
            <Input label="Nombre" placeholder="Ingresa tu nombre"/>
            <Input label="Correo" placeholder="Ingresa tu correo" type="email"/>
            <InputPassword label="Contraseña" ref={pass} placeholder="Ingresa tu contraseña" />
            <InputPassword label="Contraseña" placeholder="Ingresa tu contraseña" />
            <CheckBox label="Acepto términos y condiciones">
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
