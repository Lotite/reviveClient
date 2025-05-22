import { useState, useEffect } from "react"
import NavLoged from "./NavLoged"

export default function Header() {
  const [showNav, setShowNav] = useState(false)

  useEffect(() => {
    const checkSession = () => {
      const device = sessionStorage.getItem("device")
      setShowNav(device !== null)
    }

    checkSession()

    const storageChanged = (event: StorageEvent) => {
      if (event.key === "deve") {
        checkSession()
      }
    }
    window.addEventListener("storage", storageChanged)

    const intervalId = setInterval(checkSession, 1000)

    return () => {
      window.removeEventListener("storage", storageChanged)
      clearInterval(intervalId)
    }
  }, [])

  return (
    <header className="bg-background-medium h-15 w-full flex items-center px-3 ">
      {showNav ? <NavLoged /> : <p className="text-main-green title">Revive</p>}
    </header>
  )
}
