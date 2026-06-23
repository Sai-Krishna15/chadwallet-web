export function TradingLayout({
  leftPanel,
  centerPanel,
  rightPanel,
}: {
  leftPanel: React.ReactNode;
  centerPanel: React.ReactNode;
  rightPanel: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8 h-full">
      <div className="lg:col-span-3 xl:col-span-2 hidden lg:flex flex-col gap-6 sticky top-[96px] h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar">
        {leftPanel}
      </div>
      <div className="lg:col-span-6 xl:col-span-7 flex flex-col gap-6 pb-20">
        {centerPanel}
      </div>
      <div className="lg:col-span-3 xl:col-span-3 flex flex-col gap-6 sticky top-[96px] h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar">
        {rightPanel}
      </div>
    </div>
  );
}
