"use client";

import Link from "next/link";

interface NextGenToolsBadgeProps {
  listingUrl?: string;
  variant?: "badge" | "card" | "floating";
  className?: string;
}

export function NextGenToolsBadge({
  listingUrl = "https://nextgentools.io/tool/nicheai", // Update with your actual listing URL
  variant = "badge",
  className = ""
}: NextGenToolsBadgeProps) {

  if (variant === "floating") {
    return (
      <a
        href={listingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-24 left-4 z-50 group ${className}`}
      >
        <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-xl border border-emerald-500/50 rounded-2xl p-4 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all hover:scale-105">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
              NG
            </div>
            <div>
              <div className="text-xs text-emerald-300 font-medium">Featured on</div>
              <div className="text-sm font-bold text-white">NextGen Tools</div>
            </div>
          </div>
        </div>
      </a>
    );
  }

  if (variant === "card") {
    return (
      <a
        href={listingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`block group ${className}`}
      >
        <div className="bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-cyan-500/10 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-6 hover:border-emerald-500/50 transition-all hover:scale-[1.02] shadow-lg hover:shadow-emerald-500/20">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-emerald-500/30">
              NG
            </div>
            <div className="flex-1">
              <div className="text-sm text-emerald-300 font-medium mb-1">Featured on</div>
              <div className="text-xl font-bold text-white mb-1">NextGen Tools</div>
              <div className="text-xs text-gray-400">Discover the best AI & productivity tools</div>
            </div>
            <div className="text-emerald-400 group-hover:translate-x-1 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>
        </div>
      </a>
    );
  }

  // Default badge variant
  return (
    <a
      href={listingUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/50 rounded-xl hover:border-emerald-400 transition-all hover:shadow-lg hover:shadow-emerald-500/20 group ${className}`}
    >
      <div className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">
        NG
      </div>
      <span className="text-emerald-200 text-sm font-semibold group-hover:text-emerald-100">
        Featured on NextGen Tools
      </span>
    </a>
  );
}

// Standalone "Try Demo" button for easy access
export function TryDemoButton({ className = "" }: { className?: string }) {
  return (
    <div className={`inline-flex flex-col items-center gap-2 ${className}`}>
      <Link
        href="/aurora"
        className="px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-2xl text-white font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-105 animate-pulse-slow"
      >
        Try Free Demo - Chat with Aurora AI
      </Link>
      <span className="text-xs text-gray-400">No signup required - Start chatting instantly</span>
    </div>
  );
}

// Featured section component for landing page
export function FeaturedOnSection({ listingUrl = "https://nextgentools.io/tool/nicheai" }: { listingUrl?: string }) {
  return (
    <section className="relative px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2 text-gray-300">Featured On</h2>
          <p className="text-gray-500 text-sm">Trusted by leading platforms</p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6">
          {/* NextGen Tools Badge */}
          <a
            href={listingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-6 hover:border-emerald-500/50 transition-all hover:scale-105 shadow-lg hover:shadow-emerald-500/20 min-w-[200px]">
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-500/30">
                  NG
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-white">NextGen Tools</div>
                  <div className="text-xs text-emerald-300">Verified Tool</div>
                </div>
              </div>
            </div>
          </a>

          {/* Coinbase Badge */}
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6 min-w-[200px]">
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/30">
                CB
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-white">Coinbase</div>
                <div className="text-xs text-blue-300">$1,250 Credits</div>
              </div>
            </div>
          </div>

          {/* IBM Quantum Badge */}
          <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6 min-w-[200px]">
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-purple-500/30">
                IBM
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-white">IBM Quantum</div>
                <div className="text-xs text-purple-300">3 Quantum Computers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
