interface GridFiltersProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  selectedType: string;
  setSelectedType: (val: string) => void;
  selectedLocation: string;
  setSelectedLocation: (val: string) => void;
  sortBy: string;
  setSortBy: (val: string) => void;
  categories: string[];
  types: string[];
  locations: string[];
}

export function GridFilters({
  searchQuery, setSearchQuery,
  selectedCategory, setSelectedCategory,
  selectedType, setSelectedType,
  selectedLocation, setSelectedLocation,
  sortBy, setSortBy,
  categories, types, locations
}: GridFiltersProps) {
  return (
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
            {categories.map((cat) => (
              <option key={cat} value={cat.toLowerCase()}>{cat.toUpperCase()}</option>
            ))}
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            aria-label="Filter by Allocation Type"
            className="bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white/60 focus:outline-none focus:border-[#ff5a1f]/40 cursor-pointer appearance-none uppercase"
          >
            <option value="all">ALL ALLOCATIONS</option>
            {types.map((t) => (
              <option key={t} value={t.toLowerCase()}>{t.toUpperCase()}</option>
            ))}
          </select>

          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            aria-label="Filter by Location"
            className="bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white/60 focus:outline-none focus:border-[#ff5a1f]/40 cursor-pointer appearance-none uppercase min-w-[140px]"
          >
            <option value="all">ALL LOCATIONS</option>
            {locations.map((loc) => (
              <option key={loc} value={loc.toLowerCase()}>{loc.toUpperCase()}</option>
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
  );
}