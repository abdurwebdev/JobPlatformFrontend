interface GridHeaderProps {
  totalCount: number;
}

export function GridHeader({ totalCount }: GridHeaderProps) {
  return (
    <header className="w-full flex justify-between items-end border-b border-white/[0.04] pb-8 mb-8">
      <div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#ff5a1f] font-semibold mb-2">Open Openings</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">Current Opportunities</h1>
      </div>
      <span className="text-xs font-mono text-white/30 hidden sm:inline-block">
        [{totalCount} Positions Available]
      </span>
    </header>
  );
}