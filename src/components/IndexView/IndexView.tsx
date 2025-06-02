import { useState, useEffect } from "react";
import { IndexViewProps, TmediaGallery, TrecomendationMedia } from "../../utils/types";
import Carousel from "../Carousel/Carousel";
import Gallery from "../Gallery/Gallery";
import { useLoading } from "../../contexts/LoadingContext";



export default function IndexView({ requestRecomendation, requestCarousel }: IndexViewProps) {
  const { hideLoading, sessionValidated } = useLoading();

  const [recomentions, setRecomentions] = useState<Array<TrecomendationMedia>>([]);
  const [carouselMedia, setCarouseMedia] = useState<Array<TmediaGallery>>([]);

  useEffect(() => {
    async function fetchRecomentions() {
      if (sessionValidated) {
        const resultCarousel = await requestCarousel();
        const resultRecomendation = await requestRecomendation();

        if (resultCarousel.success) {
          setCarouseMedia(resultCarousel.data || []);
        }

        if (resultRecomendation.success) {
          setRecomentions(resultRecomendation.data || []);
        }
        hideLoading();
      }
    }

    fetchRecomentions();
  }, [sessionValidated]);

  return (
    <>
      {carouselMedia && (<Carousel medias={carouselMedia} />)}
      <div className="h-300 flex flex-col">
        {recomentions.map((recomention, index) => (
          <Gallery
            key={index}
            categoryName={recomention.genero.nombre_genero}
            medias={recomention.medias}
          />
        ))}
      </div>
    </>
  );
}
