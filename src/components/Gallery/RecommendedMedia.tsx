import { useState, useEffect } from "react"
import type { recommendedMedia, TmediaItem } from "../../utils/types"
import GalleryItem from "./GalleryItem"
import ServerApi from "../../services/ServerApi"
import { randomInt } from "../../utils/functions"


export default function RecommendedMedia({
  title = "Contenido recomendado",
  currentMedia,
  itemCount = 12,
  className = "",
  gridCols = "grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8",
  showBorder = false,
}: recommendedMedia) {
  const [recommendedMedia, setRecommendedMedia] = useState<TmediaItem[]>([])
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    const fetchRecommendedMedia = async () => {
      setIsLoading(true)
      if (currentMedia?.id) {
        const response = await ServerApi.getRecommendedMedia(currentMedia.id.toString(), itemCount.toString());
        if (response.success && response.data) {
          setRecommendedMedia(response.data);
        } else {
          setRecommendedMedia([]); 
        }
      } else {
        setRecommendedMedia([]);
      }
      setIsLoading(false)
    }

    fetchRecommendedMedia()

  }, [currentMedia, itemCount])



  return (
    <div className={`overflow-hidden  ${showBorder ? "border-t border-background-medium pt-6  md:pt-8" : ""} ${className}`}>
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h3 className="text-lg md:text-xl font-semibold text-white">{title}</h3>
        {currentMedia && (
          <span className="text-sm text-text-medium bg-background-medium px-3 py-1 rounded-full">
            Basado en "{currentMedia.title}"
          </span>
        )}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-3 border-main-blue border-t-transparent rounded-full animate-spin"></div>
            <span className="text-text-medium text-sm">Cargando recomendaciones...</span>
          </div>
        </div>
      ) : (
        <>
          <div className={`grid ${gridCols} gap-3 md:gap-4`}>
            {recommendedMedia.map(media => (
              <div
                key={media.id  * randomInt(100)}
                className="transform transition-all duration-300 hover:scale-105 hover:z-10"
              >
                <GalleryItem media={media}  />
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 mb-3 bg-background-medium/50 rounded-lg">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <p className="text-sm text-text-medium">
                Mostrando {recommendedMedia.length} recomendaciones personalizadas
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-text-medium">Actualizado hace</span>
                <span className="text-xs text-main-blue font-medium">unos segundos</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
