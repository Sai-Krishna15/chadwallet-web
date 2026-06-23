import { birdeyeServer } from "@/lib/birdeye/client";
import { Navbar } from "@/components/landing/Navbar";
import { TradingLayout } from "@/components/trading/TradingLayout";
import { TrendingList } from "@/components/trading/TrendingList";
import { TokenOverview } from "@/components/trading/TokenOverview";
import { TradingChart } from "@/components/trading/TradingChart";
import { BuySellPanel } from "@/components/trading/BuySellPanel";
import { UserPosition } from "@/components/trading/UserPosition";
import { RecentTrades } from "@/components/trading/RecentTrades";
import { HoldersList } from "@/components/trading/HoldersList";

export const revalidate = 60; // ISR cache

export default async function TradePage({ params }: { params: { token: string } }) {
  // Await params since Next 15 requires treating params as async if used directly, or they are just synchronous in older versions? 
  // In Next.js 15, `params` is a Promise!
  const resolvedParams = await params;
  const rawToken = decodeURIComponent(resolvedParams.token);
  const symbol = rawToken.toUpperCase();

  // Fetch Birdeye lists for Left Panel
  const [trendingRes, gainersRes, losersRes] = await Promise.all([
    birdeyeServer.getTrending().catch(() => ({ data: { tokens: [] } })),
    birdeyeServer.getGainers().catch(() => ({ data: { tokens: [] } })),
    birdeyeServer.getLosers().catch(() => ({ data: { tokens: [] } })),
  ]);

  const trending = trendingRes?.data?.tokens || [];
  const gainers = gainersRes?.data?.tokens || [];
  const losers = losersRes?.data?.tokens || [];

  // Find the requested token from lists to populate overview (Fallback to basic data if not found)
  const allTokens = [...trending, ...gainers, ...losers];
  const tokenData = allTokens.find(t => t.symbol.toUpperCase() === symbol);

  return (
    <div className="min-h-screen flex flex-col pt-[72px] bg-background">
      <Navbar />
      
      <main className="flex-1 w-full bg-black/20">
        <TradingLayout 
          leftPanel={
            <TrendingList 
              trending={trending} 
              gainers={gainers} 
              losers={losers} 
            />
          }
          centerPanel={
            <>
              <TokenOverview token={tokenData} symbol={symbol} />
              <TradingChart symbol={symbol} address={tokenData?.address} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RecentTrades />
                <HoldersList />
              </div>
            </>
          }
          rightPanel={
            <>
              <BuySellPanel symbol={symbol} />
              <UserPosition symbol={symbol} />
            </>
          }
        />
      </main>
    </div>
  );
}
