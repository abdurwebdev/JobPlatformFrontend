import { JobItem } from "./types";

interface FilterParams {
  searchQuery: string;
  selectedCategory: string;
  selectedType: string;
  selectedLocation: string;
  sortBy: string;
}

/**
 * Normalizes job type strings to ensure "full-time", "full_time", and "full time" 
 * are all treated as "full time".
 */
const normalizeJobType = (type?: string) => 
  type?.trim().replace(/[-_]/g, ' ').toLowerCase() || "";

export function extractUniqueFields(jobs: JobItem[]) {
  const categories = jobs.map((j) => j.category?.trim()).filter((c): c is string => !!c);
  
  // Use the helper to normalize types for the dropdown list
  const types = jobs.map((j) => normalizeJobType(j.job_type)).filter((t) => t !== "");
  
  const locations = jobs.map((j) => j.candidate_required_location?.trim()).filter((l): l is string => !!l);

  return {
    categories: Array.from(new Set(categories)),
    types: Array.from(new Set(types)), // Now contains only unique, clean values
    locations: Array.from(new Set(locations)),
  };
}

export function filterAndSortJobs(jobs: JobItem[], filters: FilterParams): JobItem[] {
  let result = [...jobs];

  if (filters.searchQuery.trim() !== "") {
    const query = filters.searchQuery.toLowerCase();
    result = result.filter(
      (job) =>
        job.title?.toLowerCase().includes(query) ||
        job.company_name?.toLowerCase().includes(query) ||
        job.candidate_required_location?.toLowerCase().includes(query)
    );
  }

  if (filters.selectedCategory !== "all") {
    result = result.filter((j) => j.category?.toLowerCase() === filters.selectedCategory.toLowerCase());
  }

  // UPDATED: Use the same normalization helper for filtering
  if (filters.selectedType !== "all") {
    result = result.filter((j) => normalizeJobType(j.job_type) === filters.selectedType.toLowerCase());
  }

  if (filters.selectedLocation !== "all") {
    result = result.filter((j) => j.candidate_required_location?.toLowerCase() === filters.selectedLocation.toLowerCase());
  }

  // Sorting logic...
  if (filters.sortBy === "salary") {
    const parseMaxSalary = (salaryStr?: string) => {
      if (!salaryStr || salaryStr === "Undisclosed") return 0;
      const cleanStr = salaryStr.toLowerCase().replace(/k/g, "000");
      const parts = cleanStr.split("-");
      const highRange = parts[parts.length - 1];
      return parseInt(highRange.replace(/\D/g, ""), 10) || 0;
    };
    result.sort((a, b) => parseMaxSalary(b.salary) - parseMaxSalary(a.salary));
  } else if (filters.sortBy === "alphabetical") {
    result.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
  }

  return result;
}