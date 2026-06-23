"use client";

import { useEffect, useState } from "react";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { Navbar } from "@/components/landing/Navbar";
import { rpcClient } from "@/lib/rpc/client";
import { formatCompactNumber } from "@/lib/utils";
import { Copy, Wallet, Mail, LogOut, Activity, Star } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function ProfilePage() {
  const { user, authenticated, ready, logout } = usePrivy();
  const { wallets } = useWallets();
  console.log("ProfilePage wallets:", wallets);
  // @ts-expect-error - chainType exists in newer Privy versions but might not be typed locally
  const solanaWallet = wallets.find(w => w.walletClientType === 'privy' || w.chainType === 'solana');

  const [solBalance, setSolBalance] = useState<number | null>(null);
  const [tokenBalances, setTokenBalances] = useState<{ mint: string; uiAmount: number }[]>([]);

  useEffect(() => {
    if (authenticated && solanaWallet) {
      rpcClient.getSolBalance(solanaWallet.address).then(setSolBalance);
      rpcClient.getTokenBalances(solanaWallet.address).then(setTokenBalances);
    }
  }, [authenticated, solanaWallet, user]);

  if (!ready) return <div className="min-h-screen bg-background"><Navbar /><div className="pt-24 text-center">Loading...</div></div>;

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 px-6 max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Profile</h1>
          <p className="text-muted-foreground mb-8">Please connect your wallet to view your profile.</p>
        </div>
      </div>
    );
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const email = user?.email?.address || user?.google?.email || user?.apple?.email || "Not connected";
  const address = solanaWallet?.address || "No Solana wallet found";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 px-6 max-w-4xl mx-auto w-full pb-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
          <p className="text-muted-foreground mt-2">Manage your ChadWallet account and view your balances.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column: User Details */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-card border border-white/5 rounded-2xl p-6">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-4 border border-primary/50">
                <span className="text-2xl font-bold text-primary">
                  {email !== "Not connected" ? email.charAt(0).toUpperCase() : "C"}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground uppercase font-bold flex items-center gap-1 mb-1">
                    <Mail className="w-3 h-3" /> Email Account
                  </label>
                  <div className="font-medium text-sm truncate">{email}</div>
                </div>

                <div>
                  <label className="text-xs text-muted-foreground uppercase font-bold flex items-center gap-1 mb-1">
                    <Wallet className="w-3 h-3" /> Solana Address
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="font-medium text-sm truncate">{address.substring(0, 12)}...{address.substring(address.length - 4)}</div>
                    {solanaWallet && (
                      <button onClick={() => copyToClipboard(address)} className="text-muted-foreground hover:text-white transition-colors">
                        <Copy className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <button
                  onClick={logout}
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors font-medium text-sm"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Wallet Balances */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-card border border-white/5 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" /> Wallet Balances
              </h2>

              <div className="space-y-4">
                {/* SOL Balance */}
                <div className="flex items-center justify-between p-4 bg-background/50 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                      <img src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png" className="w-6 h-6 rounded-full" alt="SOL" />
                    </div>
                    <div>
                      <div className="font-bold">Solana</div>
                      <div className="text-xs text-muted-foreground">SOL</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{solBalance !== null ? formatCompactNumber(solBalance) : "..."}</div>
                  </div>
                </div>

                {/* Token Balances */}
                {tokenBalances.length > 0 ? (
                  tokenBalances.map((token, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-background/50 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                          <Wallet className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="font-bold">{token.mint.substring(0, 8)}...</div>
                          <div className="text-xs text-muted-foreground">Token</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{formatCompactNumber(token.uiAmount)}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No other tokens found in your wallet.
                  </div>
                )}
              </div>

              <div className="mt-6 text-center">
                <Link href="/">
                  <button className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-opacity">
                    Start Trading
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
