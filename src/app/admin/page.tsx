"use client";

import React, { useState, useEffect } from "react";
import {
  Users, Mail, CheckCircle2, Clock, ShieldCheck,
  Search, ArrowLeft, RefreshCw, Send, Check, Eye, X, Lock
} from "lucide-react";
import { BetaRequest, SentEmail } from "@/lib/db";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminDashboard() {
  const [requests, setRequests] = useState<BetaRequest[]>([]);
  const [emails, setEmails] = useState<SentEmail[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"pending" | "approved" | "all">("pending");
  const [selectedEmail, setSelectedEmail] = useState<SentEmail | null>(null);

  // Feedback Notification Toast State
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: "success" | "error" | "info" } | null>(null);

  // Security Lock Screen States
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  const fetchData = async () => {
    setLoading(true);
    try {
      const resReq = await fetch("/api/requests");
      const resEms = await fetch("/api/emails");
      if (resReq.ok && resEms.ok) {
        const reqData = await resReq.json();
        const emData = await resEms.json();

        // Sort newest first
        setRequests(reqData.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
        setEmails(emData.sort((a: any, b: any) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime()));
      }
    } catch (e) {
      console.error("Failed to load admin logs", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check local session authentication
    const auth = sessionStorage.getItem("admin_authenticated");
    if (auth === "true") {
      setIsAuthenticated(true);
      fetchData();
    }
    setCheckingAuth(false);

    // Lock screen clock update
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-dismiss status toast after 5 seconds
  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => setStatusMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const targetPasscode = process.env.NEXT_PUBLIC_ADMIN_PASSCODE || "anokhijindagi";
    if (passcode === targetPasscode) {
      sessionStorage.setItem("admin_authenticated", "true");
      setIsAuthenticated(true);
      setError(false);
      fetchData();
    } else {
      setShake(true);
      setError(true);
      setPasscode("");
      setTimeout(() => setShake(false), 400);
    }
  };

  const handleApprove = async (id: string) => {
    setActionId(id);
    try {
      const res = await fetch("/api/requests/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (res.ok) {
        if (data.emailSent) {
          setStatusMessage({ text: "Access Approved! Invitation email with download links has been sent.", type: "success" });
        } else {
          setStatusMessage({ text: `Access Approved! Email simulated locally: ${data.error || ""}`, type: "info" });
        }
        await fetchData();
      } else {
        setStatusMessage({ text: `Failed to approve: ${data.error || "Unknown error"}`, type: "error" });
      }
    } catch (e: any) {
      console.error("Failed to approve invitation", e);
      setStatusMessage({ text: `Network error: ${e.message}`, type: "error" });
    } finally {
      setActionId(null);
    }
  };

  const handleLock = () => {
    sessionStorage.removeItem("admin_authenticated");
    setIsAuthenticated(false);
    setPasscode("");
  };

  // Filter requests
  const filteredRequests = requests.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.occupation.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === "pending") return matchesSearch && r.status === "pending";
    if (activeTab === "approved") return matchesSearch && r.status === "approved";
    return matchesSearch;
  });

  const pendingCount = requests.filter((r) => r.status === "pending").length;
  const approvedCount = requests.filter((r) => r.status === "approved").length;

  const shakeVariants = {
    shake: {
      x: [0, -10, 10, -10, 10, -5, 5, 0],
      transition: { duration: 0.4 }
    },
    idle: { x: 0 }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-xs font-mono text-[#A1A1AA]">
        Initializing Security Subsystems...
      </div>
    );
  }

  return (
    <main className="min-h-screen text-white bg-[#050505] p-6 sm:p-10 select-none relative overflow-hidden">
      {/* Background spotlights */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#5B8CFF]/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#a78bfa]/3 rounded-full blur-[140px] pointer-events-none" />

      {/* macOS Sonoma-style Secure Lock Screen overlay */}
      <AnimatePresence>
        {!isAuthenticated && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-[#050505]/70 backdrop-blur-3xl flex flex-col items-center justify-between p-8 text-center select-none animate-in fade-in"
          >
            {/* Clock at the top */}
            <div className="flex flex-col items-center gap-1.5 mt-16">
              <span className="text-xs md:text-sm font-medium text-white/50 uppercase tracking-widest font-mono">
                {currentTime.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
              </span>
              <span className="text-5xl md:text-6xl font-semibold tracking-tight text-white/90 font-sans">
                {currentTime.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false })}
              </span>
            </div>

            {/* User Profile and login form */}
            <div className="flex flex-col items-center gap-6 w-full max-w-xs relative -translate-y-8">
              {/* Circular Avatar */}
              <div className="w-24 h-24 rounded-full border border-white/[0.12] bg-gradient-to-tr from-[#5B8CFF]/20 to-[#a78bfa]/20 p-1 shadow-2xl relative flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-[#0E0E0E] flex items-center justify-center">
                  <ShieldCheck className="w-10 h-10 text-[#5B8CFF] animate-pulse" />
                </div>
                <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-10 pointer-events-none" />
              </div>

              <div className="flex flex-col gap-1 items-center">
                <span className="text-sm font-semibold text-white tracking-wide">Administrator</span>
                <span className="text-[10px] font-mono text-[#A1A1AA]/50 uppercase tracking-widest">Thursday Secure Control Room</span>
              </div>

              {/* Passcode input field */}
              <motion.form
                onSubmit={handleLogin}
                variants={shakeVariants}
                animate={shake ? "shake" : "idle"}
                className="w-full relative flex items-center"
              >
                <input
                  type="password"
                  placeholder="Enter Passcode"
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    setError(false);
                  }}
                  className={`w-full bg-white/[0.04] hover:bg-white/[0.07] focus:bg-white/[0.07] border text-center text-sm text-white placeholder-white/20 outline-none px-6 py-3.5 rounded-full transition-all duration-300 ${error ? "border-red-500/50 shadow-[0_0_12px_rgba(239,68,68,0.2)]" : "border-white/[0.08] focus:border-white/20 focus:shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                    }`}
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-2.5 p-2 rounded-full bg-white text-black hover:bg-white/90 transition duration-300 cursor-pointer shadow-md flex items-center justify-center"
                >
                  <Send className="w-3.5 h-3.5 text-black" />
                </button>
              </motion.form>

              <div className="h-4 text-[10px] font-mono">
                {error && (
                  <span className="text-red-400 animate-pulse">Incorrect passcode. Hint: thursday2026</span>
                )}
              </div>
            </div>

            {/* Utility icons at the bottom */}
            <div className="flex items-center gap-12 mb-10">
              <a
                href="/"
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full border border-white/[0.08] bg-white/[0.02] group-hover:bg-white/[0.08] flex items-center justify-center text-[#A1A1AA] group-hover:text-white transition duration-300">
                  <ArrowLeft className="w-4 h-4" />
                </div>
                <span className="text-[9px] font-mono text-[#A1A1AA]/50 group-hover:text-white/80 uppercase tracking-widest font-semibold transition">Back to Site</span>
              </a>

              <button
                onClick={() => {
                  setPasscode("");
                  setError(false);
                }}
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full border border-white/[0.08] bg-white/[0.02] group-hover:bg-white/[0.08] flex items-center justify-center text-[#A1A1AA] group-hover:text-white transition duration-300">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <span className="text-[9px] font-mono text-[#A1A1AA]/50 group-hover:text-white/80 uppercase tracking-widest font-semibold transition">Reset Code</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Admin Dashboard View */}
      <div className="max-w-7xl mx-auto flex flex-col gap-8 relative z-10">

        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="p-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] text-[#A1A1AA] hover:text-white transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </a>
            <div className="text-left">
              <div className="inline-flex items-center gap-1.5 font-mono text-[9px] text-[#5B8CFF] uppercase tracking-widest mb-1 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Control Room • Registry Terminal</span>
              </div>
              <h1 className="font-sans text-2xl md:text-3xl font-semibold tracking-tight text-white">
                Beta <span className="text-gradient">Invites</span> Dashboard
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              disabled={loading}
              className="p-3 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] text-white transition disabled:opacity-40 cursor-pointer"
              title="Refresh Registry Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>

            <button
              onClick={handleLock}
              className="p-3 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] text-white hover:text-red-400 transition cursor-pointer"
              title="Lock Admin Control Room"
            >
              <Lock className="w-4 h-4" />
            </button>

            <div className="px-4 py-2 border border-white/[0.08] bg-white/[0.02] rounded-xl text-xs font-mono text-[#A1A1AA]">
              v0.9 Beta • Windows Secure
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="border border-white/[0.08] bg-white/[0.02] p-5 rounded-2xl flex items-center justify-between">
            <div className="text-left">
              <span className="text-[10px] font-mono text-[#A1A1AA]/50 uppercase tracking-wider font-semibold">Total Requests</span>
              <h2 className="text-2xl font-bold text-white mt-1 font-mono">{requests.length}</h2>
            </div>
            <div className="p-3 rounded-xl border border-white/[0.08] bg-white/[0.04] text-white">
              <Users className="w-5 h-5" />
            </div>
          </div>

          <div className="border border-white/[0.08] bg-white/[0.02] p-5 rounded-2xl flex items-center justify-between">
            <div className="text-left">
              <span className="text-[10px] font-mono text-[#A1A1AA]/50 uppercase tracking-wider font-semibold">Pending Invitations</span>
              <h2 className="text-2xl font-bold text-[#FFBD2E] mt-1 font-mono">{pendingCount}</h2>
            </div>
            <div className="p-3 rounded-xl border border-white/[0.08] bg-white/[0.04] text-[#FFBD2E]">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          <div className="border border-white/[0.08] bg-white/[0.02] p-5 rounded-2xl flex items-center justify-between">
            <div className="text-left">
              <span className="text-[10px] font-mono text-[#A1A1AA]/50 uppercase tracking-wider font-semibold">Approved Members</span>
              <h2 className="text-2xl font-bold text-[#27C93F] mt-1 font-mono">{approvedCount}</h2>
            </div>
            <div className="p-3 rounded-xl border border-[#27C93F]/20 bg-[#27C93F]/5 text-[#27C93F]">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>

          <div className="border border-white/[0.08] bg-white/[0.02] p-5 rounded-2xl flex items-center justify-between">
            <div className="text-left">
              <span className="text-[10px] font-mono text-[#A1A1AA]/50 uppercase tracking-wider font-semibold">Sent Emails</span>
              <h2 className="text-2xl font-bold text-[#5B8CFF] mt-1 font-mono">{emails.length}</h2>
            </div>
            <div className="p-3 rounded-xl border border-[#5B8CFF]/20 bg-[#5B8CFF]/5 text-[#5B8CFF]">
              <Mail className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Dashboard Content split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left panel: Invitation Requests table (col-span-8) */}
          <div className="lg:col-span-8 flex flex-col gap-5 border border-white/[0.08] bg-[#0E0E0E]/40 backdrop-blur-xl rounded-3xl p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Tab options */}
              <div className="flex items-center gap-1.5 border border-white/[0.08] bg-white/[0.01] p-1.5 rounded-xl self-start">
                <button
                  onClick={() => setActiveTab("pending")}
                  className={`px-3 py-1.5 rounded-lg text-[10px] uppercase font-bold tracking-wider transition ${activeTab === "pending" ? "bg-white text-black" : "text-[#A1A1AA] hover:text-white"
                    } cursor-pointer`}
                >
                  Pending ({pendingCount})
                </button>
                <button
                  onClick={() => setActiveTab("approved")}
                  className={`px-3 py-1.5 rounded-lg text-[10px] uppercase font-bold tracking-wider transition ${activeTab === "approved" ? "bg-white text-black" : "text-[#A1A1AA] hover:text-white"
                    } cursor-pointer`}
                >
                  Approved ({approvedCount})
                </button>
                <button
                  onClick={() => setActiveTab("all")}
                  className={`px-3 py-1.5 rounded-lg text-[10px] uppercase font-bold tracking-wider transition ${activeTab === "all" ? "bg-white text-black" : "text-[#A1A1AA] hover:text-white"
                    } cursor-pointer`}
                >
                  All ({requests.length})
                </button>
              </div>

              {/* Search bar */}
              <div className="w-full sm:w-64 flex items-center gap-2 border border-white/[0.08] bg-white/[0.02] p-2.5 rounded-xl text-xs">
                <Search className="w-4 h-4 text-[#A1A1AA]/50" />
                <input
                  type="text"
                  placeholder="Search requests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-transparent text-white placeholder-white/20 outline-none text-xs"
                />
              </div>
            </div>

            {/* List */}
            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center text-[#A1A1AA] text-xs gap-3">
                <RefreshCw className="w-6 h-6 animate-spin text-[#5B8CFF]" />
                <span>Loading registry buffers...</span>
              </div>
            ) : filteredRequests.length === 0 ? (
              <div className="py-20 border border-dashed border-white/[0.08] rounded-2xl flex flex-col items-center justify-center text-[#A1A1AA]/50 text-xs">
                <span>No invitation requests matching the filter.</span>
              </div>
            ) : (
              <div className="flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-1 custom-scrollbar-thin">
                {filteredRequests.map((req) => (
                  <div
                    key={req.id}
                    className={`border border-white/[0.08] p-5 rounded-2xl text-left transition-all hover:border-white/20 flex flex-col sm:flex-row justify-between items-start gap-4 ${req.status === "approved" ? "bg-white/[0.01] border-[#27C93F]/10" : "bg-[#0E0E0E]"
                      }`}
                  >
                    <div className="flex-1 flex flex-col gap-3">
                      {/* Top identity bar */}
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-sm font-semibold text-white">{req.name}</span>
                        <span className="text-[10px] font-mono text-[#A1A1AA]/60 border border-white/[0.08] px-2 py-0.5 rounded bg-white/[0.01]">
                          {req.occupation}
                        </span>
                        <span className="text-[10px] font-mono text-[#A1A1AA]/60 border border-white/[0.08] px-2 py-0.5 rounded bg-white/[0.01]">
                          {req.country}
                        </span>
                        <span className="text-[10px] font-mono text-[#A1A1AA]/40 text-left shrink-0">
                          {new Date(req.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      {/* Contact and Answers */}
                      <div className="text-xs text-[#A1A1AA]/80 flex flex-col gap-1.5">
                        <div className="flex flex-wrap items-center gap-2.5 text-[10px] font-mono font-semibold">
                          <span className="text-[#5B8CFF]">{req.email}</span>
                          {req.phone && (
                            <>
                              <span className="text-[#A1A1AA]/30">•</span>
                              <span className="text-[#27C93F]">{req.phone}</span>
                            </>
                          )}
                        </div>
                        {req.reason && (
                          <div>
                            <strong className="text-white/60">Reason: </strong>
                            <span>"{req.reason}"</span>
                          </div>
                        )}
                        {req.expectation && (
                          <div>
                            <strong className="text-white/60">Expectation: </strong>
                            <span>"{req.expectation}"</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions button */}
                    <div className="shrink-0 self-center sm:self-auto flex items-center">
                      {req.status === "pending" ? (
                        <button
                          onClick={() => handleApprove(req.id)}
                          disabled={actionId !== null}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-[9px] uppercase tracking-widest bg-white text-black hover:bg-white/90 disabled:opacity-40 cursor-pointer shadow-[0_4px_12px_rgba(255,255,255,0.15)] transition"
                        >
                          {actionId === req.id ? (
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Send className="w-3.5 h-3.5" />
                          )}
                          <span>Approve Access</span>
                        </button>
                      ) : (
                        <div className="flex items-center gap-1.5 px-4 py-2 border border-[#27C93F]/20 bg-[#27C93F]/5 text-[#27C93F] rounded-xl text-[9px] font-mono uppercase tracking-wider font-bold">
                          <Check className="w-3.5 h-3.5" />
                          Approved
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right panel: Sent Email log stream (col-span-4) */}
          <div className="lg:col-span-4 flex flex-col gap-5 border border-white/[0.08] bg-[#0E0E0E]/40 backdrop-blur-xl rounded-3xl p-6">
            <div className="text-left">
              <span className="font-mono text-[9px] text-[#5B8CFF] uppercase tracking-widest font-bold">Synaptic Dispatch Logs</span>
              <h3 className="text-base font-semibold text-white mt-1">Simulated Email Docks</h3>
            </div>

            {loading ? (
              <div className="py-12 text-[#A1A1AA] text-xs font-mono">Loading transmission logs...</div>
            ) : emails.length === 0 ? (
              <div className="py-16 border border-dashed border-white/[0.08] rounded-2xl flex flex-col items-center justify-center text-[#A1A1AA]/50 text-xs">
                <span>No emails sent yet.</span>
              </div>
            ) : (
              <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar-thin">
                {emails.map((email) => (
                  <div
                    key={email.id}
                    onClick={() => setSelectedEmail(email)}
                    className="border border-white/[0.08] bg-[#0E0E0E] p-3.5 rounded-xl text-left hover:border-white/20 transition cursor-pointer flex justify-between items-start gap-2 group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-bold text-white uppercase tracking-wider truncate">
                        {email.recipientName}
                      </div>
                      <div className="text-[9px] font-mono text-[#5B8CFF] truncate">
                        {email.recipientEmail}
                      </div>
                      <div className="text-[10px] text-[#A1A1AA]/60 truncate mt-1">
                        {email.subject}
                      </div>
                    </div>
                    <div className="shrink-0 p-1.5 rounded-lg border border-white/[0.08] bg-white/[0.02] text-[#A1A1AA] group-hover:text-white transition">
                      <Eye className="w-3.5 h-3.5" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Email Viewer modal dialog */}
      {selectedEmail && (
        <div className="fixed inset-0 z-[20000] flex items-center justify-center p-4">
          <div
            onClick={() => setSelectedEmail(null)}
            className="absolute inset-0 bg-[#050505]/95 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
          />
          <div
            className="relative w-full max-w-2xl border border-white/[0.12] bg-[#0E0E0E] rounded-3xl overflow-hidden p-6 md:p-8 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-5 text-left">
              <div>
                <span className="text-[9px] font-mono text-[#5B8CFF] uppercase tracking-widest font-bold">Email Payload View</span>
                <h4 className="text-base font-semibold text-white mt-1">Transactional Dispatch Log</h4>
              </div>
              <button
                onClick={() => setSelectedEmail(null)}
                className="p-2 rounded-full border border-white/[0.08] hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05] text-[#A1A1AA] hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Email Metadata details */}
            <div className="bg-[#050505] border border-white/[0.08] p-4 rounded-2xl flex flex-col gap-1.5 text-left text-xs font-mono mb-5 text-[#A1A1AA]">
              <div><strong className="text-white">To: </strong> {selectedEmail.recipientName} ({selectedEmail.recipientEmail})</div>
              <div><strong className="text-white">Sent: </strong> {new Date(selectedEmail.sentAt).toLocaleString()}</div>
              <div><strong className="text-white">Subject: </strong> {selectedEmail.subject}</div>
            </div>

            {/* Email HTML simulation container */}
            <div
              className="bg-white text-black p-6 rounded-2xl max-h-[350px] overflow-y-auto text-left text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: selectedEmail.body }}
            />

            <div className="flex justify-end pt-5 mt-2 border-t border-white/[0.08]">
              <button
                onClick={() => setSelectedEmail(null)}
                className="px-6 py-3 font-semibold text-[10px] uppercase tracking-[0.2em] bg-white text-black rounded-xl hover:bg-white/90 transition cursor-pointer"
              >
                Close Log
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <AnimatePresence>
        {statusMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-6 right-6 z-[20000] px-5 py-4 rounded-2xl border backdrop-blur-xl shadow-2xl flex items-center gap-3.5 max-w-sm ${
              statusMessage.type === "success" 
                ? "bg-[#27C93F]/10 border-[#27C93F]/20 text-[#27C93F]" 
                : statusMessage.type === "error"
                ? "bg-red-500/10 border-red-500/20 text-red-400"
                : "bg-[#5B8CFF]/10 border-[#5B8CFF]/20 text-[#5B8CFF]"
            }`}
          >
            <div className="flex-1 text-xs font-semibold leading-snug">
              {statusMessage.text}
            </div>
            <button
              onClick={() => setStatusMessage(null)}
              className="p-1 rounded-lg hover:bg-white/10 transition text-current/80 hover:text-current cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
