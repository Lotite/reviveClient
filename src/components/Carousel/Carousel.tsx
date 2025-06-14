import { AiOutlineRight } from "react-icons/ai";
import { AiOutlineLeft } from "react-icons/ai";
import { BiPlay } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import style from "./Carousel.module.css";
import { Button } from "../baseComponents/Button/Button";
import { TmediaItem } from "../../utils/types";
import { useEffect, useState } from "react";
import { getLocaltionColor, getTypeColor, randomInt, setBackgroundColor } from "../../utils/functions";
import { useDialogGallery } from "../../contexts/DialogGalleryContext";

export default function Carousel({ medias }: { medias: Array<TmediaItem> }) {
  const [position, setPosition] = useState<number>(0);
  let intervalChange: number;

  const { openDialog } = useDialogGallery();
  const color = getLocaltionColor();
  useEffect(()=>{
    changePosition(1);
  },[medias])



  useEffect(() => {
    intervalChange = setInterval(() => {
      changePosition(1);
    }, 5000);
    return () => clearInterval(intervalChange);
  }, [position]);

  function changePosition(pos = 1) {
    if (medias && medias.length > 0) {
      const count = medias.length;
      const newPos = (position + pos + count) % count;
      setImage(newPos);
    }
  }

  function setImage(pos: number, oldPosition: number = position) {
    if (pos !== oldPosition) {
      const newPosition = (pos > oldPosition ? 1 : -1) + oldPosition;
      setPosition(newPosition);
      setTimeout(() => {
        setImage(pos, newPosition);
      }, 100);
    }
  }

  function newImageContainer(media: TmediaItem, pos: number) {
    const color = getTypeColor(media.type);
    const categorias = ["Tendencia", "Nuevo", "Lo mas nostalgico", "Popular", "Recomendado", "Visto recientemente"]
    const categoria = categorias[randomInt(categorias.length)];
    return (
      <div
        key={pos}
        className={style.imageContainer}
        style={{
          transform: `translateX(${(pos - position) * 100}%)`,
          position: "absolute",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0%, var(--color-background-dark) 100%), url(${media.banner})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div style={{ position: "relative", zIndex: 2, padding: "1rem" }}>
          <span className={`bg-background-${color} mr-3 py-1 px-2 rounded`}>
            {categoria}
          </span>
        </div>
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ position: "relative", zIndex: 2 }}
        >
          {media.title}
        </h1>
        <div className="flex" style={{ position: "relative", zIndex: 2 }}>
          <AiFillStar className={`text-text-orange text-xl`} />
          <span className="px-1.5">{media.reseña}</span>
          <span className="text-text-medium px-1.5">
            {new Date(media?.date!).getFullYear()}
          </span>
        </div>
      </div>
    );
  }

  function selector(pos: number) {
    const isActive = pos === position;
    const widthClass = isActive ? "w-6" : "w-2";
    return (
      <Button
        key={pos}
        className={`${widthClass} transition-all h-2 rounded-full ${style.selector}`}
        color={isActive ? color : "medium2"}
        onclick={() => setImage(pos)}
      />
    );
  }

  return (
    <div className={style.container}>
      <div className={style.imagesContainer}>
        {medias.map((media, pos) => {
          return newImageContainer(media, pos);
        })}
      </div>
      <div
        className="w-full h-10 absolute top-[40%] flex justify-between items-center"
        style={{ transform: "translateY(-50%)" }}
      >
        <AiOutlineLeft
          className={`${setBackgroundColor(
            "dark"
          )} opacity-80 mx-3 text-4xl rounded-full p-2`}
          onClick={() => {
            changePosition(-1);
          }}
        />
        <AiOutlineRight
          className={`${setBackgroundColor(
            "dark"
          )} opacity-80 mx-3 text-4xl rounded-full p-2`}
          onClick={() => {
            changePosition(1);
          }}
        />
      </div>

      <div className="absolute flex w-100 bottom-10 left-2">
       <Button
          className="flex w-40 items-center justify-center mx-2 px-1 py-1 sm:px-2 sm:py-2"
          color={color}
           onclick={() => {
            openDialog(medias[position]);
          }}
        >
          <BiPlay className="text-xl   sm:text-4xl" />
          Abrir
        </Button>
      </div>

      <div className="absolute bottom-4 left-1/2 w-full justify-center -translate-x-1/2 flex space-x-2 ">
        {medias.map((_media, index) => {
          return selector(index);
        })}
      </div>
    </div>
  );
}
