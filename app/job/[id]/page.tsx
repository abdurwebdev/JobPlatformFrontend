"use client";
import { useEffect, useState, use } from "react";
import { api } from "@/app/services/api";

// 1. Explicitly type the dynamic route parameters for Next.js 15+
interface PageProps {
  params: Promise<{ id: string }>;
}

// 2. Define the expected properties inside your dynamic job state item
interface JobData {
  id: string;
  title: string;
  company_name: string;
  url: string;
  category?: string;
  tags?: string[];
  job_type?: string;
  publication_date?: string;
  candidate_required_location?: string;
  salary?: string;
  description: string;
  source?: string;
}

export default function JobDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  
  const [job, setJob] = useState<JobData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getJobDetails() {
      try {
        let response = await api.get(`/job/job-detail/${resolvedParams.id}`);
        setJob(response.data?.job || response.data);
      } catch (error) {
        console.error("Error retrieving position metrics:", error);
      } finally {
        setLoading(false);
      }
    }

    if (resolvedParams?.id) {
      getJobDetails();
    }
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-[#666] tracking-[0.3em] text-xs uppercase animate-pulse">
          Decrypting Payload...
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-white/40 tracking-wider text-xs uppercase">
          Position Not Found Archive Void
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5] selection:bg-[#ff5a1f] selection:text-white font-sans antialiased overflow-x-hidden flex flex-col justify-between p-6 md:p-12 relative">
      {/* Structural Thin Gridline Background lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full border-l border-r border-white/[0.02] pointer-events-none max-w-7xl mx-auto" />

      {/* Main Structural Showcase Layout */}
      <section className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 pt-16 pb-24 items-start">
        
        {/* Left Columns (8): Typography Hero Header + Long-form Data Block */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Header Identity Block */}
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[9px] uppercase tracking-[0.25em] font-semibold text-[#ff5a1f] bg-[#ff5a1f]/10 px-3 py-1 rounded-full border border-[#ff5a1f]/20">
                {job.job_type || "External Asset"}
              </span>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-white/50">
                {job.company_name}
              </h2>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter leading-[0.95] text-white">
                {job.title}
              </h1>
            </div>

            {/* Pipeline Category Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="border border-white/10 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide bg-white/[0.02]">
                {job.category}
              </span>
              {job.tags && job.tags.map((tag, i) => (
                <span key={i} className="border border-white/10 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide bg-white/[0.02] text-white/40 uppercase font-mono">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <hr className="border-white/[0.04]" />

          {/* Dynamic Description Segment */}
          <div className="space-y-6">
            <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold text-white/40">Job Overview & Requirements</h3>
            
            {/* Preserves raw data newlines accurately for full clean layout string conversion */}
            <div className="text-white/80 text-base md:text-lg leading-relaxed font-normal whitespace-pre-wrap tracking-wide space-y-4 max-w-3xl selection:bg-[#ff5a1f]/30" >
              {job.description}
            </div>
          </div>
        </div>

        {/* Right Columns (4): Parameter Metrics Sidecard panel */}
        <div className="lg:col-span-4 w-full lg:sticky lg:top-12">
          <div className="border border-white/[0.08] bg-[#111111]/60 backdrop-blur-md p-8 rounded-2xl space-y-8 relative overflow-hidden group hover:border-white/15 transition-all duration-500 shadow-xl">
            <div className="absolute -right-20 -top-20 w-40 h-40 bg-[#ff5a1f]/[0.03] rounded-full blur-3xl pointer-events-none group-hover:bg-[#ff5a1f]/[0.08] transition-all duration-500" />
            
            <h4 className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#ff5a1f]">Parameter Metrics</h4>

            {/* Data Table Core View */}
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 relative z-10 text-xs">
              <div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-white/30 mb-1">Compensation</p>
                <p className="text-base font-semibold tracking-tight text-white">{job.salary || "Undisclosed"}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-white/40 mb-1">Jurisdiction</p>
                <p className="text-base font-semibold tracking-tight text-white uppercase">{job.candidate_required_location || "Worldwide"}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-white/40 mb-1">Domain Class</p>
                <p className="text-base font-semibold tracking-tight text-white">{job.category || "General"}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-white/40 mb-1">Pipeline Hub</p>
                <p className="text-base font-semibold tracking-tight text-white">{job.source || "External"}</p>
              </div>
            </div>

            <hr className="border-white/[0.06]" />

            {/* External Gateway Direct Link Action */}
            <a 
              href={job.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative flex items-center justify-between w-full bg-white text-black font-bold text-xs py-4 px-6 rounded-xl overflow-hidden group/btn transition-transform active:scale-[0.98] hover:bg-[#ff5a1f] hover:text-white duration-300"
            >
              <span className="relative z-10">
                INITIALIZE EXTERNAL PROCESS
              </span>
              <svg 
                className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300 relative z-10 stroke-current" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth="3"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </a>
          </div>
        </div>

      </section>
    </main>
  );
}