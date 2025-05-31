import { useEffect, useState, useRef } from "react";
import { useMediaPlayer } from "../../contexts/MediaPlayerContext";
import MediaControls from "./MediaControls";
import Dialog from "../Dialog/Dialog";
import { AiOutlineClose } from "react-icons/ai";

const MediaPlayer = () => {
  const {
    display,
    currentMedia,
    videoRef,
    expandFunction,
    containerRef,
    setDisplay,
  } = useMediaPlayer();

  const [opacity, setOpacity] = useState<number>(0);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [nextCap, setNexCap] = useState<boolean>(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setNexCap(currentMedia?.type == "serie");
    }
  }, [currentMedia, videoRef]);

  useEffect(() => {
    if (!currentMedia) return;

    const handleMouseMove = () => {
      setOpacity(100);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      hideTimeoutRef.current = setTimeout(() => {
        setOpacity(0);
      }, 3000);
    };

    const container = containerRef.current;
    container?.addEventListener("mousemove", handleMouseMove);

    return () => {
      container?.removeEventListener("mousemove", handleMouseMove);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, [currentMedia, containerRef]);

  if (!currentMedia) return null;

  function onClose() {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  }

  return (
    <Dialog
      display={display}
      classContainer="fixed top-0 left-0 w-full h-full bg-black"
      onClose={onClose}
    >
      <div ref={containerRef} className="relative w-full h-full">
        <button
          onClick={() => {
            setDisplay("hidden");
          }}
          className={`z-50 size-8 absolute top-4 right-4 bg-black/70 text-white rounded-full flex items-center justify-center
            transition-all duration-300 ease-in-out
            hover:bg-white/20 hover:scale-105
            cursor-pointer
            opacity-${opacity}`}
        >
          <AiOutlineClose size={20} />
        </button>
        <video
          ref={videoRef}
          src={currentMedia.url || "http://192.168.1.141:81/media/video.mp4"}
          className="w-full h-full object-contain"
          autoPlay
        />
        <MediaControls
          video={videoRef.current!}
          opacity={opacity}
          title={currentMedia.title}
          expandFunction={expandFunction}
          hasNextEpisode={nextCap}
        />
      </div>
    </Dialog>
  );
};

export default MediaPlayer;
