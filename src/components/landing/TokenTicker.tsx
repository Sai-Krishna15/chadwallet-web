"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { BirdeyeToken } from "@/lib/birdeye/types";
import { formatPrice, formatPercent } from "@/lib/utils";

export function TokenTicker({
  direction = "left",
  tokens = []
}: {
  direction?: "left" | "right",
  tokens?: BirdeyeToken[]
}) {
  if (!tokens || tokens.length === 0) return null;


  // Duplicate for smooth infinite scroll
  const displayTokens = [...tokens, ...tokens, ...tokens, ...tokens];

  return (
    <div className="w-full overflow-hidden bg-black/40 border-y border-white/5 py-3 flex">
      <motion.div
        className="flex gap-12 px-6"
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
      >
        {displayTokens.map((token, i) => {
          const change = token.price24hChangePercent || token.v24hChangePercent || 0;
          return (
            <Link key={`${token.address}-${i}`} href={`/trade/${token.symbol}`} className="flex items-center gap-3 text-sm font-medium hover:opacity-80 transition-opacity cursor-pointer whitespace-nowrap">
              {token.logoURI ? (
                <img src={token.logoURI} alt={token.symbol} className="w-5 h-5 rounded-full object-cover bg-white/10" />
              ) : (
                <div className="w-5 h-5 rounded-full bg-white/10" />
              )}
              <span className="text-muted-foreground/80">{token.symbol}</span>
              <span className="text-foreground/90">{formatPrice(token.price)}</span>
              <span className={change >= 0 ? "text-green-500" : "text-red-500"}>
                {formatPercent(change)}
              </span>
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
}
