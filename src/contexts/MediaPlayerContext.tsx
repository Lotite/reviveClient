import React, {
  createContext,
  useState,
  useCallback,
  useRef,
  useContext,
} from "react";
import { TmediaGallery } from "../utils/types";

interface MediaPlayerContextProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  opacity: number;
  setOpacity: React.Dispatch<React.SetStateAction<number>>;
  display: "flex" | "hidden";
  setDisplay: React.Dispatch<React.SetStateAction<"flex" | "hidden">>;
  currentMedia?: TmediaGallery;
  playVideo: (media: TmediaGallery) => void;
  stopVideo: () => void;
  expandFunction: () => void;
}

const MediaPlayerContext = createContext<MediaPlayerContextProps | undefined>(undefined);

export const MediaPlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState<number>(100);
  const [display, setDisplay] = useState<"flex" | "hidden">("hidden");
  const [currentMedia, setCurrentMedia] = useState<TmediaGallery>();

  const playVideo = useCallback((media: TmediaGallery) => {
    setCurrentMedia(media);
    setDisplay("flex");
    setTimeout(() => {
      videoRef.current?.play();
    }, 100);
  }, []);

  const stopVideo = useCallback(() => {
    videoRef.current?.pause();
    setDisplay("hidden");
    setCurrentMedia(undefined);
  }, []);

  const expandFunction = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    } else {
      container.requestFullscreen?.();
    }
  }, []);

  const value: MediaPlayerContextProps = {
    videoRef,
    containerRef,
    opacity,
    setOpacity,
    display,
    setDisplay,
    currentMedia,
    playVideo,
    stopVideo,
    expandFunction,
  };

  return (
    <MediaPlayerContext.Provider value={value}>
      {children}
    </MediaPlayerContext.Provider>
  );
};

export const useMediaPlayer = () => {
  const context = useContext(MediaPlayerContext);
  if (!context) {
    throw new Error("useMediaPlayer debe usarse dentro de MediaPlayerProvider");
  }
  return context;
};
