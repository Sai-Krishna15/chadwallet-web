export function HoldersList() {
  return (
    <div className="bg-card border border-white/5 rounded-2xl p-6 w-full">
      <h3 className="font-bold mb-4">Top Holders</h3>
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground text-sm">
        <p>No holder data available yet.</p>
        <p className="text-xs mt-1 opacity-60">Distribution data coming soon.</p>
      </div>
    </div>
  );
}
