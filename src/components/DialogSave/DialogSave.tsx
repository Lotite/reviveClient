import { useState, useEffect } from "react";
import ServerApi from "../../services/ServerApi";
import { TmediaGallery } from "../../utils/types";
import GalleryItem from "../Gallery/GalleryItem";

export function DialogSave() {
  const [medias, setMedias] = useState<Array<TmediaGallery>>([]);
  useEffect(() => {
    const getMedia = async () => {
      const request = await ServerApi.getUserList();
      if (request.success) {
        setMedias(request.data!);
      }
    };

    getMedia();
  }, []);

  return (
    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-4">
      {medias.map((media, index) => (
        <GalleryItem key={index} media={media} />
      ))}
    </div>
  );
}
