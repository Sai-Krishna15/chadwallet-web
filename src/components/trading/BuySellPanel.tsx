"use client";

import { useState } from "react";

export function BuySellPanel({ symbol }: { symbol: string }) {
  const [mode, setMode] = useState<"buy" | "sell">("buy");

  return (
    <div className="bg-card border border-white/5 rounded-2xl p-6 flex flex-col h-full min-h-[400px]">
      <div className="flex bg-background/50 p-1 rounded-lg mb-6">
        <button
          onClick={() => setMode("buy")}
          className={`flex-1 py-2 font-bold text-sm rounded-md transition-colors ${
            mode === "buy" ? "bg-green-500/20 text-green-500" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => setMode("sell")}
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
            <span className="text-muted-foreground">Balance: 0.00</span>
          </div>
          <div className="flex items-center bg-background border border-white/10 rounded-lg p-3">
            <input 
              type="number" 
              placeholder="0.00" 
              className="bg-transparent border-none text-2xl font-bold w-full focus:outline-none focus:ring-0"
            />
            <span className="font-bold ml-2">{mode === "buy" ? "USDC" : symbol}</span>
          </div>
        </div>

        <div className="flex justify-center -my-2 z-10">
          <button className="bg-card border border-white/10 p-2 rounded-full hover:bg-white/5 transition-colors">
            ↓
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">You receive</span>
            <span className="text-muted-foreground">Balance: 0.00</span>
          </div>
          <div className="flex items-center bg-background border border-white/10 rounded-lg p-3 opacity-70">
            <input 
              type="number" 
              placeholder="0.00" 
              readOnly
              className="bg-transparent border-none text-2xl font-bold w-full focus:outline-none focus:ring-0 cursor-not-allowed"
            />
            <span className="font-bold ml-2">{mode === "buy" ? symbol : "USDC"}</span>
          </div>
        </div>
        
        <div className="mt-auto">
          <button className={`w-full py-4 rounded-xl font-bold text-lg transition-colors mt-6 ${
            mode === "buy" 
              ? "bg-green-500 hover:bg-green-600 text-black" 
              : "bg-red-500 hover:bg-red-600 text-black"
          }`}>
            {mode === "buy" ? "Place Buy Order" : "Place Sell Order"}
          </button>
          <p className="text-xs text-center text-muted-foreground mt-3">
            Swap integration coming in Phase 5
          </p>
        </div>
      </div>
    </div>
  );
}
