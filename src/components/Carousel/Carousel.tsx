import { AiOutlineInfoCircle } from "react-icons/ai"; 
import { BiPlay } from "react-icons/bi"; 
import { AiFillStar } from "react-icons/ai"; 
import style from "./Carousel.module.css";
import { Button } from "../baseComponents/Button/Button";
import { Tmedia } from "../../utils/types";
export default function Carousel(){
    return(<div className={style.container}>
        <div className={`${style.imageContainer} p-10 translate-x-[0%]`}>
            <div>
                <span className="bg-background-orange  py-1 px-2 rounded">Tendencia</span> <span className="text-text-orange">Temporada 1</span>
            </div>
            <h1 className="text-7xl">Serie</h1>
            <div className="flex">
                    <AiFillStar className="text-text-orange text-xl"/>
                    <span className="px-1.5">4.6</span>
                    <span className="text-text-medium px-1.5">2022</span>
            </div>
            <p className="text-text-medium w-[70%] max-w-[500px]">Hola Hola HOla Hola Hola Hola Hola Hola HOla Hola Hola Hola Hola Hola HOla Hola Hola Hola </p>
        </div>
        <div className="absolute flex w-100 bottom-10 left-5 " >
            <Button className="flex items-center justify-center " color="orange">
                <BiPlay />
                ReProducir
            </Button>

            <Button className="flex items-center justify-center" color="medium2">
                <AiOutlineInfoCircle />
                Más info
            </Button>
        </div>
    </div>)
}


function newImageContainer(props:Tmedia){
    return(<div className={`${style.imageContainer}  translate-x-[0%]`}>
        <div>
            <span className="bg-background-orange  py-1 px-2 rounded">Tendencia</span> <span className="text-text-orange">Temporada 1</span>
        </div>
        <h1 className="text-7xl">{props.title}</h1>
        <div className="flex">
                <AiFillStar className="text-text-orange text-xl"/>
                <span className="px-1.5">{props.reseña}</span>
                <span className="text-text-medium px-1.5">{props.date.getFullYear()}</span>
        </div>
        <p className="text-text-medium max-w-[200px]">Hola Hola HOla Hola Hola Hola</p>
    </div>)
}