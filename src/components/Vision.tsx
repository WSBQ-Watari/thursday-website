"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Vision() {
  return (
    <section id="vision" className="relative py-32 md:py-48 px-4 sm:px-8 border-t border-white/[0.04] bg-[#050505] overflow-hidden select-none">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#5B8CFF]/3 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col gap-12 md:gap-16 text-center">
        
        <div className="inline-flex items-center gap-2 border border-white/[0.08] bg-[#0E0E0E] px-4 py-1.5 rounded-full text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-[0.2em] self-center">
          <span>Vision & Purpose</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-8"
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white leading-tight">
            Technology should reduce mental effort.<br />
            <span className="text-gradient">Not create more notifications.</span>
          </h2>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#9CA3AF] leading-relaxed">
            Thursday quietly helps you make better decisions every day. No buzzing wrists, no attention hacks. Just a silent partner that plans ahead so you can execute.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
