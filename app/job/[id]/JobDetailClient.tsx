"use client";
import { useState, useEffect } from "react";
import { JobData } from "./types";
import { JobHeader } from "./components/JobHeader";
import { JobBody } from "./components/JobBody";
import { MetricsSidebar } from "./components/MetricsSidebar";

interface JobDetailClientProps {
  initialData: JobData | null;
}

// Utility to scrub empty layouts, repetitive spacers, and unescaped HTML entities
function cleanHtmlContent(htmlContent: string | undefined): string {
  if (!htmlContent) return "";
  
  return htmlContent
    // 1. Strip paragraphs that contain only whitespace, line breaks, or &nbsp;
    .replace(/<p>\s*(?:&nbsp;|\s|<br\s*\/?>)*<\/p>/gi, "")
    // 2. Replace standalone or residual non-breaking spaces with clean single spaces
    .replace(/&nbsp;/gi, " ")
    // 3. Fix unescaped HTML ampersands if they surface in the raw body text
    .replace(/&amp;/gi, "&")
    // 4. Reduce excessive consecutive line breaks down to an acceptable spacing layout
    .replace(/(<br\s*\/?>){3,}/gi, "<br><br>");
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
      // Clean ampersands out of the browser window title string tab bar
      const cleanTitle = job.title.replace(/&amp;/gi, "&");
      document.title = `${cleanTitle} – ${job.company_name || "Job Platform"}`;
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

  // Generate cleaned instances of structural fields prior to rendering
  const cleanTitle = job.title.replace(/&amp;/gi, "&");
  const cleanedDescription = cleanHtmlContent(job.description);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5] selection:bg-[#ff5a1f] selection:text-white font-sans antialiased overflow-x-hidden flex flex-col justify-between p-6 md:p-12 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full border-l border-r border-white/[0.02] pointer-events-none max-w-7xl mx-auto" />
      
      <section className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 pt-16 pb-24 items-start">
        <div className="lg:col-span-8 space-y-12">
          {/* Passed the normalized string directly to JobHeader */}
          <JobHeader title={cleanTitle} companyName={job.company_name} jobType={job.job_type} category={job.category} tags={job.tags} />
          <hr className="border-white/[0.04]" />
          {/* Passed the compressed layout text down into JobBody */}
          <JobBody description={cleanedDescription} />
        </div>

        <div className="lg:col-span-4 w-full lg:sticky lg:top-12">
          <MetricsSidebar salary={job.salary} location={job.candidate_required_location} category={job.category} source={job.source} url={job.url} />
        </div>
      </section>
    </main>
  );
}