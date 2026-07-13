import Link from "next/link";
import { JobItem } from "./types";

export function JobCard({ job }: { job: JobItem }) {
  return (
    <Link
      href={`/job/${job.id}`}
      className="group relative flex flex-col justify-between p-8 rounded-2xl bg-[#111111]/40 border border-white/[0.06] backdrop-blur-sm hover:bg-[#111111]/80 hover:border-white/15 transition-all duration-500 ease-out hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#ff5a1f]/50 outline-none"
    >
      <div className="space-y-6 relative z-10">
        <div className="flex justify-between items-center w-full">
          <span className="text-[10px] uppercase font-medium text-white/40">{job.company_name}</span>
          <span className="text-[9px] uppercase font-semibold text-[#ff5a1f] bg-[#ff5a1f]/10 px-2.5 py-0.5 rounded-full">
            {job.job_type || "External"}
          </span>
        </div>

        <h3 className="text-2xl font-bold tracking-tight text-white leading-snug line-clamp-2 group-hover:text-[#ff5a1f] transition-colors duration-200">
          {job.title}
        </h3>

        <div className="flex flex-wrap gap-1.5 pt-1">
          <span className="text-[10px] px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.05] text-white/60">
            {job.category || "General"}
          </span>
          {job.candidate_required_location && (
            <span className="text-[10px] px-2.5 py-1 rounded-md bg-white/[0.01] border border-white/[0.03] text-white/30 font-mono">
              {job.candidate_required_location}
            </span>
          )}
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-white/[0.04] flex justify-between items-center relative z-10">
        <div>
          <p className="text-[9px] uppercase text-white/30 mb-0.5">Compensation</p>
          <p className="text-sm font-semibold text-white/80 tracking-tight">{job.salary || "Undisclosed"}</p>
        </div>

        <div className="w-9 h-9 rounded-full bg-white/[0.02] border border-white/[0.08] flex items-center justify-center text-white/40 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300 transform group-hover:rotate-45">
          <svg className="w-3.5 h-3.5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="3" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
          </svg>
        </div>
      </div>
    </Link>
  );
}