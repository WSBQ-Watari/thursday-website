"use client";

import React, { useRef } from "react";
import { Sparkles, Play, Monitor, Smartphone, Globe, Apple, Terminal } from "lucide-react";
import { useDownload } from "@/context/DownloadContext";

export default function Hero() {
  const { openDownloadModal } = useDownload();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center pt-36 pb-20 px-4 sm:px-8 overflow-hidden select-none"
    >
      {/* Background noise and gradients */}
      <div className="absolute inset-0 noise-overlay" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#5B8CFF]/4 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center relative z-10">
        
        {/* Placeholder container for the persistent global 3D Orb */}
        <div className="relative w-80 h-80 sm:w-[28rem] sm:h-[28rem] mb-8 flex items-center justify-center">
          <div 
            id="orb-hero-placeholder" 
            className="w-full h-full rounded-full border border-white/[0.04] bg-white/[0.01] relative flex items-center justify-center"
          />
        </div>

        {/* Text Copy */}
        <h1 className="font-sans text-5xl sm:text-7xl md:text-8xl font-semibold tracking-tight text-white mb-6 leading-[1.05]">
          Meet Thursday.<br />
          <span className="text-gradient-mac">Your Personal Intelligence.</span>
        </h1>

        <p className="max-w-2xl text-[#A1A1AA] text-sm sm:text-base md:text-lg font-normal leading-relaxed mb-12 px-4">
          An adaptive intelligence system that plans ahead, remembers what matters, and quietly helps you finish your work before opportunities are lost.
        </p>

        {/* Dynamic Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16 w-full sm:w-auto px-4 justify-center">
          <button
            onClick={openDownloadModal}
            className="flex items-center justify-center gap-2 font-semibold text-[10px] uppercase tracking-[0.18em] bg-white hover:bg-white/90 text-black px-8 py-4 rounded-full transition-all duration-300 shadow-[0_8px_20px_rgba(255,255,255,0.15)] hover:scale-[1.02] apple-btn-active cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-black" />
            Request Beta Access
          </button>
          
          <a
            href="#interface"
            className="flex items-center justify-center gap-2 font-semibold text-[10px] uppercase tracking-[0.18em] border border-white/[0.12] bg-white/[0.04] hover:bg-white/[0.09] text-white px-8 py-4 rounded-full transition-all duration-300 backdrop-blur-md"
          >
            <Play className="w-3 h-3 fill-white text-white" />
            Watch Demo
          </a>
        </div>

        {/* Availability Badge Row */}
        <div className="flex flex-col items-center gap-5">
          <div className="inline-flex items-center gap-2 border border-[#5B8CFF]/20 bg-[#5B8CFF]/5 px-3.5 py-1 rounded-full text-[9px] font-bold text-[#5B8CFF] uppercase tracking-[0.15em] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5B8CFF] animate-pulse" />
            <span>Closed Beta</span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4 px-6 py-3 rounded-full border border-white/[0.08] bg-white/[0.02]">
            {/* Windows Active */}
            <div className="flex items-center gap-2 text-[9px] font-bold text-white uppercase tracking-wider">
              <Monitor className="w-4 h-4 text-[#5B8CFF]" />
              <span>Windows Beta Available</span>
            </div>
            
            <span className="w-[1px] h-3 bg-white/10" />

            <span className="text-[8px] font-bold uppercase tracking-widest text-[#A1A1AA]/40">Coming Soon:</span>
            
            {/* Disabled Coming Soon platforms */}
            <div className="flex items-center gap-4 opacity-35 text-[8px] font-bold uppercase tracking-wider text-[#A1A1AA]">
              <div className="flex items-center gap-1.5"><Apple className="w-3.5 h-3.5" /> macOS</div>
              <div className="flex items-center gap-1.5"><Smartphone className="w-3.5 h-3.5" /> iPhone</div>
              <div className="flex items-center gap-1.5"><Smartphone className="w-3.5 h-3.5" /> Android</div>
              <div className="flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5" /> Linux</div>
              <div className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> Web</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
