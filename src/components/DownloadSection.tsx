"use client";

import React, { useState } from "react";
import { Download, Cpu, HardDrive, ShieldCheck, ChevronRight, Apple, Smartphone, Globe, Terminal } from "lucide-react";
import { useDownload } from "@/context/DownloadContext";

export default function DownloadSection() {
  const { openDownloadModal } = useDownload();
  const [showReqs, setShowReqs] = useState(false);

  const comingSoon = [
    { name: "macOS", icon: <Apple className="w-4 h-4" /> },
    { name: "Android", icon: <Smartphone className="w-4 h-4" /> },
    { name: "iPhone", icon: <Smartphone className="w-4 h-4" /> },
    { name: "Linux", icon: <Terminal className="w-4 h-4" /> },
    { name: "Web App", icon: <Globe className="w-4 h-4" /> },
  ];

  return (
    <section id="download-section" className="relative py-28 md:py-36 px-4 sm:px-8 border-t border-white/[0.04] overflow-hidden">
      <div className="absolute inset-0 noise-overlay" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#5B8CFF]/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        
        {/* Large Premium Card */}
        <div 
          className="border border-white/[0.12] bg-white/[0.03] backdrop-blur-3xl rounded-[36px] p-8 md:p-14 shadow-2xl text-left flex flex-col gap-8"
          style={{
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.05)"
          }}
        >
          {/* Header */}
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-mono font-bold text-[#5B8CFF] uppercase tracking-[0.25em]">Registry Priority</span>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white leading-tight">
              Closed Beta<br />
              <span className="text-gradient-mac">for Windows.</span>
            </h2>
            <p className="max-w-xl text-[#A1A1AA] text-sm sm:text-base leading-relaxed font-normal">
              Invitations to the closed beta evaluation are assigned daily. Join the registry list for priority access to Windows compiled builds.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 items-center">
            <button
              onClick={openDownloadModal}
              className="flex items-center justify-center gap-2 font-semibold text-xs uppercase tracking-[0.18em] bg-white hover:bg-white/90 text-black px-8 py-4 rounded-full transition-all duration-300 shadow-[0_4px_12px_rgba(255,255,255,0.1)] hover:scale-[1.02] apple-btn-active cursor-pointer"
            >
              <Cpu className="w-4 h-4" />
              Request Beta Access
            </button>
            
            <button
              onClick={() => setShowReqs(!showReqs)}
              className="flex items-center justify-center gap-1.5 font-semibold text-xs uppercase tracking-[0.18em] border border-white/[0.12] bg-white/[0.02] hover:bg-white/[0.06] text-white px-8 py-4 rounded-full transition-all duration-300"
            >
              System Requirements
              <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-300 ${showReqs ? "rotate-90" : ""}`} />
            </button>
          </div>

          {/* Collapsible Requirements Grid */}
          {showReqs && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-black/40 border border-white/[0.08] p-6 rounded-3xl animate-in fade-in slide-in-from-top-2 duration-300 font-mono text-[10px] text-[#A1A1AA] uppercase tracking-wider">
              <div className="flex gap-3 items-start">
                <Cpu className="w-5 h-5 text-[#5B8CFF] shrink-0" />
                <div className="flex flex-col gap-1">
                  <span className="text-white font-bold">Processor</span>
                  <span>Intel / AMD x64</span>
                  <span>ARM64 Native</span>
                </div>
              </div>
              <div className="flex gap-3 items-start border-t sm:border-t-0 sm:border-x border-white/[0.08] pt-4 sm:pt-0 sm:px-6">
                <HardDrive className="w-5 h-5 text-[#5B8CFF] shrink-0" />
                <div className="flex flex-col gap-1">
                  <span className="text-white font-bold">Memory & Storage</span>
                  <span>8 GB RAM Min</span>
                  <span>500 MB Available Space</span>
                </div>
              </div>
              <div className="flex gap-3 items-start border-t sm:border-t-0 pt-4 sm:pt-0">
                <ShieldCheck className="w-5 h-5 text-[#5B8CFF] shrink-0" />
                <div className="flex flex-col gap-1">
                  <span className="text-white font-bold">OS Version</span>
                  <span>Windows 10 / 11</span>
                  <span>Local SQLite Driver</span>
                </div>
              </div>
            </div>
          )}

          <hr className="border-white/[0.08]" />

          {/* Coming Soon Platforms Section */}
          <div className="flex flex-col gap-4 text-left">
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#A1A1AA]/50 uppercase">Coming Soon</span>
            <div className="flex flex-wrap gap-3">
              {comingSoon.map((platform) => (
                <div
                  key={platform.name}
                  className="flex items-center gap-2 border border-white/[0.08] bg-white/[0.01] px-4 py-2 rounded-full text-xs font-semibold text-[#A1A1AA] tracking-wider opacity-65 hover:opacity-90 hover:border-white/20 transition-all cursor-default"
                >
                  {platform.icon}
                  <span>{platform.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
