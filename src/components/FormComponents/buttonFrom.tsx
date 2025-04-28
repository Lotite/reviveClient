import { Tbutton  } from "../../utils/types";
import { Button } from "../baseComponents/Button/Button";



export function ButtonFrom(props: Omit<Tbutton, "type">) {

    
return(
    <Button {...props} type="submit" />
);
}