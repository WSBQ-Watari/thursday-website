"use client";

import React, { useState } from "react";
import { Lock, Unlock, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Privacy() {
  const [isLocked, setIsLocked] = useState(true);

  const toggleLock = () => {
    setIsLocked(!isLocked);
  };

  const points = [
    { text: "Your data belongs to you" },
    { text: "100% transparent open code" },
    { text: "Secure sandboxed database" },
    { text: "Local-first encryption keys" },
  ];

  return (
    <section id="privacy" className="relative py-28 md:py-36 px-4 sm:px-8 border-t border-white/[0.04] overflow-hidden">
      <div className="absolute inset-0 noise-overlay" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#5B8CFF]/2 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 flex flex-col md:grid md:grid-cols-12 gap-12 md:gap-16 items-center">
        
        {/* Left Column: Lock (md:col-span-5) */}
        <div className="md:col-span-5 flex flex-col items-center justify-center w-full">
          
          <div 
            onClick={toggleLock}
            className="w-64 h-64 sm:w-72 sm:h-72 rounded-[40px] border border-white/[0.1] bg-white/[0.03] backdrop-blur-2xl flex flex-col items-center justify-center gap-6 cursor-pointer hover:border-white/20 transition-all duration-500 shadow-2xl relative group"
            style={{
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.04)"
            }}
          >
            {/* SVG Interactive Lock */}
            <div className="relative w-28 h-32 flex items-center justify-center">
              {/* Shackle */}
              <motion.div
                animate={{
                  y: isLocked ? 0 : -12,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="absolute top-0 w-20 h-20 rounded-t-full border-[5px] border-white/60 border-b-0"
              />
              
              {/* Lock Body */}
              <div className="absolute bottom-0 w-24 h-20 rounded-2xl border border-white/[0.08] bg-[#0E0E0E] flex items-center justify-center shadow-inner group-hover:border-white/20 transition-colors duration-300">
                <AnimatePresence mode="wait">
                  {isLocked ? (
                    <motion.div
                      key="locked"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="flex flex-col items-center gap-1.5"
                    >
                      <Lock className="w-5 h-5 text-white" />
                      <span className="font-mono text-[8px] tracking-widest text-[#A1A1AA] uppercase">Encrypted</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="unlocked"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="flex flex-col items-center gap-1.5"
                    >
                      <Unlock className="w-5 h-5 text-[#5B8CFF]" />
                      <span className="font-mono text-[8px] tracking-widest text-[#5B8CFF] uppercase font-bold">Decrypted</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Glowing Core Inside */}
              <div className="absolute bottom-6 w-3 h-3 rounded-full bg-[#5B8CFF] blur-[2px] opacity-60 animate-pulse" />
            </div>

            <span className="font-mono text-[9px] text-[#A1A1AA]/50 uppercase tracking-[0.2em] font-semibold">Click to Toggle Lock</span>
          </div>

        </div>

        {/* Right Column: Copy (md:col-span-7) */}
        <div className="md:col-span-7 flex flex-col gap-6 text-left w-full">
          <div className="inline-flex items-center gap-2 border border-white/[0.08] bg-white/[0.02] px-4 py-1.5 rounded-full text-[10px] font-semibold text-[#A1A1AA] uppercase tracking-[0.2em] self-start">
            <span>Sovereignty First</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white leading-tight">
            Private by Design.<br />
            <span className="text-gradient-mac">Local sovereignty.</span>
          </h2>

          <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed font-normal">
            Thursday runs completely on your machine. Your active file structures, project contents, keystrokes, and audio transcripts are processed locally and never touch remote servers.
          </p>

          <hr className="border-white/[0.08]" />

          {/* List items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {points.map((point, idx) => (
              <div key={idx} className="flex items-center gap-3 font-medium text-xs sm:text-sm text-white">
                <div className="w-5 h-5 rounded-full border border-white/[0.08] bg-white/[0.02] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-[#5B8CFF]" />
                </div>
                <span>{point.text}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
