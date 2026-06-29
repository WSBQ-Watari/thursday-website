"use client";

import React, { useState, useEffect, useRef } from "react";
import { useDownload } from "@/context/DownloadContext";
import { X, ShieldCheck, Sparkles, Send, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DownloadModal() {
  const { isOpen, closeDownloadModal } = useDownload();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneCode: "+91",
    phoneNumber: "",
    country: "",
    occupation: "Student",
    reason: "",
    expectation: "",
    agreed: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeDownloadModal();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeDownloadModal]);

  // Reset form when modal closes or opens
  useEffect(() => {
    if (!isOpen) {
      setSuccess(false);
      setError(null);
      setFormData({
        name: "",
        email: "",
        phoneCode: "+91",
        phoneNumber: "",
        country: "",
        occupation: "Student",
        reason: "",
        expectation: "",
        agreed: false,
      });
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Field validations
    if (!formData.name.trim()) {
      setError("Full Name is required.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!formData.phoneNumber.trim()) {
      setError("Mobile number is required.");
      return;
    }
    if (formData.phoneNumber.length < 8 || formData.phoneNumber.length > 15) {
      setError("Please enter a valid mobile number (8 to 15 digits).");
      return;
    }
    if (!formData.country.trim()) {
      setError("Country is required.");
      return;
    }
    if (!formData.reason.trim()) {
      setError("Why do you want to try Thursday is required.");
      return;
    }
    if (!formData.expectation.trim()) {
      setError("What do you expect from Thursday is required.");
      return;
    }
    if (!formData.agreed) {
      setError("You must acknowledge that this is a closed beta.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const fullPhone = `${formData.phoneCode}-${formData.phoneNumber}`;
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: fullPhone,
        country: formData.country,
        occupation: formData.occupation,
        reason: formData.reason,
        expectation: formData.expectation,
        agreed: formData.agreed,
      };

      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit early access request.");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          {/* Dark Blur Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeDownloadModal}
            className="absolute inset-0 bg-[#050505]/85 backdrop-blur-md cursor-pointer"
          />

          {/* Dialog Box */}
          <motion.div 
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 24 }}
            className="relative w-full max-w-xl border border-white/[0.12] bg-[#0E0E0E]/80 backdrop-blur-3xl rounded-[32px] overflow-hidden p-6 md:p-8 shadow-[0_24px_80px_rgba(0,0,0,0.8)] z-10"
          >
        {/* Glow effect */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#5B8CFF]/10 rounded-full blur-[80px] pointer-events-none" />

        {/* Close Button */}
        <button 
          onClick={closeDownloadModal}
          className="absolute top-6 right-6 p-2 rounded-full border border-white/[0.08] hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05] text-[#A1A1AA] hover:text-white transition-all duration-300 shrink-0 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {!success ? (
          <form onSubmit={handleSubmit} className="relative z-10 flex flex-col text-left">
            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 font-mono text-[9px] text-[#5B8CFF] uppercase tracking-[0.2em] mb-2 font-bold">
                <Sparkles className="w-3 h-3 text-[#5B8CFF]" />
                <span>Beta Program Invitation</span>
              </div>
              <h2 className="font-sans text-2xl md:text-3xl font-semibold text-white tracking-tight">
                Request <span className="text-gradient">Early Access</span>
              </h2>
              <p className="text-[#A1A1AA] text-xs sm:text-sm mt-2 leading-relaxed">
                Thursday is currently in closed beta. Applications are reviewed daily for platform compatibility and engineering priority.
              </p>
            </div>

            {error && (
              <div className="mb-5 border border-red-500/20 bg-red-500/5 px-4 py-2.5 rounded-xl text-xs text-red-400 font-medium">
                {error}
              </div>
            )}

            {/* Scrollable inputs wrapper */}
            <div className="max-h-[50vh] overflow-y-auto pr-1 flex flex-col gap-4 mb-6 custom-scrollbar-thin">
              {/* Row 1: Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider font-semibold">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:border-white/20 focus:border-[#5B8CFF] text-xs text-white placeholder-white/20 outline-none transition"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider font-semibold">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:border-white/20 focus:border-[#5B8CFF] text-xs text-white placeholder-white/20 outline-none transition"
                  />
                </div>
              </div>

              {/* Mobile Number with Country Code */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider font-semibold">Mobile Number</label>
                <div className="flex gap-2">
                  <select
                    value={formData.phoneCode}
                    onChange={(e) => setFormData({ ...formData, phoneCode: e.target.value })}
                    className="px-3 py-3 rounded-xl border border-white/[0.08] bg-[#0E0E0E] text-xs text-white outline-none focus:border-[#5B8CFF] transition w-28 select-dropdown cursor-pointer font-sans"
                  >
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+61">🇦🇺 +61</option>
                    <option value="+971">🇦🇪 +971</option>
                    <option value="+81">🇯🇵 +81</option>
                    <option value="+65">🇸🇬 +65</option>
                    <option value="+49">🇩🇪 +49</option>
                    <option value="+33">🇫🇷 +33</option>
                    <option value="+7">🇷🇺 +7</option>
                    <option value="+86">🇨🇳 +86</option>
                    <option value="+966">🇸🇦 +966</option>
                    <option value="+20">🇪🇬 +20</option>
                    <option value="+27">🇿🇦 +27</option>
                    <option value="+55">🇧🇷 +55</option>
                  </select>
                  <input
                    type="tel"
                    required
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value.replace(/\D/g, "") })}
                    placeholder="98765 43210"
                    className="flex-1 px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:border-white/20 focus:border-[#5B8CFF] text-xs text-white placeholder-white/20 outline-none transition"
                  />
                </div>
              </div>

              {/* Row 2: Country and Occupation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider font-semibold">Country</label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="United States"
                    className="px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:border-white/20 focus:border-[#5B8CFF] text-xs text-white placeholder-white/20 outline-none transition"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider font-semibold">Occupation</label>
                  <select
                    value={formData.occupation}
                    onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                    className="px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:border-white/20 focus:border-[#5B8CFF] text-xs text-white outline-none transition select-dropdown"
                  >
                    <option value="Student">Student</option>
                    <option value="Developer">Developer</option>
                    <option value="Professional">Professional</option>
                    <option value="Business">Business</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Textarea 1 */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider font-semibold">Why do you want to try Thursday?</label>
                <textarea
                  required
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  placeholder="I want to streamline my daily schedule and automate system tasks with natural voice..."
                  rows={2}
                  className="px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:border-white/20 focus:border-[#5B8CFF] text-xs text-white placeholder-white/20 outline-none transition resize-none"
                />
              </div>

              {/* Textarea 2 */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider font-semibold">What do you expect from Thursday?</label>
                <textarea
                  required
                  value={formData.expectation}
                  onChange={(e) => setFormData({ ...formData, expectation: e.target.value })}
                  placeholder="A local-first, low latency planning layer that syncs context and mutes noise..."
                  rows={2}
                  className="px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:border-white/20 focus:border-[#5B8CFF] text-xs text-white placeholder-white/20 outline-none transition resize-none"
                />
              </div>

              {/* Checkbox */}
              <label className="flex items-start gap-3 mt-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  required
                  checked={formData.agreed}
                  onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
                  className="mt-0.5 w-4 h-4 rounded border-white/[0.08] bg-white/[0.02] text-[#5B8CFF] focus:ring-0 cursor-pointer"
                />
                <span className="text-[10px] text-[#A1A1AA] leading-tight uppercase tracking-wider font-mono">
                  I understand this is a closed beta program and logs may be requested for system bugs.
                </span>
              </label>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/[0.08]">
              <button
                type="button"
                onClick={closeDownloadModal}
                className="flex-1 font-semibold text-[10px] uppercase tracking-[0.18em] border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] text-[#A1A1AA] hover:text-white py-4 rounded-2xl transition duration-300 cursor-pointer text-center"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 font-semibold text-[10px] uppercase tracking-[0.18em] bg-white text-black hover:bg-white/90 py-4 rounded-2xl transition duration-300 cursor-pointer shadow-[0_4px_16px_rgba(255,255,255,0.15)] disabled:opacity-40"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{loading ? "Sending..." : "Request Beta Access"}</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="relative z-10 flex flex-col items-center justify-center py-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="w-16 h-16 rounded-3xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-[#5B8CFF] mb-6 shadow-[0_10px_30px_rgba(91,140,255,0.1)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h2 className="font-sans text-2xl md:text-3xl font-semibold text-white tracking-tight mb-3">
              Request Received
            </h2>
            
            <p className="max-w-sm text-xs sm:text-sm text-[#A1A1AA] leading-relaxed mb-5">
              Thank you for requesting access. Your details have been secured in our closed beta registry. Once approved, a secure installation package and invite code will be sent to <strong className="text-white">{formData.email}</strong>.
            </p>

            <div className="max-w-sm border border-[#5B8CFF]/20 bg-[#5B8CFF]/5 px-4 py-3.5 rounded-2xl text-left text-[11px] text-[#A1A1AA] leading-normal mb-8 flex gap-3 items-start font-sans">
              <span className="text-[#5B8CFF] shrink-0 font-bold font-mono uppercase tracking-wider text-[9px] mt-0.5 border border-[#5B8CFF]/30 px-1.5 py-0.5 rounded bg-[#5B8CFF]/5">Important</span>
              <span>
                Once approved, the invitation email with downloading links might land in your <strong>Spam / Junk</strong> folder. Please check all folders if you don't receive it in your Inbox!
              </span>
            </div>

            <button
              onClick={closeDownloadModal}
              className="px-8 py-3.5 font-semibold text-[10px] uppercase tracking-[0.2em] border border-white/[0.08] hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05] text-white rounded-full transition-all duration-300 cursor-pointer"
            >
              Close Window
            </button>
          </div>
        )}
      </motion.div>
    </div>
      )}
    </AnimatePresence>
  );
}
