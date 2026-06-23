"use client";

import { useEffect, useState } from "react";
import { formatCompactNumber } from "@/lib/utils";
import {  } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Trade {
  txHash: string;
  side: "buy" | "sell";
  base: { uiAmount: number };
  quote: { uiAmount: number; symbol: string };
  blockUnixTime: number;
}

export function RecentTrades({ address }: { address?: string }) {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!address) return;
    setLoading(true);
    fetch(`/api/birdeye/trades?address=${address}&limit=20`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data?.items) {
          setTrades(data.data.items);
        }
      })
      .catch((err) => console.log("Failed to load trades", err))
      .finally(() => setLoading(false));
  }, [address]);

  return (
    <div className="bg-card border border-white/5 rounded-2xl p-6 w-full flex flex-col max-h-[400px] ">
      <h3 className="font-bold mb-4 shrink-0">Recent Trades</h3>

      {!address ? (
        <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
          No token selected.
        </div>
      ) : loading ? (
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
              <div className="flex items-center gap-3">
                <Skeleton className="w-2 h-2 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-3 w-12" />
              </div>
            </div>
          ))}
        </div>
      ) : trades.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
          No recent trades found.
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto no-scrollbar space-y-2">
          {trades.map((trade, i) => {
            const isBuy = trade.side === "buy";
            const date = new Date(trade.blockUnixTime * 1000);
            const timeString = date.toLocaleTimeString(undefined, { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });

            return (
              <div
                key={`${trade.txHash}-${i}`}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${isBuy ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]'}`} />
                  <div>
                    <div className={`font-bold text-sm ${isBuy ? 'text-green-500' : 'text-red-500'}`}>
                      {isBuy ? 'Buy' : 'Sell'} <span className="text-muted-foreground font-normal ml-1">at {timeString}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {formatCompactNumber(trade.base.uiAmount)} Tokens
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm">
                    {formatCompactNumber(trade.quote.uiAmount)} <span className="text-muted-foreground font-normal">{trade.quote.symbol}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
