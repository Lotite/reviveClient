import { MdOutlineVideoLibrary } from "react-icons/md"; 
import { useState, useRef, useEffect } from "react"
import { FiSettings, FiLogOut } from "react-icons/fi"
import ServerApi from "../../services/ServerApi"
import { getLocaltionColor } from "../../utils/functions"

interface UserIconProps {
  webLocation: string
}

export default function UserIcon({ webLocation }: UserIconProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [userInitial, setUserInitial] = useState("?")

  const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    try {
      const response = await ServerApi.logout()
      if (response.success) {
        window.location.href = "/login"
      } else {
        alert("Error al cerrar sesión: " + response.message)
      }
    } catch (error) {
      alert("Error inesperado al cerrar sesión")
    }
  }

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkIfMobile();
    const name = sessionStorage.getItem("name") || "?"
    setUserInitial(name.charAt(0).toLocaleUpperCase())
    const storageChanged = (event: StorageEvent) => {
      if (event.key === "name") {
        setUserInitial((event.newValue || "?").charAt(0))
      }
    }
    window.addEventListener("storage", storageChanged)
    const intervalId = setInterval(() => {
      const currentName = sessionStorage.getItem("name") || "?"
      setUserInitial(prev => {
        const newInitial = currentName.charAt(0).toLocaleUpperCase()
        return prev !== newInitial ? newInitial : prev
      })
    }, 1000)

    return () => {
      window.removeEventListener("storage", storageChanged)
      clearInterval(intervalId)
    }


   
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className={isMobile ? "absolute bottom-5" : "absolute right-0" } ref={dropdownRef}>
      <div
        className={`w-10 h-10 text-2xl bg-background-${getLocaltionColor()}  } transition-colors duration-700 rounded-full flex items-center justify-center cursor-pointer ${
          isMobile ? "" : "-bottom-5 absolute right-0"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="font-bold flex items-center justify-center h-full m-0">{userInitial}</p>
      </div>

      <div
        className={`absolute right-0 ${isMobile ? "top-12" : "top-6"} mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-in-out transform origin-top-right z-10
          ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
      >
        <div className="py-1">

          {isMobile && (
            <>
              <a
                href="/"
                className={`flex items-center w-full px-4 py-2 text-sm ${
                  webLocation === "/home" || webLocation === "/"
                    ? "text-green-600 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </a>
              <a
                href="/movies"
                className={`flex items-center w-full px-4 py-2 text-sm ${
                  webLocation === "/movies" ? "text-orange-600 font-medium" : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Movies
              </a>
              <a
                href="/series"
                className={`flex items-center w-full px-4 py-2 text-sm ${
                  webLocation === "/series" ? "text-blue-600 font-medium" : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Series
              </a>
              <div className="border-t border-gray-200 my-1"></div>
            </>
          )}

          <a href="/library" className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            <MdOutlineVideoLibrary className="w-4 h-4 mr-2" />
            Biblioteca
          </a>
          <a href="/settings" className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            <FiSettings className="w-4 h-4 mr-2" />
            Ajustes
          </a>
          <a href="/login" onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            <FiLogOut className="w-4 h-4 mr-2" />
            Cerrar sesión
          </a>
        </div>
      </div>
    </div>
  )
}
