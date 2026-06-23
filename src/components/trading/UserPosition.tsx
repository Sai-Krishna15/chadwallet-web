export function UserPosition({ symbol }: { symbol: string }) {
  return (
    <div className="bg-card border border-white/5 rounded-2xl p-6">
      <h3 className="font-bold mb-4">Your Position</h3>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center py-2 border-b border-white/5">
          <span className="text-muted-foreground text-sm">Amount</span>
          <span className="font-medium">0 {symbol}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-white/5">
          <span className="text-muted-foreground text-sm">Value (USD)</span>
          <span className="font-medium">$0.00</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-white/5">
          <span className="text-muted-foreground text-sm">Avg Entry Price</span>
          <span className="font-medium">--</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-muted-foreground text-sm">Total PnL</span>
          <span className="font-medium">--</span>
        </div>
      </div>
    </div>
  );
}
