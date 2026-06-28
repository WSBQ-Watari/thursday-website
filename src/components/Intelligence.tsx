"use client";

import React from "react";
import { Eye, HardDrive, Smartphone, Sparkles, AudioLines, Zap, Calendar, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function Intelligence() {
  const cards = [
    {
      title: "Context Awareness",
      desc: "Watches open editors, directory trees, terminal exits, and window titles to grasp the topic of your focus block.",
      icon: <Eye className="w-5 h-5 text-[#5B8CFF]" />,
    },
    {
      title: "Memory",
      desc: "Retains local logs of workspace events, files accessed, notes drafted, and decisions made, making long-term context persistent.",
      icon: <HardDrive className="w-5 h-5 text-[#5B8CFF]" />,
    },
    {
      title: "Cross-device Sync",
      desc: "Establishes secure, end-to-end encrypted local P2P channels to synchronize state buffers and clipboard lines across hardware.",
      icon: <Smartphone className="w-5 h-5 text-[#5B8CFF]" />,
    },
    {
      title: "Adaptive Planning",
      desc: "Automatically shifts items, sets revision blocks, and adjusts schedules in real-time when interruptions arise.",
      icon: <Sparkles className="w-5 h-5 text-[#5B8CFF]" />,
    },
    {
      title: "Natural Voice",
      desc: "Decodes spoken objectives with zero remote latency, mapping audio commands directly onto native workspace tasks.",
      icon: <AudioLines className="w-5 h-5 text-[#5B8CFF]" />,
    },
    {
      title: "Automation",
      desc: "Combines file transformations, calendar bookings, and repository commands into custom scripts triggered by event hooks.",
      icon: <Zap className="w-5 h-5 text-[#5B8CFF]" />,
    },
    {
      title: "Calendar Intelligence",
      desc: "Maintains optimal buffer windows, alerts you to overlapping commitments, and suggests preparation intervals.",
      icon: <Calendar className="w-5 h-5 text-[#5B8CFF]" />,
    },
    {
      title: "Email Understanding",
      desc: "Indexes client emails, highlights actions, draft replies, and translates message content directly into planning milestones.",
      icon: <Mail className="w-5 h-5 text-[#5B8CFF]" />,
    },
  ];

  return (
    <section id="intelligence" className="relative py-28 md:py-36 px-4 sm:px-8 border-t border-white/[0.04] overflow-hidden">
      <div className="absolute inset-0 noise-overlay" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#5B8CFF]/2 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-28">
          <div className="inline-flex items-center gap-2 border border-white/[0.08] bg-white/[0.02] px-4 py-1.5 rounded-full text-[10px] font-semibold text-[#A1A1AA] uppercase tracking-[0.2em] mb-6">
            <span>Cognitive Capability</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mb-6">
            Autonomous <span className="text-gradient-mac">Intelligence.</span>
          </h2>
          <p className="text-[#A1A1AA] text-sm sm:text-base leading-relaxed font-normal">
            Engineered to operate silently, integrating scheduling matrices, local models, and system channels.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="p-6 rounded-[24px] border border-white/[0.1] bg-white/[0.03] backdrop-blur-xl hover:border-white/20 hover:scale-[1.01] transition-all duration-300 flex flex-col text-left group"
              style={{
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.04)"
              }}
            >
              <div className="w-10 h-10 rounded-xl border border-white/[0.08] bg-white/[0.04] flex items-center justify-center mb-6 group-hover:border-[#5B8CFF]/20 transition-all duration-300 shrink-0">
                {card.icon}
              </div>
              <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white mb-3 group-hover:text-[#5B8CFF] transition-colors">
                {card.title}
              </h3>
              <p className="text-xs text-[#A1A1AA] leading-relaxed group-hover:text-white/80 transition-colors font-normal">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
