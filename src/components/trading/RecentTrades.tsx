export function RecentTrades() {
  return (
    <div className="bg-card border border-white/5 rounded-2xl p-6 w-full">
      <h3 className="font-bold mb-4">Recent Trades</h3>
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground text-sm">
        <p>No recent trades available yet.</p>
        <p className="text-xs mt-1 opacity-60">Real-time trades coming soon.</p>
      </div>
    </div>
  );
}
