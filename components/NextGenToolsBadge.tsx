"use client";

import Link from "next/link";

const NXGN_LISTING_URL = "https://www.nxgntools.com/tools/nicheai?utm_source=nicheai";
const NXGN_BADGE_URL = "https://www.nxgntools.com/api/embed/nicheai?type=FEATURED_ON";

interface NextGenToolsBadgeProps {
  listingUrl?: string;
  variant?: "badge" | "card" | "floating";
  className?: string;
}

export function NextGenToolsBadge({
  listingUrl = NXGN_LISTING_URL,
  variant = "badge",
  className = ""
}: NextGenToolsBadgeProps) {

  // All variants now use the official NXGN badge
  if (variant === "floating") {
    return (
      <a
        href={listingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-24 left-4 z-50 ${className}`}
      >
        <img
          src={NXGN_BADGE_URL}
          alt="NextGen Tools Badge - The #1 AI Tools Directory & Launch Platform"
          style={{ height: '48px', width: 'auto' }}
        />
      </a>
    );
  }

  if (variant === "card") {
    return (
      <a
        href={listingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`block ${className}`}
      >
        <img
          src={NXGN_BADGE_URL}
          alt="NextGen Tools Badge - The #1 AI Tools Directory & Launch Platform"
          style={{ height: '54px', width: 'auto' }}
        />
      </a>
    );
  }

  // Default badge variant - uses official NXGN embed
  return (
    <a
      href={listingUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block ${className}`}
    >
      <img
        src={NXGN_BADGE_URL}
        alt="NextGen Tools Badge - The #1 AI Tools Directory & Launch Platform"
        style={{ height: '48px', width: 'auto' }}
      />
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
export function FeaturedOnSection({ listingUrl = NXGN_LISTING_URL }: { listingUrl?: string }) {
  return (
    <section className="relative px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2 text-gray-300">Featured On</h2>
          <p className="text-gray-500 text-sm">Trusted by leading platforms</p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6">
          {/* NextGen Tools Badge - Official Embed */}
          <a
            href={listingUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={NXGN_BADGE_URL}
              alt="NextGen Tools Badge - The #1 AI Tools Directory & Launch Platform"
              style={{ height: '54px', width: 'auto' }}
            />
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
