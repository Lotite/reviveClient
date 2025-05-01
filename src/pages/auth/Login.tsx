import Link from "../../components/baseComponents/link/Link";
import { ButtonFrom } from "../../components/FormComponents/buttonFrom";
import CheckBox from "../../components/FormComponents/checkBox";
import Form from "../../components/FormComponents/From";
import Input from "../../components/FormComponents/Input";
import InputPassword from "../../components/FormComponents/InputPassword";


export default function Login(){
    return(<>
    <Form>
        <h1 className="title text-center">Iniciar sesión</h1>
        <p className="text-center text-medium">Bienvenido de nuevo a Revive</p>
         <Input label="Correo" placeholder="Ingresa tu correo" type="email"/>
         <InputPassword label="Contraseña" placeholder="Ingresa tu contraseña">
            <Link href="/" color="orange" className="absolute top-0 right-1">
                ¿Olvidaste tu contraseña?
            </Link>
         </InputPassword>
         <CheckBox label="Recordarme?" />
         <ButtonFrom color="orange">
            Iniciar sesión 
         </ButtonFrom>
    </Form>
    <p className=" my-3 text-center">¿No tienes una cuenta? <Link href="/register" color="blue">Crear cuenta</Link></p>
    </>);
}