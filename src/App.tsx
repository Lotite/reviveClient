import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/header/Header"
import RegisterPage from "./pages/auth/Register"

function App() {
  return (
    <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<RegisterPage />} />
          </Routes>
        </main>
    </BrowserRouter>
  )
}

export default App
