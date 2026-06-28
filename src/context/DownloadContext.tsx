"use client";

import React, { createContext, useContext, useState } from "react";

interface DownloadContextType {
  isOpen: boolean;
  openDownloadModal: () => void;
  closeDownloadModal: () => void;
}

const DownloadContext = createContext<DownloadContextType | undefined>(undefined);

export function DownloadProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openDownloadModal = () => setIsOpen(true);
  const closeDownloadModal = () => setIsOpen(false);

  return (
    <DownloadContext.Provider value={{ isOpen, openDownloadModal, closeDownloadModal }}>
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
