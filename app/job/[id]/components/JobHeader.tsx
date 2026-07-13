interface JobHeaderProps {
  title: string;
  companyName: string;
  jobType?: string;
  category?: string;
  tags?: string[];
}

export function JobHeader({ title, companyName, jobType, category, tags }: JobHeaderProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-[9px] uppercase tracking-[0.25em] font-semibold text-[#ff5a1f] bg-[#ff5a1f]/10 px-3 py-1 rounded-full border border-[#ff5a1f]/20">
          {jobType || "External Asset"}
        </span>
      </div>
      
      <div className="space-y-2">
        <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-white/50">{companyName}</h2>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter leading-[0.95] text-white">{title}</h1>
      </div>

      <div className="flex flex-wrap gap-2 pt-2">
        <span className="border border-white/10 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide bg-white/[0.02]">
          {category || "General"}
        </span>
        {tags?.filter(Boolean).map((tag, i) => (
          <span key={i} className="border border-white/10 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide bg-white/[0.02] text-white/40 uppercase font-mono">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}