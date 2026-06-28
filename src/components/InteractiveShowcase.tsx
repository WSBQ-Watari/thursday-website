"use client";

import React, { useState, useEffect } from "react";
import { 
  Target, Calendar as CalendarIcon, Clock, Sparkles, Mic, 
  Database, Play, Pause, Square, CheckSquare, 
  Square as UncheckedSquare, ShieldCheck, ListTodo,
  FileText, Activity
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useOrb } from "@/context/OrbContext";

export default function InteractiveShowcase() {
  const { setOrbState } = useOrb();
  const [activeWindow, setActiveWindow] = useState("mission");
  
  // Tasks state
  const [tasks, setTasks] = useState([
    { id: 1, text: "Finalize study roadmap details", completed: false, priority: "High" },
    { id: 2, text: "Compile project index vector maps", completed: true, priority: "Medium" },
    { id: 3, text: "Block preparation buffers for exam next week", completed: false, priority: "High" },
    { id: 4, text: "Commit workspace optimization scripts", completed: false, priority: "Low" },
  ]);

  // Focus Timer state
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(1500); // 25:00
  
  useEffect(() => {
    let interval: any = null;
    if (timerRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timeRemaining]);

  const toggleTimer = () => {
    setTimerRunning(!timerRunning);
    setOrbState(timerRunning ? "idle" : "thinking");
  };
  const resetTimer = () => {
    setTimerRunning(false);
    setTimeRemaining(1500);
    setOrbState("idle");
  };

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  // Memory Log events
  const memoryLogs = [
    { time: "09:12 AM", event: "Indexed files in folder /src/components" },
    { time: "10:30 AM", event: "Parsed email request regarding revision guidelines" },
    { time: "11:15 AM", event: "Restructured timeline conflict at 2 PM automatically" },
    { time: "01:05 PM", event: "Archived core build scripts version v1.0.2" },
  ];

  // Dock items
  const dockItems = [
    { id: "mission", label: "Today's Plan", icon: <ListTodo className="w-5 h-5" /> },
    { id: "calendar", label: "Calendar", icon: <CalendarIcon className="w-5 h-5" /> },
    { id: "focus", label: "Focus Session", icon: <Clock className="w-5 h-5" /> },
    { id: "memory", label: "Memory Log", icon: <Database className="w-5 h-5" /> },
  ];

  return (
    <section id="interface" className="relative py-28 md:py-36 px-4 sm:px-8 border-t border-white/[0.04] overflow-hidden">
      <div className="absolute inset-0 noise-overlay" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#5B8CFF]/3 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-24">
          <div className="inline-flex items-center gap-2 border border-white/[0.08] bg-white/[0.02] px-4 py-1.5 rounded-full text-[10px] font-semibold text-[#A1A1AA] uppercase tracking-[0.2em] mb-6">
            <span>Operating System Environment</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mb-6">
            The <span className="text-gradient-mac">Interface.</span>
          </h2>
          <p className="text-[#A1A1AA] text-sm sm:text-base leading-relaxed font-normal">
            A cohesive environment designed to align with macOS window styles and fluid floating animations.
          </p>
        </div>

        {/* macOS Desktop Workspace simulation */}
        <div className="w-full rounded-[36px] border border-white/[0.12] bg-[#0E0E0E]/40 backdrop-blur-3xl shadow-[0_35px_80px_rgba(0,0,0,0.7)] p-6 md:p-8 flex flex-col relative min-h-[640px] justify-between overflow-hidden">
          
          {/* Top Desktop Menubar mockup */}
          <div className="flex items-center justify-between pb-6 border-b border-white/[0.08] text-[11px] font-medium text-[#A1A1AA]">
            <div className="flex items-center gap-4">
              <span className="text-white font-semibold tracking-wide flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#5B8CFF]" />
                Thursday
              </span>
              <span className="opacity-40">File</span>
              <span className="opacity-40">Edit</span>
              <span className="opacity-40">View</span>
              <span className="opacity-40">Go</span>
              <span className="opacity-40">Window</span>
            </div>
            <div className="flex items-center gap-4 text-white">
              <span className="font-mono opacity-85 text-[10px]">100% Local</span>
              <span className="w-[1px] h-3 bg-white/10" />
              <ShieldCheck className="w-4 h-4 text-[#5B8CFF]" />
            </div>
          </div>

          {/* Floating Application Windows Area */}
          <div className="relative flex-1 py-8 flex items-center justify-center min-h-[420px]">
            <AnimatePresence mode="wait">
              {activeWindow === "mission" && (
                <motion.div
                  key="mission"
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -15 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className="w-full max-w-xl border border-white/[0.12] bg-white/[0.03] backdrop-blur-2xl rounded-3xl p-6 shadow-2xl relative text-left"
                >
                  {/* macOS Window Controls */}
                  <div className="flex items-center gap-1.5 mb-5">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/10" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/10" />
                    <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/10" />
                    <span className="text-[10px] text-[#A1A1AA]/50 font-semibold tracking-wider font-mono ml-3 uppercase">Today's Mission</span>
                  </div>

                  <div className="flex flex-col gap-3">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        onClick={() => toggleTask(task.id)}
                        className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                          task.completed
                            ? "bg-white/[0.01] border-white/[0.04] text-[#A1A1AA]/50"
                            : "bg-white/[0.03] border-white/[0.08] hover:border-white/20 text-white"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {task.completed ? (
                            <CheckSquare className="w-4.5 h-4.5 text-[#5B8CFF]" />
                          ) : (
                            <UncheckedSquare className="w-4.5 h-4.5 text-[#A1A1AA]/50" />
                          )}
                          <span className="text-xs sm:text-sm font-medium leading-none">{task.text}</span>
                        </div>
                        <span className={`text-[8px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
                          task.priority === "High" ? "bg-white/10 text-white" : "bg-white/[0.02] text-[#A1A1AA]"
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeWindow === "calendar" && (
                <motion.div
                  key="calendar"
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -15 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className="w-full max-w-xl border border-white/[0.12] bg-white/[0.03] backdrop-blur-2xl rounded-3xl p-6 shadow-2xl relative text-left"
                >
                  <div className="flex items-center gap-1.5 mb-5">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/10" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/10" />
                    <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/10" />
                    <span className="text-[10px] text-[#A1A1AA]/50 font-semibold tracking-wider font-mono ml-3 uppercase">Calendar Intelligence</span>
                  </div>

                  <div className="border border-white/[0.08] rounded-2xl overflow-hidden font-mono text-[9px] text-[#A1A1AA] text-center grid grid-cols-7 bg-[#050505]/60 backdrop-blur-md">
                    {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                      <div key={i} className="py-2.5 border-b border-r last:border-r-0 border-white/[0.08] bg-white/[0.02] text-white font-bold">{d}</div>
                    ))}
                    {Array.from({ length: 28 }).map((_, i) => {
                      const dayNum = i + 1;
                      const hasEvent = dayNum === 12 || dayNum === 15 || dayNum === 24;
                      return (
                        <div key={i} className="py-3.5 border-b border-r last:border-r-0 border-white/[0.08] relative">
                          <span className={dayNum === 15 ? "text-white font-bold" : ""}>{dayNum}</span>
                          {hasEvent && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#5B8CFF]" />}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {activeWindow === "focus" && (
                <motion.div
                  key="focus"
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -15 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className="w-full max-w-sm border border-white/[0.12] bg-white/[0.03] backdrop-blur-2xl rounded-3xl p-8 shadow-2xl relative text-center flex flex-col items-center gap-6"
                >
                  <div className="flex items-center gap-1.5 self-start">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/10" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/10" />
                    <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/10" />
                    <span className="text-[10px] text-[#A1A1AA]/50 font-semibold tracking-wider font-mono ml-3 uppercase">Focus Mode</span>
                  </div>

                  <div className="relative w-40 h-40 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90">
                      <circle
                        cx="80"
                        cy="80"
                        r="68"
                        className="stroke-white/5 fill-none"
                        strokeWidth="5"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="68"
                        className="stroke-[#5B8CFF] fill-none transition-all duration-300"
                        strokeWidth="5"
                        strokeDasharray={2 * Math.PI * 68}
                        strokeDashoffset={(2 * Math.PI * 68) * (1 - timeRemaining / 1500)}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-mono font-bold text-white tracking-widest">
                        {formatTime(timeRemaining)}
                      </span>
                      <span className="text-[9px] text-[#A1A1AA] uppercase tracking-wider mt-1">Focusing</span>
                    </div>
                  </div>

                  <div className="flex gap-3 justify-center w-full mt-2">
                    <button 
                      onClick={toggleTimer}
                      className="flex-1 flex items-center justify-center gap-2 text-xs font-semibold uppercase bg-white text-black py-3 rounded-xl transition-all duration-300 apple-btn-active cursor-pointer"
                    >
                      {timerRunning ? <Pause className="w-3.5 h-3.5 fill-black" /> : <Play className="w-3.5 h-3.5 fill-black" />}
                      {timerRunning ? "Pause" : "Start"}
                    </button>
                    <button 
                      onClick={resetTimer}
                      className="flex items-center justify-center px-4 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] text-[#A1A1AA] hover:text-white transition-colors cursor-pointer"
                    >
                      <Square className="w-3.5 h-3.5 fill-[#A1A1AA]/20" />
                    </button>
                  </div>
                </motion.div>
              )}

              {activeWindow === "memory" && (
                <motion.div
                  key="memory"
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -15 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className="w-full max-w-xl border border-white/[0.12] bg-white/[0.03] backdrop-blur-2xl rounded-3xl p-6 shadow-2xl relative text-left"
                >
                  <div className="flex items-center gap-1.5 mb-5">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/10" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/10" />
                    <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/10" />
                    <span className="text-[10px] text-[#A1A1AA]/50 font-semibold tracking-wider font-mono ml-3 uppercase">Memory Logs</span>
                  </div>

                  <div className="flex flex-col gap-3 font-mono text-[10px] text-[#A1A1AA]">
                    {memoryLogs.map((log, idx) => (
                      <div key={idx} className="flex gap-3 border-b border-white/[0.04] pb-2 last:border-b-0">
                        <span className="text-[#5B8CFF] font-semibold shrink-0">{log.time}</span>
                        <span className="text-white/80">{log.event}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Centered Floating macOS Dock */}
          <div className="flex justify-center pb-2">
            <div className="flex items-center gap-3 px-4 py-3 rounded-[24px] border border-white/[0.1] bg-white/[0.03] backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
              {dockItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveWindow(item.id)}
                  title={item.label}
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 relative group cursor-pointer ${
                    activeWindow === item.id 
                      ? "bg-white text-black scale-[1.05]" 
                      : "text-[#A1A1AA] hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  {item.icon}
                  {/* Tooltip */}
                  <span className="absolute bottom-14 opacity-0 group-hover:opacity-100 bg-[#0E0E0E] text-white border border-white/[0.08] text-[9px] font-semibold px-2.5 py-1 rounded-md transition-opacity pointer-events-none whitespace-nowrap tracking-wider uppercase">
                    {item.label}
                  </span>
                  {/* Active dot indicator under icon */}
                  {activeWindow === item.id && (
                    <span className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-white" />
                  )}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
