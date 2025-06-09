import { TmediaItem } from "../../utils/types";
import GalleryItem from "./GalleryItem";
import style from "./gallery.module.css"


export default function xGallery({categoryName: categoryName,medias}:{categoryName:string,medias:Array<TmediaItem>,dialogCall?:(media:TmediaItem)=>void}){
    return(<div className="mx-5 mt-3 mb-5">
        <h2 className={style.titleGallery}>{categoryName}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8  gap-4 h-fit">
        {medias.map((media,index)=>{
            return(<GalleryItem key={index} media={media}  />)
        })}
    </div>
    </div>);
}
