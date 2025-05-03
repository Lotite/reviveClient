
import { BiHomeAlt } from "react-icons/bi";
import { BsArrowLeftShort } from "react-icons/bs";
import { AiOutlinePoweroff } from "react-icons/ai";
import style from "./othersStyle.module.css";
import { useState, useEffect } from "react";
import Link from "../../components/baseComponents/link/Link";
import GlitchText from "../../components/baseComponents/glithText/GlitchText";

export default function P404() {

  const [canal,setCanal] = useState(8);
  const [tvPower,setTvPower] = useState<boolean>(false);
  const [animateImage, setAnimateImage] = useState(false);

  function PressPower(){
    setTvPower(!tvPower);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      PressPower();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  function changeCanal(direction: number){
    setAnimateImage(true);
    setTimeout(() => {
      setCanal(prev => {
        let next = prev + direction;
        if(next < 1) next = 10; 
        if(next > 10) next = 1; 
        return next;
      });
      setAnimateImage(false);
    }, 600);
  }

  return (
    <div className={style.tvContainer}>
      
        <div className={style.tvBox}>
          <div className={style.tvHeader}>
            <div className={style.tvTitle}>
              REVIVE TV
            </div>
            <div className="flex space-x-3">
              <div className="h-3 w-3 rounded-full bg-main-orange"></div>
              <div className="h-3 w-3 rounded-full bg-main-blue"></div>
              <div className="h-3 w-3 rounded-full bg-main-green"></div>
            </div>
          </div>
          <div
            className={style.tvScreen}
          >
            <img src="https://www.fronterad.com/wp-content/uploads/2020/06/TV_noise_128c.gif" className={`absolute w-full h-full opacity-${tvPower ? 100 : 0} ${animateImage ? style.fadeOpacityAnimation : ""}`} />
            <div className={`m-auto flex flex-col opacity-${tvPower ? 100 : 0} ${animateImage ? style.fadeOpacityAnimation : ""}`}>
            <GlitchText text="404" fontSize="6em" className="mx-auto" />
            <p className={`${style.wideText} text-black text-xl sm:text-2xl ${style.opacityAnimation}`}>Señal no encontrada</p>
            </div>
            <div className={`w-full h-full bg-black opacity-${tvPower ? 0 : 100} transition-opacity duration-400 ease-in-out absolute`}></div>
            <div className={style.tvSelectedCanal}>
              CH {canal}
            </div>
          </div>
          <div className={style.tvControler}>
            <div className={style.tvControlerRow}>
              <div className="flex space-x-2">
                <button
                  className={style.tvCanalButton}
                  onClick={()=>{changeCanal(1)}}
                >
                  <span className="mr-1">CH</span>
                  <span className="text-main-orange">+</span>
                </button>
                <button
                  className={style.tvCanalButton}
                  onClick={()=>{changeCanal(-1)}}
                >
                  <span className="mr-1">CH</span>
                  <span className="text-main-orange">-</span>
                </button>
              </div>
              <button
                className={`${style.tvPowerButton} ${tvPower ? "bg-background-orange" : "bg-background-medium"}`}
                onClick={PressPower}
              >
                <AiOutlinePoweroff className={"h-4 w-4 " }/>
                
              </button>
            </div>
            <div className={style.tvControlerRow }>
              <Link
                className={style.tvCanalButton}
                href="/"
                
              >
                <BiHomeAlt className="h-4 w-4 mr-1" />
                <span>INICIO</span>
              </Link>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-main-green animate-pulse"></div>
                <span className="text-xs text-text-medium">ON AIR</span>
              </div>
              <button
                className={style.tvCanalButton}
                onClick={() => window.history.back()}
              >
                <BsArrowLeftShort className="h-4 w-4 mr-1" />
                <span>ATRÁS</span>
              </button>
            </div>
          </div>
        </div>
        <div className={style.tvSoport}></div>
      </div>
  );
}
