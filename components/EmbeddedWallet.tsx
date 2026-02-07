"use client";

import { SignIn, SignOutButton, FundModal, type FundModalProps } from "@coinbase/cdp-react";
import { useIsSignedIn, useEvmAddress, useSolanaAddress } from "@coinbase/cdp-hooks";
import { useCallback, useState, useEffect } from "react";
import { getBuyOptions, createBuyQuote } from "@/lib/onramp-api";

const LUX_TOKEN = "0xF4DA1F7fA3Df8e9F41E4c709AB2B7C716668b40b";
const LUX_SALE = "0xe517CAF14B483b3B25F4d0D7443A044D10445e3B";
const BASE_RPC = "https://mainnet.base.org";

export function EmbeddedWalletAuth() {
  const { isSignedIn } = useIsSignedIn();

  if (isSignedIn) {
    return <EmbeddedWalletDashboard />;
  }

  return (
    <div style={{ padding: "24px", maxWidth: "440px" }}>
      <SignIn authMethods={["email", "sms"]} />
      <p style={{ marginTop: "12px", fontSize: "12px", color: "#999", textAlign: "center" }}>
        A wallet will be created automatically when you sign in.
        No extensions or seed phrases needed.
      </p>
    </div>
  );
}

function EmbeddedWalletDashboard() {
  const { evmAddress } = useEvmAddress();
  const { solanaAddress } = useSolanaAddress();
  const [fundSuccess, setFundSuccess] = useState(false);
  const [luxBalance, setLuxBalance] = useState<string>("0");
  const [buyAmount, setBuyAmount] = useState("");
  const [buying, setBuying] = useState(false);
  const [buyResult, setBuyResult] = useState("");

  useEffect(() => {
    if (!evmAddress) return;
    fetch(`${BASE_RPC}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0", id: 1, method: "eth_call",
        params: [{ to: LUX_TOKEN, data: "0x70a08231000000000000000000000000" + evmAddress.slice(2) }, "latest"]
      })
    }).then(r => r.json()).then(d => {
      const bal = BigInt(d.result || "0x0");
      setLuxBalance((Number(bal) / 1e18).toLocaleString(undefined, { maximumFractionDigits: 2 }));
    }).catch(() => {});
  }, [evmAddress, buyResult]);

  const fetchBuyQuote: FundModalProps["fetchBuyQuote"] = useCallback(async (params) => {
    return createBuyQuote(params);
  }, []);

  const fetchBuyOptions: FundModalProps["fetchBuyOptions"] = useCallback(async (params) => {
    return getBuyOptions(params);
  }, []);

  return (
    <div style={{ padding: "24px", maxWidth: "480px", width: "100%" }}>
      <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>
        Your Embedded Wallet
      </h2>

      {evmAddress && (
        <div style={{ marginBottom: "16px" }}>
          <label style={{ fontSize: "12px", color: "#999", display: "block", marginBottom: "4px" }}>
            EVM Address (Base)
          </label>
          <code style={{
            display: "block",
            padding: "8px",
            background: "#111",
            borderRadius: "8px",
            fontSize: "13px",
            wordBreak: "break-all",
          }}>
            {evmAddress}
          </code>
        </div>
      )}

      {solanaAddress && (
        <div style={{ marginBottom: "16px" }}>
          <label style={{ fontSize: "12px", color: "#999", display: "block", marginBottom: "4px" }}>
            Solana Address
          </label>
          <code style={{
            display: "block",
            padding: "8px",
            background: "#111",
            borderRadius: "8px",
            fontSize: "13px",
            wordBreak: "break-all",
          }}>
            {solanaAddress}
          </code>
        </div>
      )}

      {/* Onramp - Buy Crypto */}
      <div style={{
        marginTop: "24px",
        padding: "20px",
        background: "linear-gradient(135deg, rgba(102, 126, 234, 0.15), rgba(118, 75, 162, 0.15))",
        border: "1px solid rgba(102, 126, 234, 0.3)",
        borderRadius: "12px",
      }}>
        <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "8px", color: "#667eea" }}>
          Buy Crypto (Onramp)
        </h3>
        <p style={{ fontSize: "13px", color: "#999", marginBottom: "16px" }}>
          Purchase crypto with your Coinbase account or debit card. Funds go directly to your embedded wallet.
        </p>

        {fundSuccess && (
          <div style={{
            padding: "8px 12px",
            background: "rgba(102, 126, 234, 0.15)",
            borderRadius: "8px",
            marginBottom: "12px",
            fontSize: "13px",
            color: "#667eea",
          }}>
            Purchase successful! Funds are on their way to your wallet.
          </div>
        )}

        <FundModal
          country="US"
          subdivision="CA"
          cryptoCurrency="eth"
          fiatCurrency="usd"
          fetchBuyQuote={fetchBuyQuote}
          fetchBuyOptions={fetchBuyOptions}
          network="base"
          presetAmountInputs={[10, 25, 50]}
          onSuccess={() => setFundSuccess(true)}
          destinationAddress={evmAddress as string}
        >
          <button style={{
            width: "100%",
            padding: "14px",
            borderRadius: "8px",
            background: "linear-gradient(90deg, #667eea, #764ba2)",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "15px",
          }}>
            Buy ETH on Base
          </button>
        </FundModal>
      </div>

      {/* Buy LUX Tokens */}
      <div style={{
        marginTop: "24px",
        padding: "20px",
        background: "linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(255, 140, 0, 0.15))",
        border: "1px solid rgba(255, 215, 0, 0.3)",
        borderRadius: "12px",
      }}>
        <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "8px", color: "#ffd700" }}>
          Buy LUX Tokens
        </h3>
        <p style={{ fontSize: "13px", color: "#999", marginBottom: "12px" }}>
          LUXBIN Quantum Token on Base. Rate: 100,000 LUX per ETH.
        </p>

        <div style={{ padding: "8px 12px", background: "rgba(255,215,0,0.1)", borderRadius: "8px", marginBottom: "12px", fontSize: "13px" }}>
          Your LUX Balance: <strong style={{ color: "#ffd700" }}>{luxBalance} LUX</strong>
        </div>

        {buyResult && (
          <div style={{ padding: "8px 12px", background: "rgba(255,215,0,0.15)", borderRadius: "8px", marginBottom: "12px", fontSize: "13px", color: "#ffd700" }}>
            {buyResult}
          </div>
        )}

        <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
          {["0.001", "0.005", "0.01"].map(amt => (
            <button key={amt} onClick={() => setBuyAmount(amt)} style={{
              flex: 1, padding: "8px", borderRadius: "6px", fontSize: "12px", cursor: "pointer",
              background: buyAmount === amt ? "rgba(255,215,0,0.3)" : "rgba(255,255,255,0.05)",
              border: buyAmount === amt ? "1px solid #ffd700" : "1px solid rgba(255,255,255,0.1)",
              color: "#fff",
            }}>
              {amt} ETH<br/><span style={{ fontSize: "10px", color: "#999" }}>{(parseFloat(amt) * 100000).toLocaleString()} LUX</span>
            </button>
          ))}
        </div>

        <a
          href={`https://basescan.org/address/${LUX_SALE}#writeContract#F1`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "block", width: "100%", padding: "14px", borderRadius: "8px",
            background: "linear-gradient(90deg, #ffd700, #ff8c00)", color: "#000",
            border: "none", cursor: "pointer", fontWeight: "600", fontSize: "15px",
            textAlign: "center", textDecoration: "none",
          }}
        >
          Buy LUX on BaseScan
        </a>

        <p style={{ fontSize: "11px", color: "#666", marginTop: "8px", textAlign: "center" }}>
          Contract: <a href={`https://basescan.org/token/${LUX_TOKEN}`} target="_blank" rel="noopener noreferrer" style={{ color: "#ffd700" }}>{LUX_TOKEN.slice(0, 10)}...{LUX_TOKEN.slice(-8)}</a>
        </p>
      </div>

      <div style={{ marginTop: "24px" }}>
        <SignOutButton
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            background: "transparent",
            color: "#ff4444",
            border: "1px solid #ff4444",
            cursor: "pointer",
            marginTop: "8px",
          }}
        >
          Sign Out
        </SignOutButton>
      </div>
    </div>
  );
}
