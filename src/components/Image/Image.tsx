import { useState } from "react"

export default function Image({src,className,alt}:{src:string,className?:string,alt?:string}){
    const [isLoadig,setIsLoading] = useState(true);
    return (<div className={className + " relative"}>
        <img onLoad={()=>setIsLoading(false)} className="w-full h-full absolute object-cover" src={src} alt={alt} />
         {isLoadig && (<div className="flex  items-center gap-3 absolute h-full w-full  bg-background-medium">
        <div className="w-8 h-8 border-3 mx-auto border-main-blue border-t-transparent rounded-full animate-spin"/> 
      </div>)}
        </div>)
}