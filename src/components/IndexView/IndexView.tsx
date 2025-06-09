import { useState, useEffect } from "react";
import { IndexViewProps, TmediaItem, TrecomendationMedia } from "../../utils/types";
import Carousel from "../Carousel/Carousel";
import Gallery from "../Gallery/Gallery";
import { useLoading } from "../../contexts/LoadingContext";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";



export default function IndexView({ requestRecomendation, requestCarousel }: IndexViewProps) {
  const { hideLoading, sessionValidated } = useLoading();

  const [recomentions, setRecomentions] = useState<Array<TrecomendationMedia>>([]);
  const [carouselMedia, setCarouseMedia] = useState<Array<TmediaItem>>([]);

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
       <footer className="bg-[#121827] text-[#ccc3cf] py-10 mt-12 border-t border-[#374151]">
      <div className="flex flex-wrap justify-around max-w-6xl mx-auto gap-5">
        <div className="flex-1 min-w-[180px] mb-5">
          <h3 className="text-[#f97316] mb-4 text-xl">Revive</h3>
          {/* MODIFICACIÓN AQUÍ */}
          <p className="text-sm">
            Contenido de películas y series utilizado con fines de conservación de medios.
            Todos los derechos de las obras audiovisuales pertenecen a sus respectivos propietarios.
            &copy; {new Date().getFullYear()} Revive. Todos los derechos reservados.
          </p>
        </div>
        <div className="flex-1 min-w-[180px] mb-5">
          <h4 className="text-[#f97316] mb-4 text-lg">Navegación</h4>
          <ul className="list-none p-0">
            <li className="mb-2"><a href="#home" className="text-[#ccc3cf] hover:text-[#fca25d] transition-colors duration-300">Home</a></li>
            <li className="mb-2"><a href="#movies" className="text-[#ccc3cf] hover:text-[#fca25d] transition-colors duration-300">Películas</a></li>
            <li className="mb-2"><a href="#series" className="text-[#ccc3cf] hover:text-[#fca25d] transition-colors duration-300">Series</a></li>
          </ul>
        </div>
        <div className="flex-1 min-w-[180px] mb-5">
          <h4 className="text-[#f97316] mb-4 text-lg">Información</h4>
          <ul className="list-none p-0">
            <li className="mb-2"><a href="#about" className="text-[#ccc3cf] hover:text-[#fca25d] transition-colors duration-300">Acerca de nosotros</a></li>
            <li className="mb-2"><a href="#contact" className="text-[#ccc3cf] hover:text-[#fca25d] transition-colors duration-300">Contacto</a></li>
            <li className="mb-2"><a href="#privacy" className="text-[#ccc3cf] hover:text-[#fca25d] transition-colors duration-300">Política de Privacidad</a></li>
            <li className="mb-2"><a href="#terms" className="text-[#ccc3cf] hover:text-[#fca25d] transition-colors duration-300">Términos de Servicio</a></li>
          </ul>
        </div>
        <div className="flex-1 min-w-[180px] mb-5">
          <h4 className="text-[#f97316] mb-4 text-lg">Síguenos</h4>
          <div className="flex gap-4 mt-2">
            <a href="#facebook" className="text-[#ccc3cf] text-2xl hover:text-[#60a5fa] transition-colors duration-300">
              <FaFacebookF />
            </a>
            <a href="#twitter" className="text-[#ccc3cf] text-2xl hover:text-[#60a5fa] transition-colors duration-300">
              <FaTwitter />
            </a>
            <a href="#instagram" className="text-[#ccc3cf] text-2xl hover:text-[#60a5fa] transition-colors duration-300">
              <FaInstagram />
            </a>
            <a href="#youtube" className="text-[#ccc3cf] text-2xl hover:text-[#60a5fa] transition-colors duration-300">
              <FaYoutube />
            </a>
            <a href="#tiktok" className="text-[#ccc3cf] text-2xl hover:text-[#60a5fa] transition-colors duration-300">
              <FaTiktok />
            </a>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}
