import { MdForward10, MdReplay10 } from "react-icons/md";
import { FaPause, FaPlay, FaExpand, FaStepForward } from "react-icons/fa";
import { useEffect, useState, useCallback } from "react";
import RangeVideo from "./RangeVideo";


function formatTime(time: number): string {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);

  return hours > 0
    ? `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
    : `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export default function   MediaControls({
  video,
  title = "King Kong 2005",
  expandFunction,
  hasNextEpisode = false,
  opacity=1,
  showNex = false,
  onNextEpisode,
}: {
  video: HTMLVideoElement;
  title?: string;
  expandFunction?: () => void;
  showNex:boolean
  hasNextEpisode?: boolean;
  onNextEpisode?: () => void;
  opacity?:number
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = useCallback(() => {
    if (!video) return;
    video.paused ? video.play() : video.pause();
  }, [video]);

  const seekBy = (seconds: number) => {
    if (video) {
      video.currentTime = Math.min(Math.max(0, video.currentTime + seconds), duration);
    }
  };

  useEffect(() => {
    if (!video) return;

    const updateState = () => {
      setIsPlaying(!video.paused);
      setCurrentTime(video.currentTime);
      setDuration(video.duration);
    };

    video.addEventListener("play", () => setIsPlaying(true));
    video.addEventListener("pause", () => setIsPlaying(false));
    video.addEventListener("timeupdate", () => setCurrentTime(video.currentTime));
    video.addEventListener("loadedmetadata", () => setDuration(video.duration));
    video.addEventListener("click", togglePlay);

    updateState();

    return () => {
      video.removeEventListener("click", togglePlay);
    };
  }, [video, togglePlay]);

  return (
    <div className={`absolute bottom-0 transition-opacity opacity-${opacity} duration-300 w-full px-4 py-3 bg-gradient-to-t from-black to-transparent text-white`}>
      <RangeVideo video={video} />

      <div className="flex  flex-row items-center justify-between gap-4 mt-4">
        <div className="flex items-center justify-center gap-4 sm:gap-3">
          <button onClick={() => seekBy(-10)} title="Retroceder 10s">
            <MdReplay10 size={28} />
          </button>

          <button onClick={togglePlay} className="relative w-7 h-7">
            <FaPause
              className={`absolute top-0 left-0 transition-opacity duration-300 ${isPlaying ? "opacity-100" : "opacity-0"}`}
              size={26}
            />
            <FaPlay
              className={`absolute top-0 left-0 transition-opacity duration-300 ${isPlaying ? "opacity-0" : "opacity-100"}`}
              size={26}
            />
          </button>

          <button onClick={() => seekBy(10)} title="Avanzar 10s">
            <MdForward10 size={28} />
          </button>
        </div>

        <div className="text-center sm:text-left text-sm sm:text-base font-mono">
          <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
          <span className="mx-2 hidden sm:inline">•</span>
          <span className="block sm:inline font-semibold">{title}</span>
        </div>

        <div className="flex justify-center sm:justify-end items-center gap-3">
          {showNex && (
            <button
              onClick={onNextEpisode}
              disabled={!hasNextEpisode}
              className={"px-3 py-1 text-sm   text-black rounded transition " + (hasNextEpisode ? " bg-white hover:bg-gray-300 cursor-pointer" : "bg-white/30") }
            >
              <FaStepForward className="inline mr-1" /> Siguiente
            </button>
          )}
          <button onClick={expandFunction} title="Pantalla completa">
            <FaExpand size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
