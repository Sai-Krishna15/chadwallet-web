"use client";

import { useState, useEffect } from "react";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { rpcClient } from "@/lib/rpc/client";
import { formatCompactNumber, formatPrice } from "@/lib/utils";

export function UserPosition({ symbol, address, price = 0 }: { symbol: string, address?: string, price?: number }) {
  const { authenticated } = usePrivy();
  const { wallets } = useWallets();
  // @ts-expect-error - chainType exists on solana wallets but might not be in the exact types version
  const solanaWallet = wallets.find(w => w.walletClientType === 'privy' || w.chainType === 'solana');
  
  const [tokenBalance, setTokenBalance] = useState(0);

  useEffect(() => {
    if (authenticated && solanaWallet && address) {
      rpcClient.getTokenBalances(solanaWallet.address).then(bals => {
        const tb = bals.find(b => b.mint === address);
        setTokenBalance(tb ? tb.uiAmount : 0);
      });
    }
  }, [authenticated, solanaWallet, address]);

  if (!authenticated) {
    return (
      <div className="bg-card border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
        <h3 className="font-bold mb-2">Your Position</h3>
        <p className="text-sm text-muted-foreground">Log in to view your {symbol} balance.</p>
      </div>
    );
  }

  const valueUSD = tokenBalance * price;

  return (
    <div className="bg-card border border-white/5 rounded-2xl p-6">
      <h3 className="font-bold mb-4">Your Position</h3>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center py-2 border-b border-white/5">
          <span className="text-muted-foreground text-sm">Amount</span>
          <span className="font-medium">{formatCompactNumber(tokenBalance)} {symbol}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-white/5">
          <span className="text-muted-foreground text-sm">Value (USD)</span>
          <span className="font-medium">{formatPrice(valueUSD)}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-white/5">
          <span className="text-muted-foreground text-sm">Avg Entry Price</span>
          <span className="font-medium">--</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-muted-foreground text-sm">Total PnL</span>
          <span className="font-medium">--</span>
        </div>
      </div>
    </div>
  );
}
