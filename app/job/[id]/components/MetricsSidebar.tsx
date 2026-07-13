interface MetricsSidebarProps {
  salary?: string;
  location?: string;
  category?: string;
  source?: string;
  url: string;
}

export function MetricsSidebar({ salary, location, category, source, url }: MetricsSidebarProps) {
  return (
    <div className="border border-white/[0.08] bg-[#111111]/60 backdrop-blur-md p-8 rounded-2xl space-y-8 relative overflow-hidden group hover:border-white/15 transition-all duration-500 shadow-xl">
      <div className="absolute -right-20 -top-20 w-40 h-40 bg-[#ff5a1f]/[0.03] rounded-full blur-3xl pointer-events-none group-hover:bg-[#ff5a1f]/[0.08] transition-all duration-500" />
      
      <h4 className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#ff5a1f]">Parameter Metrics</h4>

      <div className="grid grid-cols-2 gap-y-6 gap-x-4 relative z-10 text-xs">
        <div>
          <p className="text-[9px] uppercase tracking-[0.2em] text-white/30 mb-1">Compensation</p>
          <p className="text-base font-semibold tracking-tight text-white">{salary || "Undisclosed"}</p>
        </div>
        <div>
          <p className="text-[9px] uppercase tracking-[0.2em] text-white/40 mb-1">Jurisdiction</p>
          <p className="text-base font-semibold tracking-tight text-white uppercase">{location || "Worldwide"}</p>
        </div>
        <div>
          <p className="text-[9px] uppercase tracking-[0.2em] text-white/40 mb-1">Domain Class</p>
          <p className="text-base font-semibold tracking-tight text-white">{category || "General"}</p>
        </div>
        <div>
          <p className="text-[9px] uppercase tracking-[0.2em] text-white/40 mb-1">Pipeline Hub</p>
          <p className="text-base font-semibold tracking-tight text-white">{source || "External"}</p>
        </div>
      </div>

      <hr className="border-white/[0.06]" />

      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="relative flex items-center justify-between w-full bg-white text-black font-bold text-xs py-4 px-6 rounded-xl overflow-hidden group/btn transition-transform active:scale-[0.98] hover:bg-[#ff5a1f] hover:text-white duration-300"
      >
        <span className="relative z-10">INITIALIZE EXTERNAL PROCESS</span>
        <svg className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300 relative z-10 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="3">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
        </svg>
      </a>
    </div>
  );
}