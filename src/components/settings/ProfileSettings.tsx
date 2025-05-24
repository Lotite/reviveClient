import { useRef, useState, useEffect } from "react";
import { Button } from "../baseComponents/Button/Button";
import Input from "../FormComponents/Input";
import { validateForm } from "../../utils/functions";
import ServerApi from "../../services/ServerApi";
import { useNotification } from "../../contexts/NotificationContext";
import { useConfirm } from "../../contexts/ConfirmContext";

export default function ProfileSettings() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<{name?: string; email?: string}>({});

  const {addNotification} = useNotification();
  const confirm = useConfirm();

  useEffect(() => {
    const name = sessionStorage.getItem("name") || "";
    const email = sessionStorage.getItem("email") || "";
    if(nameRef.current) nameRef.current.value = name;
    if(emailRef.current) emailRef.current.value = email;
  }, []);




  const validateClient = (): boolean => {
    const name = nameRef.current?.value || "";
    const email = emailRef.current?.value || "";
    if (name == "" && email == "") {
      setError({ name: "No pueden estar los dos campos vacios", email: "" });
      return false;
    }
    const inputs: Record<string, HTMLInputElement> = {};
    if (name !== "") inputs.name = nameRef.current!;
    if (email !== "") inputs.email = emailRef.current!;
    const { isValid, errors } = validateForm(inputs);
    setError(errors);
    return isValid;
  };


  const validateServer = async (): Promise<boolean> => {
    const name = nameRef.current?.value || "";
    const email = emailRef.current?.value || "";
    const data: { name?: string; email?: string } = {};
    if (name !== "") data.name = name;
    if (email !== "") data.email = email;
    const response = await ServerApi.updateUser(data);
    if (!response.success) {
      setError(response.data || {});
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const confirmed = await confirm({
      title: "Guardar cambios",
      message: "¿Estás seguro de que quieres guardar los cambios?",
      type: "info",
      confirmText: "Guardar",
    });
    if (!confirmed) return;

    if(!validateClient()) return;
    if(!(await validateServer())) return;
    addNotification({
      type: "success",
      message: "Cambios guardados correctamente",
      duration: 3000,
    });
    sessionStorage.setItem("name", nameRef.current?.value || "");
    sessionStorage.setItem("email", emailRef.current?.value || "");
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Información de perfil</h2>

      <div className="space-y-3 sm:space-y-4">
          <Input
            id="name"
            ref={nameRef}
            placeholder="Nombre"
            onChange={() => setError({...error, name: undefined})}
            error={error.name}
          />
        

          <Input
            id="email"
            type="email"
            ref={emailRef}
            placeholder="Correo electrónico"
            onChange={() => setError({...error, email: undefined})}
            error={error.email}
          />

        <div className="pt-2">
          <Button type="button" color="blue" className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base" onclick={handleSubmit}>
            Guardar cambios
          </Button>
        </div>
      </div>
    </div>
  );
}
