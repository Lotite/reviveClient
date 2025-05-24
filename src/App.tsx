import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
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
import { LoadingProvider, useLoading } from "./contexts/LoadingContext";
import LoadingScreen from "./components/Loading/LoadingScreen";
import { NotificationProvider } from "./contexts/NotificationContext";
import NotificationContainer from "./components/Notification/NotificationContainer";
import { ConfirmProvider } from "./contexts/ConfirmContext";
import ConfirmDialog from "./components/Confirm/ConfirmDialog";

function App() {
  const { isLoading, showLoading, hideLoading, setSessionValidated } =
    useLoading();


  useEffect(() => {
    if (isLoading) {
      redirect();
    }
    const isDesktop = isDesktopDevice();
    if (isDesktop) {
      import("./config/styleDesktop.css");
    } else {
      import("./config/styleMobile.css");
    }
  }, [location]);

  async function redirect() {
    showLoading();

    const result = await ServerApi.validateSession();


    setSessionValidated(result.success);

    if (result.success && beingLogin()) {
      location.href = "/";
      return;
    } else if (!result.success && !beingLogin()) {
      location.href = "/login";
      return;
    }
    const pageCustomLoading = ["/", "/home", "/series", "/movies"];
    if (!pageCustomLoading.includes(location.pathname)) {
      hideLoading();
    }
  }

  function beingLogin(): boolean {
    return location.pathname === "/login" || location.pathname === "/register";
  }

  return (
    <>
      <Header />
      <main className=" flex-grow relative overflow-y-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/series" element={<Series />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/pruebas" element={<Pruebas />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/*" element={<P404 />} />
        </Routes>
      </main>
      <LoadingScreen />
      <NotificationContainer />
      <ConfirmDialog />
    </>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <LoadingProvider>
        <NotificationProvider>
          <ConfirmProvider>
            <App />
          </ConfirmProvider>
        </NotificationProvider>
      </LoadingProvider>
    </BrowserRouter>
  );
}
