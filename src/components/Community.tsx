"use client";

import React, { useState } from "react";
import { Github, MessageSquare, Coffee, Heart, Milestone, Users, Cpu, FileCode, Settings, QrCode } from "lucide-react";

export default function Community() {
  const [upiId, setUpiId] = useState("9311371527@fam");
  const [coffees, setCoffees] = useState(3);
  const [showSettings, setShowSettings] = useState(false);
  
  // Calculate price: ₹100 per coffee (standard premium price in INR)
  const coffeePrice = 100;
  const amount = coffees * coffeePrice;

  // Construct standard Indian UPI deep link
  const upiUrl = `upi://pay?pa=${upiId}&pn=Thursday%20AI&am=${amount}&cu=INR&tn=Support%20Thursday%20AI`;
  
  // Construct dynamic high-tech QR API link (color hex: 00BFFF matching primary cyber blue, bg hex: 080D1A matching slate-950/60 base)
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&color=00BFFF&bgcolor=080D1A&data=${encodeURIComponent(upiUrl)}`;

  return (
    <section id="community" className="relative py-24 md:py-32 px-4 sm:px-8 border-t border-slate-900 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Core Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: Community Hub (lg:col-span-6) */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            <div>
              <div className="inline-flex items-center gap-2 border border-cyan-500/30 bg-cyan-950/10 px-3 py-1 rounded-full text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-6">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                <span>Global Ecosystem</span>
              </div>
              <h2 className="font-mono text-3xl md:text-5xl font-bold tracking-tight text-white uppercase mb-6 leading-tight">
                Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-neon-glow">Ecosystem</span>
              </h2>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                THURSDAY is built on the foundations of open-source development, community contributions, and continuous learning. Link into the communication terminals to coordinate with the core engine architectural team.
              </p>
            </div>            {/* Grid of Community Cards */}
            <div className="flex flex-col gap-4">
              <div className="glass-panel border-slate-900/60 rounded-2xl p-6 flex items-center gap-5 bg-slate-950/20 font-mono text-xs">
                <FileCode className="w-10 h-10 text-cyan-400 shrink-0" />
                <div className="flex flex-col text-left">
                  <span className="text-slate-100 font-bold uppercase tracking-wider mb-1">Modular Widgets API</span>
                  <span className="text-slate-400 text-xs leading-relaxed">Write custom desktop widgets using React and tailwind utility frames to link them directly onto the main Thursday HUD.</span>
                </div>
              </div>
              <div className="glass-panel border-slate-900/60 rounded-2xl p-6 flex items-center gap-5 bg-slate-950/20 font-mono text-xs">
                <Cpu className="w-10 h-10 text-cyan-400 shrink-0 animate-spin-slow" />
                <div className="flex flex-col text-left">
                  <span className="text-slate-100 font-bold uppercase tracking-wider mb-1">Local LLM Synaptic Driver</span>
                  <span className="text-slate-400 text-xs leading-relaxed">Integrates with Llama.cpp, Ollama, and local transformers. Runs 100% locally on your computer with complete database sovereignty.</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Bezel Payment scanner HUD (lg:col-span-6) */}
          <div id="download" className="lg:col-span-6 glass-panel border-cyan-500/15 rounded-3xl p-8 md:p-10 bg-slate-950/40 relative group overflow-hidden">
            {/* Holographic background grid overlay */}
            <div className="absolute inset-0 cyber-grid opacity-[0.03]" />
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/30 group-hover:border-cyan-400 transition-colors duration-300 rounded-tl-3xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/30 group-hover:border-cyan-400 transition-colors duration-300 rounded-br-3xl" />

            <div className="relative z-10 flex flex-col gap-6 text-left">
              <div className="flex items-center justify-between w-full">
                <div className="inline-flex items-center gap-2 border border-rose-500/30 bg-rose-950/10 px-3 py-1 rounded-full text-[10px] font-mono text-rose-400 uppercase tracking-widest">
                  <Heart className="w-3.5 h-3.5 fill-rose-500/20 text-rose-400 animate-pulse" />
                  <span>Support Operational Costs</span>
                </div>
                {/* Customizable gear settings option */}
                <button 
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-1.5 rounded-lg border border-slate-800 hover:border-cyan-500/40 bg-slate-950/20 hover:bg-cyan-950/40 text-slate-400 hover:text-cyan-400 transition-all duration-300"
                  title="Configure UPI address"
                >
                  <Settings className="w-3.5 h-3.5" />
                </button>
              </div>

              <h3 className="font-mono text-2xl md:text-3xl font-black uppercase tracking-wider text-white">
                Help Build The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-neon-glow">Future of AI Desktops</span>
              </h3>

              <p className="text-slate-400 text-sm leading-relaxed font-sans">
                THURSDAY is a sovereign, self-funded project. By supporting our core database roadmap, you directly accelerate local speech layers and secure P2P context-aware indexers.
              </p>

              {/* Gear Settings Toggle Drawer */}
              {showSettings && (
                <div className="p-4 border border-cyan-500/20 bg-cyan-950/10 rounded-2xl flex flex-col gap-3 font-mono text-[10px] animate-in fade-in slide-in-from-top-2 duration-300">
                  <span className="text-cyan-400 font-bold uppercase tracking-wider">[UPI CONFIGURATION NODE]</span>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-500">PAYMENT RECEIVER UPI ADDRESS</label>
                    <input 
                      type="text" 
                      value={upiId} 
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="e.g. yourname@upi"
                      className="bg-[#080d1a] border border-cyan-500/20 hover:border-cyan-500/40 focus:border-cyan-400 focus:outline-none rounded-lg py-2 px-3 text-cyan-300 font-semibold w-full text-xs"
                    />
                  </div>
                  <span className="text-[8px] text-slate-500 leading-normal uppercase">
                    Changes take effect immediately on the live scanning QR engine below.
                  </span>
                </div>
              )}

              <hr className="border-slate-900" />

              {/* Main Interactive Bezel Payment split grid */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center bg-[#080d1a66] border border-cyan-500/10 p-5 md:p-6 rounded-2xl">
                
                {/* Left Side: Custom Selector Controls (sm:col-span-7) */}
                <div className="sm:col-span-7 flex flex-col gap-5 text-left">
                  <div className="flex items-center gap-2">
                    <Coffee className="w-5 h-5 text-yellow-400 shrink-0" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-100">
                      Buy Me A Coffee
                    </span>
                  </div>

                  {/* Dynamic Coffee Multiplier Buttons */}
                  <div className="flex flex-col gap-2.5">
                    <span className="font-mono text-[9px] text-slate-500 uppercase">
                      Select Coffee Count
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 3, 5].map((num) => (
                        <button
                          key={num}
                          onClick={() => setCoffees(num)}
                          className={`font-mono text-xs font-semibold py-2 rounded-lg border transition-all duration-300 ${
                            coffees === num
                              ? "bg-cyan-500/10 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(0,191,255,0.2)]"
                              : "border-slate-800 bg-slate-950/20 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40"
                          }`}
                        >
                          {num} ☕
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Read-out Telemetry details */}
                  <div className="font-mono text-[10px] text-slate-400 flex flex-col gap-2 border-t border-slate-900 pt-3">
                    <div className="flex justify-between">
                      <span className="text-slate-500">UNIT PRICE:</span>
                      <span className="text-slate-200">₹{coffeePrice} INR</span>
                    </div>
                    <div className="flex justify-between text-cyan-400 font-bold border-t border-slate-900/60 pt-1.5">
                      <span>TOTAL SECURED AMOUNT:</span>
                      <span>₹{amount} INR</span>
                    </div>
                  </div>
                </div>

                {/* Right Side: High-tech Scanning Bezel (sm:col-span-5) */}
                <div className="sm:col-span-5 flex flex-col items-center justify-center">
                  
                  {/* Holographic Scanner Screen Container */}
                  <div className="relative w-full max-w-[160px] aspect-square rounded-xl border border-cyan-500/20 bg-[#080d1a] flex items-center justify-center p-2 group overflow-hidden">
                    {/* Laser sweep line overlay */}
                    <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_8px_rgba(0,191,255,0.8)] laser-sweep-line pointer-events-none" />
                    
                    {/* Corner Reticle brackets */}
                    <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t border-l border-cyan-400/50" />
                    <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t border-r border-cyan-400/50" />
                    <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b border-l border-cyan-400/50" />
                    <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b border-r border-cyan-400/50" />
                    
                    {/* The QR code dynamic image */}
                    <img 
                      src={qrCodeUrl} 
                      alt="Payment Scan QR Code" 
                      className="w-full h-full object-contain rounded-lg relative z-10 transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 font-mono text-[8px] text-slate-500 uppercase mt-3 tracking-widest text-center">
                    <span className="w-1 h-1 bg-cyan-400 rounded-full animate-ping shrink-0" />
                    <span>Scan with Any UPI App</span>
                  </div>
                </div>

              </div>

              <div className="border border-cyan-500/10 bg-cyan-950/5 p-4 rounded-2xl flex items-start gap-3">
                <Milestone className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div className="flex flex-col font-mono text-[9px] text-slate-500 leading-relaxed uppercase">
                  <span className="text-slate-300 font-bold">100% Secure Gateway</span>
                  <span>Payments route directly over the National Payments Corporation network. The scanner is generated on the fly locally on your client sandbox.</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
