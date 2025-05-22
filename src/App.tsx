import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useRef } from "react";
import Header from "./components/header/Header";
import RegisterPage from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import P404 from "./pages/others/P404";
import Home from "./pages/index/Home";
import Pruebas from "./pages/others/pruebas";
import { isDesktopDevice } from "./utils/functions";
import ServerApi from "./services/ServerApi";
import Movies from "./pages/index/Movies";
import Series from "./pages/index/Series";
import SettingsPage from "./pages/others/SettingsPage";

function App() {

  useEffect(() => {
    let isFirstRender = firstRender.current;
    firstRender.current = false;

    if (isFirstRender) {
      redirect();
    }

    const isDesktop = isDesktopDevice();
    if (isDesktop) {
      import("./config/styleDesktop.css");
    } else {
      import("./config/styleMobile.css");
    }
  }, [location]);

  const firstRender = useRef(true);

  async function redirect(){

    const result = await ServerApi.validateSession();
    if(result.success && beingLogin()){
      location.href = "/";
    }else if(!result.success && !beingLogin()) {
      
      location.href = "/login";
    }
  }

  function beingLogin():boolean{
    return location.pathname === "/login" || location.pathname === "/register";
  }



  return (
    <BrowserRouter>
      <Header />
      <main className=" flex-grow relative overflow-y-auto">
        {" "}
        {/* o flex-1 */}
        <Routes>
          <Route path="/" element={<Home />}  />
          <Route path="/home" element={<Home />}  />
          <Route path="/movies" element={<Movies />}  />
          <Route path="/series" element={<Series />}  />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/pruebas" element={<Pruebas />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/*" element={<P404 />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
