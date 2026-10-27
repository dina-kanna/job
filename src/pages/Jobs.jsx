
import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownUp,
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  MapPin,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
  RotateCcw,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";

import { jobs } from "../data/jobs";
import JobCard from "../components/JobCard";
import JobFilters from "../components/JobFilters";

const emptyFilters = {
  keyword: "",
  location: "",
  category: "",
  type: "",
  experience: "",
  salary: "0",
};

const popularKeywords = ["React", "Designer", "Marketing", "Remote"];

const pageWidth =
  "mx-auto w-full max-w-none px-4 sm:px-6 lg:px-10 2xl:px-14";

function SectionLabel({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-indigo-100 backdrop-blur-md">
      <Sparkles size={14} className="text-amber-300" />
      {children}
    </span>
  );
}

export default function Jobs() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState(() => ({
    ...emptyFilters,
    keyword: searchParams.get("keyword") || "",
    location: searchParams.get("location") || "",
    category: searchParams.get("category") || "",
  }));

  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("recommended");

  useEffect(() => {
    setFilters((previous) => ({
      ...previous,
      keyword: searchParams.get("keyword") || "",
      location: searchParams.get("location") || "",
      category: searchParams.get("category") || "",
    }));
  }, [searchParams]);

  const filteredJobs = useMemo(() => {
    const result = jobs.filter((job) => {
      const keyword = filters.keyword.trim().toLowerCase();
      const location = filters.location.trim().toLowerCase();

      const searchableText = [
        job.title,
        job.company,
        job.description,
        ...(job.skills || []),
      ]
        .join(" ")
        .toLowerCase();

      const matchesKeyword =
        !keyword || searchableText.includes(keyword);

      const matchesLocation =
        !location ||
        (job.location || "").toLowerCase().includes(location);

      const matchesCategory =
        !filters.category || job.category === filters.category;

      const matchesType =
        !filters.type ||
        job.type === filters.type ||
        (filters.type === "Full-time" && job.type === "Hybrid");

      const matchesExperience =
        !filters.experience ||
        job.experience === filters.experience ||
        (filters.experience === "5+ years" &&
          /5\+/.test(job.experience || ""));

      const matchesSalary =
        Number(job.salaryMin || 0) >= Number(filters.salary || 0);

      return (
        matchesKeyword &&
        matchesLocation &&
        matchesCategory &&
        matchesType &&
        matchesExperience &&
        matchesSalary
      );
    });

    if (sortBy === "salary-high") {
      result.sort(
        (a, b) => Number(b.salaryMax || 0) - Number(a.salaryMax || 0)
      );
    } else if (sortBy === "salary-low") {
      result.sort(
        (a, b) => Number(a.salaryMin || 0) - Number(b.salaryMin || 0)
      );
    } else if (sortBy === "title") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [filters, sortBy]);

  function updateFilters(next) {
    setFilters(next);

    const params = new URLSearchParams();

    if (next.keyword.trim()) {
      params.set("keyword", next.keyword.trim());
    }

    if (next.location.trim()) {
      params.set("location", next.location.trim());
    }

    if (next.category) {
      params.set("category", next.category);
    }

    setSearchParams(params, { replace: true });
  }

  function clearFilters() {
    setFilters({ ...emptyFilters });
    setSearchParams({}, { replace: true });
  }

  function searchForKeyword(keyword) {
    updateFilters({ ...filters, keyword });
  }

  const activeFilters = [
    filters.keyword,
    filters.location,
    filters.category,
    filters.type,
    filters.experience,
    Number(filters.salary || 0) > 0 ? filters.salary : "",
  ].filter(Boolean).length;

  return (
    <main className="min-h-screen w-full max-w-none overflow-x-clip bg-[#f7f8fc]">
      {/* Hero */}
      <section className="relative isolate w-full overflow-hidden bg-[#10132e]">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_10%_10%,rgba(99,102,241,0.35),transparent_42%),radial-gradient(ellipse_at_90%_75%,rgba(168,85,247,0.22),transparent_38%)]" />

        <div className="absolute -right-20 -top-32 -z-10 h-96 w-96 rounded-full border border-white/5" />
        <div className="absolute -right-5 -top-16 -z-10 h-64 w-64 rounded-full border border-white/5" />

        <div
          className={`${pageWidth} relative pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20`}
        >
          <div className="mx-auto w-full text-center">
            <SectionLabel>Find your next opportunity</SectionLabel>

            <h1 className="mt-7 text-4xl font-black leading-[1.12] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Work that fits
              <span className="block bg-gradient-to-r from-indigo-300 via-violet-300 to-pink-300 bg-clip-text pb-2 text-transparent">
                your ambition.
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-lg sm:leading-8">
              Discover exciting opportunities, connect with great companies,
              and find a role that takes your career further.
            </p>

            {/* Search panel */}
            <form
              onSubmit={(event) => {
                event.preventDefault();
                updateFilters(filters);
              }}
              className="mx-auto mt-9 grid w-full max-w-5xl gap-2 rounded-3xl border border-white/60 bg-white p-3 text-left shadow-2xl shadow-black/20 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] sm:rounded-2xl sm:p-2.5"
            >
              <label className="flex min-w-0 items-center gap-3 rounded-xl px-3 py-3 transition focus-within:bg-indigo-50 sm:px-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Search size={20} />
                </div>

                <div className="min-w-0 flex-1">
                  <span className="block text-xs font-bold text-slate-800">
                    What are you looking for?
                  </span>

                  <input
                    value={filters.keyword}
                    onChange={(event) =>
                      setFilters({ ...filters, keyword: event.target.value })
                    }
                    placeholder="Job title, skill, or company"
                    aria-label="Search by job title, skill, or company"
                    className="mt-1 w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                  />
                </div>
              </label>

              <label className="flex min-w-0 items-center gap-3 rounded-xl px-3 py-3 transition focus-within:bg-indigo-50 sm:border-l sm:border-slate-100 sm:px-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                  <MapPin size={20} />
                </div>

                <div className="min-w-0 flex-1">
                  <span className="block text-xs font-bold text-slate-800">
                    Where?
                  </span>

                  <input
                    value={filters.location}
                    onChange={(event) =>
                      setFilters({ ...filters, location: event.target.value })
                    }
                    placeholder="City or remote"
                    aria-label="Search by location"
                    className="mt-1 w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                  />
                </div>
              </label>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-4 text-sm font-extrabold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 active:scale-[0.98] sm:px-7"
              >
                Search jobs
                <ArrowRight size={17} />
              </button>
            </form>

            {/* Popular searches */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 text-sm">
              <span className="mr-1 text-slate-400">Trending searches</span>

              {popularKeywords.map((keyword) => (
                <button
                  key={keyword}
                  type="button"
                  onClick={() => searchForKeyword(keyword)}
                  className="rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-2 text-xs font-semibold text-slate-200 transition hover:border-indigo-300/50 hover:bg-indigo-400/15 hover:text-white"
                >
                  {keyword}
                </button>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 border-t border-white/10 pt-6 text-xs font-medium text-slate-300 sm:text-sm">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-300" />
                Simple job discovery
              </span>

              <span className="inline-flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-300" />
                Flexible career options
              </span>

              <span className="inline-flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-300" />
                Your next step starts here
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Listings */}
      <section className={`${pageWidth} py-10 sm:py-14`}>
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.15em] text-indigo-600">
              <BriefcaseBusiness size={16} />
              Opportunities for you
            </div>

            <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
              Explore open positions
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
              Find your fit. Discover your future.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <TrendingUp size={20} />
              </div>

              <div>
                <p className="text-xl font-black leading-none text-slate-950">
                  {filteredJobs.length}
                </p>

                <p className="mt-1 text-xs font-medium text-slate-500">
                  {filteredJobs.length === 1
                    ? "Open position"
                    : "Open positions"}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowFilters((visible) => !visible)}
              aria-expanded={showFilters}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:text-indigo-700 lg:hidden"
            >
              {showFilters ? <X size={17} /> : <SlidersHorizontal size={17} />}

              {showFilters ? "Hide filters" : "Filters"}

              {activeFilters > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-600 px-1.5 text-[10px] text-white">
                  {activeFilters}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="grid min-w-0 items-start gap-6 lg:grid-cols-[260px_minmax(0,1fr)] xl:gap-8">
          {/* Sidebar */}
          <aside
            className={`${
              showFilters ? "block" : "hidden"
            } min-w-0 lg:sticky lg:top-24 lg:block`}
          >
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <div>
                  <h3 className="font-extrabold text-slate-900">
                    Refine results
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Find your perfect match
                  </p>
                </div>

                <SlidersHorizontal size={19} className="text-indigo-600" />
              </div>

              <div className="p-4 sm:p-5">
                <JobFilters filters={filters} setFilters={updateFilters} />

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                >
                  <RotateCcw size={15} />
                  Clear all filters
                </button>
              </div>
            </div>

            <div className="relative mt-5 overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 p-5 text-white shadow-lg shadow-indigo-900/10">
              <div className="absolute -right-7 -top-7 h-24 w-24 rounded-full bg-white/10" />

              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                <Zap size={21} />
              </div>

              <h3 className="relative mt-4 font-extrabold">
                Make your next move
              </h3>

              <p className="relative mt-2 text-sm leading-6 text-indigo-100">
                Try new keywords or adjust your filters to discover different
                career paths.
              </p>
            </div>
          </aside>

          {/* Results */}
          <div className="min-w-0">
            <div className="mb-5 flex flex-col justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:px-5">
              <div>
                <p className="text-sm font-bold text-slate-900">
                  {filteredJobs.length
                    ? "Jobs matching your search"
                    : "No matching positions"}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {filteredJobs.length
                    ? `Showing ${filteredJobs.length} ${
                        filteredJobs.length === 1
                          ? "opportunity"
                          : "opportunities"
                      }`
                    : "Try adjusting your search criteria"}
                </p>
              </div>

              <label className="flex items-center gap-2 self-start rounded-xl bg-slate-50 px-3 py-2 sm:self-auto">
                <ArrowDownUp size={16} className="text-indigo-600" />

                <span className="text-xs font-semibold text-slate-500">
                  Sort:
                </span>

                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="max-w-[155px] bg-transparent text-sm font-bold text-slate-800 outline-none"
                  aria-label="Sort job listings"
                >
                  <option value="recommended">Recommended</option>
                  <option value="salary-high">Highest salary</option>
                  <option value="salary-low">Lowest salary</option>
                  <option value="title">Job title</option>
                </select>
              </label>
            </div>

            {filteredJobs.length > 0 ? (
              <div className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 2xl:grid-cols-3">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="relative isolate overflow-hidden rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center sm:px-12 sm:py-20">
                <div className="absolute -right-12 -top-12 -z-10 h-40 w-40 rounded-full bg-violet-100/70 blur-3xl" />

                <div className="absolute -bottom-12 -left-12 -z-10 h-40 w-40 rounded-full bg-indigo-100/70 blur-3xl" />

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                  <Search size={28} />
                </div>

                <h3 className="mt-5 text-xl font-black text-slate-950 sm:text-2xl">
                  Your next role is still out there
                </h3>

                <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">
                  No jobs match these filters right now. Try a broader
                  keyword, another location, or clear your filters to explore
                  all available opportunities.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700"
                >
                  <RotateCcw size={16} />
                  Reset search
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
