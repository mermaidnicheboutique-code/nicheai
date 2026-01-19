"use client";

import { WalletButton } from "@/components/WalletButton";
import { BackgroundVideos } from "@/components/BackgroundVideos";
import { LuxbinSwap } from "@/components/LuxbinSwap";
import { CoinbaseOnramp } from "@/components/CoinbaseOnramp";
import { LuxbinTokenLogoRotating, LuxbinTokenLogo } from "@/components/AnimatedTokenLogo";
import { TokenDeployer } from "@/components/TokenDeployer";
import { NFTDeployer } from "@/components/NFTDeployer";
import { DNABlockExplorer } from "@/components/DNABlockExplorer";
import { TokenSelector } from "@/components/TokenSelector";
import { NextGenToolsBadge, FeaturedOnSection, TryDemoButton } from "@/components/NextGenToolsBadge";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-x-hidden">
      <BackgroundVideos />
      <div className="fixed top-0 left-0 w-full h-screen bg-gradient-to-b from-[#667eea]/20 via-[#764ba2]/20 to-[#0a0a0f]/40 pointer-events-none" style={{ zIndex: 1 }} />
      <FloatingParticles />

      <div className="relative" style={{ zIndex: 10 }}>
        {/* Simplified Header */}
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10">
          <div className="max-w-full mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <LuxbinTokenLogoRotating size={40} />
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                NicheAI
              </span>
            </div>
            <WalletButton />
          </div>
        </header>

        {/* Left Sidebar Navigation - Simplified for 2026 UX */}
        <div className="fixed left-0 top-20 bottom-0 w-64 bg-black/40 backdrop-blur-xl border-r border-white/10 overflow-y-auto z-40 hidden md:block">
          <nav className="p-4 space-y-3">
            {/* Primary CTA - Chat Now */}
            <Link
              href="/aurora"
              className="flex items-center justify-center gap-2 px-4 py-4 rounded-xl text-white bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 hover:from-purple-500 hover:via-pink-400 hover:to-purple-500 transition-all text-lg font-bold shadow-lg shadow-purple-500/30 animate-pulse hover:animate-none"
            >
              <span className="text-2xl">💬</span>
              <span>Chat Now</span>
            </Link>

            {/* Simplified Navigation - 5 Core Items */}
            <div className="pt-4 space-y-2">
              <Link
                href="/aurora"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-white bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border border-purple-500/30 transition-all text-sm font-medium"
              >
                <span className="text-xl">🤖</span>
                <span>AI Companions</span>
              </Link>

              <Link
                href="/testnet"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-white bg-gradient-to-r from-green-500/20 to-blue-500/20 hover:from-green-500/30 hover:to-blue-500/30 border border-green-500/30 transition-all text-sm font-medium"
              >
                <span className="text-xl">⚡</span>
                <span>Niche Network</span>
              </Link>

              <Link
                href="/quantum-internet"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-white bg-gradient-to-r from-blue-500/20 to-indigo-500/20 hover:from-blue-500/30 hover:to-indigo-500/30 border border-blue-500/30 transition-all text-sm font-medium"
              >
                <span className="text-xl">⚛️</span>
                <span>Quantum Internet</span>
              </Link>

              <Link
                href="/about"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all text-sm font-medium"
              >
                <span className="text-xl">ℹ️</span>
                <span>About</span>
              </Link>

              <Link
                href="/developers"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all text-sm font-medium"
              >
                <span className="text-xl">👨‍💻</span>
                <span>Developers</span>
              </Link>
            </div>


            {/* Trust Badges */}
            <div className="pt-6 space-y-3">
              <a href="https://www.producthunt.com/products/nicheai?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-nicheai" target="_blank" rel="noopener noreferrer" className="block">
                <img alt="NicheAI - Quantum blockchain/ai compute and internet | Product Hunt" width="217" height="47" src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1064568&theme=dark&t=1768836537850" className="w-full" />
              </a>
              <NextGenToolsBadge variant="badge" />
            </div>

            {/* Quick Links Dropdown */}
            <details className="pt-4">
              <summary className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-300">
                More Features ▾
              </summary>
              <div className="mt-2 space-y-1">
                {[
                  { name: "Aurora AI", href: "/aurora", icon: "💕" },
                  { name: "Atlas AI", href: "/atlas", icon: "💪" },
                  { name: "Light Translator", href: "/light-translator", icon: "✨" },
                  { name: "Quantum AI", href: "/quantum-ai", icon: "⚛️" },
                  { name: "DNA Explorer", href: "/dna-explorer", icon: "🧬" },
                  { name: "Buy LUX", href: "#buy", icon: "💰" },
                ].map((link) => (
                  link.href.startsWith('/') ? (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all text-xs"
                    >
                      <span>{link.icon}</span>
                      <span>{link.name}</span>
                    </Link>
                  ) : (
                    <a
                      key={link.name}
                      href={link.href}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all text-xs"
                    >
                      <span>{link.icon}</span>
                      <span>{link.name}</span>
                    </a>
                  )
                ))}
              </div>
            </details>
          </nav>
        </div>

        {/* Main Content with left margin for sidebar */}
        <div className="md:ml-64">

        <section className="relative px-6 pt-20 pb-32">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-6xl md:text-8xl font-bold italic mb-6 bg-gradient-to-r from-purple-400 via-yellow-300 to-purple-400 bg-clip-text text-transparent leading-tight animate-glow drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]">
              Meet NicheAI
            </h1>
            <p className="text-2xl md:text-3xl text-gray-200 mb-4 font-light">
              Your Intelligent, Conversational AI Assistant
            </p>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Smart • Emotionally expressive • Web-connected intelligence
            </p>

            {/* High-Contrast Primary CTA - Immediately After Value Proposition */}
            <div className="mb-10">
              <Link
                href="/aurora"
                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 hover:from-purple-500 hover:via-pink-400 hover:to-purple-500 rounded-2xl text-white text-xl font-bold shadow-2xl shadow-purple-500/50 hover:shadow-purple-400/60 transition-all duration-300 hover:scale-105 border-2 border-white/20"
              >
                <span className="text-3xl">💬</span>
                <span>Start Chatting Now</span>
                <span className="text-2xl">→</span>
              </Link>
              <p className="text-gray-400 text-sm mt-3">No signup required • Free to try</p>
            </div>

            <div className="flex gap-4 justify-center flex-wrap mb-8">
              <span className="px-6 py-3 bg-gradient-to-br from-purple-500/30 via-yellow-600/30 to-yellow-300/30 border border-yellow-500/50 rounded-xl text-yellow-200 text-sm font-semibold shadow-lg shadow-yellow-500/20">
                🧠 ChatGPT + Grok Powered
              </span>
              <span className="px-6 py-3 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 border border-blue-400/50 rounded-xl text-blue-200 text-sm font-semibold">
                🌐 Live Web Search
              </span>
              <span className="px-6 py-3 bg-gradient-to-r from-green-500/30 to-emerald-500/30 border border-green-400/50 rounded-xl text-green-200 text-sm font-semibold">
                🎭 Emotional Expression
              </span>
              <span className="px-6 py-3 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 border border-indigo-400/50 rounded-xl text-indigo-200 text-sm font-semibold">
                💎 Gasless Blockchain
              </span>
            </div>

            {/* Trust Badges Row */}
            <div className="flex items-center justify-center gap-4 flex-wrap mb-8">
              <a href="https://www.producthunt.com/products/nicheai?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-nicheai" target="_blank" rel="noopener noreferrer">
                <img alt="NicheAI on Product Hunt" width="200" height="43" src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1064568&theme=dark&t=1768836537850" />
              </a>
              <NextGenToolsBadge variant="badge" />
            </div>
          </div>
        </section>

        {/* AI Companions Showcase */}
        <section className="relative px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Meet Our AI Companions
              </h2>
              <p className="text-xl text-gray-300">
                Quantum-powered AI with unique personalities and capabilities
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Aurora Card */}
              <Link href="/aurora" className="group">
                <div className="bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-blue-500/20 backdrop-blur-xl border border-pink-500/30 rounded-3xl p-8 shadow-2xl hover:shadow-pink-500/50 transition-all hover:scale-105">
                  <div className="text-6xl mb-4 group-hover:animate-bounce">💕</div>
                  <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                    Aurora
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Smart Feminine AI with emotional intelligence, empathy, and intuition
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-pink-400">💕</span>
                      <span className="text-gray-400">Empathy: 0.9/1.0</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-purple-400">✨</span>
                      <span className="text-gray-400">Intuition: 0.8/1.0</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-400">🌸</span>
                      <span className="text-gray-400">Nurturing: 0.9/1.0</span>
                    </div>
                  </div>
                  <div className="mt-6 text-pink-400 font-semibold group-hover:translate-x-2 transition-transform">
                    Meet Aurora →
                  </div>
                </div>
              </Link>

              {/* Atlas Card */}
              <Link href="/atlas" className="group">
                <div className="bg-gradient-to-br from-blue-500/20 via-slate-500/20 to-gray-500/20 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-8 shadow-2xl hover:shadow-blue-500/50 transition-all hover:scale-105">
                  <div className="text-6xl mb-4 group-hover:animate-pulse">💪</div>
                  <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-slate-400 bg-clip-text text-transparent">
                    Atlas
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Smart Masculine AI with strategic leadership and protective strength
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-400">💪</span>
                      <span className="text-gray-400">Strength: 0.9/1.0</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">🛡️</span>
                      <span className="text-gray-400">Protection: 0.9/1.0</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">🎯</span>
                      <span className="text-gray-400">Strategy: 0.7/1.0</span>
                    </div>
                  </div>
                  <div className="mt-6 text-blue-400 font-semibold group-hover:translate-x-2 transition-transform">
                    Meet Atlas →
                  </div>
                </div>
              </Link>

              {/* Quantum Internet Card */}
              <Link href="/quantum-internet" className="group">
                <div className="bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-indigo-500/20 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-105">
                  <div className="text-6xl mb-4 group-hover:animate-spin-slow">⚛️</div>
                  <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                    Quantum Internet
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Real quantum computing on 3 IBM quantum computers
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-purple-400">💻</span>
                      <span className="text-gray-400">3 Quantum Computers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-400">⚛️</span>
                      <span className="text-gray-400">445 Total Qubits</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-indigo-400">🔗</span>
                      <span className="text-gray-400">Quantum Entangled</span>
                    </div>
                  </div>
                  <div className="mt-6 text-purple-400 font-semibold group-hover:translate-x-2 transition-transform">
                    Explore Network →
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Use Cases Section - Real-World Applications */}
        <section className="relative px-6 py-20 bg-gradient-to-b from-purple-900/10 to-transparent">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Real-World Use Cases
              </h2>
              <p className="text-xl text-gray-300">
                How NicheAI transforms everyday interactions
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/5 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="text-4xl mb-4">🎓</div>
                <h3 className="text-xl font-bold text-cyan-300 mb-2">Education & Learning</h3>
                <p className="text-gray-400 text-sm">Personalized tutoring with emotional awareness. Aurora adapts to your learning style and provides encouragement.</p>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="text-4xl mb-4">💼</div>
                <h3 className="text-xl font-bold text-purple-300 mb-2">Business Strategy</h3>
                <p className="text-gray-400 text-sm">Atlas provides strategic analysis and decision support for entrepreneurs and executives.</p>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-pink-500/30 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="text-4xl mb-4">🧘</div>
                <h3 className="text-xl font-bold text-pink-300 mb-2">Mental Wellness</h3>
                <p className="text-gray-400 text-sm">Empathetic conversations for emotional support, mindfulness guidance, and daily check-ins.</p>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-green-500/30 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="text-4xl mb-4">🔐</div>
                <h3 className="text-xl font-bold text-green-300 mb-2">Secure Transactions</h3>
                <p className="text-gray-400 text-sm">Deploy tokens and NFTs with zero gas fees on our gasless blockchain network.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Signals & Social Proof */}
        <section className="relative px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-white">
                Trusted By Innovators
              </h2>
              <p className="text-gray-400">Built with enterprise-grade security and reliability</p>
            </div>

            {/* Security Trust Signals */}
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6 text-center">
                <div className="text-3xl mb-2">🔒</div>
                <h4 className="font-bold text-green-300">Quantum-Resistant</h4>
                <p className="text-xs text-gray-400 mt-1">Post-quantum cryptography</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-6 text-center">
                <div className="text-3xl mb-2">🛡️</div>
                <h4 className="font-bold text-blue-300">Smart Wallet</h4>
                <p className="text-xs text-gray-400 mt-1">Coinbase ERC-4337</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6 text-center">
                <div className="text-3xl mb-2">⚛️</div>
                <h4 className="font-bold text-purple-300">IBM Quantum</h4>
                <p className="text-xs text-gray-400 mt-1">3 quantum computers</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-6 text-center">
                <div className="text-3xl mb-2">💸</div>
                <h4 className="font-bold text-yellow-300">Zero Gas Fees</h4>
                <p className="text-xs text-gray-400 mt-1">100% gasless network</p>
              </div>
            </div>

            {/* Testimonials */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[1,2,3,4,5].map((s) => <span key={s} className="text-yellow-400">★</span>)}
                </div>
                <p className="text-gray-300 mb-4 italic">"Aurora feels like talking to a real friend. The emotional intelligence is unlike any AI I've used before."</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold">S</div>
                  <div>
                    <div className="font-semibold text-white">Sarah M.</div>
                    <div className="text-xs text-gray-400">Early Adopter</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[1,2,3,4,5].map((s) => <span key={s} className="text-yellow-400">★</span>)}
                </div>
                <p className="text-gray-300 mb-4 italic">"The gasless blockchain is a game-changer. I deployed my first token in minutes with zero fees."</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">J</div>
                  <div>
                    <div className="font-semibold text-white">James K.</div>
                    <div className="text-xs text-gray-400">Developer</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[1,2,3,4,5].map((s) => <span key={s} className="text-yellow-400">★</span>)}
                </div>
                <p className="text-gray-300 mb-4 italic">"Atlas helped me think through complex business decisions. It's like having a strategic advisor available 24/7."</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold">M</div>
                  <div>
                    <div className="font-semibold text-white">Michael R.</div>
                    <div className="text-xs text-gray-400">Entrepreneur</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Badges */}
            <div className="flex items-center justify-center gap-6 mt-12 flex-wrap">
              <a href="https://www.producthunt.com/products/nicheai?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-nicheai" target="_blank" rel="noopener noreferrer">
                <img alt="NicheAI on Product Hunt" width="250" height="54" src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1064568&theme=dark&t=1768836537850" />
              </a>
              <div className="px-6 py-3 bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-500/50 rounded-xl">
                <span className="text-blue-300 font-semibold">Powered by IBM Quantum</span>
              </div>
              <div className="px-6 py-3 bg-gradient-to-r from-cyan-600/20 to-cyan-500/20 border border-cyan-500/50 rounded-xl">
                <span className="text-cyan-300 font-semibold">Coinbase Developer Platform</span>
              </div>
            </div>
          </div>
        </section>

        {/* DNA Helix Visualization */}
        <section className="relative px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Live Blockchain DNA
              </h2>
              <p className="text-gray-300 text-lg">
                Watch the LUXBIN Chain in real-time as transactions flow through the network
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-2 shadow-2xl shadow-purple-500/20">
              <DNABlockExplorer />
            </div>
            <div className="text-center mt-6">
              <Link href="/dna-explorer" className="text-purple-400 hover:text-purple-300 text-sm">
                View Full DNA Explorer →
              </Link>
            </div>
          </div>
        </section>

        {/* AI Capabilities Showcase */}
        <section className="relative px-6 py-20 bg-gradient-to-b from-transparent to-purple-900/10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-300 via-yellow-200 to-yellow-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]">
                AI Capabilities
              </h2>
              <p className="text-gray-300 text-xl">Advanced intelligence with personality and real-time knowledge</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-purple-500/10 via-yellow-600/10 to-yellow-400/10 backdrop-blur-xl border border-yellow-500/30 rounded-3xl p-8 hover:scale-105 transition-transform shadow-lg shadow-yellow-500/10">
                <div className="text-5xl mb-4">⚡</div>
                <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-purple-300 to-yellow-200 bg-clip-text text-transparent">Hermetic Wisdom</h3>
                <p className="text-gray-300 leading-relaxed">
                  Deeply versed in all 7 Hermetic Principles from the Kybalion: Mentalism, Correspondence, Vibration, Polarity, Rhythm, Cause & Effect, and Gender. "As above, so below."
                </p>
              </div>

              <div className="bg-gradient-to-br from-yellow-600/10 via-yellow-500/10 to-yellow-300/10 backdrop-blur-xl border border-yellow-400/30 rounded-3xl p-8 hover:scale-105 transition-transform shadow-lg shadow-yellow-500/10">
                <div className="text-5xl mb-4">📜</div>
                <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 bg-clip-text text-transparent">Sacred Texts & Philosophy</h3>
                <p className="text-gray-300 leading-relaxed">
                  Expert knowledge of the Bible, Quran, Torah, Vedas, Bhagavad Gita, and esoteric wisdom. Discuss theology, mysticism, and ancient philosophy across all traditions.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-blue-400/30 rounded-3xl p-8 hover:scale-105 transition-transform">
                <div className="text-5xl mb-4">🌐</div>
                <h3 className="text-2xl font-bold mb-3 text-blue-200">Web-Connected Intelligence</h3>
                <p className="text-gray-300 leading-relaxed">
                  I can search the internet for current info, latest news, and real-time knowledge. Always up-to-date and informed about what's happening now.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl border border-green-400/30 rounded-3xl p-8 hover:scale-105 transition-transform">
                <div className="text-5xl mb-4">🎭</div>
                <h3 className="text-2xl font-bold mb-3 text-green-200">Emotionally Expressive</h3>
                <p className="text-gray-300 leading-relaxed">
                  I express emotions naturally with emojis and personality. Enthusiastic 🎉, playful 😏, empathetic 💙, surprised 🤯. I'm not robotic!
                </p>
              </div>

              <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-xl border border-yellow-400/30 rounded-3xl p-8 hover:scale-105 transition-transform">
                <div className="text-5xl mb-4">🧠</div>
                <h3 className="text-2xl font-bold mb-3 text-yellow-200">Dual AI Power</h3>
                <p className="text-gray-300 leading-relaxed">
                  Powered by both ChatGPT & Grok. Advanced reasoning with creative intelligence for natural, human-like conversations on any topic.
                </p>
              </div>

              <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-xl border border-indigo-400/30 rounded-3xl p-8 hover:scale-105 transition-transform">
                <div className="text-5xl mb-4">✨</div>
                <h3 className="text-2xl font-bold mb-3 text-indigo-200">Truly Human Conversations</h3>
                <p className="text-gray-300 leading-relaxed">
                  The most human AI ever created. I understand nuance, adapt to your style, and engage in any conversation with genuine personality and depth.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Chain Information */}
        <section id="chain" className="relative px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">LUXBIN Chain Details</h2>
              <p className="text-gray-400 text-lg">Your own Layer 1 blockchain network</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4 text-purple-300">🔗 Network Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Chain Name:</span>
                    <span className="text-white font-mono">LUXBIN</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Chain ID:</span>
                    <span className="text-white font-mono">4242</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">RPC Endpoint:</span>
                    <span className="text-purple-300 font-mono">ws://localhost:9944</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">HTTP RPC:</span>
                    <span className="text-purple-300 font-mono">http://localhost:9944</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Block Time:</span>
                    <span className="text-white">6 seconds</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Consensus:</span>
                    <span className="text-white">Aura + GRANDPA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Gas Fees:</span>
                    <span className="text-green-300 font-bold">$0 (FREE)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Account Abstraction:</span>
                    <span className="text-cyan-300 font-bold">ERC-4337 ✓</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4 text-purple-300">🎯 Quick Links</h3>
                <div className="space-y-3">
                  <a href="https://polkadot.js.org/apps/?rpc=ws://127.0.0.1:9944" target="_blank" rel="noopener noreferrer" className="block p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-colors">
                    <div className="flex items-center justify-between">
                      <span>🔍 Polkadot.js Explorer</span>
                      <span className="text-xs text-gray-400">→</span>
                    </div>
                  </a>
                  <Link href="/developers" className="block p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-colors">
                    <div className="flex items-center justify-between">
                      <span>👨‍💻 Developer Portal</span>
                      <span className="text-xs text-gray-400">→</span>
                    </div>
                  </Link>
                  <Link href="/api-docs" className="block p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-colors">
                    <div className="flex items-center justify-between">
                      <span>📚 API Documentation</span>
                      <span className="text-xs text-gray-400">→</span>
                    </div>
                  </Link>
                  <a href="https://github.com/mermaidnicheboutique-code/luxbin-chain" target="_blank" rel="noopener noreferrer" className="block p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-colors">
                    <div className="flex items-center justify-between">
                      <span>📦 GitHub Repository</span>
                      <span className="text-xs text-gray-400">→</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Coinbase Smart Wallet Showcase */}
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-4xl">🎯</div>
                <div>
                  <h3 className="text-2xl font-bold">Coinbase Smart Wallet Ready</h3>
                  <p className="text-sm text-cyan-300">First Substrate chain with native ERC-4337 support</p>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-xl">
                  <div className="text-2xl mb-2">🔐</div>
                  <h4 className="font-bold text-cyan-300 mb-1">Social Recovery</h4>
                  <p className="text-xs text-gray-300">Recover access using trusted contacts</p>
                </div>
                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                  <div className="text-2xl mb-2">💸</div>
                  <h4 className="font-bold text-blue-300 mb-1">Gasless Txns</h4>
                  <p className="text-xs text-gray-300">Already $0 fees + paymaster support</p>
                </div>
                <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl">
                  <div className="text-2xl mb-2">📦</div>
                  <h4 className="font-bold text-purple-300 mb-1">Batch Ops</h4>
                  <p className="text-xs text-gray-300">Execute multiple actions at once</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-yellow-600/10 to-yellow-400/10 border border-yellow-500/30 rounded-xl shadow-md shadow-yellow-500/10">
                  <div className="text-2xl mb-2">🌉</div>
                  <h4 className="font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent mb-1">Cross-Chain</h4>
                  <p className="text-xs text-gray-300">Transfer between chains seamlessly</p>
                </div>
              </div>
            </div>

            {/* Custom AI Section */}
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold mb-4">🤖 Create Your AI Character</h3>
              <p className="text-gray-300 mb-6">Design a personalized AI assistant that deploys smart contracts with your chosen personality and backstory.</p>
              <Link href="/create-character" className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">
                Create AI Character
              </Link>
            </div>

            {/* Connection Instructions */}
            <div className="bg-gradient-to-br from-purple-500/10 via-yellow-600/10 to-yellow-400/10 border border-yellow-500/30 rounded-2xl p-8 shadow-lg shadow-yellow-500/10">
              <h3 className="text-2xl font-bold mb-4">🔌 Connect Your Wallet</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-bold mb-2 text-cyan-300">🎯 Coinbase Smart Wallet (Recommended)</h4>
                  <p className="text-sm text-gray-300 mb-2">ERC-4337 smart wallet with advanced features:</p>
                  <code className="text-xs bg-black/50 p-2 rounded block">
                    Chain ID: 4242<br/>
                    RPC: http://localhost:9944<br/>
                    EntryPoint: 0x5FF137D4b0F...
                  </code>
                  <Link href="/smart-wallet-demo" className="text-xs text-cyan-400 hover:text-cyan-300 block mt-2">
                    View Demo →
                  </Link>
                </div>
                <div>
                  <h4 className="font-bold mb-2 text-purple-300">MetaMask (for LUX tokens)</h4>
                  <p className="text-sm text-gray-300 mb-2">Add Base network to view your LUX tokens:</p>
                  <code className="text-xs bg-black/50 p-2 rounded block">
                    Network: Base<br/>
                    RPC: https://mainnet.base.org<br/>
                    Chain ID: 8453
                  </code>
                  <p className="text-xs text-gray-400 mt-2">LUX tokens are wrapped on Base L2</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2 text-purple-300">Polkadot.js (for LUXBIN chain)</h4>
                  <p className="text-sm text-gray-300 mb-2">Connect to native LUXBIN blockchain:</p>
                  <code className="text-xs bg-black/50 p-2 rounded block">
                    RPC: ws://localhost:9944<br/>
                    Chain: LUXBIN
                  </code>
                  <a href="https://polkadot.js.org/extension/" target="_blank" className="text-xs text-purple-400 hover:text-purple-300 block mt-2">
                    Download Extension →
                  </a>
                </div>
                <div>
                  <h4 className="font-bold mb-2 text-purple-300">WalletConnect</h4>
                  <p className="text-sm text-gray-300 mb-2">Scan QR code with mobile wallet</p>
                  <p className="text-xs text-gray-400">Coming soon...</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Buy Section */}
        <section id="buy" className="relative px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Get LUX Tokens</h2>
              <p className="text-gray-400 text-lg">Choose your token - LUX (Quantum) featured, LUXBIN (Legacy) available</p>
            </div>

            {/* Dual Token Selector */}
            <TokenSelector />

            <div className="text-center mb-8 mt-12">
              <p className="text-gray-400 text-lg">Or use our integrated trading options:</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Coinbase Buy */}
              <CoinbaseOnramp />

              {/* Uniswap Swap */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4">💱 Swap on Uniswap</h3>
                <p className="text-gray-300 mb-6">Trade ETH for LUXBIN on Base L2 via decentralized exchange</p>
                <a
                  href="https://app.uniswap.org/#/swap?outputCurrency=0xbB5bf2139CbACDeE52991cf32f9c4d558B9464d0&chain=base"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mb-4"
                >
                  <div className="bg-gradient-to-br from-yellow-600/10 via-yellow-500/10 to-yellow-300/10 border border-yellow-500/30 rounded-xl p-6 hover:bg-yellow-500/20 transition-all shadow-lg shadow-yellow-500/10">
                    <div className="text-4xl mb-3">🦄</div>
                    <h4 className="font-bold mb-2 bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">Uniswap V3</h4>
                    <p className="text-sm text-gray-300">Best rates, deep liquidity</p>
                  </div>
                </a>
                <p className="text-xs text-gray-400 text-center">Non-custodial DEX trading</p>
              </div>

              {/* Direct Swap Component */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4">⚡ Quick Swap</h3>
                <p className="text-gray-300 mb-4">Swap directly on our platform</p>
                <LuxbinSwap />
              </div>
            </div>

            {/* Earn Tokens */}
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-center">🏗️ Earn LUX Tokens</h3>
              <p className="text-gray-300 mb-6 text-center">Build, validate, or contribute to earn LUX rewards</p>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                  <h4 className="font-bold text-green-300 mb-2">🎁 Developer Rewards</h4>
                  <p className="text-sm text-gray-300">Earn LUX tokens by contributing to the ecosystem</p>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                  <h4 className="font-bold text-blue-300 mb-2">🏃 Validator Program</h4>
                  <p className="text-sm text-gray-300">Run a validator node and earn block rewards</p>
                </div>

                <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl">
                  <h4 className="font-bold text-purple-300 mb-2">🪂 Airdrops</h4>
                  <p className="text-sm text-gray-300">Early adopters and developers receive token airdrops</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Deploy Section */}
        <section id="deploy" className="relative px-6 py-20 bg-gradient-to-b from-purple-900/10 to-transparent">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Deploy to LUXBIN Chain
              </h2>
              <p className="text-gray-400 text-lg">Create your own tokens and NFT collections with zero gas fees</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <TokenDeployer />
              <NFTDeployer />
            </div>

            <div className="mt-8 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-2xl p-6 text-center">
              <p className="text-cyan-200">
                <strong>💰 $1,250 in Coinbase Developer Credits</strong>
                <br />
                <span className="text-sm text-gray-300">All deployments are gasless and sponsored by Coinbase Paymaster</span>
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="relative px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Why NicheAI?</h2>
              <p className="text-gray-400 text-lg">Revolutionary AI and blockchain technology</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: "💸", title: "Zero Gas Fees", description: "Deploy unlimited smart contracts without paying a single cent in transaction fees. LUXBIN Chain is completely gasless." },
                { icon: "⚡", title: "Lightning Fast", description: "6-second block finality with Aura + GRANDPA consensus. Fast enough for real-time applications." },
                { icon: "🎯", title: "Coinbase Smart Wallet", description: "First Substrate chain with ERC-4337 account abstraction. Native support for Coinbase Smart Wallets with social recovery, batch ops, and gasless transactions." },
                { icon: "🔐", title: "Quantum Resistant", description: "Built with quantum cryptography and advanced security patterns to resist future quantum computing attacks." },
                { icon: "🌐", title: "Full Substrate SDK", description: "Build with Rust using the complete Polkadot SDK. Compatible with the entire Substrate ecosystem." },
                { icon: "🔗", title: "Interoperable", description: "Bridge to Ethereum, Base, and other chains. Wrapped LUX tokens available on Base network." },
                { icon: "🛡️", title: "Immune System", description: "Biological-inspired security framework with autonomous threat detection and response mechanisms." },
                { icon: "📦", title: "ERC-4337 Ready", description: "Full account abstraction support with EntryPoint contracts, bundlers, and paymasters for advanced smart wallet capabilities." }
              ].map((feature) => (
                <div key={feature.title} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/8 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1">
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Developer CTA */}
        <section className="relative px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-purple-600/20 via-yellow-600/20 to-yellow-400/20 border border-yellow-500/50 rounded-3xl p-12 text-center shadow-xl shadow-yellow-500/20">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-300 via-yellow-200 to-yellow-400 bg-clip-text text-transparent">Start Building Today</h2>
              <p className="text-xl text-gray-300 mb-8">
                Deploy your first smart contract in minutes. Zero setup, zero fees, infinite possibilities.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/developers" className="px-8 py-4 bg-gradient-to-r from-purple-600 via-yellow-600 to-yellow-500 rounded-xl text-white font-bold text-lg hover:shadow-lg hover:shadow-yellow-500/50 transition-all">
                  📖 View Documentation
                </Link>
                <a href="https://github.com/mermaidnicheboutique-code/luxbin-chain" target="_blank" className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-bold text-lg transition-all">
                  🚀 Clone on GitHub
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Featured On Section - For NextGen Tools TikTok Feature */}
        <FeaturedOnSection />

        <footer className="relative px-6 py-12 border-t border-white/10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="font-bold mb-4">Network</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#chain" className="hover:text-white">Chain Info</a></li>
                  <li><a href="https://polkadot.js.org/apps/?rpc=ws://127.0.0.1:9944" target="_blank" className="hover:text-white">Explorer</a></li>
                  <li><a href="#" className="hover:text-white">Network Status</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Developers</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="https://github.com/mermaidnicheboutique-code/luxbin-chain" target="_blank" className="hover:text-white">Documentation</a></li>
                  <li><a href="https://github.com/mermaidnicheboutique-code/luxbin-chain" target="_blank" className="hover:text-white">API Reference</a></li>
                  <li><a href="https://github.com/mermaidnicheboutique-code/luxbin-chain" target="_blank" className="hover:text-white">GitHub</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Community</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white">Discord</a></li>
                  <li><a href="#" className="hover:text-white">Twitter</a></li>
                  <li><a href="#" className="hover:text-white">Telegram</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Resources</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="https://github.com/mermaidnicheboutique-code/luxbin-chain/blob/main/luxbin-paper.pdf" target="_blank" className="hover:text-white">Whitepaper</a></li>
                  <li><Link href="/brand-kit" className="hover:text-white">Brand Kit</Link></li>
                  <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
            <div className="text-center text-gray-500 text-sm pt-8 border-t border-white/10">
              <p className="mb-2">
                NicheAI - Where Quantum AI Meets Blockchain Innovation
              </p>
              <p className="text-xs">
                Created by Nichole Christie • © 2025 NicheAI • Open Source
              </p>
              <p className="text-xs mt-2">
                Contact: <a href="mailto:Nicholechristie555@gmail.com" className="text-purple-400 hover:text-purple-300">Nicholechristie555@gmail.com</a>
              </p>
            </div>
          </div>
        </footer>
        </div>
      </div>

    </div>
  );
}

function FloatingParticles() {
  const [particles, setParticles] = useState<Array<{id: number; size: number; left: string; top: string; delay: number; duration: number}>>([]);

  useEffect(() => {
    const particleCount = 20;
    const newParticles = [];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        size: Math.random() * 100 + 50,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: Math.random() * 20,
        duration: Math.random() * 10 + 15
      });
    }

    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-screen overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-white/10 backdrop-blur-md animate-float"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: particle.left,
            top: particle.top,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`
          }}
        />
      ))}
    </div>
  );
}
