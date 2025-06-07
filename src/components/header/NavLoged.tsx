import { AiOutlineSearch } from "react-icons/ai"
import { useState } from "react"
import Usericon from "./UserIcon"
import DialogSearch from "./Search/DialogSearch"
import { TmediaGallery } from "../../utils/types"


export default function NavLoged() {
  const webLocation = location.pathname
  const [dialogState, setDialogState] = useState<"hidden" | "flex">("hidden")
 

  const openSearchDialog = () => {
    setDialogState("flex")
  }

  const closeDialog = () => {
    setDialogState("hidden")
  }

  const handleMediaSelect = (media: TmediaGallery) => {
    console.log("Media seleccionado:", media)
    closeDialog()
  }

  return (
    <nav className="px-3 md:px-5 flex flex-row items-center justify-between w-full">
      <div className="flex items-center">
        <a href="/"  className="text-2xl md:text-4xl text-main-gradient">Revive</a>
      </div>
      <div className="hidden md:flex md:flex-row md:ml-10">
        <a
          className={`text-2xl hover:text-text-hover-green text-text-${
            webLocation == "/home" || webLocation == "/" ? "green" : "medium"
          } mr-5`}
          href="/"
        >
          Home
        </a>
        <a
          className={`text-2xl hover:text-text-hover-orange text-text-${
            webLocation == "/movies" ? "orange" : "medium"
          } mr-5`}
          href="/movies"
        >
          Movies
        </a>
        <a
          className={`text-2xl hover:text-text-hover-blue text-text-${
            webLocation == "/series" ? "blue" : "medium"
          } mr-5`}
          href="/series"
        >
          Series
        </a>
      </div>


      <div className="flex items-center relative space-x-3">
        <button
          onClick={openSearchDialog}
          className="w-10 h-10 absolute right-10 bg-background-medium2 rounded-full flex items-center justify-center hover:bg-background-hover-medium transition-colors duration-300"
        >
          <AiOutlineSearch className="text-2xl right- text-text-medium hover:text-main-orange" />
        </button>

        <div className={"absolute top-0 right-0 w-10 h-10"}>
          <Usericon webLocation={webLocation} />
        </div>
      </div>

      <DialogSearch dialogState={dialogState} onClose={closeDialog} dialogCall={handleMediaSelect} />
    </nav>
  )
}
