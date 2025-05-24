import { useState, useEffect } from "react"
import NavLoged from "./NavLoged"
import { useLoading } from "../../contexts/LoadingContext"

export default function Header() {
  const [showNav, setShowNav] = useState(false)
  const {sessionValidated} = useLoading();
  useEffect(() => {
    const checkSession = () => {
      setShowNav(sessionValidated==true)
    }

    checkSession()
  }, [sessionValidated])

  return (
    <header className="bg-background-medium h-15 w-full flex items-center px-3 ">
      {showNav ? <NavLoged /> : <p className="text-main-green title">Revive</p>}
    </header>
  )
}
