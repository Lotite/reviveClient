import { useEffect, useState } from "react";
export default function RangeVideo({
  video,
}: {
  video: HTMLVideoElement;
}) {
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  useEffect(() => {
    if (video?.duration) {
      setDuration(video.duration);
    }
  }, [video?.duration]);

  useEffect(() => {
    if (video) {
     
      video.addEventListener("timeupdate", updateCurrentTime);
      return () => {
        video.removeEventListener("timeupdate", updateCurrentTime);
      };
    }
  }, [video]);

  function onChangeRange(second: number) {
    video.currentTime = second;
  }

   function updateCurrentTime (){
        setCurrentTime(video.currentTime);
       
      };


  return (
    <div className="relative">
      <div className="absolute top-0 w-full h-2 bg-gray-700 rounded ">
        <div
          className="absolute  rounded h-full bg-blue-500 transition-all duration-300 ease-linear flex items-center justify-center"
          style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
        >
          <div className="absolute rounded-full translate-x-2  size-3.5 right-0 bg-blue-600" />
        </div>
      </div>
      <input
        type="range"
        className="absolute -top-3 opacity-0 mt-2 w-full"
        min={0}
        max={duration}
        step="0.01"
        value={currentTime}
        onChange={(e) => onChangeRange(parseFloat(e.currentTarget.value))}
      />
    </div>
  );
}
