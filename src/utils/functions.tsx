import { tailwindColors } from "./constants";
import { ToptionsInput, TtailwindColors } from "./types";




export function setBackgroundColor(color: TtailwindColors["background"]) {
    return `${tailwindColors.background.base[color]} ${tailwindColors.background.hover[color]} ${tailwindColors.background.active[color]} transition-colors duration-300 ease-in-out `;
}

export function setTextColor(color: TtailwindColors["text"]) {
    return `${tailwindColors.text.base[color]} ${tailwindColors.text.hover[color]} ${tailwindColors.text.active[color]} transition-colors duration-300 ease-in-out `;
}

const validators: {[key in ToptionsInput]: (value: string) => boolean} = {
  text: () => true,
  email: (value) => /^[\w.-]+@[\w-]+\.[a-z]{2,}$/i.test(value),
  password: (value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value),
  number: (value) => /^-?\d+(\.\d+)?$/.test(value),
  tel: (value) => /^\+?[\d\s\-()]{7,}$/.test(value),
  url: (value) => /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/.test(value)
};

export function validateInput(input: HTMLInputElement, type?: ToptionsInput) {
  const value = input.value.trim();

  const typeSelected = type ?? input.type;

  const validator = validators[typeSelected as ToptionsInput];
  if (!validator) return false;

  return validator(value);
}
