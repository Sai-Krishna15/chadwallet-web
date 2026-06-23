import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { TokenTicker } from "@/components/landing/TokenTicker";
import { MarketPreview } from "@/components/landing/MarketPreview";
import { Features } from "@/components/landing/Features";
import { ProductShowcase } from "@/components/landing/ProductShowcase";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col pt-[72px] bg-background selection:bg-primary/30">
      <Navbar />
      <TokenTicker direction="left" />
      <main className="flex-1 flex flex-col items-center w-full">
        <Hero />
        <MarketPreview />
        <Features />
        <ProductShowcase />
      </main>
      <TokenTicker direction="right" />
      <Footer />
    </div>
  );
}
