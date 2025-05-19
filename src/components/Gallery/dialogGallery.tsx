import { AiOutlinePlus, AiOutlineCalendar } from "react-icons/ai"
import { BiPlay } from "react-icons/bi"
import { CiClock2 } from "react-icons/ci"
import { SlBadge } from "react-icons/sl"
import { TmediaGallery } from "../../utils/types"
import { Button } from "../baseComponents/Button/Button"
import Dialog from "../Dialog/Dialog"

export default function DialogGallery({dialogState,selectedMedia,onClose}:{dialogState:"flex"|"hidden",selectedMedia?:TmediaGallery,onClose:()=>void}){
    const strDuracion = {
        movie: "minutos",
        serie: "temporadas",
        season: "episodios",
        episodie: "minutos",
      };
    return(<Dialog
        display={dialogState}
        classContainer="w-[80%] h-[80%] flex flex-col relative pb-5"
        backgrounColor="medium2"
        onClose={onClose}
      >
        <div
          className="w-full overflow-hidden h-[50%] relative"
          style={{ backgroundImage: `url(${selectedMedia?.banner})` }}
        >
          <div className="w-full h-full bg-gradient-to-b bg-[#0000] from-40% to-background-medium2 to-100%">
            <h2 className="text-3xl font-bold mb-2 absolute bottom-0 left-0 p-6 w-full">
              {selectedMedia?.title}
            </h2>
          </div>
        </div>
        <div className="px-3 w-full flex-1">
          <div className="w-full flex flex-row">
            <Button color="blue" className="px-2 py-1 mx-1 flex  flex-row items-center">
              <BiPlay className="text-4xl " /> Reproducir
            </Button>
            <Button color="medium" className="px-2 py-1 mx-1 flex flex-row items-center">
              <AiOutlinePlus /> Añadir
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
                  {selectedMedia?.generos?.map((genero) =>{return(
                    <span className="bg-background-medium px-3 py-1 rounded-full text-xs">
                    {genero}
                  </span>
                  )})}
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
                <div className="flex items-start ">
                <SlBadge className="text-star mr-2.5"/>
                  <div>
                    <span className="text-xs text-text-medium block">Director</span>
                    <span className="text-sm text-text-white">
                      {selectedMedia?.director}
                    </span>
                  </div>
                </div>
                <div className="flex items-start">
                <AiOutlineCalendar className="text-main-green mr-2.5"/>
                  <div>
                    <span className="text-xs text-text-medium block">Año</span>
                    <span className="text-sm text-text-white">{new Date(selectedMedia?.date!).getFullYear()}</span>
                  </div>
                </div>
                <div className="flex items-start">
                <CiClock2 className="text-main-orange mr-2.5"/>
                  <div>
                    <span className="text-xs text-text-medium block">Duración</span>
                    <span className="text-sm text-text-white">{selectedMedia?.duracion} {strDuracion[selectedMedia?.type!]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>)
}