import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useEffect } from "react"
import Header from "./components/header/Header"
import RegisterPage from "./pages/auth/Register"
import Login from "./pages/auth/Login"
import P404 from "./pages/others/P404"
import Home from "./pages/index/Home"
import Pruebas from "./pages/others/pruebas"
import { isDesktopDevice } from "./utils/functions"




function App() {
  useEffect(() => {
    const isDesktop = isDesktopDevice();
    if (isDesktop) {
      import("./config/styleDesktop.css")
    } else {
      import("./config/styleMobile.css")
    }
  }, [])

  return (
    <BrowserRouter>
        <Header />
        <main className=" flex-grow relative overflow-y-auto"> {/* o flex-1 */}
          <Routes>
            <Route path="/"         element={<Home/>}/>
            <Route path="/login"    element={<Login/>}/>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/pruebas" element={<Pruebas/>} />
            <Route path="/*"        element={<P404/>} />
          </Routes>
          
        </main>
    </BrowserRouter>
  )
}

export default App
