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

export function randomInt(num1:number,num2?:number):number{
  if(num2==undefined){
    return Math.floor(Math.random() *  num1)
  }else{
    return Math.floor(Math.random() * (num2 - num1 + 1)) + num1
  }
}

export function isDesktopDevice() {
  if (typeof navigator === "undefined") return true; // default to desktop if no navigator
  const ua = navigator.userAgent || navigator.vendor;
  // Check for mobile device keywords in user agent
  if (/android|iphone|ipad|ipod|opera mini|iemobile|mobile/i.test(ua)) {
    return false;
  }
  return true;
}