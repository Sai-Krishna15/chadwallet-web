"use client";

import { useEffect, useState } from "react";
import { formatCompactNumber, formatPercent } from "@/lib/utils";

interface Holder {
  owner: string;
  ui_amount: number;
}

export function HoldersList({ address }: { address?: string }) {
  const [holders, setHolders] = useState<Holder[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!address) return;
    setLoading(true);
    fetch(`/api/birdeye/holders?address=${address}&limit=20`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data?.items) {
          setHolders(data.data.items);
        }
      })
      .catch((err) => console.log("Failed to load holders", err))
      .finally(() => setLoading(false));
  }, [address]);

  // Calculate total amount for percentage (approximation based on top holders)
  const totalAmount = holders.reduce((acc, h) => acc + h.ui_amount, 0);

  return (
    <div className="bg-card border border-white/5 rounded-2xl p-6 w-full flex flex-col max-h-[400px]">
      <h3 className="font-bold mb-4 shrink-0">Top Holders</h3>

      {!address ? (
        <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
          No token selected.
        </div>
      ) : loading ? (
        <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
          Loading holders...
        </div>
      ) : holders.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
          No holder data found.
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto no-scrollbar space-y-2">
          {holders.map((holder, i) => {
            const percentage = totalAmount > 0 ? (holder.ui_amount / totalAmount) * 100 : 0;

            return (
              <div key={`${holder.owner}-${i}`} className="flex flex-col gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-muted-foreground w-5">#{i + 1}</span>
                    <a
                      href={`https://solscan.io/account/${holder.owner}`}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-sm hover:text-primary transition-colors flex items-center gap-1"
                    >
                      {holder.owner.substring(0, 6)}...{holder.owner.substring(holder.owner.length - 4)}
                    </a>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm">{formatPercent(percentage)}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{formatCompactNumber(holder.ui_amount)} Tokens</div>
                  </div>
                </div>

                {/* Visual Progress Bar */}
                <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full"
                    style={{ width: `${Math.min(100, Math.max(1, percentage))}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
