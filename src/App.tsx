import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/header/Header"
import RegisterPage from "./pages/auth/Register"
import Login from "./pages/auth/Login"

function App() {
  return (
    <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
    </BrowserRouter>
  )
}

export default App
