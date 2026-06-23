"use client";

export function TradingChart({ symbol, address }: { symbol: string, address?: string }) {
  // DexScreener uses TradingView internally and supports all Solana meme coins
  // We fallback to standard TradingView SOLUSD if we don't have an address
  const isDex = !!address;

  return (
    <div className="bg-card border border-white/5 rounded-2xl overflow-hidden h-[500px] lg:h-[600px] w-full relative">
      {isDex ? (
        <iframe 
          src={`https://dexscreener.com/solana/${address}?embed=1&theme=dark&trades=0&info=0`}
          className="absolute inset-0 w-full h-full border-none"
          title={`${symbol} Chart`}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
          <p>Chart unavailable for {symbol}. Try another token.</p>
        </div>
      )}
    </div>
  );
}
