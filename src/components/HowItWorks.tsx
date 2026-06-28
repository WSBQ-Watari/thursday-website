"use client";

import React from "react";
import { motion } from "framer-motion";
import { PlusCircle, Search, Calendar, ListTodo, Navigation, RefreshCcw, CheckCircle } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      title: "Task appears",
      description: "An email, voice command, or random thought lands in the interface. Raw input with no structure.",
      icon: <PlusCircle className="w-4 h-4" />,
    },
    {
      title: "Thursday understands context",
      description: "Instantly scans your local files, code repositories, calendar schedules, and active tasks to know the surrounding state.",
      icon: <Search className="w-4 h-4" />,
    },
    {
      title: "Creates a realistic plan",
      description: "Instead of creating an endless queue, Thursday calculates actual available hours and builds a logical agenda.",
      icon: <Calendar className="w-4 h-4" />,
    },
    {
      title: "Breaks work into tiny steps",
      description: "Deconstructs large deadlines into bite-sized actions to bypass initial mental resistance and procrastination.",
      icon: <ListTodo className="w-4 h-4" />,
    },
    {
      title: "Guides execution",
      description: "Activates Focus Mode, blocks distractors, and provides the files/notes needed for the current step.",
      icon: <Navigation className="w-4 h-4" />,
    },
    {
      title: "Continuously adapts",
      description: "If meetings run long or distractions occur, the planning core recalculates the day immediately without judgment.",
      icon: <RefreshCcw className="w-4 h-4" />,
    },
    {
      title: "Task completed",
      description: "The work is archived, the context database is updated, and your memory database adjusts for tomorrow.",
      icon: <CheckCircle className="w-4 h-4" />,
    },
  ];

  return (
    <section id="how-it-works" className="relative py-28 md:py-36 px-4 sm:px-8 border-t border-white/[0.04] overflow-hidden">
      <div className="absolute inset-0 noise-overlay" />
      <div className="absolute top-1/2 right-10 w-[400px] h-[400px] bg-[#5B8CFF]/2 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-28">
          <div className="inline-flex items-center gap-2 border border-white/[0.08] bg-white/[0.02] px-4 py-1.5 rounded-full text-[10px] font-semibold text-[#A1A1AA] uppercase tracking-[0.2em] mb-6">
            <span>Orchestration Timeline</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mb-6">
            How it <span className="text-gradient-mac">works.</span>
          </h2>
          <p className="text-[#A1A1AA] text-sm sm:text-base leading-relaxed font-normal">
            Observe the lifecycle of execution as Thursday coordinates inputs into actions.
          </p>
        </div>

        {/* Timeline Path */}
        <div className="relative">
          {/* Vertical central path */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[1px] bg-white/[0.12] -translate-x-1/2" />

          {/* Steps */}
          <div className="flex flex-col gap-12 md:gap-16">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={idx}
                  className={`relative flex flex-col md:flex-row ${
                    isEven ? "md:flex-row-reverse" : ""
                  } items-start md:items-center`}
                >
                  {/* Glass Timeline Node */}
                  <motion.div
                    initial={{ scale: 0.8, backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.12)" }}
                    whileInView={{ 
                      scale: 1, 
                      backgroundColor: "#050505", 
                      borderColor: "#5B8CFF",
                      boxShadow: "0 0 20px rgba(91,140,255,0.3)" 
                    }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="absolute left-6 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border z-20 flex items-center justify-center text-white"
                  >
                    {step.icon}
                  </motion.div>

                  {/* Frosted Step Card */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -30 : 30, y: 15 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full md:w-[45%] pl-14 md:pl-0 md:px-6 text-left"
                  >
                    <div className="border border-white/[0.1] bg-white/[0.03] backdrop-blur-xl rounded-[28px] p-6 hover:border-white/20 transition-all duration-300 shadow-md">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-mono text-[9px] font-bold text-[#5B8CFF] uppercase tracking-widest border border-[#5B8CFF]/20 px-2.5 py-0.5 rounded bg-[#5B8CFF]/5">
                          Step 0{idx + 1}
                        </span>
                      </div>
                      <h3 className="text-[15px] font-semibold text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed font-normal">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>

                  {/* Spacer */}
                  <div className="hidden md:block w-[45%]" />
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
