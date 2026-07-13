"use client";
import { useState, useEffect } from "react";
import { JobData } from "./types";
import { JobHeader } from "./components/JobHeader";
import { JobBody } from "./components/JobBody";
import { MetricsSidebar } from "./components/MetricsSidebar";

interface JobDetailClientProps {
  initialData: JobData | null;
}

export default function JobDetailClient({ initialData }: JobDetailClientProps) {
  const [job, setJob] = useState<JobData | null>(initialData);

  // Sync state cleanly if dynamic path transitions occur
  useEffect(() => {
    setJob(initialData);
  }, [initialData]);

  // Handle client-side tab sync during dynamic routing updates
  useEffect(() => {
    if (job?.title) {
      document.title = `${job.title} – ${job.company_name || "Job Platform"}`;
    }
  }, [job]);

  if (!job) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-white/40 tracking-wider text-xs uppercase font-mono">
          Position Not Found Archive Void
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5] selection:bg-[#ff5a1f] selection:text-white font-sans antialiased overflow-x-hidden flex flex-col justify-between p-6 md:p-12 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full border-l border-r border-white/[0.02] pointer-events-none max-w-7xl mx-auto" />
      
      <section className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 pt-16 pb-24 items-start">
        <div className="lg:col-span-8 space-y-12">
          <JobHeader title={job.title} companyName={job.company_name} jobType={job.job_type} category={job.category} tags={job.tags} />
          <hr className="border-white/[0.04]" />
          <JobBody description={job.description} />
        </div>

        <div className="lg:col-span-4 w-full lg:sticky lg:top-12">
          <MetricsSidebar salary={job.salary} location={job.candidate_required_location} category={job.category} source={job.source} url={job.url} />
        </div>
      </section>
    </main>
  );
}