import { TmediaGallery } from "../../utils/types";
import { useMediaPlayer } from "../../contexts/MediaPlayerContext";
import Image from "../Image/Image";

export function EpisodeItem({ episode }: { episode: TmediaGallery }) {


 const { playVideo  } = useMediaPlayer();

  return (
    <div onClick={()=>{episode && playVideo(episode)}} className="w-full h-[100px] border-1 my-1 p-1 hover:bg-white/5 active:bg-white/20  cursor-pointer rounded gap-3 relative flex flex-row">
      <Image src={episode.banner} alt={episode.title}  className="w-[20%] spect-video" />
      <div className="flex flex-col flex-1 h-full">
        <h3>{episode.title}</h3>
        <p>{episode.description}</p>
      </div>
      <span className="absolute top-2 right-5">{episode.duracion} min</span>
    </div>
  );
}
