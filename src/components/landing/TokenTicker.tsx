"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const mockTokens = [
  { symbol: "SOL", price: "$145.20", change: "+5.2%" },
  { symbol: "JUP", price: "$0.95", change: "+12.1%" },
  { symbol: "BONK", price: "$0.000021", change: "-2.4%" },
  { symbol: "WIF", price: "$2.45", change: "+15.8%" },
  { symbol: "CHAD", price: "$0.042", change: "+420.0%" },
  { symbol: "POPCAT", price: "$0.85", change: "+1.2%" },
];

export function TokenTicker({ direction = "left" }: { direction?: "left" | "right" }) {
  const tokens = [...mockTokens, ...mockTokens, ...mockTokens, ...mockTokens]; // Duplicate for smooth infinite scroll

  return (
    <div className="w-full overflow-hidden bg-black/40 border-y border-white/5 py-3 flex">
      <motion.div
        className="flex gap-12 px-6"
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
      >
        {tokens.map((token, i) => (
          <Link key={i} href={`/trade/${token.symbol}`} className="flex items-center gap-3 text-sm font-medium hover:opacity-80 transition-opacity cursor-pointer">
            <span className="text-muted-foreground/80">{token.symbol}</span>
            <span className="text-foreground/90">{token.price}</span>
            <span className={token.change.startsWith("+") ? "text-green-500" : "text-red-500"}>
              {token.change}
            </span>
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
