import type React from "react"
import { useState, useRef, useEffect } from "react"
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai"
import type { TmediaGallery } from "../../../utils/types"
import GlitchText from "../../baseComponents/glithText/GlitchText"
import Dialog from "../../Dialog/Dialog"
import GalleryItem from "../../Gallery/GalleryItem"

interface DialogSearchProps {
  dialogState: "flex" | "hidden"
  onClose: () => void
  dialogCall?: (media: TmediaGallery) => void
}

export default function DialogSearch({ dialogState, onClose, dialogCall }: DialogSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<TmediaGallery[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)


  useEffect(() => {
    if (dialogState === "flex" && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [dialogState])


  useEffect(() => {
    if (dialogState === "hidden") {
      setSearchQuery("")
      setSearchResults([])
    }
  }, [dialogState])

  
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      setIsLoading(false)
      return
    }

    setIsLoading(true)


    const debounceTimer = setTimeout(() => {
      const mockResults: Array<TmediaGallery> = Array.from({ length: 24 }, (_, i) => ({
        id: i + 1,
        title: `Resultado ${i + 1} para "${searchQuery}"`,
        portada: `https://picsum.photos/400/${1001 + i}`,
        banner: `https://picsum.photos/1000/${401 + i}`,
        description: `Descripción detallada del resultado ${i + 1} para la búsqueda "${searchQuery}". Esta película/serie contiene elementos que coinciden con tu búsqueda.`,
        reseña: Math.round((3 + Math.random() * 2) * 10) / 10, // Valor entre 3.0 y 5.0
        date: new Date(2023, i % 12, (i % 28) + 1).toISOString(),
        number: i + 1,
        type: i % 3 === 0 ? "serie" : "movie",
        duracion: i % 3 === 0 ? (i % 5) + 1 : 90 + i * 5,
        clasificaion: [0, 7, 13, 16, 18][i % 5],
        generos: [
          ["Acción", "Aventura"],
          ["Comedia", "Drama"],
          ["Animación", "Familiar"],
          ["Thriller", "Crimen"],
          ["Ciencia Ficción", "Fantasía"],
          ["Romance", "Drama"],
          ["Horror", "Misterio"],
          ["Documental"],
        ][i % 8],
        reparto: [`Actor ${i * 2 + 1}`, `Actor ${i * 2 + 2}`, `Actor ${i * 2 + 3}`],
        director: `Director ${(i % 10) + 1}`,
      }))

      setSearchResults(mockResults)
      setIsLoading(false)
    }, 300) 

    return () => clearTimeout(debounceTimer)
  }, [searchQuery])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const clearSearch = () => {
    setSearchQuery("")
    inputRef.current?.focus()
  }

  return (
    <Dialog
      display={dialogState}
      classContainer="w-[95%] h-[95%] flex flex-col relative pb-5 overflow-y-auto"
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
              <button onClick={clearSearch} className="absolute right-3 text-text-medium hover:text-text-white">
                <AiOutlineClose className="text-xl" />
              </button>
            )}
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {searchResults.map((media) => (
              <GalleryItem key={media.id} media={media} dialogCall={dialogCall} />
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
  )
}
