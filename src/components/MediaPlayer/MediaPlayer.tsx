import { useEffect, useState, useRef } from "react";
import { useMediaPlayer } from "../../contexts/MediaPlayerContext";
import MediaControls from "./MediaControls";
import Dialog from "../Dialog/Dialog";
import { AiOutlineClose } from "react-icons/ai";
import ServerApi from "../../services/ServerApi";
import { TmediaGallery } from "../../utils/types";

const MediaPlayer = () => {
  const {
    display,
    currentMedia,
    videoRef,
    expandFunction,
    containerRef,
    setDisplay,
    playVideo
  } = useMediaPlayer();

  const [opacity, setOpacity] = useState<number>(0);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showIcon, setShowIcon] = useState(false);
  const [nextCap, setNexCap] = useState<TmediaGallery | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNextEpisode = async () => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        setShowIcon(currentMedia!.type == "episode");
        const request = await ServerApi.getNextEpisodie(currentMedia?.id!);
        setNexCap(request.data);
      }
    };
    fetchNextEpisode();
  }, [currentMedia, videoRef]);

  const checkBufferAndSetLoading = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const currentTime = video.currentTime;
      const buffered = video.buffered;
      let isBuffered = false;
      for (let i = 0; i < buffered.length; i++) {
        if (currentTime >= buffered.start(i) && currentTime <= buffered.end(i)) {
          isBuffered = true;
          break;
        }
      }
      if (isLoading && isBuffered) {
        setIsLoading(false);
      } else if (!isLoading && !isBuffered) {
        setIsLoading(true);
      }
    }
  };

  useEffect(() => {
    if (isLoading) {
      checkBufferAndSetLoading();
    }
  }, [isLoading]);


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
          title="Close"
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
          src={currentMedia.url}
          className="w-full h-full object-contain"
          autoPlay
          onWaiting={() => setIsLoading(true)}
          onLoadedData={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
          onPause={() => {
            checkBufferAndSetLoading();
          }}
          onPlay={() => {
            checkBufferAndSetLoading();
          }}
          onPlaying={() => {
            checkBufferAndSetLoading();
          }}
        />
        {isLoading && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/50">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
          </div>
        )}
        <MediaControls
          video={videoRef.current!}
          showNex={showIcon}
          hasNextEpisode={nextCap!=undefined}
          opacity={opacity}
          title={currentMedia.title}
          expandFunction={expandFunction}
         onNextEpisode={()=>{
          nextCap && playVideo(nextCap)
         }}
        />
      </div>
    </Dialog>
  );
};

export default MediaPlayer;
