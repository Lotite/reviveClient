import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/header/Header"
import RegisterPage from "./pages/auth/register"
import Login from "./pages/auth/Login"
import P404 from "./pages/others/P404"
import Home from "./pages/index/Home"

function App() {
  return (
    <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/"         element={<Home/>}/>
            <Route path="/login"    element={<Login/>}/>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/*"        element={<P404/>} />
          </Routes>
        </main>
    </BrowserRouter>
  )
}

export default App
