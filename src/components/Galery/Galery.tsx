import { Tmedia } from "../../utils/types";
import GaleryItem from "./GaleryItem";
import style from "./galery.module.css"


export default function xGalery({categoryName: categoryName,medias,dialogCall}:{categoryName:string,medias:Array<Tmedia>,dialogCall?:(media:Tmedia)=>void}){
    return(<div className="mx-5 mt-3 mb-5">
        <h2 className={style.titleGalery}>{categoryName}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8  gap-4 h-fit">
        {medias.map(media=>{
            return(<GaleryItem media={media} dialogCall={dialogCall} />)
        })}
    </div>
    </div>);
}
