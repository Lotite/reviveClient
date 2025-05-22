import { useRef, useState } from "react"
import { Button } from "../baseComponents/Button/Button"
import ServerApi from "../../services/ServerApi"
import { TAccountError } from "../../utils/types"
import InputPassword from "../FormComponents/InputPassword"

export default function AccountSettings() {
  const currentPasswordRef = useRef<HTMLInputElement>(null)
  const newPasswordRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)


  const [error, setError] = useState<TAccountError>({})
  const [keepSessions, setKeepSessions] = useState<boolean>(false)

  const validateClient = (): boolean => {
    const currentPassword = currentPasswordRef.current?.value || ""
    const newPassword = newPasswordRef.current?.value || ""
    const confirmPassword = confirmPasswordRef.current?.value || ""

    const errors: TAccountError = {}
    if (currentPassword === "") {
      errors.currentPassword = "La contraseña actual no puede estar vacía"
    }

    if (newPassword === "") {
      errors.newPassword = "La nueva contraseña no puede estar vacía"
    } else if (newPassword.length < 6) {
      errors.newPassword = "La contraseña debe tener al menos 6 caracteres"
    }

    if (confirmPassword === "") {
      errors.confirmPassword = "La confirmación de la contraseña no puede estar vacía"
    } else if (confirmPassword !== newPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden"
    }

    setError(errors)

   
    return Object.keys(errors).length === 0
  }

  const validateServer = async (): Promise<boolean> => {
    const currentPassword = currentPasswordRef.current?.value || ""
    const newPassword = newPasswordRef.current?.value || ""
    const confirmPassword = confirmPasswordRef.current?.value || ""
    const response = await ServerApi.changePassword({ currentPassword, newPassword , confirmPassword, keepSessions })

    if (!response.success) {
      const errors = response.data!
      setError(errors)
      return false
    }
    return true
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!confirm("¿Estás seguro de que quieres cambiar tu contraseña?")) return
    if (!validateClient()) return
    if (!(await validateServer())) return
    alert("Contraseña actualizada correctamente")
  }

  const handleDeleteAccount = async () => {
    if (!confirm("¿Estás seguro de que quieres eliminar tu cuenta? Esta acción es permanente.")) {
      return
    }
    try {
      const response = await ServerApi.deleteUser();
      if (response.success) {
        alert("Cuenta eliminada correctamente");
        window.location.href = "/login";
      } else {
        alert("Error al eliminar la cuenta: " + response.message);
      }
    } catch (error) {
      alert("Error inesperado al eliminar la cuenta");
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Configuración de cuenta</h2>

      <div className="space-y-3 sm:space-y-4">
        <div className="p-3 sm:p-4 border border-background-medium2 rounded-md">
          <h3 className="text-base sm:text-lg text-white mb-2">Cambiar contraseña</h3>

          <div className="space-y-2 sm:space-y-3">
            <InputPassword
              id="currentPassword"
              ref={currentPasswordRef}
              label="Contraseña actual"
              onChange={() => setError({ ...error, currentPassword: undefined })}
              error={error?.currentPassword}
            />
            <InputPassword
              id="newPassword"
              ref={newPasswordRef}
              label="Nueva contraseña"
              onChange={() => setError({ ...error, newPassword: undefined })}
              error={error?.newPassword}
            />
            <InputPassword
              id="confirmPassword"
              ref={confirmPasswordRef}
              label="Confirmar nueva contraseña"
              onChange={() => setError({ ...error, confirmPassword: undefined })}
              error={error?.confirmPassword}
            />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-around mt-2">
              <label className="inline-flex items-center space-x-2 order-2 sm:order-1 ">
                <input
                  type="checkbox"
                  checked={keepSessions}
                  onChange={(e) => setKeepSessions(e.target.checked)}
                  className="form-checkbox h-4 w-4 text-green-600"
                />
                <span className="text-white text-sm select-none">Mantener sesiones activas</span>
              </label>
              <Button onclick={handlePasswordSubmit} color="green" className="order-1 mb-3 sm:order-2 px-3 py-1.5 text-xs sm:text-sm w-full sm:w-auto">
                Actualizar contraseña
              </Button>
            </div>
          </div>
        </div>

        <div className="p-3 sm:p-4 border border-red-900/30 rounded-md bg-red-900/10">
          <h3 className="text-base sm:text-lg text-red-400 mb-2">Eliminar cuenta</h3>
          <p className="text-text-medium text-xs sm:text-sm mb-3">
            Esta acción es permanente y no se puede deshacer. Se eliminarán todos tus datos.
          </p>
          <Button
            onclick={handleDeleteAccount}
            className="px-3 py-1.5 text-xs sm:text-sm bg-red-900 hover:bg-red-800 text-white w-full sm:w-auto"
          >
            Eliminar mi cuenta
          </Button>
        </div>
      </div>
    </div>
  )
}
