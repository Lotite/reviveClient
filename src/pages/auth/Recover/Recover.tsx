import React, { useState, useEffect } from "react"
import { FiCheck } from "react-icons/fi"
import Step1Email from './Step1Email';
import Step2Code from './Step2Code';
import Step3Password from './Step3Password';
import ServerApi from '../../../services/ServerApi'; 
import { validateInput } from '../../../utils/functions'; 

const Recover: React.FC = () => {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [success, setSuccess] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [recoveryToken, setRecoveryToken] = useState<string | null>(null); 

  
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  
  const handleSendCode = async () => {
    setErrors({})

    const emailValidation = validateInput({ value: email, type: 'email' } as HTMLInputElement, 'email');
    if (!emailValidation.isValid) {
      setErrors({ email: emailValidation.message || "Correo inválido" });
      return;
    }

    setIsLoading(true)

    try {
      const response = await ServerApi.recoverRequest(email);
      if (response.success) {
        setStep(2);
        setCountdown(60);
        if (response.data?.token) {
          setRecoveryToken(response.data.token);
        }
      } else {
        setErrors({ general: response.message || "Error al enviar el código. Intenta de nuevo." });
      }
    } catch (error: any) {
      setErrors({ general: error.message || "Error al enviar el código. Intenta de nuevo." });
    } finally {
      setIsLoading(false);
    }
  }

  const handleVerifyCode = async () => {
    setErrors({})

    if (!code) {
      setErrors({ code: "El código de verificación es requerido" })
      return
    }

    if (code.length !== 6) {
      setErrors({ code: "El código debe tener 6 dígitos" })
      return
    }

    setIsLoading(true)

    try {
      const response = await ServerApi.recoverVerify(email, code);
      if (response.success) {
        setStep(3);
        if (response.data?.token) {
          setRecoveryToken(response.data.token);
        }
      } else {
        setErrors({ general: response.message || "Código incorrecto. Verifica e intenta de nuevo." });
      }
    } catch (error: any) {
      setErrors({ general: error.message || "Código incorrecto. Verifica e intenta de nuevo." });
    } finally {
      setIsLoading(false);
    }
  }

  const handleResetPassword = async () => {
    setErrors({})

    const newPasswordValidation = validateInput({ value: newPassword, type: 'password' } as HTMLInputElement, 'password');
    if (!newPasswordValidation.isValid) {
      setErrors({ newPassword: newPasswordValidation.message || "Contraseña inválida" });
      return;
    }

    const confirmPasswordValidation = validateInput({ value: confirmPassword, type: 'password' } as HTMLInputElement, 'password');
    if (!confirmPasswordValidation.isValid) {
      setErrors({ confirmPassword: confirmPasswordValidation.message || "Contraseña inválida" });
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrors({ confirmPassword: "Las contraseñas no coinciden" })
      return
    }

    if (!recoveryToken) {
      setErrors({ general: "Token de recuperación no encontrado. Por favor, reinicia el proceso." });
      return;
    }

    setIsLoading(true)

    try {
      const response = await ServerApi.recoverReset(email, code, recoveryToken, newPassword, confirmPassword);
      if (response.success) {
        setSuccess(true);
      } else {
        setErrors({ general: response.message || "Error al restablecer la contraseña. Intenta de nuevo." });
      }
    } catch (error: any) {
      setErrors({ general: error.message || "Error al restablecer la contraseña. Intenta de nuevo." });
    } finally {
      setIsLoading(false);
    }
  }

  const handleResendCode = async () => {
    if (countdown > 0) return

    setIsLoading(true)
    try {
      const response = await ServerApi.recoverRequest(email);
      if (response.success) {
        setCountdown(60);
        if (response.data?.token) {
          setRecoveryToken(response.data.token);
        }
      } else {
        setErrors({ code: response.message || "Error al reenviar el código" });
      }
    } catch (error: any) {
      setErrors({ code: error.message || "Error al reenviar el código" });
    } finally {
      setIsLoading(false);
    }
  }



  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-dark p-4">
        <div className="w-full max-w-md bg-background-medium rounded-lg p-8 text-center">
          <div className="w-16 h-16 bg-main-green rounded-full flex items-center justify-center mx-auto mb-4">
            <FiCheck className="text-2xl text-white" />
          </div>
          <h2 className="text-xl font-bold text-white mb-4">¡Contraseña Restablecida!</h2>
          <p className="text-text-medium mb-6">Tu contraseña ha sido restablecida exitosamente.</p>
          <a
            href="/login"
            className="w-full inline-block bg-main-green hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 text-center"
          >
            Ir a Iniciar Sesión
          </a>
        </div>
      </div>
    )
  }

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Recuperar Contraseña"
      case 2:
        return "Verificar Código"
      case 3:
        return "Nueva Contraseña"
      default:
        return "Recuperar Contraseña"
    }
  }

  const getStepDescription = () => {
    switch (step) {
      case 1:
        return "Ingresa tu correo para recibir el código de recuperación"
      case 2:
        return "Ingresa el código de 6 dígitos que enviamos a tu correo"
      case 3:
        return "Crea una nueva contraseña segura"
      default:
        return ""
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-dark p-4">
      <div className="w-full max-w-md">
        <div className="bg-background-medium rounded-lg p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">{getStepTitle()}</h1>
            <p className="text-text-medium text-sm">{getStepDescription()}</p>
          </div>

          {/* loading */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= 1 ? "bg-main-blue text-white" : "bg-background-medium2 text-text-medium"
                }`}
              >
                1
              </div>
              <div className={`w-8 h-1 ${step > 1 ? "bg-main-blue" : "bg-background-medium2"}`}></div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= 2 ? "bg-main-orange text-white" : "bg-background-medium2 text-text-medium"
                }`}
              >
                2
              </div>
              <div className={`w-8 h-1 ${step > 2 ? "bg-main-orange" : "bg-background-medium2"}`}></div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= 3 ? "bg-main-green text-white" : "bg-background-medium2 text-text-medium"
                }`}
              >
                3
              </div>
            </div>
          </div>

          {errors.general && (
            <div className="mb-4 p-3 bg-red-900/20 border border-red-900/30 rounded text-red-400 text-sm">
              {errors.general}
            </div>
          )}

          {/* pasos */}
          {step === 1 && (
            <Step1Email
              email={email}
              setEmail={setEmail}
              handleSendCode={handleSendCode}
              isLoading={isLoading}
              errors={errors}
            />
          )}
          {step === 2 && (
            <Step2Code
              code={code}
              setCode={setCode}
              handleVerifyCode={handleVerifyCode}
              handleResendCode={handleResendCode}
              isLoading={isLoading}
              errors={errors}
              email={email}
              countdown={countdown}
            />
          )}
          {step === 3 && (
            <Step3Password
              newPassword={newPassword}
              setNewPassword={setNewPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              handleResetPassword={handleResetPassword}
              isLoading={isLoading}
              errors={errors}
            />
          )}

          {/* footer */}
<div className="flex items-center justify-between mt-6 pt-4 border-t border-background-medium2 footer">
            <a href="/login" className="text-sm text-main-blue hover:text-blue-400 transition-colors">
              Volver al login
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Recover
