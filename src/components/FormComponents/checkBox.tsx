import { TcheckBox } from "../../utils/types";
import style from "./FormStyle.module.css"

const CheckBox = ((props:TcheckBox) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      props.onChange(e.target.checked);
    }
  };



 // const color = colors.allSolid[props.color] || props.color || "#fff"; 
  
  return (
    <div className="flex items-center relative pb-5">
      <input
        ref={props.ref}
        checked={props.checked}
        id={props.id || "checked-checkbox"}
        type="checkbox"
        value=""
        onChange={handleChange}
        className={style.checkboxFrom}
      />
      <label
        htmlFor={props.id || "checked-checkbox"}
        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {props.children ? props.children :   props.label }
      </label>
      {props.error && (
        <span className="text-red-500 text-xs absolute bottom-0 left-0">
          {props.error} 
        </span>
      )}
    </div>
  );
});

export default CheckBox;
