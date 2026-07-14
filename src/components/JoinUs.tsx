"use client";

import React from "react";
import { Sparkles, ArrowUpRight, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function JoinUs() {
  return (
    <section id="join-us" className="relative py-28 md:py-36 px-4 sm:px-8 border-t border-white/[0.04] overflow-hidden bg-[#050505]">
      {/* Glow Effects */}
      <div className="absolute inset-0 noise-overlay" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#5B8CFF]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center flex flex-col gap-10">
        
        {/* Header */}
        <div className="flex flex-col gap-3 items-center">
          <div className="inline-flex items-center gap-2 border border-[#5B8CFF]/20 bg-[#5B8CFF]/5 px-4 py-1.5 rounded-full text-[10px] font-bold text-[#5B8CFF] uppercase tracking-[0.2em] font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Core Registry</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white leading-tight mt-3">
            Join the <span className="text-gradient-mac">Core Team.</span>
          </h2>
          <p className="max-w-xl text-[#A1A1AA] text-sm sm:text-base leading-relaxed font-normal">
            We are building a new class of intelligence layer. Fill out our builder application registry directly below to get started.
          </p>
        </div>

        {/* Form Container (macOS style window frame) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="border border-white/[0.12] bg-[#0E0E0E]/40 backdrop-blur-3xl rounded-[32px] overflow-hidden shadow-2xl relative text-left"
          style={{
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.05)"
          }}
        >
          {/* macOS window title bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-white/[0.02]">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              <span className="text-[10px] font-mono text-[#A1A1AA]/50 ml-3 uppercase tracking-widest font-semibold">
                Builder Registry Terminal
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono text-[#A1A1AA]/30 uppercase tracking-widest">
                Active Session
              </span>
              <span className="w-1.5 h-1.5 bg-[#5B8CFF] rounded-full animate-pulse" />
            </div>
          </div>

          {/* Google Form Iframe wrapper */}
          <div className="relative w-full bg-[#FFFFFF] p-1 min-h-[750px] sm:min-h-[850px] flex items-center justify-center">
            {/* Loading Indicator */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050505] text-[#A1A1AA] gap-3 font-mono text-xs z-0 pointer-events-none">
              <span className="w-6 h-6 border-2 border-[#5B8CFF] border-t-transparent rounded-full animate-spin" />
              <span>CONNECTING TO REGISTRY GATEWAY...</span>
            </div>
            
            {/* The Iframe */}
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSfOoczKm2mJLlsUttC50wAjA6i4gQrNA-cgJA0dcmDcOz8ZMA/viewform?embedded=true"
              width="100%"
              height="800"
              className="w-full h-[750px] sm:h-[800px] border-0 rounded-2xl relative z-10"
              style={{ background: '#ffffff' }}
            >
              Loading…
            </iframe>
          </div>

          {/* Footer of the window frame */}
          <div className="px-6 py-4 border-t border-white/[0.08] bg-white/[0.02] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[9px] text-[#A1A1AA]/50 uppercase tracking-widest">
            <div className="flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-[#5B8CFF]" />
              <span>Trouble filling the form inline?</span>
            </div>
            <a
              href="https://forms.gle/3yGQ3jVgdJoVP2xD8"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#5B8CFF] hover:text-[#9CC6FF] transition-colors font-bold uppercase tracking-[0.1em]"
            >
              Open Form in New Tab
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
