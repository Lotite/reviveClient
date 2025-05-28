import type React from "react";
import { useState, useRef, useEffect } from "react";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import type { TmediaGallery } from "../../../utils/types";
import GlitchText from "../../baseComponents/glithText/GlitchText";
import Dialog from "../../Dialog/Dialog";
import GalleryItem from "../../Gallery/GalleryItem";
import ServerApi from "../../../services/ServerApi";

interface DialogSearchProps {
  dialogState: "flex" | "hidden";
  onClose: () => void;
  dialogCall?: (media: TmediaGallery) => void;
}

export default function DialogSearch({
  dialogState,
  onClose,
}: DialogSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<TmediaGallery[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (dialogState === "flex" && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [dialogState]);

  useEffect(() => {
    if (dialogState === "hidden") {
      setSearchQuery("");
      setSearchResults([]);
    }
  }, [dialogState]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const debounceTimer = setTimeout(async () => {
      const response = await ServerApi.searchMedia(searchQuery);
      if (response.success && response.data) {
        setSearchResults(response.data);
      } else {
        setSearchResults([]);
      }
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
    inputRef.current?.focus();
  };

  return (
    <Dialog
      display={dialogState}
      classContainer="w-[95%] h-[95%] flex flex-col relative pb-5 overflow-y-auto scroll"
      backgrounColor="medium2"
      onClose={onClose}
    >
      <div className="p-6">
        {/* Barra de búsqueda */}
        <div className="relative mb-8">
          <div className="flex items-center relative">
            <AiOutlineSearch className="text-2xl absolute left-3 text-main-orange" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder="Buscar películas, series..."
              className="w-full h-12 pl-10 pr-10 bg-background-medium rounded-lg text-text-white placeholder:text-text-medium outline-none focus:outline-none focus:border-1 focus:border-main-orange transition-colors duration-300 ease-in-out"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 text-text-medium hover:text-text-white"
              >
                <AiOutlineClose className="text-xl" />
              </button>
            )}
            <button
              className=" ml-3 text-text-white  z-10 rounded-full bg-black hover:bg-black/70 cursor-pointer bg-opacity-50 p-1"
              onClick={onClose}
            >
              <AiOutlineClose className="text-2xl" />
            </button>
          </div>
        </div>

        {/* Estado inicial - sin búsqueda */}
        {!searchQuery && (
          <div className="flex flex-col items-center justify-center h-64">
            <GlitchText
              text="Busca tus películas y series favoritas"
              fontSize="1.2em"
              animationDuration="3s"
              className="text-text-medium"
            />
          </div>
        )}

        {/* Estado de carga */}
        {isLoading && searchQuery && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-main-orange"></div>
          </div>
        )}

        {/* Resultados de búsqueda */}
        {!isLoading && searchQuery && searchResults.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 scr md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {searchResults.map((media) => (
              <GalleryItem key={media.id} media={media} />
            ))}
          </div>
        )}

        {/* No se encontraron resultados */}
        {!isLoading && searchQuery && searchResults.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64">
            <GlitchText
              text={`No se encontraron resultados para "${searchQuery}"`}
              fontSize="1.2em"
              animationDuration="2s"
              className="text-text-medium mb-4"
            />
          </div>
        )}
      </div>
    </Dialog>
  );
}
