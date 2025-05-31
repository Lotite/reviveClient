import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/header/Header";
import DialogGallery from "./components/Gallery/dialogGallery"; 
import Login from "./pages/auth/Login";
import Recover from "./pages/auth/Recover/Recover";
import P404 from "./pages/others/P404";
import Home from "./pages/index/Home";
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
import { DialogGalleryProvider, useDialogGallery } from "./contexts/DialogGalleryContext";
import { MediaPlayerProvider } from "./contexts/MediaPlayerContext";
import RegisterPage from "./pages/auth/register";
import MediaPlayer from "./components/MediaPlayer/MediaPlayer";
import Pruebas from "./pages/others/pruebas";

function DialogGalleryRenderer() {
  const { dialogState, selectedMedia, closeDialog } = useDialogGallery();
  return (
    <DialogGallery
      dialogState={dialogState}
      selectedMedia={selectedMedia}
      onClose={closeDialog}
    />
  );
}


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
    return location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/recover";
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
          <Route path="/recover" element={<Recover />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/pruebas" element={<Pruebas/>}/>
          <Route path="/*" element={<P404 />} />
        </Routes>
      </main>
      <LoadingScreen />
      <NotificationContainer />
      <ConfirmDialog />
      <DialogGalleryRenderer />
     <MediaPlayer  />
    </>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <LoadingProvider>
        <NotificationProvider>
          <ConfirmProvider>
            <DialogGalleryProvider>
              <MediaPlayerProvider>
                <App />
                 
              </MediaPlayerProvider>
            </DialogGalleryProvider>
          </ConfirmProvider>
        </NotificationProvider>
      </LoadingProvider>
    </BrowserRouter>
  );
}
