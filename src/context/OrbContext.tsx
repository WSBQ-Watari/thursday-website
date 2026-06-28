"use client";

import React, { createContext, useContext, useState } from "react";

export type OrbState = "idle" | "voice" | "thinking" | "speaking";

interface OrbContextType {
  orbState: OrbState;
  setOrbState: (state: OrbState) => void;
  pulseTrigger: boolean;
  triggerPulse: () => void;
}

const OrbContext = createContext<OrbContextType | undefined>(undefined);

export function OrbProvider({ children }: { children: React.ReactNode }) {
  const [orbState, setOrbState] = useState<OrbState>("idle");
  const [pulseTrigger, setPulseTrigger] = useState(false);

  const triggerPulse = () => {
    setPulseTrigger(true);
    setTimeout(() => {
      setPulseTrigger(false);
    }, 1000);
  };

  return (
    <OrbContext.Provider value={{ orbState, setOrbState, pulseTrigger, triggerPulse }}>
      {children}
    </OrbContext.Provider>
  );
}

export function useOrb() {
  const context = useContext(OrbContext);
  if (context === undefined) {
    throw new Error("useOrb must be used within an OrbProvider");
  }
  return context;
}
