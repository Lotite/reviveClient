import { useState } from "react";
import Dialog from "../../components/Dialog/Dialog";
import Galery from "../../components/Galery/Galery";
import { Tmedia } from "../../utils/types";

export default function Pruebas(){
    const medias : Array<Tmedia> = [
        {
            id: 1,
            title: "Media 1",
            image: "https://picsum.photos/1000/400",
            description: "Description 1",
            reseña: 5,
            date: new Date("2023-01-01"),
            number: 1,
            type: "movie"
        },
        {
            id: 2,
            title: "Media 2",
            image: "https://picsum.photos/1000/401",
            description: "Description 2",
            reseña: 5,
            date: new Date("2023-01-02"),
            number: 2,
            type: "movie"
        },
        {
            id: 3,
            title: "Media 3",
            image: "https://picsum.photos/1000/402",
            description: "Description 3",
            reseña: 5,
            date: new Date("2023-01-03"),
            number: 3,
            type: "movie"
        },
        {
            id: 4,
            title: "Media 4",
            image: "https://picsum.photos/1000/403",
            description: "Description 4",
            reseña: 5,
            date: new Date("2023-01-04"),
            number: 4,
            type: "movie"
        },
        {
            id: 5,
            title: "Media 5",
            image: "https://picsum.photos/1000/404",
            description: "Description 5",
            reseña: 5,
            date: new Date("2023-01-05"),
            number: 5,
            type: "movie"
        },
        {
            id: 6,
            title: "Media 6",
            image: "https://picsum.photos/1000/405",
            description: "Description 6",
            reseña: 5,
            date: new Date("2023-01-06"),
            number: 6,
            type: "movie"
        },
        {
            id: 7,
            title: "Media 7",
            image: "https://picsum.photos/1000/406",
            description: "Description 7",
            reseña: 5,
            date: new Date("2023-01-07"),
            number: 7,
            type: "movie"
        },
        {
            id: 8,
            title: "Media 8",
            image: "https://picsum.photos/1000/407",
            description: "Description 8",
            reseña: 5,
            date: new Date("2023-01-08"),
            number: 8,
            type: "movie"
        }
    ];

    

    const [dialogState,SetdialogState] = useState<"hidden"|"flex">("hidden");
    function openDialog(media:Tmedia){

    }


    return(<div className="h-300 flex flex-col">
        <Galery categoryName="Tendecias" medias={medias}/>
        <Galery categoryName="Series Populares" medias={medias}/>
        <Galery categoryName="Películas recomendadas" medias={medias}/>
        <Galery categoryName="Continuar viendo" medias={medias}/>
       
        <Dialog  display={dialogState} onClose={()=>SetdialogState("hidden")} >
            
        </Dialog>
    </div>)
}