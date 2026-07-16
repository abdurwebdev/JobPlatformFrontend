"use client";

import { useEffect, useState, useMemo } from "react";
import { api } from "../services/api";
import { JobItem } from "./types";
import { GridHeader } from "./GridHeader";
import { GridFilters } from "./GridFilters";
import { JobCard } from "./JobCard";
import { extractUniqueFields } from "./utils"; // Removed filterAndSortJobs

export const dynamic = "force-dynamic";

export default function JobsGridClient() {
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  
  // State
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const PAGE_SIZE = 20;

  useEffect(() => {
    async function fetchJobs() {
      setLoading(true);
      try {
        // Build query string based on state
        const params = new URLSearchParams({
          page: page.toString(),
          limit: PAGE_SIZE.toString(),
          search: searchQuery,
          category: selectedCategory !== "all" ? selectedCategory : "",
          type: selectedType !== "all" ? selectedType : "",
          location: selectedLocation !== "all" ? selectedLocation : "",
          sort: sortBy
        });

        const res = await api.get(`/job/all?${params.toString()}`);
        setJobs(res.data.jobs);
        setTotal(res.data.total);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, [page, searchQuery, selectedCategory, selectedType, selectedLocation, sortBy]);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setPage(1);
  }, [searchQuery, selectedCategory, selectedType, selectedLocation, sortBy]);

  const uniqueFields = useMemo(() => extractUniqueFields(jobs), [jobs]);

  return (
    <main className="min-h-screen bg-[#0a0a0a] selection:bg-[#ff5a1f] selection:text-white text-[#f5f5f5] font-sans antialiased p-6 md:p-16 max-w-7xl mx-auto flex flex-col w-full">
      <GridHeader totalCount={total} />

      <GridFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        sortBy={sortBy}
        setSortBy={setSortBy}
        categories={uniqueFields.categories}
        types={uniqueFields.types}
        locations={uniqueFields.locations}
      />

      <div className="w-full flex-1 flex flex-col justify-start">
        {loading ? (
           <div className="text-center p-10 text-white/40">Loading Jobs...</div>
        ) : jobs.length === 0 ? (
          <div className="w-full border border-dashed border-white/10 rounded-2xl p-16 text-center text-white/40 text-sm font-mono uppercase tracking-wider">
            No matching operational profiles found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch w-full">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>

      {/* Pagination UI */}
      <div className="flex items-center justify-center gap-6 mt-12 font-mono text-sm">
        <button 
          disabled={page === 1 || loading} 
          onClick={() => setPage(p => p - 1)}
          className="px-4 py-2 border border-white/10 rounded-lg hover:bg-white/5 disabled:opacity-30"
        >PREV</button>
        
        <span className="text-white/40">PAGE {page} OF {Math.max(1, Math.ceil(total / PAGE_SIZE))}</span>
        
        <button 
          disabled={page >= Math.ceil(total / PAGE_SIZE) || loading} 
          onClick={() => setPage(p => p + 1)}
          className="px-4 py-2 border border-white/10 rounded-lg hover:bg-white/5 disabled:opacity-30"
        >NEXT</button>
      </div>
    </main>
  );
}