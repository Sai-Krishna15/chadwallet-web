import { Navbar } from "@/components/landing/Navbar";
import { TradingLayout } from "@/components/trading/TradingLayout";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col pt-[72px] bg-background">
      <Navbar />
      
      <main className="flex-1 w-full bg-black/20">
        <TradingLayout 
          leftPanel={
            <div className="bg-card border border-white/5 rounded-2xl p-4 h-[calc(100vh-120px)] flex flex-col gap-4">
              <Skeleton className="h-10 w-full" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-16" />
              </div>
              <div className="space-y-4 mt-2">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Skeleton className="w-8 h-8 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-3 w-10" />
                      </div>
                    </div>
                    <div className="space-y-2 flex flex-col items-end">
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-3 w-8" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          }
          centerPanel={
            <div className="space-y-6">
              <div className="bg-card border border-white/5 rounded-2xl p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Skeleton className="w-16 h-16 rounded-full" />
                  <div className="space-y-3">
                    <Skeleton className="h-8 w-32" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                </div>
                <div className="hidden sm:flex gap-12">
                  <Skeleton className="h-10 w-20" />
                  <Skeleton className="h-10 w-20" />
                  <Skeleton className="h-10 w-20" />
                </div>
              </div>
              <Skeleton className="w-full h-[500px] rounded-2xl" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Skeleton className="w-full h-[300px] rounded-2xl" />
                <Skeleton className="w-full h-[300px] rounded-2xl" />
              </div>
            </div>
          }
          rightPanel={
            <div className="flex flex-col gap-6">
              <Skeleton className="w-full h-[450px] rounded-2xl" />
              <Skeleton className="w-full h-[150px] rounded-2xl" />
            </div>
          }
        />
      </main>
    </div>
  );
}
