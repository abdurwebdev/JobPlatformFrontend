import { JobItem } from "./types";

interface FilterParams {
  searchQuery: string;
  selectedCategory: string;
  selectedType: string;
  selectedLocation: string;
  sortBy: string;
}

export function extractUniqueFields(jobs: JobItem[]) {
  const categories = jobs.map((j) => j.category?.trim()).filter((c): c is string => !!c);
  const types = jobs.map((j) => j.job_type?.trim()).filter((t): t is string => !!t);
  const locations = jobs.map((j) => j.candidate_required_location?.trim()).filter((l): l is string => !!l);

  return {
    categories: Array.from(new Set(categories)),
    types: Array.from(new Set(types)),
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

  if (filters.selectedType !== "all") {
    result = result.filter((j) => j.job_type?.toLowerCase() === filters.selectedType.toLowerCase());
  }

  if (filters.selectedLocation !== "all") {
    result = result.filter((j) => j.candidate_required_location?.toLowerCase() === filters.selectedLocation.toLowerCase());
  }

  if (filters.sortBy === "salary") {
    const parseMaxSalary = (salaryStr?: string) => {
      if (!salaryStr) return 0;
      const cleanStr = salaryStr.toLowerCase().replace(/k/g, "000");
      const parts = cleanStr.split("-");
      const highRange = parts[parts.length - 1];
      return parseInt(highRange.replace(/\D/g, ""), 10) || 0;
    };
    result.sort((a, b) => parseMaxSalary(b.salary) - parseMaxSalary(a.salary));
  } else if (filters.sortBy === "alphabetical") {
    result.sort((a, b) => a.title.localeCompare(b.title));
  }

  return result;
}