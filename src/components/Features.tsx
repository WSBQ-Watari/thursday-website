"use client";

import React from "react";
import { 
  Eye, Brain, Sparkles, AudioLines, FileText, Clipboard,
  Calendar, Clock, Mail, Compass, ShieldAlert, BarChart3,
  Terminal as TermIcon, Volume2, Search, Code, BookOpen, 
  Activity, ArrowUpRight, Cpu, Monitor
} from "lucide-react";
import { motion } from "framer-motion";

export default function Features() {
  return (
    <section id="features" className="relative py-28 md:py-36 px-4 sm:px-8 border-t border-white/[0.04] overflow-hidden bg-[#050505]">
      {/* Grid overlay noise */}
      <div className="absolute inset-0 noise-overlay" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#5B8CFF]/2 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-28">
          <div className="inline-flex items-center gap-2 border border-white/[0.08] bg-white/[0.02] px-4 py-1.5 rounded-full text-[10px] font-semibold text-[#A1A1AA] uppercase tracking-[0.2em] mb-6">
            <span>Operating Layer Capabilities</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mb-6">
            Meet your personal<br />
            <span className="text-gradient-mac">Operating System.</span>
          </h2>
          
          <p className="text-[#A1A1AA] text-sm sm:text-base leading-relaxed font-normal">
            Every layer is designed to run locally, reduce cognitive overhead, and quiet the noise of standard devices.
          </p>
        </div>

        {/* macOS Windows Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* WINDOW 1: Core Intelligence & Memory (Synapses_Memory.app) */}
          <motion.div 
            whileHover={{ y: -6, scale: 1.012, transition: { type: "spring", stiffness: 300, damping: 20 } }}
            className="rounded-3xl border border-white/[0.12] bg-[#0E0E0E]/40 backdrop-blur-3xl shadow-xl flex flex-col overflow-hidden text-left h-[460px] hover:border-white/20 transition-all duration-300"
          >
            {/* macOS Title Bar */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.08] bg-white/[0.02] select-none shrink-0">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              </div>
              <span className="font-mono text-[9px] font-bold text-[#A1A1AA]/50 tracking-widest uppercase">Synapses_Memory.app</span>
              <div className="w-12" /> {/* alignment spacer */}
            </div>

            {/* Window Content */}
            <div className="flex-1 flex overflow-hidden">
              {/* Sidebar */}
              <div className="w-1/3 border-r border-white/[0.08] bg-white/[0.01] p-3 flex flex-col gap-2 font-mono text-[9px] text-[#A1A1AA] select-none">
                <span className="text-[8px] text-[#A1A1AA]/40 uppercase tracking-widest font-extrabold mb-1">Index Dirs</span>
                <div className="flex items-center gap-1.5 text-white/80"><Cpu className="w-3 h-3 text-[#5B8CFF]" /> context_map</div>
                <div className="flex items-center gap-1.5"><AudioLines className="w-3 h-3" /> voice_cache</div>
                <div className="flex items-center gap-1.5"><Clipboard className="w-3 h-3" /> clip_history</div>
              </div>

              {/* Main Area */}
              <div className="flex-1 p-5 flex flex-col justify-between overflow-y-auto custom-scrollbar-thin">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-[#5B8CFF]">
                    <Brain className="w-5 h-5" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white">Intelligence & Memory</h3>
                  </div>

                  <ul className="flex flex-col gap-3.5 text-xs text-[#A1A1AA] leading-normal font-sans">
                    <li className="flex flex-col">
                      <strong className="text-white font-semibold">AI Voice Assistant</strong>
                      <span className="text-[11px] text-[#A1A1AA]/70 mt-0.5">Continuous natural conversation with zero latency.</span>
                    </li>
                    <li className="flex flex-col">
                      <strong className="text-white font-semibold">Context Awareness</strong>
                      <span className="text-[11px] text-[#A1A1AA]/70 mt-0.5">Aware of active editors, open code folders, and window topics.</span>
                    </li>
                    <li className="flex flex-col">
                      <strong className="text-white font-semibold">AI Notes & Summaries</strong>
                      <span className="text-[11px] text-[#A1A1AA]/70 mt-0.5">Transcribe meeting audio into bullet plans (Speech-to-Text / Text-to-Speech).</span>
                    </li>
                    <li className="flex flex-col">
                      <strong className="text-white font-semibold">Clipboard Memory AI</strong>
                      <span className="text-[11px] text-[#A1A1AA]/70 mt-0.5">Secure index of clipboard logs with instant PDF/document analysis.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* WINDOW 2: Scheduling & Planner (Scheduler.app) */}
          <motion.div 
            whileHover={{ y: -6, scale: 1.012, transition: { type: "spring", stiffness: 300, damping: 20 } }}
            className="rounded-3xl border border-white/[0.12] bg-[#0E0E0E]/40 backdrop-blur-3xl shadow-xl flex flex-col overflow-hidden text-left h-[460px] hover:border-white/20 transition-all duration-300"
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.08] bg-white/[0.02] select-none shrink-0">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              </div>
              <span className="font-mono text-[9px] font-bold text-[#A1A1AA]/50 tracking-widest uppercase">Scheduler.app</span>
              <div className="w-12" />
            </div>

            <div className="flex-1 flex overflow-hidden">
              {/* Sidebar */}
              <div className="w-1/3 border-r border-white/[0.08] bg-white/[0.01] p-3 flex flex-col gap-2 font-mono text-[9px] text-[#A1A1AA] select-none">
                <span className="text-[8px] text-[#A1A1AA]/40 uppercase tracking-widest font-extrabold mb-1">Calendar</span>
                <div className="flex items-center gap-1.5 text-white/80"><Calendar className="w-3 h-3 text-[#5B8CFF]" /> google_sync</div>
                <div className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> outlook_sync</div>
                <div className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> day_planner</div>
              </div>

              {/* Main Area */}
              <div className="flex-1 p-5 flex flex-col justify-between overflow-y-auto custom-scrollbar-thin">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-[#5B8CFF]">
                    <Calendar className="w-5 h-5" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white">Smart Scheduler</h3>
                  </div>

                  <ul className="flex flex-col gap-3.5 text-xs text-[#A1A1AA] leading-normal font-sans">
                    <li className="flex flex-col">
                      <strong className="text-white font-semibold">Adaptive Planner</strong>
                      <span className="text-[11px] text-[#A1A1AA]/70 mt-0.5">Re-allocates tasks dynamically when schedules delay.</span>
                    </li>
                    <li className="flex flex-col">
                      <strong className="text-white font-semibold">Task Planning</strong>
                      <span className="text-[11px] text-[#A1A1AA]/70 mt-0.5">Deadline predictions and automatic preparation reminders.</span>
                    </li>
                    <li className="flex flex-col">
                      <strong className="text-white font-semibold">Unified Calendar</strong>
                      <span className="text-[11px] text-[#A1A1AA]/70 mt-0.5">Concentric Google & Outlook calendars mapped with cognitive load buffers.</span>
                    </li>
                    <li className="flex flex-col">
                      <strong className="text-white font-semibold">Email Understanding</strong>
                      <span className="text-[11px] text-[#A1A1AA]/70 mt-0.5">Indexes client emails and schedules meeting invitations automatically.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* WINDOW 3: Focus & Deep Work (Focus.app) */}
          <motion.div 
            whileHover={{ y: -6, scale: 1.012, transition: { type: "spring", stiffness: 300, damping: 20 } }}
            className="rounded-3xl border border-white/[0.12] bg-[#0E0E0E]/40 backdrop-blur-3xl shadow-xl flex flex-col overflow-hidden text-left h-[460px] hover:border-white/20 transition-all duration-300"
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.08] bg-white/[0.02] select-none shrink-0">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              </div>
              <span className="font-mono text-[9px] font-bold text-[#A1A1AA]/50 tracking-widest uppercase">Focus.app</span>
              <div className="w-12" />
            </div>

            <div className="flex-1 flex overflow-hidden">
              {/* Sidebar */}
              <div className="w-1/3 border-r border-white/[0.08] bg-white/[0.01] p-3 flex flex-col gap-2 font-mono text-[9px] text-[#A1A1AA] select-none">
                <span className="text-[8px] text-[#A1A1AA]/40 uppercase tracking-widest font-extrabold mb-1">Metrics</span>
                <div className="flex items-center gap-1.5 text-white/80"><Compass className="w-3 h-3 text-[#5B8CFF]" /> pomodoro</div>
                <div className="flex items-center gap-1.5"><ShieldAlert className="w-3 h-3" /> app_blocker</div>
                <div className="flex items-center gap-1.5"><BarChart3 className="w-3 h-3" /> usage_stats</div>
              </div>

              {/* Main Area */}
              <div className="flex-1 p-5 flex flex-col justify-between overflow-y-auto custom-scrollbar-thin">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-[#5B8CFF]">
                    <Compass className="w-5 h-5" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white">Focus & Deep Work</h3>
                  </div>

                  <ul className="flex flex-col gap-3.5 text-xs text-[#A1A1AA] leading-normal font-sans">
                    <li className="flex flex-col">
                      <strong className="text-white font-semibold">Deep Work Blocks</strong>
                      <span className="text-[11px] text-[#A1A1AA]/70 mt-0.5">Configures focused time buckets and mutes system notifications.</span>
                    </li>
                    <li className="flex flex-col">
                      <strong className="text-white font-semibold">Distraction Blocking</strong>
                      <span className="text-[11px] text-[#A1A1AA]/70 mt-0.5">Blocks specific distracting apps or URLs when focus is active.</span>
                    </li>
                    <li className="flex flex-col">
                      <strong className="text-white font-semibold">Screen Time Logs</strong>
                      <span className="text-[11px] text-[#A1A1AA]/70 mt-0.5">Logs system-wide application usage and active session targets.</span>
                    </li>
                    <li className="flex flex-col">
                      <strong className="text-white font-semibold">Productivity Analytics</strong>
                      <span className="text-[11px] text-[#A1A1AA]/70 mt-0.5">Analyzes daily output spikes and outlines cognitive curves.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* WINDOW 4: OS Automation & System Controls (OS_Automation.app) */}
          <motion.div 
            whileHover={{ y: -6, scale: 1.012, transition: { type: "spring", stiffness: 300, damping: 20 } }}
            className="rounded-3xl border border-white/[0.12] bg-[#0E0E0E]/40 backdrop-blur-3xl shadow-xl flex flex-col overflow-hidden text-left h-[460px] hover:border-white/20 transition-all duration-300"
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.08] bg-white/[0.02] select-none shrink-0">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              </div>
              <span className="font-mono text-[9px] font-bold text-[#A1A1AA]/50 tracking-widest uppercase">OS_Automation.app</span>
              <div className="w-12" />
            </div>

            <div className="flex-1 flex overflow-hidden">
              {/* Sidebar */}
              <div className="w-1/3 border-r border-white/[0.08] bg-white/[0.01] p-3 flex flex-col gap-2 font-mono text-[9px] text-[#A1A1AA] select-none">
                <span className="text-[8px] text-[#A1A1AA]/40 uppercase tracking-widest font-extrabold mb-1">Actions</span>
                <div className="flex items-center gap-1.5 text-white/80"><TermIcon className="w-3 h-3 text-[#5B8CFF]" /> script_queue</div>
                <div className="flex items-center gap-1.5"><Volume2 className="w-3 h-3" /> hardware_bus</div>
                <div className="flex items-center gap-1.5"><FileText className="w-3 h-3" /> explorer_cmd</div>
              </div>

              {/* Main Area */}
              <div className="flex-1 p-5 flex flex-col justify-between overflow-y-auto custom-scrollbar-thin">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-[#5B8CFF]">
                    <TermIcon className="w-5 h-5" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white">System Automation</h3>
                  </div>

                  <ul className="flex flex-col gap-3.5 text-xs text-[#A1A1AA] leading-normal font-sans">
                    <li className="flex flex-col">
                      <strong className="text-white font-semibold">Desktop Automation</strong>
                      <span className="text-[11px] text-[#A1A1AA]/70 mt-0.5">Launch apps, open URLs, and bind customized workflow macros.</span>
                    </li>
                    <li className="flex flex-col">
                      <strong className="text-white font-semibold">System Controls</strong>
                      <span className="text-[11px] text-[#A1A1AA]/70 mt-0.5">Adjust physical screen brightness and master audio volume controls.</span>
                    </li>
                    <li className="flex flex-col">
                      <strong className="text-white font-semibold">Spotify Integration</strong>
                      <span className="text-[11px] text-[#A1A1AA]/70 mt-0.5">Control playlist selections and track volumes with voice commands.</span>
                    </li>
                    <li className="flex flex-col">
                      <strong className="text-white font-semibold">File Explorer Scripting</strong>
                      <span className="text-[11px] text-[#A1A1AA]/70 mt-0.5">Manipulate directories, copy file buffers, and crop screenshots automatically.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* WINDOW 5: AI Search & Developer Tools (AI_Search.app) */}
          <motion.div 
            whileHover={{ y: -6, scale: 1.012, transition: { type: "spring", stiffness: 300, damping: 20 } }}
            className="rounded-3xl border border-white/[0.12] bg-[#0E0E0E]/40 backdrop-blur-3xl shadow-xl flex flex-col overflow-hidden text-left h-[460px] hover:border-white/20 transition-all duration-300"
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.08] bg-white/[0.02] select-none shrink-0">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              </div>
              <span className="font-mono text-[9px] font-bold text-[#A1A1AA]/50 tracking-widest uppercase">AI_Search.app</span>
              <div className="w-12" />
            </div>

            <div className="flex-1 flex overflow-hidden">
              {/* Sidebar */}
              <div className="w-1/3 border-r border-white/[0.08] bg-white/[0.01] p-3 flex flex-col gap-2 font-mono text-[9px] text-[#A1A1AA] select-none">
                <span className="text-[8px] text-[#A1A1AA]/40 uppercase tracking-widest font-extrabold mb-1">Indexers</span>
                <div className="flex items-center gap-1.5 text-white/80"><Search className="w-3 h-3 text-[#5B8CFF]" /> web_query</div>
                <div className="flex items-center gap-1.5"><Code className="w-3 h-3" /> code_parser</div>
                <div className="flex items-center gap-1.5"><BookOpen className="w-3 h-3" /> study_drives</div>
              </div>

              {/* Main Area */}
              <div className="flex-1 p-5 flex flex-col justify-between overflow-y-auto custom-scrollbar-thin">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-[#5B8CFF]">
                    <Search className="w-5 h-5" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white">Search & Dev Tools</h3>
                  </div>

                  <ul className="flex flex-col gap-3.5 text-xs text-[#A1A1AA] leading-normal font-sans">
                    <li className="flex flex-col">
                      <strong className="text-white font-semibold">Real-time Web Search</strong>
                      <span className="text-[11px] text-[#A1A1AA]/70 mt-0.5">Fetches live queries, local weather indexes, and active news feeds.</span>
                    </li>
                    <li className="flex flex-col">
                      <strong className="text-white font-semibold">Local File & Folder Search</strong>
                      <span className="text-[11px] text-[#A1A1AA]/70 mt-0.5">Semantic search queries across filenames and internal code indices.</span>
                    </li>
                    <li className="flex flex-col">
                      <strong className="text-white font-semibold">Code Generation Assistant</strong>
                      <span className="text-[11px] text-[#A1A1AA]/70 mt-0.5">Autocomplete coding lines, parse math operations, and write tests.</span>
                    </li>
                    <li className="flex flex-col">
                      <strong className="text-white font-semibold">Study & Revision Planner</strong>
                      <span className="text-[11px] text-[#A1A1AA]/70 mt-0.5">Generates Spaced Repetition roadmaps and schedules preparation blocks.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* WINDOW 6: Habit Docks & Future Ecosystem (Ecosystem.app) */}
          <motion.div 
            whileHover={{ y: -6, scale: 1.012, transition: { type: "spring", stiffness: 300, damping: 20 } }}
            className="rounded-3xl border border-white/[0.12] bg-[#0E0E0E]/40 backdrop-blur-3xl shadow-xl flex flex-col overflow-hidden text-left h-[460px] hover:border-white/20 transition-all duration-300"
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.08] bg-white/[0.02] select-none shrink-0">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              </div>
              <span className="font-mono text-[9px] font-bold text-[#A1A1AA]/50 tracking-widest uppercase">Ecosystem.app</span>
              <div className="w-12" />
            </div>

            <div className="flex-1 flex overflow-hidden">
              {/* Sidebar */}
              <div className="w-1/3 border-r border-white/[0.08] bg-white/[0.01] p-3 flex flex-col gap-2 font-mono text-[9px] text-[#A1A1AA] select-none">
                <span className="text-[8px] text-[#A1A1AA]/40 uppercase tracking-widest font-extrabold mb-1">Targets</span>
                <div className="flex items-center gap-1.5 text-white/80"><Activity className="w-3 h-3 text-[#5B8CFF]" /> health_tracker</div>
                <div className="flex items-center gap-1.5"><ArrowUpRight className="w-3 h-3" /> agent_mode</div>
                <div className="flex items-center gap-1.5"><Monitor className="w-3 h-3" /> future_vsn</div>
              </div>

              {/* Main Area */}
              <div className="flex-1 p-5 flex flex-col justify-between overflow-y-auto custom-scrollbar-thin">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-[#5B8CFF]">
                    <Activity className="w-5 h-5" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white">Habits & Ecosystem</h3>
                  </div>

                  <ul className="flex flex-col gap-3.5 text-xs text-[#A1A1AA] leading-normal font-sans">
                    <li className="flex flex-col">
                      <strong className="text-white font-semibold">Health & Habit Tracking</strong>
                      <span className="text-[11px] text-[#A1A1AA]/70 mt-0.5">Muted popups for hydration tracking and active stretch break reminders.</span>
                    </li>
                    <li className="flex flex-col">
                      <strong className="text-white font-semibold">Synaptic Agent Mode</strong>
                      <span className="text-[11px] text-[#A1A1AA]/70 mt-0.5">Background execution pipelines allowing the core to automate workflows.</span>
                    </li>
                    <li className="flex flex-col">
                      <strong className="text-white font-semibold">Vision Intelligence</strong>
                      <span className="text-[11px] text-[#A1A1AA]/70 mt-0.5">Analyze active screen frames, layouts, and mock configurations in real-time.</span>
                    </li>
                    <li className="flex flex-col">
                      <strong className="text-white font-semibold">Future Roadmap Releases</strong>
                      <span className="text-[11px] text-[#A1A1AA]/70 mt-0.5">Unified mobile companion application and native macOS platform version.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
