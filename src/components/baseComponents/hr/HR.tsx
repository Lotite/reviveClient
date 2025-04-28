import { tailwindColors } from "../../../utils/constants";
import { TtailwindColors } from "../../../utils/types";

export default function HR({ text, background, textColor , hrColor }: { text?: string, background?: TtailwindColors["background"] , hrColor? : TtailwindColors["text"] , textColor?:TtailwindColors["text"] }) {;
  return (
    <div className="w-full relative my-10">
      <hr className={tailwindColors.text.base[ hrColor || "medium"]} />
    {text && (
        <span className={"absolute left-1/2   transform px-2 -translate-x-1/2 -top-3 text-center " + tailwindColors.text.base[ textColor || "medium"] + " " + tailwindColors.background.base[background || "medium"]}>
        {text}
      </span>
    )}
    </div>
  );

}