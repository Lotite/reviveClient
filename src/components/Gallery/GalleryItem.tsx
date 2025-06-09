import { AiFillStar } from "react-icons/ai";
import { TmediaItem } from "../../utils/types";
import style from "./gallery.module.css";
import { useDialogGallery } from "../../contexts/DialogGalleryContext";
import Image from "../Image/Image";

export default function GalleryItem({ media }: { media: TmediaItem }) { 
  const { openDialog } = useDialogGallery();

  return (
    <div
      className={`${style.container} relative group aspect-Portada`}
      
      onClick={() => {
        openDialog(media); 
      }}
    >
      <Image className="w-full h-full absolute object-cover"    src={media.portada} />
      <div className={style.bg}>
        <div className=" absolute px-2 bottom-5 w-full">
          <h3 className="pl-2">{media.title}</h3>
          <div className=" flex flex-row px-5 w-full items-center justify-between">
            <span className=" text-xs  left-0 text-text-medium2">
              {media.type} • {new Date(media?.date!).getFullYear()}
            </span>
            <span className="flex right-0 items-center">
              <AiFillStar className="text-main-orange" /> {media.reseña}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
