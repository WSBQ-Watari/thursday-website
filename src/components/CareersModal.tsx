"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Send, CheckCircle2, Sparkles, Briefcase } from "lucide-react";
import { useDownload } from "@/context/DownloadContext";
import { motion, AnimatePresence } from "framer-motion";

export default function CareersModal() {
  const { isCareersOpen, closeCareersModal } = useDownload();
  const modalRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneCode: "+91",
    phoneNumber: "",
    whatsappCode: "+91",
    whatsappNumber: "",
    sameAsPhone: false,
    social: "",
    linkedin: "",
    skills: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync WhatsApp number if checkbox is checked
  useEffect(() => {
    if (formData.sameAsPhone) {
      setFormData((prev) => ({
        ...prev,
        whatsappCode: prev.phoneCode,
        whatsappNumber: prev.phoneNumber,
      }));
    }
  }, [formData.phoneCode, formData.phoneNumber, formData.sameAsPhone]);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isCareersOpen) {
      setFormData({
        name: "",
        email: "",
        phoneCode: "+91",
        phoneNumber: "",
        whatsappCode: "+91",
        whatsappNumber: "",
        sameAsPhone: false,
        social: "",
        linkedin: "",
        skills: "",
        message: "",
      });
      setSuccess(false);
      setError(null);
    }
  }, [isCareersOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCareersModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeCareersModal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
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
      setError("Phone number is required.");
      return;
    }
    if (formData.phoneNumber.length < 8 || formData.phoneNumber.length > 15) {
      setError("Please enter a valid phone number (8 to 15 digits).");
      return;
    }
    if (!formData.whatsappNumber.trim()) {
      setError("WhatsApp number is required.");
      return;
    }
    if (formData.whatsappNumber.length < 8 || formData.whatsappNumber.length > 15) {
      setError("Please enter a valid WhatsApp number (8 to 15 digits).");
      return;
    }
    if (!formData.linkedin.trim()) {
      setError("LinkedIn URL is required.");
      return;
    }
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
    if (!urlRegex.test(formData.linkedin)) {
      setError("Please enter a valid LinkedIn URL.");
      return;
    }
    if (!formData.skills.trim()) {
      setError("Please list your skills.");
      return;
    }
    if (!formData.message.trim()) {
      setError("Please fill out the Cover Letter / Why you want to join.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const fullPhone = `${formData.phoneCode}-${formData.phoneNumber}`;
      const fullWhatsapp = `${formData.whatsappCode}-${formData.whatsappNumber}`;

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: fullPhone,
        whatsapp: fullWhatsapp,
        social: formData.social,
        linkedin: formData.linkedin,
        skills: formData.skills,
        message: formData.message,
      };

      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit application.");
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
      {isCareersOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          {/* Dark Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCareersModal}
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
              onClick={closeCareersModal}
              className="absolute top-6 right-6 p-2 rounded-full border border-white/[0.08] hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05] text-[#A1A1AA] hover:text-white transition-all duration-300 shrink-0 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {!success ? (
              <form onSubmit={handleSubmit} className="relative z-10 flex flex-col text-left">
                {/* Header */}
                <div className="mb-6">
                  <div className="inline-flex items-center gap-1.5 font-mono text-[9px] text-[#5B8CFF] uppercase tracking-[0.2em] mb-2 font-bold">
                    <Briefcase className="w-3.5 h-3.5 text-[#5B8CFF]" />
                    <span>Careers / Internship Portal</span>
                  </div>
                  <h2 className="font-sans text-2xl md:text-3xl font-semibold text-white tracking-tight">
                    Join the <span className="text-gradient">Core Team</span>
                  </h2>
                  <p className="text-[#A1A1AA] text-xs sm:text-sm mt-2 leading-relaxed">
                    Build the next-generation spatial computing OS. Fill out the application form and we will get back to you.
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

                  {/* Phone Number Row */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider font-semibold">Phone Number</label>
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

                  {/* WhatsApp Number Row */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider font-semibold">WhatsApp Number</label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.sameAsPhone}
                          onChange={(e) => setFormData({ ...formData, sameAsPhone: e.target.checked })}
                          className="w-3.5 h-3.5 rounded border-white/[0.08] bg-white/[0.02] text-[#5B8CFF] focus:ring-0 cursor-pointer"
                        />
                        <span className="text-[9px] font-mono uppercase text-[#A1A1AA]/65 tracking-wider select-none">Same as Phone</span>
                      </label>
                    </div>
                    <div className="flex gap-2">
                      <select
                        disabled={formData.sameAsPhone}
                        value={formData.whatsappCode}
                        onChange={(e) => setFormData({ ...formData, whatsappCode: e.target.value })}
                        className="px-3 py-3 rounded-xl border border-white/[0.08] bg-[#0E0E0E] text-xs text-white outline-none focus:border-[#5B8CFF] transition w-28 select-dropdown cursor-pointer font-sans disabled:opacity-50"
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
                      </select>
                      <input
                        type="tel"
                        required
                        disabled={formData.sameAsPhone}
                        value={formData.whatsappNumber}
                        onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value.replace(/\D/g, "") })}
                        placeholder="98765 43210"
                        className="flex-1 px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:border-white/20 focus:border-[#5B8CFF] text-xs text-white placeholder-white/20 outline-none transition disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {/* Social and LinkedIn Link */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider font-semibold">Social Handle (If any)</label>
                      <input
                        type="text"
                        value={formData.social}
                        onChange={(e) => setFormData({ ...formData, social: e.target.value })}
                        placeholder="Instagram or Twitter URL"
                        className="px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:border-white/20 focus:border-[#5B8CFF] text-xs text-white placeholder-white/20 outline-none transition"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider font-semibold">LinkedIn Profile URL</label>
                      <input
                        type="url"
                        required
                        value={formData.linkedin}
                        onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                        placeholder="https://linkedin.com/in/username"
                        className="px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:border-white/20 focus:border-[#5B8CFF] text-xs text-white placeholder-white/20 outline-none transition"
                      />
                    </div>
                  </div>

                  {/* Skills Textarea */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider font-semibold">Primary Skills</label>
                    <input
                      type="text"
                      required
                      value={formData.skills}
                      onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                      placeholder="React, Next.js, Three.js, Shaders, UI Design..."
                      className="px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:border-white/20 focus:border-[#5B8CFF] text-xs text-white placeholder-white/20 outline-none transition"
                    />
                  </div>

                  {/* Why do you want to join? Textarea */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider font-semibold">Cover Letter / Why do you want to join Thursday?</label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Explain why you want to contribute to the spatial operating system framework..."
                      rows={3}
                      className="px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:border-white/20 focus:border-[#5B8CFF] text-xs text-white placeholder-white/20 outline-none transition resize-none"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/[0.08]">
                  <button
                    type="button"
                    onClick={closeCareersModal}
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
                    <span>{loading ? "Submitting..." : "Submit Application"}</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="relative z-10 flex flex-col items-center justify-center py-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="w-16 h-16 rounded-3xl border border-[#27C93F]/20 bg-[#27C93F]/5 flex items-center justify-center text-[#27C93F] mb-6 shadow-[0_10px_30px_rgba(39,201,63,0.1)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <h2 className="font-sans text-2xl md:text-3xl font-semibold text-white tracking-tight mb-3">
                  Application Received!
                </h2>

                <p className="max-w-sm text-xs sm:text-sm text-[#A1A1AA] leading-relaxed mb-5">
                  Thank you for applying to join the Thursday Core Team! Your application has been logged, and we have sent an automated alert notification to the admin dashboard.
                </p>

                <div className="max-w-sm border border-[#5B8CFF]/20 bg-[#5B8CFF]/5 px-4 py-3.5 rounded-2xl text-left text-[11px] text-[#A1A1AA] leading-normal mb-8 flex gap-3 items-start font-sans">
                  <span className="text-[#5B8CFF] shrink-0 font-bold font-mono uppercase tracking-wider text-[9px] mt-0.5 border border-[#5B8CFF]/30 px-1.5 py-0.5 rounded bg-[#5B8CFF]/5">Next Steps</span>
                  <span>
                    Our engineering team reviews custom applications on a rolling basis. We will manually contact you at <strong className="text-white">{formData.email}</strong> or on WhatsApp to schedule an interview if there is a skill alignment.
                  </span>
                </div>

                <button
                  onClick={closeCareersModal}
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
