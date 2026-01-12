"use client";

import { useState } from "react";
import { LUXBIN_TOKENS, TokenInfo } from "@/lib/tokenConfig";

interface TokenSelectorProps {
  onTokenChange?: (token: TokenInfo) => void;
}

export function TokenSelector({ onTokenChange }: TokenSelectorProps) {
  const [selectedToken, setSelectedToken] = useState<keyof typeof LUXBIN_TOKENS>('quantum');

  const handleTokenChange = (tokenKey: keyof typeof LUXBIN_TOKENS) => {
    setSelectedToken(tokenKey);
    if (onTokenChange) {
      onTokenChange(LUXBIN_TOKENS[tokenKey]);
    }
  };

  const currentToken = LUXBIN_TOKENS[selectedToken];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="mb-8">
      {/* Token Tabs */}
      <div className="flex gap-4 mb-6 justify-center flex-wrap">
        <button
          onClick={() => handleTokenChange('quantum')}
          className={`px-6 py-3 rounded-xl font-semibold transition-all ${
            selectedToken === 'quantum'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
              : 'bg-white/5 text-gray-400 hover:bg-white/10'
          }`}
        >
          ⚛️ LUX (Quantum)
          <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
            NEW
          </span>
        </button>
        <button
          onClick={() => handleTokenChange('legacy')}
          className={`px-6 py-3 rounded-xl font-semibold transition-all ${
            selectedToken === 'legacy'
              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/50'
              : 'bg-white/5 text-gray-400 hover:bg-white/10'
          }`}
        >
          💎 LUXBIN (Legacy)
        </button>
      </div>

      {/* Token Info Card */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold mb-2">{currentToken.name}</h3>
            <p className="text-gray-400 text-sm">{currentToken.description}</p>
          </div>
          <span className="text-3xl font-mono bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            ${currentToken.symbol}
          </span>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {currentToken.features.map((feature, i) => (
            <div key={i} className="flex items-start gap-2 text-sm">
              <span className="text-green-400 mt-0.5">✓</span>
              <span className="text-gray-300">{feature}</span>
            </div>
          ))}
        </div>

        {/* Contract Address */}
        <div className="mb-4 p-3 bg-black/20 rounded-lg">
          <div className="flex justify-between items-center mb-1">
            <div className="text-xs text-gray-400">Contract Address ({currentToken.network}):</div>
            <button
              onClick={() => copyToClipboard(currentToken.address)}
              className="text-xs text-purple-400 hover:text-purple-300"
            >
              Copy
            </button>
          </div>
          <div className="font-mono text-xs md:text-sm text-gray-300 break-all mb-2">
            {currentToken.address}
          </div>
          <a
            href={currentToken.basescanUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-purple-400 hover:text-purple-300 inline-block"
          >
            View on BaseScan →
          </a>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap">
          <a
            href={currentToken.uniswapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-[200px] bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-semibold text-center transition-all shadow-lg"
          >
            🦄 Trade on Uniswap
          </a>
          <button
            onClick={() => copyToClipboard(currentToken.address)}
            className="flex-1 min-w-[200px] bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-all"
          >
            📋 Copy Contract Address
          </button>
        </div>
      </div>
    </div>
  );
}
