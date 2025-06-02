import { AiOutlineDelete } from "react-icons/ai";
import {
  AiOutlinePlus,
  AiOutlineCalendar,
  AiOutlineClose,
} from "react-icons/ai";
import { BiPlay } from "react-icons/bi";
import { CiClock2 } from "react-icons/ci";
import { SlBadge } from "react-icons/sl";
import { TmediaGallery, TserieInfo } from "../../utils/types";
import { Button } from "../baseComponents/Button/Button";
import Dialog from "../Dialog/Dialog";
import RecommendedMedia from "./RecommendedMedia";
import { useMediaPlayer } from "../../contexts/MediaPlayerContext";
import { useEffect, useState } from "react";
import ServerApi from "../../services/ServerApi";
import { SerieTabs } from "./SerieTabs";
import { useNotification } from "../../contexts/NotificationContext";

export default function DialogGallery({
  dialogState,
  selectedMedia,
  onClose,
}: {
  dialogState: "flex" | "hidden";
  selectedMedia?: TmediaGallery;
  onClose: () => void;
}) {
  const strDuracion = {
    movie: "minutos",
    serie: "temporadas",
    season: "episodios",
    episode: "minutos",
  };
  const [serieInfo, setSerieInfo] = useState<TserieInfo>([]);
  const [isSaved, setSaved] = useState(false);

  useEffect(() => {
    const fetchSeasonsAndEpisodes = async () => {
      setSaved(false);
      setSerieInfo(undefined);
      if (selectedMedia?.id) {
        const responseList = await ServerApi.isMediaInUserList(
          selectedMedia.id
        );
        if (responseList.success) setSaved(responseList.data?.exist!);
        if (selectedMedia.type !== "serie") return;
        const responseSerie = await ServerApi.getSeasonsAndEpisodes(
          selectedMedia.id
        );
        setSerieInfo(responseSerie.data!);
      }
    };
    fetchSeasonsAndEpisodes();
  }, [selectedMedia]);

  const { addNotification } = useNotification();

  const { playVideo } = useMediaPlayer();

  function addOrDeleteToList() {
    if (!isSaved) {
      addMediaToList();
    } else {
      deleteMediaFromList();
    }
  }

  async function addMediaToList() {
    if (!selectedMedia) return;
    const result = await ServerApi.saveMediaToList(selectedMedia?.id!);

    addNotification({
      type: result.success ? "success" : "error",
      message: result.message,
      duration: 3000,
    });

    if (result.success) setSaved(true);
  }

  async function deleteMediaFromList() {
    if (!selectedMedia) return;
    const result = await ServerApi.deleteMediaFromList(selectedMedia?.id!);

    addNotification({
      type: result.success ? "success" : "error",
      message: result.message,
      duration: 3000,
    });

    if (result.success) setSaved(false);
  }

  function playMedia() {
    if (selectedMedia?.type === "serie" && serieInfo?.[0].episodes?.[0]) {
      playVideo(serieInfo?.[0].episodes?.[0]);
    } else {
      playVideo(selectedMedia!);
    }
  }

  return (
    <Dialog
      display={dialogState}
      classContainer="w-[80%] h-[90%] flex flex-col relative"
      backgrounColor="medium2"
      onClose={onClose}
      scroll={true}
    >
      <button
        className="absolute top-3 right-3 text-text-white z-10 rounded-full bg-black hover:bg-black/80 cursor-pointer bg-opacity-50 p-1"
        onClick={onClose}
      >
        <AiOutlineClose className="text-2xl" />
      </button>

      <div className=" scroll">
        <div
          className="w-full relative  overflow-hidden h-[400px]"
          style={{
            backgroundImage: `url(${selectedMedia?.banner})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div className="w-full h-full bg-gradient-to-b bg-[#0000] from-40% to-background-medium2 to-100%">
            <h2 className="text-3xl font-bold mb-2 absolute bottom-0 left-0 p-6 w-full">
              {selectedMedia?.title}
            </h2>
          </div>
        </div>

        <div className="w-full  px-3 h-fit ">
          <div className="w-full flex flex-row">
            <Button
              onclick={() => selectedMedia && playMedia()}
              color="blue"
              className="px-1 py-0.5 mx-1 flex flex-row items-center text-xs sm:text-base"
            >
              <BiPlay className="text-xl sm:text-4xl" /> Reproducir
            </Button>
            <Button
              color="medium"
              onclick={addOrDeleteToList}
              className="px-1 py-0.5 mx-1 w-30 relative text-xs sm:text-base"
            >
              <div
                className={`absolute w-full flex top-1 transition-opacity duration-300 flex-row items-center opacity-${
                  isSaved ? 0 : 100
                }`}
              >
                <AiOutlinePlus className="text-xl sm:text-auto" /> Añadir
              </div>
              <div
                className={`absolute w-full flex top-1 transition-opacity duration-300 flex-row items-center opacity-${
                  isSaved ? 100 : 0
                }`}
              >
                <AiOutlineDelete className="text-xl sm:text-auto" /> Eliminar
              </div>
            </Button>
          </div>

          <p className="text-text-medium">{selectedMedia?.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <h3 className="text-sm font-medium text-text-white mb-2">
                  Géneros
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedMedia?.generos?.map((genero, _key) => (
                    <span
                      key={_key}
                      className="bg-background-medium px-3 py-1 rounded-full text-xs"
                    >
                      {genero}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <h3 className="text-sm font-medium text-text-white mb-2">
                  Reparto
                </h3>
                <p className="text-sm text-text-lightGray">
                  {selectedMedia?.reparto?.join(" ")}
                </p>
              </div>
            </div>
            <div>
              <div className="space-y-3">
                <div className="flex items-start">
                  <SlBadge className="text-star mr-2.5" />
                  <div>
                    <span className="text-xs text-text-medium block">
                      Director
                    </span>
                    <span className="text-sm text-text-white">
                      {selectedMedia?.director}
                    </span>
                  </div>
                </div>
                <div className="flex items-start">
                  <AiOutlineCalendar className="text-main-green mr-2.5" />
                  <div>
                    <span className="text-xs text-text-medium block">Año</span>
                    <span className="text-sm text-text-white">
                      {selectedMedia?.date &&
                        new Date(selectedMedia.date!).getFullYear()}
                    </span>
                  </div>
                </div>
                <div className="flex items-start">
                  <CiClock2 className="text-main-orange mr-2.5" />
                  <div>
                    <span className="text-xs text-text-medium block">
                      Duración
                    </span>
                    <span className="text-sm text-text-white">
                      {selectedMedia?.duracion}{" "}
                      {strDuracion[selectedMedia?.type!]}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {selectedMedia?.type == "serie" && (
            <SerieTabs serieInfo={serieInfo} />
          )}

          <RecommendedMedia
            title="Contenido recomendado"
            currentMedia={selectedMedia}
            className="translate-y-[100px]"
            itemCount={12}
            gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
          />
        </div>
      </div>
    </Dialog>
  );
}
