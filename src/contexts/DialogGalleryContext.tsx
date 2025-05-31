import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TmediaGallery } from '../utils/types';

interface DialogGalleryContextType {
  dialogState: "flex" | "hidden";
  selectedMedia?: TmediaGallery;
  openDialog: (media: TmediaGallery) => void;
  closeDialog: () => void;
}

const DialogGalleryContext = createContext<DialogGalleryContextType | undefined>(undefined);

export const DialogGalleryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dialogState, setDialogState] = useState<"flex" | "hidden">("hidden");
  const [selectedMedia, setSelectedMedia] = useState<TmediaGallery | undefined>(undefined);

  const openDialog = (media: TmediaGallery) => {
    setSelectedMedia(media);
    setDialogState("flex");
  };

  const closeDialog = () => {
    setDialogState("hidden");
    setTimeout(()=>{setSelectedMedia(undefined);},500);
  };

  return (
    <DialogGalleryContext.Provider value={{ dialogState, selectedMedia, openDialog, closeDialog }}>
      {children}
    </DialogGalleryContext.Provider>
  );
};

export const useDialogGallery = () => {
  const context = useContext(DialogGalleryContext);
  if (context === undefined) {
    throw new Error('useDialogGallery debe ser usado con DialogGalleryProvider');
  }
  return context;
};
