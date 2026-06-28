"use client";

import React from "react";
import { MessageSquare, ArrowRight, Sparkles, Check, X, ShieldAlert, Cpu } from "lucide-react";
import { motion } from "framer-motion";

export default function WhyThursday() {
  const traditionalList = [
    { label: "Chat", desc: "Forced into chat text inputs for every action." },
    { label: "Answer", desc: "Provides static answers but cannot interface with local systems." },
    { label: "Forget", desc: "Forgets context once you close the active browser tab." },
  ];

  const thursdayList = [
    { label: "Plans", desc: "Compiles schedules and maps buffer blocks automatically." },
    { label: "Remembers", desc: "Indexes active folders, notes, and local files permanently." },
    { label: "Acts", desc: "Launches apps, opens websites, and scripts tasks." },
    { label: "Learns", desc: "Adapts to your focus intervals and cognitive capacity." },
    { label: "Guides", desc: "Mutes desktop noise and redirects workload overflows." },
    { label: "Executes", desc: "Performs file operations, clipboard syncs, and system controls." },
  ];

  return (
    <section id="why-thursday" className="relative py-28 md:py-36 px-4 sm:px-8 border-t border-white/[0.04] overflow-hidden bg-[#050505]">
      {/* Background glow */}
      <div className="absolute inset-0 noise-overlay" />
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-[#5B8CFF]/3 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-24">
          <div className="inline-flex items-center gap-2 border border-white/[0.08] bg-white/[0.02] px-4 py-1.5 rounded-full text-[10px] font-semibold text-[#A1A1AA] uppercase tracking-[0.2em] mb-6">
            <span>Core Contrast</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mb-6">
            A new class of <span className="text-gradient-mac">Intelligence.</span>
          </h2>
          <p className="text-[#A1A1AA] text-sm sm:text-base leading-relaxed font-normal">
            Unlike standard conversational AI assistants confined to browser tabs, Thursday operates as a persistent, system-integrated cognitive layer.
          </p>
        </div>

        {/* Comparison Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Traditional AI Window Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            whileHover={{ y: -5, scale: 1.008, transition: { type: "spring", stiffness: 300, damping: 20 } }}
            className="rounded-[28px] border border-white/[0.08] bg-white/[0.01] p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden"
          >
            {/* macOS traffic dots (grayed out / limited) */}
            <div className="flex items-center gap-1.5 mb-8">
              <div className="w-3 h-3 rounded-full bg-white/10" />
              <div className="w-3 h-3 rounded-full bg-white/10" />
              <div className="w-3 h-3 rounded-full bg-white/10" />
              <span className="text-[9px] font-mono text-[#A1A1AA]/30 ml-3 uppercase tracking-wider">Traditional Chatbot</span>
            </div>

            <div>
              <div className="flex items-center gap-3.5 mb-6 text-[#A1A1AA]/60">
                <div className="w-10 h-10 rounded-xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-center">
                  <MessageSquare className="w-4.5 h-4.5" />
                </div>
                <h3 className="text-lg font-semibold text-white tracking-tight">Conversational Assistant</h3>
              </div>

              <div className="flex flex-col gap-5 mb-8 text-left">
                {traditionalList.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3.5 border-b border-white/[0.04] pb-4 last:border-b-0">
                    <div className="p-1 rounded bg-red-500/10 text-red-400 shrink-0 mt-0.5">
                      <X className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white/90 uppercase tracking-wider font-mono">{item.label}</h4>
                      <p className="text-xs text-[#A1A1AA] leading-relaxed mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-white/[0.06] pt-5 font-mono text-[9px] text-[#A1A1AA]/40 flex items-center gap-2 uppercase tracking-widest">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>Isolated Environment • Zero Local Context</span>
            </div>
          </motion.div>

          {/* Thursday OS Window Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.15 }}
            whileHover={{ y: -5, scale: 1.008, transition: { type: "spring", stiffness: 300, damping: 20 } }}
            className="rounded-[28px] border border-[#5B8CFF]/20 bg-[#5B8CFF]/2 p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden"
          >
            {/* Glowing active glow border top */}
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#5B8CFF]/40 to-transparent" />
            
            {/* macOS traffic dots (active color) */}
            <div className="flex items-center gap-1.5 mb-8">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              <span className="text-[9px] font-mono text-[#5B8CFF] ml-3 uppercase tracking-wider font-bold">Thursday OS Core</span>
            </div>

            <div>
              <div className="flex items-center gap-3.5 mb-6 text-[#5B8CFF]">
                <div className="w-10 h-10 rounded-xl border border-[#5B8CFF]/20 bg-[#5B8CFF]/5 flex items-center justify-center shadow-[0_0_12px_rgba(91,140,255,0.2)]">
                  <Sparkles className="w-4.5 h-4.5" />
                </div>
                <h3 className="text-lg font-semibold text-white tracking-tight flex items-center gap-2">
                  System Integrated Agent
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 mb-8 text-left">
                {thursdayList.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 border-b border-white/[0.04] sm:border-b-0 pb-4 sm:pb-0">
                    <div className="p-1 rounded bg-[#5B8CFF]/15 text-[#5B8CFF] shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">{item.label}</h4>
                      <p className="text-[11px] text-[#A1A1AA] leading-relaxed mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-[#5B8CFF]/10 pt-5 font-mono text-[9px] text-[#5B8CFF] flex items-center justify-between uppercase tracking-widest font-bold">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 shrink-0 text-[#5B8CFF]" />
                <span>Plans • Remembers • Acts</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
