"use client";

import { useEffect, useState, useMemo } from "react";
import { api } from "../services/api"; // Path adjusted to locate your custom Axios engine asset
import { JobItem } from "./types";
import { GridHeader } from "./GridHeader";
import { GridFilters } from "./GridFilters";
import { JobCard } from "./JobCard";
import { filterAndSortJobs, extractUniqueFields } from "./utils";

export const dynamic = "force-dynamic";

export default function JobsGridClient() {
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
      // Adding a dynamic timestamp guarantees Vercel sees this as a unique request
      const response = await api.get(`/job/all?_cb=${new Date().getTime()}`, {
        headers: {
          'Cache-Control': 'no-cache',
        }
      });
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

  const uniqueFields = useMemo(() => extractUniqueFields(jobs), [jobs]);

  const filteredJobs = useMemo(() => {
    return filterAndSortJobs(jobs, {
      searchQuery,
      selectedCategory,
      selectedType,
      selectedLocation,
      sortBy,
    });
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
    <main className="min-h-screen bg-[#0a0a0a] selection:bg-[#ff5a1f] selection:text-white text-[#f5f5f5] font-sans antialiased p-6 md:p-16 max-w-7xl mx-auto flex flex-col w-full">
      <GridHeader totalCount={jobs.length} />

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
        {filteredJobs.length === 0 ? (
          <div className="w-full border border-dashed border-white/10 rounded-2xl p-16 text-center text-white/40 text-sm font-mono uppercase tracking-wider">
            No matching operational profiles found on active query parameters.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch w-full">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}