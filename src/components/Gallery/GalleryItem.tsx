import { AiFillStar } from "react-icons/ai"; 
import { TmediaGallery } from "../../utils/types"
import style from "./gallery.module.css"
export default function GalleryItem({media,dialogCall}:{media:TmediaGallery , dialogCall?:(media:TmediaGallery)=>void}){
    return(<div className={`${style.container} aspect-Portada group`} style={{backgroundImage:`url(${media.portada})`}} onClick={()=>{dialogCall?.(media)}}>
        <div className={style.bg}>
            <div className=" absolute px-2 bottom-5 w-full">
                <h3 className="pl-2">{media.title}</h3>
               <div className=" flex flex-row px-5 w-full items-center justify-between">
               <span className=" text-xs  left-0 text-text-medium2">{media.type} • {new Date(media?.date!).getFullYear()}</span>
               <span className="flex right-0 items-center"><AiFillStar className="text-main-orange"/> {media.reseña}</span>
               </div>
            </div>
        </div>
    </div>)
}