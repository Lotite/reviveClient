export type Tinput = {
    id?: string;
    label?: string;
    placeholder?: string;
    value?: string;
    error?: string;
    type?: ToptionsInput;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    className?: string;
    classInput?: string;
    classLabel?: string;
    classError?: string;
    onlyRead?: boolean;
    ref?: React.RefObject<HTMLInputElement | null>;
    children?: React.ReactNode;
}

export type TinputElements = {
    name?: HTMLInputElement ;
    email?: HTMLInputElement ;
    password?: HTMLInputElement ;
    passwordConfirm?: HTMLInputElement ;
    terms?: HTMLInputElement ;
}

export type TerrorFromUser ={
    name?:string,
    email?:string,
    password?:string,
    passwordConfirm?:string,
    terms?:string
}

export type TcheckBox = {
    label?: string;
    id?: string;
    checked?: boolean;
    children?: React.ReactNode;
    ref?: React.RefObject<HTMLInputElement | null>;
    onChange?: (checked: boolean) => void;
    error?: string;
}

export type Tbutton = {
    color?: TtailwindColors["background"];
    children?: React.ReactNode;
    text?: string;
    onclick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}

export type ToptionsInput = "text" | "email" | "password" | "number" | "tel" | "url" | "name"|"terms"


export type TtailwindColors = {
    text: "blue" | "orange" | "green" | "medium" | "white" |  "success" | "error" | "warning" | "info";
    background: "blue" | "orange" | "green" | "dark" | "medium" | "medium2";
};

export type Tmedia = {
    id:number,
    title:string,
    portada: string,
    banner:string,
    description: string,
    reseña:number,
    date:Date ,
    number:number,
    type:"movie" | "serie" | "season" | "episodie",
    duracion? : number
    clasificaion?:number
    generos?: Array<string>,
    reparto?: Array<string>,
    director? : string,
}

export type Tdialog = {
    classContainer ?: string,
    children? : React.ReactNode ,
    onClose? : CallableFunction,
    onOpen? : CallableFunction,
    display ? : "flex" | "hidden",
    backgrounColor ? : TtailwindColors["background"];
}