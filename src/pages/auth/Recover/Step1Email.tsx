import React from "react";
import Input from '../../../components/FormComponents/Input';
import { Button } from '../../../components/baseComponents/Button/Button';
import { FiMail } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Step1EmailProps } from '../../../utils/types';

const Step1Email: React.FC<Step1EmailProps> = ({
  email,
  setEmail,
  handleSendCode,
  isLoading,
  errors,
}) => {
  return (
    <>
      <div className="space-y-4">
        <Input
          label="Correo Electrónico"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@correo.com"
          error={errors.email}
        />

        <Button
          onclick={handleSendCode}
          disabled={isLoading}
          color="blue"
          className="w-full disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <AiOutlineLoading3Quarters className="animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <FiMail />
              Enviar Código
            </>
          )}
        </Button>
      </div>
    </>
  );
};

export default Step1Email;
