"use client";

import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import InteractiveShowcase from "@/components/InteractiveShowcase";
import VoiceSection from "@/components/VoiceSection";
import Intelligence from "@/components/Intelligence";
import Ecosystem from "@/components/Ecosystem";
import Privacy from "@/components/Privacy";
import Vision from "@/components/Vision";
import WhyThursday from "@/components/WhyThursday";
import Roadmap from "@/components/Roadmap";
import DownloadSection from "@/components/DownloadSection";
import Footer from "@/components/Footer";
import { DownloadProvider, useDownload } from "@/context/DownloadContext";
import { OrbProvider } from "@/context/OrbContext";
import DownloadModal from "@/components/DownloadModal";
import CareersModal from "@/components/CareersModal";
import IntelligenceOrb from "@/components/IntelligenceOrb";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

function HomeContent() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const { openDownloadModal } = useDownload();
  const orbContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loading) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    let initialized = false;

    const current = {
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      velTop: 0,
      velLeft: 0,
      velWidth: 0,
      velHeight: 0,
    };

    const updateLoop = () => {
      const heroPlaceholder = document.getElementById("orb-hero-placeholder");
      const navbarPlaceholder = document.getElementById("orb-navbar-placeholder");
      const orbContainer = orbContainerRef.current;

      if (!orbContainer || !heroPlaceholder || !navbarPlaceholder) {
        animationFrameId = requestAnimationFrame(updateLoop);
        return;
      }

      const heroRect = heroPlaceholder.getBoundingClientRect();
      const navbarRect = navbarPlaceholder.getBoundingClientRect();

      // Smooth scroll morph blending target calculation
      const threshold = 350;
      const scrollY = window.scrollY;
      const t = Math.min(1, Math.max(0, scrollY / threshold));

      const targetTop = heroRect.top * (1 - t) + navbarRect.top * t;
      const targetLeft = heroRect.left * (1 - t) + navbarRect.left * t;
      const targetWidth = heroRect.width * (1 - t) + navbarRect.width * t;
      const targetHeight = heroRect.height * (1 - t) + navbarRect.height * t;

      // On first frame, snap instantly to avoid initial flight lag
      if (!initialized) {
        current.top = targetTop;
        current.left = targetLeft;
        current.width = targetWidth;
        current.height = targetHeight;
        initialized = true;
      }

      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // High-end spring mass parameters: responsive spring catch-up with subtle damping bounce
      const tension = 160;
      const friction = 22;

      const stepSpring = (curr: number, target: number, vel: number) => {
        const force = -tension * (curr - target) - friction * vel;
        const nextVel = vel + force * dt;
        const nextPos = curr + nextVel * dt;
        return { pos: nextPos, vel: nextVel };
      };

      const nextTop = stepSpring(current.top, targetTop, current.velTop);
      const nextLeft = stepSpring(current.left, targetLeft, current.velLeft);
      const nextWidth = stepSpring(current.width, targetWidth, current.velWidth);
      const nextHeight = stepSpring(current.height, targetHeight, current.velHeight);

      current.top = nextTop.pos;
      current.velTop = nextTop.vel;

      current.left = nextLeft.pos;
      current.velLeft = nextLeft.vel;

      current.width = nextWidth.pos;
      current.velWidth = nextWidth.vel;

      current.height = nextHeight.pos;
      current.velHeight = nextHeight.vel;

      orbContainer.style.top = `${current.top}px`;
      orbContainer.style.left = `${current.left}px`;
      orbContainer.style.width = `${current.width}px`;
      orbContainer.style.height = `${current.height}px`;

      animationFrameId = requestAnimationFrame(updateLoop);
    };

    animationFrameId = requestAnimationFrame(updateLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [loading]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(100, prev + Math.floor(Math.random() * 12) + 5);
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
          }, 450);
        }
        return next;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.main
          key="loader"
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] p-6 text-center select-none"
        >
          <div className="w-full max-w-xs flex flex-col gap-6 relative">
            {/* Logo element in loader */}
            <div className="flex flex-col gap-2 items-center justify-center">
              <span className="text-xl font-bold uppercase tracking-[0.3em] text-white">
                THURSDAY
              </span>
              <span className="text-[9px] font-mono tracking-[0.2em] text-[#9CA3AF]/40 uppercase mt-1">
                Personal Operating Layer
              </span>
            </div>

            {/* Loading bar container */}
            <div className="w-full h-[1px] bg-white/[0.05] rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-white transition-all duration-100 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.main>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative min-h-screen text-white bg-[#050505] select-none"
        >
          {/* Persistent Floating 3D Orb overlay */}
          <div
            ref={orbContainerRef}
            className="fixed pointer-events-none z-[60] transition-opacity duration-300"
            style={{
              top: 0,
              left: 0,
              width: 0,
              height: 0,
            }}
          >
            <div className="w-full h-full pointer-events-auto">
              <IntelligenceOrb />
            </div>
          </div>

          {/* Transparent floating navbar */}
          <Navbar />

          {/* Hero Section (Includes Interactive Core) */}
          <Hero />

          {/* Large Typographic Problem Statements */}
          <Problem />

          {/* Introducing Thursday Features Grid */}
          <Features />

          {/* Elegant Workflow Timeline */}
          <HowItWorks />

          {/* Full Mock Desktop Dashboard (Interface Section) */}
          <InteractiveShowcase />

          {/* Microphone Voice Command Demo */}
          <VoiceSection />

          {/* Comprehensive Intelligence Matrix */}
          <Intelligence />

          {/* Supported OS Platforms and Channels */}
          <Ecosystem />

          {/* Secure Locking Sovereignty Statement */}
          <Privacy />

          {/* Minimal quotes vision */}
          <Vision />

          {/* Core Contrast Comparison */}
          <WhyThursday />

          {/* Development Timeline Roadmap */}
          <Roadmap />

          {/* Dedicated Download Card Section */}
          <DownloadSection />

          {/* Final Call to Action Section */}
          <section id="cta" className="relative py-32 md:py-48 px-4 sm:px-8 border-t border-white/[0.04] bg-[#050505] overflow-hidden text-center">
            {/* Spotlight highlight */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#5B8CFF]/3 rounded-full blur-[140px] pointer-events-none" />
            
            <div className="max-w-4xl mx-auto relative z-10 flex flex-col gap-10 items-center">
              <div className="inline-flex items-center gap-2 border border-white/[0.08] bg-[#0E0E0E] px-4 py-1.5 rounded-full text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-[0.2em]">
                <span>Get Started</span>
              </div>

              <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white leading-tight">
                Your calendar remembers dates.<br />
                <span className="text-gradient">Thursday remembers what matters.</span>
              </h2>

              <p className="max-w-xl text-base text-[#9CA3AF] leading-relaxed">
                Experience a desktop layer built for decision clarity. Reclaim focus and eliminate cognitive strain today.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
                <button
                  onClick={openDownloadModal}
                  className="flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] bg-white hover:bg-white/90 text-black px-8 py-4 rounded-full transition-all duration-300 shadow-[0_4px_20px_rgba(255,255,255,0.15)] hover:scale-[1.02] cursor-pointer"
                >
                  Request Invitation
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={openDownloadModal}
                  className="flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] border border-white/[0.08] hover:border-white/20 bg-[#0E0E0E]/40 hover:bg-[#0E0E0E]/70 text-white px-8 py-4 rounded-full transition-all duration-300 cursor-pointer"
                >
                  Join Early Access
                </button>
              </div>
            </div>
          </section>

          {/* Footer */}
          <Footer />

          {/* Download Portal Dialog */}
          <DownloadModal />
          <CareersModal />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Home() {
  return (
    <DownloadProvider>
      <OrbProvider>
        <HomeContent />
      </OrbProvider>
    </DownloadProvider>
  );
}
