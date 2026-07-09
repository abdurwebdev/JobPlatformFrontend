"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "./services/api";

// Explicitly type the individual job object structural fields
interface JobItem {
  id: string | number;
  title: string;
  company_name: string;
  job_type?: string;
  category?: string;
  salary?: string;
}

export default function JobsGridPage() {
  // Initialize state explicitly with the JobItem generic array type
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchJobsData() {
      try {
        const response = await api.get("/job/all");
        // Safely handles either a raw array or an object containing a jobs array
        const data = Array.isArray(response.data) ? response.data : response.data.jobs || [];
        setJobs(data);
      } catch (error) {
        console.error("Failed to query jobs index:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchJobsData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-[#666] tracking-[0.3em] text-xs uppercase animate-pulse">
          Connecting Archive...
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5] selection:bg-[#ff5a1f] selection:text-white font-sans antialiased p-6 md:p-16 max-w-7xl mx-auto flex flex-col justify-between">
      
      {/* Grid Top Bar Header */}
      <header className="w-full flex justify-between items-end border-b border-white/[0.04] pb-8 mb-12">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#ff5a1f] font-semibold mb-2">Open Openings</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">Current Opportunities</h1>
        </div>
        <span className="text-xs font-mono text-white/30 hidden sm:inline-block">
          [{jobs.length} Positions Available]
        </span>
      </header>

      {/* Main Grid Stream */}
      {jobs.length === 0 ? (
        <div className="border border-dashed border-white/10 rounded-2xl p-16 text-center text-white/40 text-sm my-auto">
          No positions currently hosted on index.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch flex-1">
          {jobs.map((job: JobItem) => (
            <div
              onClick={() => router.push(`/job/${job.id}`)}
              key={job.id}
              className="group relative flex flex-col justify-between p-8 rounded-2xl bg-[#111111]/40 border border-white/[0.06] backdrop-blur-sm cursor-pointer hover:bg-[#111111]/80 hover:border-white/15 transition-all duration-500 ease-out hover:-translate-y-1"
            >
              {/* Ambient Hover Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-radial-gradient from-[#ff5a1f]/[0.01] to-transparent pointer-events-none rounded-2xl" />

              {/* Upper Section: Metadata & Titles */}
              <div className="space-y-6 relative z-10">
                <div className="flex justify-between items-center w-full">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/40">
                    {job.company_name}
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.15em] font-semibold text-[#ff5a1f] bg-[#ff5a1f]/10 px-2.5 py-0.5 rounded-full">
                    {job.job_type || "External"}
                  </span>
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-white leading-snug">
                  {job.title}
                </h3>

                {/* Tokens/Tags Array */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[10px] px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.05] text-white/60">
                    {job.category || "General"}
                  </span>
                </div>
              </div>

              {/* Lower Section: Compensation & Quick Action Arrow */}
              <div className="mt-8 pt-6 border-t border-white/[0.04] flex justify-between items-center relative z-10">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-white/30 mb-0.5">Compensation</p>
                  <p className="text-sm font-semibold text-white/80 tracking-tight">{job.salary || "Undisclosed"}</p>
                </div>

                {/* Minimalist Micro-Interaction Trigger */}
                <div className="w-9 h-9 rounded-full bg-white/[0.02] border border-white/[0.08] flex items-center justify-center text-white/40 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300 transform group-hover:rotate-45">
                  <svg className="w-3.5 h-3.5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Grid Footer Interface */}
      <footer className="w-full flex justify-between items-center text-[9px] uppercase tracking-[0.25em] text-white/20 pt-16 mt-12 border-t border-white/[0.03]">
        <p>© 2026 Index Corp.</p>
        <p>Pipeline Connected Stream</p>
      </footer>
    </main>
  );
}