import { BirdeyeToken } from "@/lib/birdeye/types";
import { formatPrice, formatPercent, formatCompactNumber } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export function TokenOverview({ token }: { token?: BirdeyeToken }) {
  if (!token) {
    return (
      <div className="bg-card border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Skeleton className="w-16 h-16 rounded-full" />
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-6 w-32" />
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-16" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-12">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-5 w-24" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const change = token.price24hChangePercent || token.v24hChangePercent || 0;
  const isPositive = change >= 0;

  return (
    <div className="bg-card border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        {token.logoURI ? (
          <img src={token.logoURI} alt={token.symbol} className="w-16 h-16 rounded-full object-cover bg-white/10" />
        ) : (
          <div className="w-16 h-16 rounded-full bg-white/10" />
        )}
        <div>
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              {token.symbol}
              <span className="text-sm font-normal text-muted-foreground bg-white/5 px-2 py-1 rounded-md">{token.name}</span>
            </h1>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-2xl font-medium">{formatPrice(token.price)}</span>
            <span className={`text-sm font-medium px-2 py-1 rounded-md ${isPositive ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}>
              {formatPercent(change)}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-12">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground mb-1">Market Cap</span>
          <span suppressHydrationWarning className="font-medium">{formatCompactNumber(token.marketcap || token.mc || 0)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground mb-1">24h Volume</span>
          <span suppressHydrationWarning className="font-medium">{formatCompactNumber(token.volume24hUSD || token.v24hUSD || 0)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground mb-1">Liquidity</span>
          <span suppressHydrationWarning className="font-medium">{formatCompactNumber(token.liquidity || 0)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground mb-1">Rank</span>
          <span className="font-medium">#{token.rank || '--'}</span>
        </div>
      </div>
    </div>
  );
}
