"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Problem() {
  const statements = [
    {
      label: "Deadlines aren't the problem.",
      emphasis: "Mental overload is.",
      description: "Managing when tasks are due is easy. Managing the constant cognitive strain of sorting, sizing, and holding them in your mind is what breaks focus.",
    },
    {
      label: "To-do lists remember tasks.",
      emphasis: "Thursday remembers priorities.",
      description: "Static lists collect items and let them rot. Thursday understands what needs to happen first and structures your actions accordingly.",
    },
    {
      label: "People don't need more reminders.",
      emphasis: "They need better decisions.",
      description: "A notification is just another distraction. Thursday assists you in making critical choices in real-time, removing the friction of planning.",
    },
  ];

  return (
    <section id="problem" className="relative py-28 md:py-36 px-4 sm:px-8 border-t border-white/[0.04] overflow-hidden">
      <div className="absolute inset-0 noise-overlay" />
      <div className="absolute top-1/2 left-10 w-[500px] h-[500px] bg-[#5B8CFF]/2 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col gap-12 md:gap-16">
        {statements.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mac-glass p-8 sm:p-12 rounded-[32px] flex flex-col md:grid md:grid-cols-12 gap-6 items-start relative z-10 text-left hover:border-white/20 transition-all duration-300 shadow-xl"
          >
            {/* Index tag */}
            <div className="md:col-span-2 font-mono text-[10px] font-bold text-[#5B8CFF] uppercase tracking-[0.2em]">
              0{idx + 1} // Paradigm
            </div>

            {/* Content panel */}
            <div className="md:col-span-10 flex flex-col gap-4">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white leading-tight">
                {item.label} <br />
                <span className="text-gradient-mac font-medium">{item.emphasis}</span>
              </h2>
              <p className="max-w-2xl text-xs sm:text-sm text-[#A1A1AA] leading-relaxed font-normal">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
