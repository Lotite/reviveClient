import { BsGoogle } from "react-icons/bs";
import { Button } from "../baseComponents/Button/Button";
import HR from "../baseComponents/hr/HR";
import style from "./FormStyle.module.css";
import { FaFacebookF } from "react-icons/fa";

export default function Form({ className, children, validator , serverValidator , action }: { className?: string; children?: React.ReactNode; validator?: () => boolean ,serverValidator?: () => Promise<boolean> ,action?: string }) {

    const classContainer = style.ContainerForm + " " + className  ;

    const handleSubmit = async  (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validator?.() && await serverValidator?.()) {
            (e.target as HTMLFormElement).submit();
        }
    };

    return (
        <form className={classContainer} onSubmit={handleSubmit} action={"/login"}  >
            {children}
            <HR text="O continua con" textColor="green"/>
            <div className="flex justify-between">
            <Button color="medium2" className="flex py-3 px-7 justify-center items-center w-1/2 mx-1">
                <BsGoogle className="mx-1"/>
                Google
            </Button>
            <Button color="medium2" className="flex py-3 px-7 justify-center items-center w-1/2 mx-1">
                <FaFacebookF className="mr-1 text-2xl" />
                Facebook
            </Button>
            </div>
        </form>
    )
}