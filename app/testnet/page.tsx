"use client";

import { useState } from "react";
import Link from "next/link";
import { useSwitchChain, useAccount, useBalance, useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";

export default function TestnetPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [txTo, setTxTo] = useState("");
  const [txAmount, setTxAmount] = useState("");
  const { switchChain } = useSwitchChain();
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  const { sendTransaction, data: txHash, isPending } = useSendTransaction();
  const { isSuccess } = useWaitForTransactionReceipt({ hash: txHash });

  const handleStartTestnet = () => {
    setIsRunning(true);
    // In a real implementation, this would trigger the op-up command
    alert("To start the testnet, run these commands in your terminal:\n\ncurl https://raw.githubusercontent.com/ethereum-optimism/optimism/develop/op-up/install.sh | sh\nsource ~/.bashrc\nop-up");
  };

  const handleConnectNetwork = () => {
    switchChain({ chainId: 901 });
  };

  const handleSendTransaction = () => {
    if (!txTo || !txAmount) return;
    sendTransaction({
      to: txTo as `0x${string}`,
      value: parseEther(txAmount),
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-x-hidden">
      <div className="fixed top-0 left-0 w-full h-screen bg-gradient-to-b from-[#667eea]/20 via-[#764ba2]/20 to-[#0a0a0f]/40 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8">
          ← Back to NicheAI
        </Link>

        <div className="text-center mb-12">
          <img
            src="/niche-network-logo.jpg"
            alt="Niche Network Logo"
            className="w-32 h-32 mx-auto mb-6 rounded-full border-4 border-purple-400 shadow-lg"
          />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Niche Network
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Run your own Niche Network (powered by Optimism) locally for development and testing
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">Installation</h2>
            <div className="bg-black/60 rounded-lg p-4 font-mono text-sm mb-4">
              <div>curl https://raw.githubusercontent.com/ethereum-optimism/optimism/develop/op-up/install.sh | sh</div>
              <div className="mt-2">source ~/.bashrc  # or ~/.zshrc on macOS</div>
            </div>
            <p className="text-gray-400">Install the op-up tool to manage your local testnet</p>
          </div>

          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-green-400">Start Testnet</h2>
            <div className="bg-black/60 rounded-lg p-4 font-mono text-sm mb-4">
              <div>op-up</div>
            </div>
            <button
              onClick={handleStartTestnet}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 px-6 py-3 rounded-lg font-semibold transition-all mb-2"
            >
              {isRunning ? "Testnet Running" : "Start Testnet"}
            </button>
            <button
              onClick={handleConnectNetwork}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-6 py-2 rounded-lg font-semibold transition-all text-sm"
            >
              Connect to Niche Network in Wallet
            </button>
          </div>
        </div>

        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-purple-400">Testnet Details</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Test Account</h3>
              <div className="bg-black/60 rounded-lg p-3 font-mono text-sm break-all">
                Address: 0x5D284fe6D6AEb73857960a0D041CF394b1198392<br/>
                Private Key: 0xd9fb56b9574ed61ab0478a607166eeb3a80b1b91ab1bf00f45932105d07b5e11
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Network</h3>
              <div className="bg-black/60 rounded-lg p-3 font-mono text-sm">
                RPC URL: http://localhost:8545<br/>
                Chain ID: 420 (Niche Network)<br/>
                Currency: ETH
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-400 mb-4">
            The testnet will start producing blocks automatically. Connect your wallet or dApp to <code className="bg-black/40 px-2 py-1 rounded">http://localhost:8545</code>
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="https://docs.optimism.io/builders/tools/op-up/"
              target="_blank"
              className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Optimism Docs
            </Link>
            <Link
              href="https://github.com/ethereum-optimism/optimism"
              target="_blank"
              className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              GitHub Repo
            </Link>
          </div>
        </div>

        {/* Wallet Features Section */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-green-400">Wallet Features</h2>

          {isConnected ? (
            <div className="space-y-4">
              <div className="bg-black/60 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Account</h3>
                <p className="text-sm break-all">{address}</p>
                <p className="text-sm mt-2">
                  Balance: {balance ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}` : "Loading..."}
                </p>
              </div>

              <div className="bg-black/60 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Send Transaction</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Recipient Address (0x...)"
                    value={txTo}
                    onChange={(e) => setTxTo(e.target.value)}
                    className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400"
                  />
                  <input
                    type="number"
                    placeholder="Amount (ETH)"
                    value={txAmount}
                    onChange={(e) => setTxAmount(e.target.value)}
                    step="0.0001"
                    className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400"
                  />
                  <button
                    onClick={handleSendTransaction}
                    disabled={isPending || !txTo || !txAmount}
                    className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 px-6 py-2 rounded-lg font-semibold transition-all"
                  >
                    {isPending ? "Sending..." : "Send Transaction"}
                  </button>
                </div>
                {txHash && (
                  <p className="text-sm mt-2">
                    Transaction: <a href={`https://sepolia-optimism.etherscan.io/tx/${txHash}`} target="_blank" className="text-blue-400 hover:text-blue-300">{txHash.slice(0, 10)}...</a>
                  </p>
                )}
                {isSuccess && <p className="text-green-400 text-sm mt-2">Transaction successful! 🎉</p>}
              </div>
            </div>
          ) : (
            <p className="text-gray-400">Connect your wallet to access advanced features</p>
          )}
        </div>
      </div>
    </div>
  );
}