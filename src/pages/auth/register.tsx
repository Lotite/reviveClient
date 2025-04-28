import { FaFacebookF } from "react-icons/fa"; 
import { BsGoogle } from "react-icons/bs"; 
import { useRef } from "react";
import CheckBox from "../../components/FormComponents/checkBox";
import Input from "../../components/FormComponents/Input";
import InputPassword from "../../components/FormComponents/InputPassword";
import Link from "../../components/baseComponents/link/Link";
import { ButtonFrom } from "../../components/FormComponents/buttonFrom";
import Form from "../../components/FormComponents/From";
import HR from "../../components/baseComponents/hr/HR";
import { Button } from "../../components/baseComponents/Button/Button";


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
                    Acepto los <Link href="/terms" className="text-blue-500 hover:text-blue-700">Términos y condiciones</Link>
                </label>
            </CheckBox>
            <ButtonFrom  color="blue">
                Crear cuenta 
            </ButtonFrom>
            <HR text="O continua con" textColor="green"/>
            <div className="flex justify-between">
            <Button color="medium2" className="flex justify-center items-center">
                <BsGoogle className="mx-1"/>
                Google
            </Button>
            <Button color="medium2" className="flex justify-center items-center">
                <FaFacebookF />
                Facebook
            </Button>
            </div>
        </Form>
        <p className=" my-3 text-center">¿Ya tienes cuenta? <Link href="login" color="orange">Iniciar sesión</Link></p>
        </>

    )
}
