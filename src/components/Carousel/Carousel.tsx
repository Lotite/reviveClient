import { AiFillStar } from "react-icons/ai"; 
import style from "./Carousel.module.css";
export default function Carousel(){
    return(<div className={style.container}>
        <div className={`${style.imageContainer}  translate-x-[0%]`}>
            <div>
                <span className="bg-background-orange  py-1 px-2 rounded">Tendencia</span> <span className="text-text-orange">Temporada 1</span>
            </div>
            <h1 className="text-7xl">Serie</h1>
            <div className="flex">
                    <AiFillStar className="text-text-orange text-xl"/>
                    <span className="px-1.5">4.6</span>
                    <span className="text-text-medium px-1.5">2022</span>
                    <span className="text-text-medium px-1.5">8 episodios</span>
            </div>
            <p className="">Hola Hola HOla Hola Hola Hola</p>
        </div>
    </div>)
}
