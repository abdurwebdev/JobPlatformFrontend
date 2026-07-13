"use client";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link"; // Imported Next.js Link wrapper for optimal prefetching and routing
import { api } from "./services/api";

interface JobItem {
  id: string | number;
  title: string;
  company_name: string;
  job_type?: string;
  category?: string;
  salary?: string;
  candidate_required_location?: string;
}

export default function JobsGridPage() {
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    async function fetchJobsData() {
      try {
        const response = await api.get("/job/all");
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

  const uniqueCategories = useMemo(() => {
    const categories = jobs
      .map((job) => job.category?.trim())
      .filter((cat): cat is string => !!cat);
    return Array.from(new Set(categories));
  }, [jobs]);

  const uniqueTypes = useMemo(() => {
    const types = jobs
      .map((job) => job.job_type?.trim())
      .filter((t): t is string => !!t);
    return Array.from(new Set(types));
  }, [jobs]);

  const uniqueLocations = useMemo(() => {
    const locations = jobs
      .map((job) => job.candidate_required_location?.trim())
      .filter((loc): loc is string => !!loc);
    return Array.from(new Set(locations));
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (job) =>
          job.title?.toLowerCase().includes(query) ||
          job.company_name?.toLowerCase().includes(query) ||
          job.candidate_required_location?.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter(
        (job) => job.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (selectedType !== "all") {
      result = result.filter(
        (job) => job.job_type?.toLowerCase() === selectedType.toLowerCase()
      );
    }

    if (selectedLocation !== "all") {
      result = result.filter(
        (job) => job.candidate_required_location?.toLowerCase() === selectedLocation.toLowerCase()
      );
    }

    if (sortBy === "salary") {
      const parseMaxSalary = (salaryStr?: string) => {
        if (!salaryStr) return 0;
        const cleanStr = salaryStr.toLowerCase().replace(/k/g, "000");
        const parts = cleanStr.split("-");
        const highRange = parts[parts.length - 1];
        return parseInt(highRange.replace(/\D/g, ""), 10) || 0;
      };
      result.sort((a, b) => parseMaxSalary(b.salary) - parseMaxSalary(a.salary));
    } else if (sortBy === "alphabetical") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [jobs, searchQuery, selectedCategory, selectedType, selectedLocation, sortBy]);

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
    <main className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5] font-sans antialiased p-6 md:p-16 max-w-7xl mx-auto flex flex-col w-full">
         <header className="w-full flex justify-between items-end border-b border-white/[0.04] pb-8 mb-8">

        <div>

          <p className="text-[10px] uppercase tracking-[0.3em] text-[#ff5a1f] font-semibold mb-2">Open Openings</p>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">Current Opportunities</h1>

        </div>

        <span className="text-xs font-mono text-white/30 hidden sm:inline-block">

          [{jobs.length} Positions Available]

        </span>

      </header>
      <section className="w-full mb-10 border border-white/[0.06] bg-[#111111]/40 rounded-2xl p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          
          <div className="relative flex-1 group">
            <span className="absolute inset-y-0 left-4 flex items-center text-white/30 group-focus-within:text-[#ff5a1f]">
              <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="SEARCH BY TITLE, COMPANY, OR KEYWORD..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-sm font-mono text-white placeholder-white/20 focus:outline-none focus:border-[#ff5a1f]/60 uppercase"
            />
          </div>

          <div className="grid grid-cols-2 md:flex flex-wrap lg:flex-nowrap gap-3 text-xs font-mono">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              aria-label="Filter by Domain"
              className="bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white/60 focus:outline-none focus:border-[#ff5a1f]/40 cursor-pointer appearance-none uppercase"
            >
              <option value="all">ALL DOMAINS</option>
              {uniqueCategories.map((cat) => (
                <option key={cat} value={cat.toLowerCase()}>
                  {cat.toUpperCase()}
                </option>
              ))}
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              aria-label="Filter by Allocation Type"
              className="bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white/60 focus:outline-none focus:border-[#ff5a1f]/40 cursor-pointer appearance-none uppercase"
            >
              <option value="all">ALL ALLOCATIONS</option>
              {uniqueTypes.map((t) => (
                <option key={t} value={t.toLowerCase()}>
                  {t.toUpperCase()}
                </option>
              ))}
            </select>

            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              aria-label="Filter by Location"
              className="bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white/60 focus:outline-none focus:border-[#ff5a1f]/40 cursor-pointer appearance-none uppercase min-w-[140px]"
            >
              <option value="all">ALL LOCATIONS</option>
              {uniqueLocations.map((loc) => (
                <option key={loc} value={loc.toLowerCase()}>
                  {loc.toUpperCase()}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort Order"
              className="col-span-2 md:col-span-1 bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-[#ff5a1f]/80 font-bold focus:outline-none focus:border-[#ff5a1f]/40 cursor-pointer appearance-none uppercase text-center"
            >
              <option value="newest">SEQUENCE: NEWEST</option>
              <option value="salary">INDEX: HIGH COMPENSATION</option>
              <option value="alphabetical">INDEX: ALPHA SORT</option>
            </select>
          </div>
        </div>
      </section>

      <div className="w-full flex-1 flex flex-col justify-start">
        {filteredJobs.length === 0 ? (
          <div className="w-full border border-dashed border-white/10 rounded-2xl p-16 text-center text-white/40 text-sm font-mono uppercase tracking-wider">
            No matching operational profiles found on active query parameters.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch w-full">
            {filteredJobs.map((job: JobItem) => (
              <Link
                href={`/job/${job.id}`}
                key={job.id}
                className="group relative flex flex-col justify-between p-8 rounded-2xl bg-[#111111]/40 border border-white/[0.06] backdrop-blur-sm hover:bg-[#111111]/80 hover:border-white/15 transition-all duration-500 ease-out hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#ff5a1f]/50 outline-none"
              >
                <div className="space-y-6 relative z-10">
                  <div className="flex justify-between items-center w-full">
                    <span className="text-[10px] uppercase font-medium text-white/40">
                      {job.company_name}
                    </span>
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
            ))}
          </div>
        )}
      </div>
    </main>
  );
}