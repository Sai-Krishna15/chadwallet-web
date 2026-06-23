"use client";

import { useState, useEffect } from "react";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { rpcClient } from "@/lib/rpc/client";
import { jupiterClient, JupiterQuoteResponse } from "@/lib/jupiter/client";
import { formatCompactNumber } from "@/lib/utils";
import { toast } from "sonner";

export function BuySellPanel({ symbol, address, decimals = 6, price }: { symbol: string, address?: string, decimals?: number, price?: number }) {
  const [mode, setMode] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState<string>("");
  const [quote, setQuote] = useState<JupiterQuoteResponse | null>(null);
  const [quoteError, setQuoteError] = useState<string | null>(null);
  const [loadingQuote, setLoadingQuote] = useState(false);

  const { authenticated } = usePrivy();
  const { wallets } = useWallets();
  // @ts-expect-error - chainType exists on solana wallets but might not be in the exact types version
  const solanaWallet = wallets.find(w => w.walletClientType === 'privy' || w.chainType === 'solana');

  const [solBalance, setSolBalance] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);

  useEffect(() => {
    if (authenticated && solanaWallet) {
      rpcClient.getSolBalance(solanaWallet.address).then(setSolBalance);
      if (address) {
        rpcClient.getTokenBalances(solanaWallet.address).then(bals => {
          const tb = bals.find(b => b.mint === address);
          setTokenBalance(tb ? tb.uiAmount : 0);
        });
      }
    }
  }, [authenticated, solanaWallet, address]);

  useEffect(() => {
    const fetchQuote = async () => {
      if (!amount || isNaN(Number(amount)) || Number(amount) <= 0 || !address) {
        setQuote(null);
        setQuoteError(null);
        return;
      }
      setLoadingQuote(true);
      try {
        // Buy: Input SOL, Output Token
        // Sell: Input Token, Output SOL
        // Note: Using USDC for buy/sell standard here for simplicity, or SOL. Let's use SOL.
        const inputMint = mode === "buy" ? jupiterClient.USDC_MINT : address;
        const outputMint = mode === "buy" ? address : jupiterClient.USDC_MINT;
        const inputDecimals = mode === "buy" ? 6 : decimals; // USDC is 6 decimals

        const q = await jupiterClient.getQuote(inputMint, outputMint, Number(amount), inputDecimals);
        if (!q) throw new Error("No quote returned");
        setQuote(q);
        setQuoteError(null);
      } catch {
        setQuote(null);
        setQuoteError("No route found or low liquidity");
      } finally {
        setLoadingQuote(false);
      }
    };

    const timer = setTimeout(fetchQuote, 500); // debounce
    return () => clearTimeout(timer);
  }, [amount, mode, address, decimals]);

  const outDecimals = mode === "buy" ? decimals : 6;
  const fallbackOutput = mode === "buy"
    ? (Number(amount) / (price || 1)).toFixed(4)
    : (Number(amount) * (price || 0)).toFixed(4);

  const estimatedOutput = quote
    ? (Number(quote.outAmount) / Math.pow(10, outDecimals)).toFixed(4)
    : (price && amount && !isNaN(Number(amount)) && Number(amount) > 0) ? fallbackOutput : "0.00";

  const handlePlaceOrder = () => {
    // In Phase 5, Jupiter quoting works. Actual transaction signing is mocked since we are using Privy embedded wallets which require careful UI prompts.
    toast.success(`${mode === 'buy' ? 'Buy' : 'Sell'} order placed for ${amount} ${mode === 'buy' ? 'USDC' : symbol}`);
    setAmount("");
  };

  return (
    <div className="bg-card border border-white/5 rounded-2xl p-6 flex flex-col h-full min-h-[400px]">
      <div className="flex bg-background/50 p-1 rounded-lg mb-6">
        <button
          onClick={() => { setMode("buy"); setAmount(""); }}
          className={`flex-1 py-2 font-bold text-sm rounded-md transition-colors ${
            mode === "buy" ? "bg-green-500/20 text-green-500" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => { setMode("sell"); setAmount(""); }}
          className={`flex-1 py-2 font-bold text-sm rounded-md transition-colors ${
            mode === "sell" ? "bg-red-500/20 text-red-500" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Sell
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">You pay</span>
            <span className="text-muted-foreground">
              Balance: {mode === "buy" ? formatCompactNumber(solBalance) : formatCompactNumber(tokenBalance)}
            </span>
          </div>
          <div className="flex items-center bg-background border border-white/10 rounded-lg p-3">
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-transparent border-none text-2xl font-bold w-full focus:outline-none focus:ring-0"
            />
            <span className="font-bold ml-2">{mode === "buy" ? "USDC" : symbol}</span>
          </div>
        </div>

        <div className="flex justify-center -my-2 z-10">
          <button
            className="bg-card border border-white/10 p-2 rounded-full hover:bg-white/5 transition-colors"
            onClick={() => { setMode(mode === "buy" ? "sell" : "buy"); setAmount(""); }}
          >
            ↓
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">You receive</span>
            <span className="text-muted-foreground">
              Balance: {mode === "buy" ? formatCompactNumber(tokenBalance) : formatCompactNumber(solBalance)}
            </span>
          </div>
          <div className={`flex items-center bg-background border ${quoteError ? 'border-red-500/50' : 'border-white/10'} rounded-lg p-3 opacity-70`}>
            <input
              type="text"
              placeholder="0.00"
              value={loadingQuote ? "..." : estimatedOutput}
              readOnly
              className="bg-transparent border-none text-2xl font-bold w-full focus:outline-none focus:ring-0 cursor-not-allowed"
            />
            <span className="font-bold ml-2">{mode === "buy" ? symbol : "USDC"}</span>
          </div>
        </div>

        {quoteError && amount && !loadingQuote && (
          <div className="text-xs text-red-400 mt-1">
            {quoteError}. Showing estimated value.
          </div>
        )}

        {quote && (
          <div className="text-xs flex justify-between text-muted-foreground mt-2">
            <span>Price Impact</span>
            <span className={Number(quote.priceImpactPct) > 1 ? "text-red-500" : "text-green-500"}>
              {quote.priceImpactPct}%
            </span>
          </div>
        )}

        <div className="mt-auto">
          {!authenticated ? (
            <button className="w-full py-4 rounded-xl font-bold text-lg transition-colors mt-6 bg-primary text-primary-foreground hover:opacity-90">
              Log in to Trade
            </button>
          ) : (
            <button 
              onClick={handlePlaceOrder}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-colors mt-6 ${
              mode === "buy" 
                ? "bg-green-500 hover:bg-green-600 text-black" 
                : "bg-red-500 hover:bg-red-600 text-black"
            }`} disabled={!quote && !price}>
              {mode === "buy" ? "Place Buy Order" : "Place Sell Order"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
