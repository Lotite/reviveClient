import { useState } from "react";
import Carousel from "../../components/Carousel/Carousel";
import DialogGalery from "../../components/Galery/dialogGalery";
import Galery from "../../components/Galery/Galery";
import { Tmedia } from "../../utils/types";

export default function Home() {
  const medias: Array<Tmedia> = [
    {
      id: 1,
      title: "Media 1",
      portada: "https://picsum.photos/400/1001",
      banner: "https://picsum.photos/1000/401",
      description: "Description 1",
      reseña: 5,
      date: new Date("2023-01-01"),
      number: 1,
      type: "movie",
      duracion: 120,
      clasificaion: 13,
      generos: ["Action", "Adventure"],
      reparto: ["Actor 1", "Actor 2"],
      director: "Director 1",
    },
    {
      id: 2,
      title: "Media 2",
      portada: "https://picsum.photos/400/1002",
      banner: "https://picsum.photos/1000/402",
      description: "Description 2",
      reseña: 5,
      date: new Date("2023-01-02"),
      number: 2,
      type: "movie",
      duracion: 110,
      clasificaion: 16,
      generos: ["Comedy", "Drama"],
      reparto: ["Actor 3", "Actor 4"],
      director: "Director 2",
    },
    {
      id: 3,
      title: "Media 3",
      portada: "https://picsum.photos/400/1003",
      banner: "https://picsum.photos/1000/403",
      description: "Description 3",
      reseña: 5,
      date: new Date("2023-01-03"),
      number: 3,
      type: "movie",
      duracion: 95,
      clasificaion: 0,
      generos: ["Animation", "Family"],
      reparto: ["Actor 5", "Actor 6"],
      director: "Director 3",
    },
    {
      id: 4,
      title: "Media 4",
      portada: "https://picsum.photos/400/1004",
      banner: "https://picsum.photos/1000/404",
      description: "Description 4",
      reseña: 5,
      date: new Date("2023-01-04"),
      number: 4,
      type: "movie",
      duracion: 135,
      clasificaion: 18,
      generos: ["Thriller", "Crime"],
      reparto: ["Actor 7", "Actor 8"],
      director: "Director 4",
    },
    {
      id: 5,
      title: "Media 5",
      portada: "https://picsum.photos/400/1005",
      banner: "https://picsum.photos/1000/405",
      description: "Description 5",
      reseña: 5,
      date: new Date("2023-01-05"),
      number: 5,
      type: "movie",
      duracion: 105,
      clasificaion: 7,
      generos: ["Sci-Fi", "Fantasy"],
      reparto: ["Actor 9", "Actor 10"],
      director: "Director 5",
    },
    {
      id: 6,
      title: "Media 6",
      portada: "https://picsum.photos/400/1006",
      banner: "https://picsum.photos/1000/406",
      description: "Description 6",
      reseña: 5,
      date: new Date("2023-01-06"),
      number: 6,
      type: "movie",
      duracion: 115,
      clasificaion: 13,
      generos: ["Romance", "Drama"],
      reparto: ["Actor 11", "Actor 12"],
      director: "Director 6",
    },
    {
      id: 7,
      title: "Media 7",
      portada: "https://picsum.photos/400/1007",
      banner: "https://picsum.photos/1000/407",
      description: "Description 7",
      reseña: 5,
      date: new Date("2023-01-07"),
      number: 7,
      type: "movie",
      duracion: 125,
      clasificaion: 16,
      generos: ["Horror", "Mystery"],
      reparto: ["Actor 13", "Actor 14"],
      director: "Director 7",
    },
    {
      id: 8,
      title: "Media 8",
      portada: "https://picsum.photos/400/1008",
      banner: "https://picsum.photos/1000/408",
      description: "Description 8",
      reseña: 5,
      date: new Date("2023-01-08"),
      number: 8,
      type: "movie",
      duracion: 100,
      clasificaion: 0,
      generos: ["Documentary"],
      reparto: ["Actor 15", "Actor 16"],
      director: "Director 8",
    }
  ];

  
    const [dialogState, SetdialogState] = useState<"hidden" | "flex">("hidden");
    const [selectedMedia, setSelectedMedia] = useState<Tmedia>();
  
    function openDialog(media: Tmedia) {
      setSelectedMedia(media);
      SetdialogState("flex");
    }
  
    function closeDialog() {
      SetdialogState("hidden");
    }

  return (<>
    <Carousel medias={medias} openDialog={openDialog} />
    <div className="h-300 flex flex-col">
      <Galery
        dialogCall={openDialog}
        categoryName="Tendecias"
        medias={medias}
      />
      <Galery
        dialogCall={openDialog}
        categoryName="Películas recomendadas"
        medias={medias}
      />
      <Galery
        dialogCall={openDialog}
        categoryName="Series Populares"
        medias={medias}
      />
      <Galery
        dialogCall={openDialog}
        categoryName="Continuar viendo"
        medias={medias}
      />
      <DialogGalery  selectedMedia={selectedMedia} onClose={closeDialog} dialogState={dialogState}/>
    </div>
    </>);
}
