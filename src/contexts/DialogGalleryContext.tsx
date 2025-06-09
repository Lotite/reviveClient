import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TmediaItem } from '../utils/types';

interface DialogGalleryContextType {
  dialogState: "flex" | "hidden";
  selectedMedia?: TmediaItem;
  openDialog: (media: TmediaItem) => void;
  closeDialog: () => void;
}

const DialogGalleryContext = createContext<DialogGalleryContextType | undefined>(undefined);

export const DialogGalleryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dialogState, setDialogState] = useState<"flex" | "hidden">("hidden");
  const [selectedMedia, setSelectedMedia] = useState<TmediaItem | undefined>(undefined);

  const openDialog = (media: TmediaItem) => {
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
