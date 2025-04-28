import { tailwindColors } from "./constants";
import { TtailwindColors } from "./types";




export function setBackgroundColor(color: TtailwindColors["background"]) {
    return `${tailwindColors.background.base[color]} ${tailwindColors.background.hover[color]} ${tailwindColors.background.active[color]} transition-colors duration-300 ease-in-out `;
}

export function setTextColor(color: TtailwindColors["text"]) {
    return `${tailwindColors.text.base[color]} ${tailwindColors.text.hover[color]} ${tailwindColors.text.active[color]} transition-colors duration-300 ease-in-out `;
}