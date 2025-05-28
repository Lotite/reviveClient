import { useRef, useState } from "react";
import Link from "../../components/baseComponents/link/Link";
import { ButtonFrom } from "../../components/FormComponents/buttonFrom";
import CheckBox from "../../components/FormComponents/checkBox";
import Form from "../../components/FormComponents/From";
import Input from "../../components/FormComponents/Input";
import InputPassword from "../../components/FormComponents/InputPassword";
import { validateForm } from "../../utils/functions";
import { TinputElements, TerrorFromUser } from "../../utils/types";
import ServerApi from "../../services/ServerApi";

export default function Login() {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const remember = useRef<HTMLInputElement>(null);

  const getInputs = (): TinputElements => {
    return {
      email: email.current!,
      password: password.current!,
    };
  };

  const [error, setError] = useState<TerrorFromUser>({});

  function validateLogin() {
    const { isValid, errors } = validateForm(getInputs());
    setError(errors);
    return isValid;
  }

  async function validateLoginServer() {
    const request = await ServerApi.login({
      email: email.current?.value || "",
      password: password.current?.value || "",
      remember: remember.current?.checked || false,
    });

    if (!request.success) {
      setError(request.data!);
    }
    return request.success;
  }

  return (
    <>
      <Form validator={validateLogin} serverValidator={validateLoginServer} action="/">
        <h1 className="title text-center">Iniciar sesión</h1>
        <p className="text-center text-medium">Bienvenido de nuevo a Revive</p>
        <Input 
          error={error.email}
          ref={email}
          onChange={() => {
            setError({ ...error, email: undefined });
          }}
          label="Correo"
          placeholder="Ingresa tu correo"
          type="email"
        />
        <InputPassword
          error={error.password}
          ref={password}
          onChange={() => {
            setError({ ...error, password: undefined });
          }}
          label="Contraseña"
          placeholder="Ingresa tu contraseña"
        >
          <Link href="/recover" color="orange" className="absolute top-0 right-1 text-xs sm:text-base">
            ¿Olvidaste tu contraseña?
          </Link>
        </InputPassword>
        <CheckBox ref={remember}  label="Recordarme?" />
        <ButtonFrom color="orange">Iniciar sesión</ButtonFrom>
      </Form>
      <p className=" my-3 text-center">
        ¿No tienes una cuenta?{" "}
        <Link  href="/register" color="blue">
          Crear cuenta
        </Link>
      </p>
    </>
  );
}
