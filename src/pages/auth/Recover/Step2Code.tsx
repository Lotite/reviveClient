import React from "react";
import Input from '../../../components/FormComponents/Input';
import { Button } from '../../../components/baseComponents/Button/Button';
import { FiShield } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Step2CodeProps } from '../../../utils/types';

const Step2Code: React.FC<Step2CodeProps> = ({
  code,
  setCode,
  handleVerifyCode,
  handleResendCode,
  isLoading,
  errors,
  email,
  countdown,
}) => {
  return (
    <>
      <div className="space-y-4">
        <Input
          label="Código de Verificación"
          id="code"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
          placeholder="123456"
          maxLength={6}
          error={errors.code}
        />
        <p className="text-xs text-text-medium mt-1">
          Enviado a: <span className="text-main-blue">{email}</span>
        </p>

        <Button
          onclick={handleVerifyCode}
          disabled={isLoading || code.length !== 6}
          color="orange"
          className="w-full disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <AiOutlineLoading3Quarters className="animate-spin" />
              Verificando...
            </>
          ) : (
            <>
              <FiShield />
              Verificar
            </>
          )}
        </Button>

        <div className="text-center">
          <Button
            onclick={handleResendCode}
            disabled={countdown > 0 || isLoading}
            color="orange"
            className="text-sm text-main-blue px-6 hover:underline disabled:text-text-medium disabled:no-underline disabled:cursor-not-allowed"
          >
            {countdown > 0 ? `Reenviar en ${countdown}s` : "Reenviar código"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Step2Code;
