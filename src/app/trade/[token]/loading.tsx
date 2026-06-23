import { Navbar } from "@/components/landing/Navbar";
import { TradingLayout } from "@/components/trading/TradingLayout";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col pt-[72px] bg-background">
      <Navbar />
      
      <main className="flex-1 w-full bg-black/20">
        <TradingLayout 
          leftPanel={
            <div className="bg-card border border-white/5 rounded-2xl p-4 h-[600px] animate-pulse">
              <div className="h-10 bg-white/5 rounded-lg mb-4 w-full" />
              <div className="h-8 bg-white/5 rounded-md mb-6 w-full" />
              <div className="space-y-4">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/5" />
                      <div className="h-4 w-16 bg-white/5 rounded" />
                    </div>
                    <div className="h-4 w-12 bg-white/5 rounded" />
                  </div>
                ))}
              </div>
            </div>
          }
          centerPanel={
            <>
              <div className="bg-card border border-white/5 rounded-2xl h-[112px] animate-pulse" />
              <div className="bg-card border border-white/5 rounded-2xl h-[600px] animate-pulse" />
            </>
          }
          rightPanel={
            <>
              <div className="bg-card border border-white/5 rounded-2xl h-[400px] animate-pulse" />
              <div className="bg-card border border-white/5 rounded-2xl h-[200px] animate-pulse" />
            </>
          }
        />
      </main>
    </div>
  );
}
