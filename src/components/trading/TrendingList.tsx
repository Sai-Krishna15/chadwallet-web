"use client";

import { useState } from "react";
import Link from "next/link";
import { BirdeyeToken } from "@/lib/birdeye/types";
import { formatPrice, formatPercent } from "@/lib/utils";
import { Search } from "lucide-react";

export function TrendingList({
  trending,
  gainers,
  losers
}: {
  trending: BirdeyeToken[];
  gainers: BirdeyeToken[];
  losers: BirdeyeToken[];
}) {
  const [tab, setTab] = useState<"trending" | "gainers" | "losers">("trending");
  const [searchQuery, setSearchQuery] = useState("");

  type DisplayToken = Partial<BirdeyeToken> & { symbol: string, address: string, price: number, price24hChangePercent: number };

  const getList = (): DisplayToken[] => {
    switch (tab) {
      case "gainers": return gainers as DisplayToken[];
      case "losers": return losers as DisplayToken[];
      default: return trending as DisplayToken[];
    }
  };

  const rawList = getList();
  const list = rawList.filter(token =>
    (token.symbol || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (token.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (token.address || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-card border border-white/5 rounded-2xl p-4 flex flex-col h-full min-h-[600px]">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search tokens..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-background border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      <div className="flex gap-2 mb-4 bg-background/50 p-1 rounded-lg overflow-x-auto no-scrollbar">
        {(["trending", "gainers", "losers"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`shrink-0 min-w-[60px] px-3 text-xs font-medium py-1.5 rounded-md capitalize transition-colors ${
              tab === t ? "bg-white/10 text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-2 overflow-y-auto no-scrollbar">
        {list.length === 0 ? (
          <div className="text-center text-muted-foreground text-sm py-10">No tokens found</div>
        ) : (
          list.map((token: DisplayToken, i) => {
            const change = token.price24hChangePercent || token.v24hChangePercent || 0;
            return (
              <Link
                key={`${token.address}-${i}`}
                href={`/trade/${encodeURIComponent(token.symbol as string)}`}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {token.logoURI ? (
                    <img src={token.logoURI} alt={token.symbol} className="w-8 h-8 rounded-full object-cover bg-white/10" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-white/10" />
                  )}
                  <div className="flex flex-col">
                    <span className="font-bold text-sm">{token.symbol !== "Token" ? token.symbol : token.address.substring(0, 6)}</span>
                    {token.name && <span className="text-xs text-muted-foreground max-w-[80px] truncate">{token.name}</span>}
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm font-medium">{formatPrice(token.price)}</span>
                  <span className={`text-xs ${change >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {formatPercent(change)}
                  </span>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
