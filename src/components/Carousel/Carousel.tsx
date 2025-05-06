import { AiOutlineRight } from "react-icons/ai"; 
import { AiOutlineLeft } from "react-icons/ai"; 
import { AiOutlineInfoCircle } from "react-icons/ai"; 
import { BiPlay } from "react-icons/bi"; 
import { AiFillStar } from "react-icons/ai"; 
import style from "./Carousel.module.css";
import { Button } from "../baseComponents/Button/Button";
import { Tmedia } from "../../utils/types";
import { useState, useRef } from "react";
import { setBackgroundColor } from "../../utils/functions";

export default function Carousel({medias}:{medias:Array<Tmedia>}){
    const [position,setPosition] = useState<number>(0);
    const animationTimeout = useRef<number | null>(null);

    function changePosition(pos=1){
        const count = medias.length ;
        const newPos = (position + pos + count) % count;
        setPosition(newPos);
    }

    function setImage(pos:number){
        if(animationTimeout.current){
            clearTimeout(animationTimeout.current);
        }
        if(pos !== position){
            changePosition(pos > position ? 1 : -1);
            animationTimeout.current = setTimeout(() => {
                setImage(pos);
            }, 900);
        }
    }

    function newImageContainer(media:Tmedia,pos:number){
        return(<div className={style.imageContainer} style={{
            transform: `translateX(${(pos - position)*100}%)`,
            position: 'absolute',
            }}>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0%, var(--color-background-dark) 100%), url(${media.image})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}></div>
            <div style={{position: 'relative', zIndex: 2, padding: '1rem'}}>
                <span className="bg-background-orange mr-3 py-1 px-2 rounded">Tendencia</span> 
                <span className="text-text-orange">{media.number}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl" style={{position: 'relative', zIndex: 2}}>{media.title}</h1>
            <div className="flex" style={{position: 'relative', zIndex: 2}}>
                    <AiFillStar className="text-text-orange text-xl"/>
                    <span className="px-1.5">{media.reseña}</span>
                    <span className="text-text-medium px-1.5">{media.date.getFullYear()}</span>
            </div>
            <p className="text-text-medium max-w-[200px]" style={{position: 'relative', zIndex: 2}}>{media.description}</p>
        </div>)
    }

    function selector(pos:number){
        const isActive = pos === position;
        const widthClass = isActive ? "w-6" : "w-2";
        return( <Button className={`${widthClass} transition-all h-2 rounded-full ${style.selector}`} color={isActive ? "orange" : "medium2"} onClick={() => setImage(pos)} />)
    }

    return(<div className={style.container}>
        <div className={style.imagesContainer}>
        {medias.map((media,pos)=>{return(newImageContainer(media,pos))})}
        </div>
        <div className="w-full h-10 absolute top-[40%] flex justify-between items-center" style={{transform: 'translateY(-50%)'}}>
           <AiOutlineLeft className={`${setBackgroundColor("dark")} opacity-80 mx-3 text-4xl rounded-full p-2`} onClick={()=>{changePosition(-1)}}/>
           <AiOutlineRight className={`${setBackgroundColor("dark")} opacity-80 mx-3 text-4xl rounded-full p-2`}  onClick={()=>{changePosition(1)}}/>
        </div>

        <div className="absolute flex w-100 bottom-10 left-5 " >
            <Button className="flex items-center justify-center " color="orange">
                <BiPlay />
                Reproducir
            </Button>
            <Button className="flex items-center justify-center" color="medium2">
                <AiOutlineInfoCircle />
                Más info
            </Button>
        </div>
        <div className="absolute bottom-4 left-1/2 w-full justify-center -translate-x-1/2 flex space-x-2 z-10">
        {medias.map((_media,index)=>{return(selector(index))})}
        </div>
    </div>)
}
