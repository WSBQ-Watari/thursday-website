import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "THURSDAY | Next-Generation AI Desktop Environment",
  description: "Transform your workspace into a premium, next-generation AI operating layer inspired by Jarvis. Command your entire desktop with natural speech recognition, persistent vector DB memory docks, local sqlite cache databases, hyper-automation macros, and modular glassmorphic HUD telemetry widgets.",
  keywords: ["Jarvis", "AI Desktop", "Windows AI", "Linux AI", "Futuristic HUD", "Speech Recognition AI", "Local AI Automation", "Sovereign desktop environment"],
  authors: [{ name: "THURSDAY Core Architects" }],
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#050505]">
        {children}
      </body>
    </html>
  );
}
