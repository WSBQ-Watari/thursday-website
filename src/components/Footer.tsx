"use client";

import React from "react";
import { Instagram, ShieldCheck, Mail, Globe, BookOpen } from "lucide-react";
import { useDownload } from "@/context/DownloadContext";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { openDownloadModal } = useDownload();

  return (
    <footer className="relative border-t border-white/[0.1] bg-white/[0.02] backdrop-blur-2xl px-4 sm:px-8 py-16 md:py-20 overflow-hidden text-left">
      <div className="absolute inset-0 noise-overlay" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-16">
          
          {/* Brand Info (col-span-5) */}
          <div className="md:col-span-5 flex flex-col gap-5">
            <a href="#" className="flex items-center gap-2 group">
              <span className="font-sans text-sm font-semibold tracking-[0.25em] text-white uppercase">
                THURSDAY
              </span>
            </a>
            <p className="text-[#A1A1AA] text-xs sm:text-sm leading-relaxed max-w-sm font-normal">
              An adaptive intelligence system that plans ahead, remembers what matters, and quietly helps you finish your work.
            </p>
            <div className="flex flex-col gap-2 mt-2">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#A1A1AA]/40 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#5B8CFF]/60" />
                Closed Beta • Version v0.9 Beta
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#A1A1AA]/40 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#5B8CFF]/60" />
                Windows Host Only (macOS, iOS, Android Coming Soon)
              </span>
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            {/* Column 1 */}
            <div className="flex flex-col gap-4 text-[10px] font-bold uppercase tracking-[0.15em]">
              <span className="text-white/40 border-b border-white/[0.04] pb-2">Program</span>
              <a href="#features" className="text-[#A1A1AA] hover:text-white transition-colors duration-300">
                Features
              </a>
              <a href="#why-thursday" className="text-[#A1A1AA] hover:text-white transition-colors duration-300">
                Why Thursday
              </a>
              <a href="#roadmap" className="text-[#A1A1AA] hover:text-white transition-colors duration-300">
                Roadmap
              </a>
              <button 
                onClick={openDownloadModal} 
                className="text-[#5B8CFF] hover:text-[#9CC6FF] font-bold transition-colors duration-300 cursor-pointer text-left bg-transparent border-none p-0 uppercase tracking-[0.15em] text-[10px]"
              >
                Join Beta
              </button>
              <a 
                href="#join-us" 
                className="text-[#5B8CFF] hover:text-[#9CC6FF] font-bold transition-colors duration-300 cursor-pointer text-left bg-transparent border-none p-0 uppercase tracking-[0.15em] text-[10px]"
              >
                Work with Us
              </a>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-4 text-[10px] font-bold uppercase tracking-[0.15em]">
              <span className="text-white/40 border-b border-white/[0.04] pb-2">Community</span>
              <a href="https://www.instagram.com/thursday.ai/" target="_blank" rel="noopener noreferrer" className="text-[#A1A1AA] hover:text-white transition-colors duration-300 flex items-center gap-1.5">
                <Instagram className="w-3.5 h-3.5" />
                Instagram
              </a>
              <a href="https://docs.thursday.ai" target="_blank" rel="noopener noreferrer" className="text-[#A1A1AA] hover:text-white transition-colors duration-300 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                Documentation
              </a>
              <a href="mailto:support@thursday.ai" className="text-[#A1A1AA] hover:text-white transition-colors duration-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                Contact
              </a>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-4 text-[10px] font-bold uppercase tracking-[0.15em]">
              <span className="text-white/40 border-b border-white/[0.04] pb-2">Legal</span>
              <a href="#privacy" className="text-[#A1A1AA] hover:text-white transition-colors duration-300 font-bold">
                Privacy Policy
              </a>
              <a href="#terms" className="text-[#A1A1AA] hover:text-white transition-colors duration-300 font-bold">
                Terms of Service
              </a>
              <div className="flex items-center gap-1.5 mt-2 bg-[#0E0E0E] border border-white/[0.08] p-2 rounded-xl text-[9px] text-[#A1A1AA] tracking-[0.05em] font-mono">
                <span className="w-1.5 h-1.5 bg-[#5B8CFF] rounded-full animate-pulse" />
                <span>SECURE SYNC</span>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom copyright */}
        <div className="border-t border-white/[0.08] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[9px] text-[#A1A1AA]/45 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <span>&copy; {currentYear} Thursday Inc.</span>
            <span>|</span>
            <span>All Rights Reserved</span>
          </div>
          <div className="flex items-center gap-1">
            <span>DESIGNED BY PARVV</span>
            <span className="w-1.5 h-1.5 bg-[#5B8CFF] rounded-full" />
          </div>
        </div>

      </div>
    </footer>
  );
}
