"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

export default function FeatureCard({ title, description, icon, index }: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full rounded-[28px] border border-white/[0.1] bg-white/[0.03] backdrop-blur-xl p-8 overflow-hidden transition-all duration-300 hover:border-white/20 hover:scale-[1.01] hover:shadow-lg text-left group"
      style={{
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.04)"
      }}
    >
      {/* Light spotlight cursor reflection */}
      {isHovered && (
        <div
          className="absolute pointer-events-none transition-opacity duration-300 rounded-full"
          style={{
            width: "280px",
            height: "280px",
            background: "radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)",
            left: `${coords.x - 140}px`,
            top: `${coords.y - 140}px`,
          }}
        />
      )}

      {/* Top Details */}
      <div className="flex items-center justify-between mb-8">
        <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl border border-white/[0.08] bg-white/[0.04] text-[#A1A1AA] group-hover:text-[#5B8CFF] group-hover:border-[#5B8CFF]/20 transition-all duration-300">
          {icon}
        </div>
        <span className="font-mono text-[9px] font-bold tracking-[0.25em] text-[#A1A1AA]/45 uppercase">
          0{index + 1}
        </span>
      </div>

      {/* Content */}
      <h3 className="text-[17px] font-semibold tracking-tight text-white mb-3 group-hover:text-[#5B8CFF] transition-colors duration-300">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed group-hover:text-white/80 transition-colors duration-300 font-normal">
        {description}
      </p>
    </motion.div>
  );
}
