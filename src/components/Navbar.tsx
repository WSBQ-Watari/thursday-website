"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { useDownload } from "@/context/DownloadContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openDownloadModal } = useDownload();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 120);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#" },
    { name: "Features", href: "#features" },
    { name: "Interface", href: "#interface" },
    { name: "Why Thursday", href: "#why-thursday" },
    { name: "Roadmap", href: "#roadmap" },
    { name: "Join Us", href: "#join-us" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 py-5 px-4 sm:px-8 transition-all duration-300">
      <div
        className={`max-w-5xl mx-auto rounded-full border transition-all duration-500 ${
          isScrolled
            ? "bg-white/[0.04] backdrop-blur-2xl border-white/[0.12] py-2 px-6 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
            : "bg-transparent border-transparent py-4 px-4"
        } flex items-center justify-between`}
        style={{
          boxShadow: isScrolled ? "0 4px 30px rgba(0,0,0,0.2)" : "none"
        }}
      >
        {/* Brand Logo with 3D Orb placeholder next to text */}
        <a href="#" className="flex items-center gap-3 group">
          <div 
            id="orb-navbar-placeholder" 
            className={`w-6 h-6 rounded-full border border-white/[0.08] bg-white/[0.01] shrink-0 transition-opacity duration-500 ${
              isScrolled ? "opacity-100" : "opacity-0"
            }`} 
          />
          <span className="font-sans text-xs sm:text-sm font-semibold tracking-[0.25em] text-white uppercase transition-all">
            THURSDAY
          </span>
        </a>

        {/* Floating Menu Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A1A1AA] hover:text-white px-3.5 py-2 rounded-full transition-all duration-300 relative group"
            >
              {item.name}
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-[#5B8CFF] group-hover:w-1/4 transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Windows Download Trigger */}
        <div className="hidden sm:flex items-center">
          <button
            onClick={openDownloadModal}
            className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.18em] bg-white hover:bg-white/90 text-black px-6 py-2.5 rounded-full transition-all duration-300 cursor-pointer shadow-[0_4px_12px_rgba(255,255,255,0.1)] hover:scale-[1.02] apple-btn-active shrink-0"
          >
            <Sparkles className="w-3 h-3 text-black" />
            Request Invite
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-full border border-white/[0.12] bg-white/[0.04] text-[#A1A1AA] hover:text-white transition-colors duration-300"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 mx-2 bg-[#0E0E0E]/95 backdrop-blur-2xl border border-white/[0.12] rounded-3xl p-6 flex flex-col gap-6 animate-in fade-in slide-in-from-top-4 duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[10px] uppercase tracking-[0.2em] text-[#A1A1AA] hover:text-white p-3.5 rounded-2xl hover:bg-white/[0.03] transition-all duration-300 font-semibold"
              >
                {item.name}
              </a>
            ))}
          </nav>
          <hr className="border-white/[0.08]" />
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openDownloadModal();
            }}
            className="flex items-center justify-center gap-2 w-full text-[10px] font-bold uppercase tracking-[0.18em] bg-white text-black py-4 rounded-2xl transition-all duration-300 apple-btn-active"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Request Invite
          </button>
        </div>
      )}
    </header>
  );
}
