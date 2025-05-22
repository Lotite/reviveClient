import { BsGoogle } from "react-icons/bs";
import { Button } from "../baseComponents/Button/Button";
import HR from "../baseComponents/hr/HR";
import style from "./FormStyle.module.css";
import { FaFacebookF } from "react-icons/fa";

export default function Form({
  className,
  children,
  validator,
  serverValidator,
  action,
}: {
  className?: string;
  children?: React.ReactNode;
  validator?: () => boolean;
  serverValidator?: () => Promise<boolean>;
  action?: string;
}) {
  const classContainer = style.ContainerForm + " " + className;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validator?.() && (await serverValidator?.())) {
      (e.target as HTMLFormElement).submit();
    }
  };

  return (
    <form className={classContainer} onSubmit={handleSubmit} action={action}>
      {children}
      <HR text="O continua con" textColor="green" />
      <div className="flex">
        <Button
          color="medium2"
          className="flex py-2 px-4 justify-center items-center w-1/2 mx-1 text-sm sm:py-3 sm:px-7"
        >
          <BsGoogle className="mx-1" />
          Google
        </Button>
        <Button
          color="medium2"
          className="flex py-2 px-4 justify-center items-center w-1/2 mx-1 text-sm sm:py-3 sm:px-7"
        >
          <FaFacebookF className="mr-1 text-xl sm:text-2xl" />
          Facebook
        </Button>
      </div>
    </form>
  );
}
