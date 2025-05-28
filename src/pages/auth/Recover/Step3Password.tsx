import React from "react";
import InputPassword from '../../../components/FormComponents/InputPassword';
import { Button } from '../../../components/baseComponents/Button/Button';
import { FiLock } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Step3PasswordProps } from '../../../utils/types';

const Step3Password: React.FC<Step3PasswordProps> = ({
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  handleResetPassword,
  isLoading,
  errors,
}) => {
  return (
    <>
      <div className="space-y-4">
        <InputPassword
          label="Nueva Contraseña"
          value={newPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
          id="newPassword"
          placeholder="Mínimo 8 caracteres"
          error={errors.newPassword}
        />

        <InputPassword
          label="Confirmar Contraseña"
          value={confirmPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
          id="confirmPassword"
          placeholder="Repite tu contraseña"
          error={errors.confirmPassword}
        />

        <Button
          onclick={handleResetPassword}
          disabled={isLoading || !newPassword || !confirmPassword}
          color="green"
          className="w-full disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <AiOutlineLoading3Quarters className="animate-spin" />
              Guardando...
            </>
          ) : (
            <>
              <FiLock />
              Cambiar Contraseña
            </>
          )}
        </Button>
      </div>
    </>
  );
};

export default Step3Password;
