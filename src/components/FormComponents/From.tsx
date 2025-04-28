import style from "./FormStyle.module.css";

export default function Form({ className, children, validator }: { className?: string; children?: React.ReactNode; validator?: () => boolean }) {

    const classContainer = style.ContainerForm + " " + className  ;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validator && validator()) {
            e.currentTarget.submit();
        }
    };

    return (
        <form className={classContainer} onSubmit={handleSubmit} action="/hola">
            {children}
        </form>
    )
}