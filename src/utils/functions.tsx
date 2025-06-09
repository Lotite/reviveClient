import { tailwindColors } from "./constants";
import { ToptionsInput, TtailwindColors, TerrorFromUser, TinputElements } from "./types";




export function setBackgroundColor(color: TtailwindColors["background"]) {
    return `${tailwindColors.background.base[color]} ${tailwindColors.background.hover[color]} ${tailwindColors.background.active[color]} transition-colors duration-300 ease-in-out `;
}

export function setTextColor(color: TtailwindColors["text"]) {
    return `${tailwindColors.text.base[color]} ${tailwindColors.text.hover[color]} ${tailwindColors.text.active[color]} transition-colors duration-300 ease-in-out `;
}

type ValidationResult = { isValid: boolean; message?: string };

const validators: { [key in ToptionsInput]: (value: string | boolean) => ValidationResult } = {
  text: (_value) => ({ isValid: true }),
  name: (value) => { 
    if (!value) return { isValid: false, message: "El nombre es requerido" };
    const isValid = /^[A-Za-z\s]{4,}$/.test(String(value));
    return {
      isValid,
      message: isValid
        ? undefined
        : "El nombre debe tener al menos 4 caracteres y no contener números o caracteres especiales",
    };
  },
  terms: (value) => {
    if (!value) return { isValid: false, message: "Debes aceptar los términos y condiciones" };
    return { isValid: true, message: "Terminos aceptados" };
  },
  email: (value) => {
    if (!value) return { isValid: false, message: "El correo es requerido" };
    const isValid = /^[\w.-]+@[\w-]+\.[a-z]{2,}$/i.test(String(value));
    return { isValid, message: isValid ? undefined : "Correo inválido" };
  },
  password: (value) => {
    if (!value) return { isValid: false, message: "La contraseña es requerida" };
    const isValid = /^[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/.test(String(value));
    return {
      isValid,
      message: isValid
        ? undefined
        : "La contraseña debe tener al menos 8 caracteres",
    };
  },
  number: (value) => {
    if (!value) return { isValid: false, message: "El número es requerido" };
    const isValid = /^-?\d+(\.\d+)?$/.test(String(value));
    return { isValid, message: isValid ? undefined : "Número inválido" };
  },
  tel: (value) => {
    if (!value) return { isValid: false, message: "El teléfono es requerido" };
    const isValid = /^\+?[\d\s\-()]{7,}$/.test(String(value));
    return { isValid, message: isValid ? undefined : "Teléfono inválido" };
  },
  url: (value) => {
    if (!value) return { isValid: false, message: "La URL es requerida" };
    const isValid = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/.test(String(value));
    return { isValid, message: isValid ? undefined : "URL inválida" };
  },
};

export function validateInput(input: HTMLInputElement, type?: ToptionsInput): ValidationResult {

  function isCheckBox(input: HTMLInputElement): boolean {
    return input.type === "checkbox";
  }

  const value = (isCheckBox(input) ? input.checked : input.value) || "";
  const typeSelected = type ?? input.type;
  const validator = validators[typeSelected as ToptionsInput];

  if (!validator) return { isValid: false, message: "Tipo de entrada no válido" };

  return validator(value);
}


export function getLocaltionColor():"blue"|"green"|"orange"{
  switch(location.href){
    case "movies":
      return "orange"
    break;
    case "series":
    return "blue"
    break;
    default: return "green" ;
  }
}


export function getTypeColor(type:string):"blue"|"green"|"orange"{
   switch(type){
    case "movie":
      return "orange"
    break;
    case "serie":
    return "blue"
    break;
    default: return "green" ;
  }

  return "green";

}


export function validateForm(inputs: TinputElements): { isValid: boolean; errors: TerrorFromUser } {
  const errors: TerrorFromUser = {};
  let isValid: boolean = true;
  for (const type in inputs) {
    const input = inputs[type as keyof TinputElements];
    if (input) {
      if (type === "passwordConfirm") {
        const password = inputs.password?.value;
        const passwordConfirm = input.value;
        if (!passwordConfirm) {
          errors.passwordConfirm = "La confirmacion no puede estar vacio";
          isValid = false;
        } else if (passwordConfirm !== password) {
          errors.passwordConfirm = "Las contraseñas no coinciden";
          isValid = false;
        }
      } else {
        const { isValid: valid, message } = validateInput(input as HTMLInputElement, type as ToptionsInput);
        if (!valid) {
          errors[type as keyof TerrorFromUser] = message;
          isValid = false;
        }
      }
    }
  }
  return { isValid, errors };
}


export function randomInt(num1: number, num2?: number): number {
  if (num2 === undefined) {
    return Math.floor(Math.random() * num1);
  } else {
    return Math.floor(Math.random() * (num2 - num1 + 1)) + num1;
  }
}

export function isDesktopDevice() {
  if (typeof navigator === "undefined") return true; // default to desktop if no navigator
  const ua = navigator.userAgent || navigator.vendor;
  if (/android|iphone|ipad|ipod|opera mini|iemobile|mobile/i.test(ua)) {
    return false;
  }
  return true;
}