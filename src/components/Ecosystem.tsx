"use client";

import React from "react";
import { Monitor, Smartphone, Globe, Layers, Watch, Code } from "lucide-react";
import { motion } from "framer-motion";

export default function Ecosystem() {
  const platforms = [
    {
      title: "Windows",
      tag: "Active Desktop",
      desc: "Deep integration with native shell outputs, command prompts, directory indexers, and local LLM runtimes.",
      icon: <Monitor className="w-5 h-5 text-[#5B8CFF]" />,
    },
    {
      title: "Android",
      tag: "Companion App",
      desc: "Floating priority triggers, instant microphone capture, and real-time planning sync directly on your home screen.",
      icon: <Smartphone className="w-5 h-5 text-[#5B8CFF]" />,
    },
    {
      title: "Web",
      tag: "Universal Web",
      desc: "Access your planning matrices, priority boards, and calendar overrides from any browser on any machine.",
      icon: <Globe className="w-5 h-5 text-[#5B8CFF]" />,
    },
    {
      title: "Desktop Companion",
      tag: "Floating HUD",
      desc: "A floating overlay that triggers Focus Mode, tracks tasks, and sits silently beside your active apps.",
      icon: <Layers className="w-5 h-5 text-[#5B8CFF]" />,
    },
    {
      title: "Wearables",
      tag: "Watch Sync",
      desc: "Receive subtle vibration indicators for priority adjustments and speak prompts right from your wrist.",
      icon: <Watch className="w-5 h-5 text-[#5B8CFF]" />,
    },
    {
      title: "API",
      tag: "Extensible Integration",
      desc: "Integrate custom workflows, pipe logs into local indexes, and write custom React widget components.",
      icon: <Code className="w-5 h-5 text-[#5B8CFF]" />,
    },
  ];

  return (
    <section id="ecosystem" className="relative py-28 md:py-36 px-4 sm:px-8 border-t border-white/[0.04] overflow-hidden">
      <div className="absolute inset-0 noise-overlay" />
      <div className="absolute top-1/3 left-10 w-[450px] h-[450px] bg-[#5B8CFF]/2 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-28">
          <div className="inline-flex items-center gap-2 border border-white/[0.08] bg-white/[0.02] px-4 py-1.5 rounded-full text-[10px] font-semibold text-[#A1A1AA] uppercase tracking-[0.2em] mb-6">
            <span>Platform Integration</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mb-6">
            The <span className="text-gradient-mac">Ecosystem.</span>
          </h2>
          <p className="text-[#A1A1AA] text-sm sm:text-base leading-relaxed font-normal">
            Thursday scales across all your physical machines. Safe local peer-to-peer data synchronization maintains complete state consistency.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((platform, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="p-8 rounded-[28px] border border-white/[0.1] bg-white/[0.03] backdrop-blur-xl hover:border-white/20 hover:scale-[1.01] transition-all duration-300 flex flex-col text-left group"
              style={{
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.04)"
              }}
            >
              <div className="flex justify-between items-start mb-8">
                <div className="w-12 h-12 rounded-2xl border border-white/[0.08] bg-white/[0.04] flex items-center justify-center group-hover:border-[#5B8CFF]/20 transition-all duration-300">
                  {platform.icon}
                </div>
                <span className="font-mono text-[9px] text-[#5B8CFF] uppercase tracking-widest bg-[#5B8CFF]/5 border border-[#5B8CFF]/20 px-2.5 py-0.5 rounded">
                  {platform.tag}
                </span>
              </div>
              <h3 className="text-base font-semibold text-white mb-3 group-hover:text-[#5B8CFF] transition-colors">
                {platform.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed group-hover:text-white/80 transition-colors font-normal">
                {platform.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
