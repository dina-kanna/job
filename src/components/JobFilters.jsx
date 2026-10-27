import { RotateCcw, Search } from "lucide-react";
import { categories, jobs } from "../data/jobs";

const types = ["Full-time", "Part-time", "Contract", "Remote", "Hybrid"];
const experienceLevels = [
  "Fresher",
  "1-3 years",
  "2-4 years",
  "2-5 years",
  "3-5 years",
  "3-6 years",
  "5+ years",
];

export default function JobFilters({ filters, setFilters }) {
  const update = (key, value) =>
    setFilters((previous) => ({ ...previous, [key]: value }));

  function reset() {
    setFilters({
      keyword: "",
      location: "",
      category: "",
      type: "",
      experience: "",
      salary: "0",
    });
  }

  return (
    <aside className="h-fit rounded-2xl border border-slate-100 bg-white p-5 shadow-soft sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-slate-900">Filters</h2>
        <button
          onClick={reset}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700"
        >
          <RotateCcw size={14} /> Reset
        </button>
      </div>

      <div className="mt-6 space-y-6">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Search jobs
          </label>
          <div className="relative">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              className="form-input !pl-10"
              placeholder="Title or company"
              value={filters.keyword}
              onChange={(e) => update("keyword", e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Location
          </label>
          <input
            className="form-input"
            placeholder="e.g. Bengaluru"
            value={filters.location}
            onChange={(e) => update("location", e.target.value)}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Category
          </label>
          <select
            className="form-input"
            value={filters.category}
            onChange={(e) => update("category", e.target.value)}
          >
            <option value="">All categories</option>
            {categories.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-3 block text-sm font-semibold text-slate-700">
            Job type
          </label>
          <div className="space-y-2.5">
            {types.map((type) => (
              <label
                key={type}
                className="flex cursor-pointer items-center gap-3 text-sm text-slate-600"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-indigo-600"
                  checked={filters.type === type}
                  onChange={() =>
                    update("type", filters.type === type ? "" : type)
                  }
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Experience
          </label>
          <select
            className="form-input"
            value={filters.experience}
            onChange={(e) => update("experience", e.target.value)}
          >
            <option value="">Any experience</option>
            {experienceLevels.map((level) => (
              <option key={level}>{level}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-700">
            <span>Minimum salary</span>
            <span className="text-brand-600">
              {filters.salary === "0" ? "Any" : `₹${filters.salary} LPA+`}
            </span>
          </label>
          <input
            type="range"
            min="0"
            max="30"
            step="2"
            value={filters.salary}
            onChange={(e) => update("salary", e.target.value)}
            className="w-full cursor-pointer accent-indigo-600"
          />
          <div className="flex justify-between text-xs text-slate-400">
            <span>Any</span>
            <span>₹30 LPA+</span>
          </div>
        </div>

        <p className="text-xs leading-5 text-slate-400">
          Showing listings from {jobs.length} sample jobs. Filters update
          instantly.
        </p>
      </div>
    </aside>
  );
}