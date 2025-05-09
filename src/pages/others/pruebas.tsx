import { useState } from "react";
import Galery from "../../components/Galery/Galery";
import { Tmedia } from "../../utils/types";
import DialogGalery from "../../components/Galery/dialogGalery";

export default function Pruebas() {
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
    },
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

  return (
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
  );
}
