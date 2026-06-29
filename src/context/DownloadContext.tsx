"use client";

import React, { createContext, useContext, useState } from "react";

interface DownloadContextType {
  isOpen: boolean;
  openDownloadModal: () => void;
  closeDownloadModal: () => void;
  isCareersOpen: boolean;
  openCareersModal: () => void;
  closeCareersModal: () => void;
}

const DownloadContext = createContext<DownloadContextType | undefined>(undefined);

export function DownloadProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCareersOpen, setIsCareersOpen] = useState(false);

  const openDownloadModal = () => setIsOpen(true);
  const closeDownloadModal = () => setIsOpen(false);
  const openCareersModal = () => setIsCareersOpen(true);
  const closeCareersModal = () => setIsCareersOpen(false);

  return (
    <DownloadContext.Provider 
      value={{ 
        isOpen, 
        openDownloadModal, 
        closeDownloadModal,
        isCareersOpen,
        openCareersModal,
        closeCareersModal
      }}
    >
      {children}
    </DownloadContext.Provider>
  );
}

export function useDownload() {
  const context = useContext(DownloadContext);
  if (context === undefined) {
    throw new Error("useDownload must be used within a DownloadProvider");
  }
  return context;
}
