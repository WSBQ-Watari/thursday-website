"use client";

import React, { useState } from "react";
import { CheckCircle2, GitMerge, Radio, Layers, Landmark, Network } from "lucide-react";

export default function Roadmap() {
  const [hoveredPhase, setHoveredPhase] = useState<number | null>(null);

  const phases = [
    {
      phase: "01",
      title: "Closed Beta",
      status: "active",
      icon: <Radio className="w-4 h-4 text-[#5B8CFF] animate-pulse" />,
      description: "Local-first scheduler, context mapping, and Three.js intelligence core. Invitation-only developer testing.",
      details: ["Local Context Indexer", "Unified HUD Dock", "Natural Spotlight Voice", "Closed Registry Form"],
    },
    {
      phase: "02",
      title: "Public Beta",
      status: "upcoming",
      icon: <Layers className="w-4 h-4 text-[#A1A1AA]/50" />,
      description: "Opening invitation logs globally. Enhanced UI custom integrations and cloud-backed vector buffers.",
      details: ["Expanded Invitation Docks", "Third-party APIs Sync", "Local LLM Optimizer", "Public Community Logs"],
    },
    {
      phase: "03",
      title: "Windows Stable",
      status: "upcoming",
      icon: <CheckCircle2 className="w-4 h-4 text-[#A1A1AA]/50" />,
      description: "Production launch of Thursday OS for Windows. Complete desktop automation scripting and native widgets.",
      details: ["Windows Binary signed", "Desktop Action Synthesizer", "Full File Explorer API", "Pomodoro System Damping"],
    },
    {
      phase: "04",
      title: "Android Version",
      status: "upcoming",
      icon: <GitMerge className="w-4 h-4 text-[#A1A1AA]/50" />,
      description: "Mobile companion layer. Real-time clipboard stream syncing and voice command widget integrations.",
      details: ["Mobile Speech Decoding", "P2P WebRTC Tunnels", "Notification Blocker Docks", "Lockscreen HUD widgets"],
    },
    {
      phase: "05",
      title: "macOS Version",
      status: "upcoming",
      icon: <Layers className="w-4 h-4 text-[#A1A1AA]/50" />,
      description: "Native macOS release built for Apple Silicon. Deep Finder integrations and macOS menu-bar telemetry logs.",
      details: ["Metal Render pipeline", "Finder Context indexers", "Apple Shortcuts triggers", "Menubar dock helper"],
    },
    {
      phase: "06",
      title: "Linux Platform",
      status: "upcoming",
      icon: <Layers className="w-4 h-4 text-[#A1A1AA]/50" />,
      description: "Open-source core libraries and shell daemons. Custom bash macro runners and desktop integrations.",
      details: ["Systemd service daemon", "Bash script compilers", "X11 / Wayland clipboard", "Zero-GUI headless model"],
    },
    {
      phase: "07",
      title: "Web Platform",
      status: "upcoming",
      icon: <Layers className="w-4 h-4 text-[#A1A1AA]/50" />,
      description: "Cloud interface portal. Real-time scheduling visualization, vector analytics, and workspace mapping.",
      details: ["Vector cluster maps", "E2E Synaptic Web Sync", "Web-based calendar widgets", "Proactive planner graphs"],
    },
    {
      phase: "08",
      title: "AI Agents",
      status: "upcoming",
      icon: <Network className="w-4 h-4 text-[#A1A1AA]/50" />,
      description: "Autonomous reasoning agents. Background task execution loops, web search retrievers, and email scheduling actions.",
      details: ["Synaptic Agent Pipelines", "Autonomous Web Scrapers", "Semantic Email Drafting", "Secure Sandboxed execution"],
    },
    {
      phase: "09",
      title: "Thursday Ecosystem",
      status: "upcoming",
      icon: <Landmark className="w-4 h-4 text-[#A1A1AA]/50" />,
      description: "Decentralized LORA model fine-tuning. Secure training on personal interaction loops to create a bespoke digital double.",
      details: ["Decentralized GPU nodes", "Local synaptic loops", "Workflow astrogators", "Bespoke digital double"],
    },
  ];

  return (
    <section id="roadmap" className="relative py-28 md:py-36 px-4 sm:px-8 border-t border-white/[0.04] bg-[#050505] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-[#5B8CFF]/2 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-28">
          <div className="inline-flex items-center gap-2 border border-white/[0.08] bg-[#0E0E0E] px-4 py-1.5 rounded-full text-[10px] font-semibold text-[#A1A1AA] uppercase tracking-[0.2em] mb-6">
            <span>Development Timeline</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mb-6">
            System <span className="text-gradient">Roadmap.</span>
          </h2>
          <p className="text-[#A1A1AA] text-sm sm:text-base leading-relaxed">
            Track our step-by-step progress as we architect the definitive neural desktop layer, spanning from local-first setups to a decentralized personal ecosystem.
          </p>
        </div>

        {/* Timeline Pipeline */}
        <div className="relative">
          {/* Vertical central system-bus line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/[0.08] -translate-x-1/2" />

          <div className="flex flex-col gap-12 md:gap-16">
            {phases.map((phase, idx) => {
              const isEven = idx % 2 === 0;
              const isHovered = hoveredPhase === idx;

              let lineDotStyle = "border-white/[0.08] bg-[#0E0E0E]";
              if (phase.status === "active") {
                lineDotStyle = "border-[#5B8CFF] bg-[#0E0E0E] shadow-[0_0_15px_rgba(91,140,255,0.4)]";
              }

              return (
                <div
                  key={phase.phase}
                  onMouseEnter={() => setHoveredPhase(idx)}
                  onMouseLeave={() => setHoveredPhase(null)}
                  className={`relative flex flex-col md:flex-row ${
                    isEven ? "md:flex-row-reverse" : ""
                  } items-start md:items-center`}
                >
                  {/* Timeline Node point on central line */}
                  <div
                    className={`absolute left-4 md:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border ${lineDotStyle} z-20 flex items-center justify-center transition-all duration-300`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      phase.status === "active" 
                        ? "bg-[#5B8CFF] animate-pulse" 
                        : "bg-white/10"
                    }`} />
                  </div>

                  {/* Spacer / Left-right alignment cards */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                    <div
                      className={`relative rounded-3xl p-6 md:p-8 border transition-all duration-500 text-left ${
                        isHovered
                          ? "border-[#5B8CFF]/20 bg-[#0E0E0E]/60 shadow-[0_12px_30px_rgba(0,0,0,0.4)] -translate-y-1"
                          : "border-white/[0.08] bg-[#0E0E0E]/30"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 font-mono text-[9px]">
                          <span className="font-bold text-[#5B8CFF] tracking-widest border border-[#5B8CFF]/20 px-2.5 py-0.5 rounded bg-[#5B8CFF]/5 uppercase">
                            Phase {phase.phase}
                          </span>
                          <span className={`uppercase tracking-wider font-semibold ${
                            phase.status === "active" ? "text-[#5B8CFF]" : "text-[#A1A1AA]/40"
                          }`}>
                            {phase.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-center w-8 h-8 rounded-xl border border-white/[0.08] bg-[#0E0E0E]">
                          {phase.icon}
                        </div>
                      </div>

                      <h3 className="text-base md:text-lg font-semibold tracking-tight text-white mb-3">
                        {phase.title}
                      </h3>
                      <p className="text-[#A1A1AA] text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                        {phase.description}
                      </p>

                      {/* Technical specifications inside card */}
                      <div className="border-t border-white/[0.08] pt-4 flex flex-col gap-2">
                        <span className="font-mono text-[8px] tracking-[0.2em] text-[#A1A1AA]/45 uppercase font-bold">
                          Milestone Modules
                        </span>
                        <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#A1A1AA]">
                          {phase.details.map((detail, i) => (
                            <div key={i} className="flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-[#5B8CFF]" />
                              <span className="truncate">{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Side connector helper lines for desktop view */}
                      <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 ${
                        isEven ? "-right-8" : "-left-8"
                      } w-8 h-[1px] bg-white/[0.08] pointer-events-none`} />
                    </div>
                  </div>

                  {/* Filler side so the other half remains clean on desktops */}
                  <div className="hidden md:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
