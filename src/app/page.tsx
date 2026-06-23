import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { TokenTicker } from "@/components/landing/TokenTicker";
import { MarketPreview } from "@/components/landing/MarketPreview";
import { Features } from "@/components/landing/Features";
import { ProductShowcase } from "@/components/landing/ProductShowcase";
import { Footer } from "@/components/landing/Footer";
import { birdeyeServer } from "@/lib/birdeye/client";

export const revalidate = 60; // ISR cache for the whole page

export default async function Home() {
  // Fetch real data on the server
  const [trendingRes, gainersRes] = await Promise.all([
    birdeyeServer.getTrending().catch(() => ({ data: { tokens: [] } })),
    birdeyeServer.getGainers().catch(() => ({ data: { tokens: [] } })),
  ]);

  const trendingTokens = trendingRes?.data?.tokens || [];
  const gainersTokens = gainersRes?.data?.tokens || [];

  return (
    <div className="min-h-screen flex flex-col pt-[72px] bg-background selection:bg-primary/30">
      <Navbar />
      <TokenTicker direction="left" tokens={trendingTokens} />
      <main className="flex-1 flex flex-col items-center w-full">
        <Hero />
        <MarketPreview trending={trendingTokens} gainers={gainersTokens} />
        <Features />
        <ProductShowcase />
      </main>
      <TokenTicker direction="right" tokens={trendingTokens.slice().reverse()} />
      <Footer />
    </div>
  );
}
