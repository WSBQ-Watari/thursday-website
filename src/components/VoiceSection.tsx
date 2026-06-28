"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Mic, BookOpen, Clock, FileCheck, CheckCircle2, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useOrb } from "@/context/OrbContext";

export default function VoiceSection() {
  const [voiceActive, setVoiceActive] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { setOrbState } = useOrb();
  
  // Generate stable random values for the waveform animations to avoid rerender stutter
  const waveformBars = useMemo(() => {
    return Array.from({ length: 15 }).map(() => ({
      delay: Math.random() * 0.8,
      duration: 0.8 + Math.random() * 0.8,
    }));
  }, []);

  const startVoiceSequence = () => {
    setVoiceActive(true);
    setShowResults(false);
    setOrbState("voice");
  };

  useEffect(() => {
    if (voiceActive) {
      const thinkingTimer = setTimeout(() => {
        setOrbState("thinking");
      }, 1800);

      const completionTimer = setTimeout(() => {
        setVoiceActive(false);
        setShowResults(true);
        setOrbState("idle");
      }, 3800);

      return () => {
        clearTimeout(thinkingTimer);
        clearTimeout(completionTimer);
      };
    }
  }, [voiceActive, setOrbState]);

  const outputCards = [
    {
      title: "Study roadmap",
      desc: "Deconstructs 6 chapters into a clear logical sequence, starting with weak areas.",
      icon: <BookOpen className="w-4 h-4 text-[#5B8CFF]" />,
    },
    {
      title: "Daily schedule",
      desc: "Blocks out 45-minute focus intervals in the afternoon based on your energy curves.",
      icon: <Clock className="w-4 h-4 text-[#5B8CFF]" />,
    },
    {
      title: "Revision plan",
      desc: "Schedules automated review reminders on Day 2, Day 5, and Day 7 using spaced repetition.",
      icon: <FileCheck className="w-4 h-4 text-[#5B8CFF]" />,
    },
    {
      title: "Practice sessions",
      desc: "Assembles sample tests from indexed study sheets at 4 PM daily.",
      icon: <CheckCircle2 className="w-4 h-4 text-[#5B8CFF]" />,
    },
  ];

  return (
    <section id="voice" className="relative py-28 md:py-36 px-4 sm:px-8 border-t border-white/[0.04] overflow-hidden">
      <div className="absolute inset-0 noise-overlay" />
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-[#5B8CFF]/2 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 border border-white/[0.08] bg-white/[0.02] px-4 py-1.5 rounded-full text-[10px] font-semibold text-[#A1A1AA] uppercase tracking-[0.2em] mb-6">
            <span>Natural Voice Interface</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mb-6">
            Zero friction.<br />
            <span className="text-gradient-mac">Spotlight Command.</span>
          </h2>
          <p className="text-[#A1A1AA] text-sm sm:text-base leading-relaxed font-normal">
            Invoke Spotlight, state your objective, and observe Thursday generate execution blocks directly into your environment.
          </p>
        </div>

        {/* macOS Spotlight Frosted Window */}
        <div className="w-full max-w-2xl border border-white/[0.12] bg-[#0E0E0E]/40 backdrop-blur-3xl rounded-[28px] p-6 sm:p-8 flex flex-col gap-6 shadow-[0_30px_70px_rgba(0,0,0,0.5)] relative">
          
          {/* Spotlight Search Header Bar */}
          <div className="flex items-center gap-4 border border-white/[0.08] bg-white/[0.02] p-4 rounded-2xl relative">
            <Search className="w-5 h-5 text-[#A1A1AA]/50" />
            <div className="flex-1 text-left flex flex-col justify-center">
              <span className="text-[8px] font-mono font-bold tracking-widest text-[#A1A1AA]/40 uppercase mb-0.5">Spotlight Search</span>
              <div className="text-xs sm:text-sm font-medium text-white leading-none">
                {voiceActive ? (
                  <span className="text-white opacity-85">"I have an exam next week."</span>
                ) : showResults ? (
                  <span className="text-white">"I have an exam next week."</span>
                ) : (
                  <span className="text-[#A1A1AA]/40">Type or click mic to dictate prompt...</span>
                )}
              </div>
            </div>

            {/* Mic trigger button */}
            <button
              onClick={startVoiceSequence}
              disabled={voiceActive}
              className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-300 cursor-pointer ${
                voiceActive 
                  ? "bg-[#5B8CFF] border-[#5B8CFF] shadow-[0_0_12px_rgba(91,140,255,0.4)] scale-[1.03]" 
                  : "bg-[#0E0E0E] border-white/[0.08] hover:border-white/20"
              }`}
            >
              <Mic className={`w-4.5 h-4.5 transition-colors ${voiceActive ? "text-black" : "text-[#A1A1AA] hover:text-white"}`} />
            </button>
          </div>

          {/* Animated Waveform */}
          <div className="h-6 flex items-center justify-center gap-1">
            {voiceActive ? (
              waveformBars.map((bar, i) => (
                <motion.div
                  key={i}
                  animate={{ scaleY: [0.1, 1, 0.1] }}
                  transition={{
                    repeat: Infinity,
                    duration: bar.duration,
                    delay: bar.delay,
                    ease: "easeInOut"
                  }}
                  className="w-1 bg-[#5B8CFF] h-5 rounded-full origin-center"
                />
              ))
            ) : (
              <div className="w-24 h-[1px] bg-white/10 rounded-full" />
            )}
          </div>

          {/* Spotlight Search Results Panel */}
          <AnimatePresence>
            {showResults && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full flex flex-col gap-3 mt-2 border-t border-white/[0.08] pt-6"
              >
                <div className="flex items-center justify-between px-1">
                  <span className="text-[9px] font-mono text-[#5B8CFF] uppercase tracking-widest">Suggested action list</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5B8CFF]" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                  {outputCards.map((card, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                      className="p-5 rounded-2xl border border-white/[0.08] bg-white/[0.01] hover:border-white/20 hover:bg-white/[0.03] flex gap-4 items-start transition-all"
                    >
                      <div className="p-2.5 rounded-xl border border-white/[0.08] bg-[#0E0E0E] shrink-0 text-white">
                        {card.icon}
                      </div>
                      <div className="flex flex-col gap-1">
                        <h4 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider">{card.title}</h4>
                        <p className="text-xs text-[#A1A1AA] leading-relaxed font-normal">{card.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
