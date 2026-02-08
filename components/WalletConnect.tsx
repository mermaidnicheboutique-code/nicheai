"use client";

import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
  WalletDropdownLink,
} from "@coinbase/onchainkit/wallet";
import {
  Address,
  Avatar,
  Name,
  Identity,
} from "@coinbase/onchainkit/identity";

/**
 * Wallet Connect Button Component
 *
 * Uses OnchainKit for seamless wallet connection with Coinbase Smart Wallet.
 * No OAuth required - users can connect directly with their wallet.
 */
export function WalletConnect() {
  return (
    <Wallet>
      <ConnectWallet>
        <Avatar className="h-6 w-6" />
        <Name />
      </ConnectWallet>
      <WalletDropdown>
        <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
          <Avatar />
          <Name />
          <Address />
        </Identity>
        <WalletDropdownLink icon="wallet" href="https://wallet.coinbase.com">
          Go to Wallet
        </WalletDropdownLink>
        <WalletDropdownDisconnect />
      </WalletDropdown>
    </Wallet>
  );
}

/**
 * Simple Connect Button (minimal version)
 */
export function SimpleConnectButton() {
  return (
    <Wallet>
      <ConnectWallet />
    </Wallet>
  );
}
