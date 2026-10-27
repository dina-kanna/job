
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  ChartNoAxesCombined,
  Code2,
  Globe2,
  Heart,
  MapPin,
  Megaphone,
  Palette,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { categories, companies, jobs } from "../data/jobs";
import JobCard from "../components/JobCard";

const categoryIcons = {
  Code2,
  ChartNoAxesCombined,
  Palette,
  Megaphone,
  Wallet,
  Users,
};

const categoryStyles = [
  "bg-violet-100 text-violet-700",
  "bg-sky-100 text-sky-700",
  "bg-rose-100 text-rose-700",
  "bg-amber-100 text-amber-700",
  "bg-emerald-100 text-emerald-700",
  "bg-pink-100 text-pink-700",
];

const popularSearches = ["Developer", "Designer", "Marketing", "Remote"];

const sectionPadding =
  "mx-auto w-full px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20";

function SectionTitle({ label, title, description }) {
  return (
    <div className="w-full">
      <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-violet-600 sm:text-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-violet-600" />
        {label}
      </p>

      <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500 sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  function searchJobs(event) {
    event.preventDefault();

    const params = new URLSearchParams();

    if (keyword.trim()) params.set("keyword", keyword.trim());
    if (location.trim()) params.set("location", location.trim());

    const query = params.toString();
    navigate(query ? `/jobs?${query}` : "/jobs");
  }

  function searchPopular(term) {
    setKeyword(term);
    navigate(`/jobs?keyword=${encodeURIComponent(term)}`);
  }

  const featuredJobs = jobs.filter((job) => job.featured).slice(0, 6);

  return (
    <main className="w-full overflow-hidden bg-slate-200 text-slate-900">
      {/* Full-width hero */}
      <section className="relative isolate w-full overflow-hidden bg-slate-950">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -right-24 -top-32 h-96 w-96 rounded-full bg-purple-300/30 blur-[100px]" />
          <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-indigo-300/30 blur-[100px]" />
          <div className="absolute right-[35%] top-1/3 h-48 w-48 rounded-full bg-pink-200/20 blur-[80px]" />
        </div>

        <div
          className={`${sectionPadding} grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-2 lg:gap-14 lg:py-24`}
        >
          {/* Hero content */}
          <div className="relative z-10 min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-slate-300 px-4 py-2 shadow-sm">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-100 text-violet-700">
                <Zap size={15} fill="currentColor" />
              </span>

              <span className="text-xs font-bold text-slate-700 sm:text-sm">
                Your career, your next chapter
              </span>
            </div>

            <h1 className="mt-7 text-5xl font-black leading-[1.06] tracking-[-0.05em] text-slate-400 sm:text-6xl lg:text-7xl xl:text-8xl">
              Find work that
              <span className="mt-2 block bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500 bg-clip-text pb-2 text-transparent">
                feels like you.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-500 sm:text-lg">
              Discover exciting roles, meet inspiring companies, and find
              opportunities that match your skills, goals, and ambitions.
            </p>

            {/* Search form */}
            <form
              onSubmit={searchJobs}
              className="mt-8 w-full rounded-2xl border border-white bg-white p-2.5 shadow-[0_20px_60px_-25px_rgba(109,40,217,0.3)] ring-1 ring-slate-200/60"
            >
              <div className="grid gap-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
                <label className="flex min-w-0 items-center gap-3 rounded-xl px-3 py-3 transition focus-within:bg-violet-50/70">
                  <Search size={20} className="shrink-0 text-violet-600" />
                  <input
                    value={keyword}
                    onChange={(event) => setKeyword(event.target.value)}
                    placeholder="Job title or keyword"
                    aria-label="Job title or keyword"
                    className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-slate-400"
                  />
                </label>

                <label className="flex min-w-0 items-center gap-3 rounded-xl px-3 py-3 transition focus-within:bg-violet-50/70 md:border-l md:border-slate-100">
                  <MapPin size={20} className="shrink-0 text-violet-600" />
                  <input
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    placeholder="City or remote"
                    aria-label="Job location"
                    className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-slate-400"
                  />
                </label>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:from-violet-700 hover:to-indigo-700"
                >
                  Search jobs <ArrowRight size={17} />
                </button>
              </div>
            </form>

            {/* Popular searches */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="mr-1 text-xs font-extrabold uppercase tracking-wider text-slate-500">
                Popular
              </span>

              {popularSearches.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => searchPopular(term)}
                  className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700"
                >
                  {term}
                </button>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-violet-100 pt-6 text-sm text-slate-600">
              <span className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-emerald-600" />
                Explore curated roles
              </span>

              <span className="flex items-center gap-2">
                <Globe2 size={18} className="text-violet-600" />
                Discover remote work
              </span>
            </div>
          </div>

          {/* Right-side visual */}
          <div className="relative mx-auto w-full min-w-0 max-w-2xl lg:pl-2">
            <div className="absolute -right-8 top-4 h-28 w-28 rounded-full bg-pink-200/50 blur-2xl" />
            <div className="absolute -bottom-8 left-0 h-40 w-40 rounded-full bg-violet-300/40 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/80 p-5 shadow-[0_30px_90px_-30px_rgba(91,33,182,0.28)] backdrop-blur-xl sm:p-7 lg:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-violet-600">
                    QuickHire picks
                  </p>

                  <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                    Your next move.
                  </h2>
                </div>

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-200">
                  <BriefcaseBusiness size={23} />
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-gradient-to-br from-violet-700 via-purple-700 to-indigo-700 p-5 text-white sm:p-6">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-violet-100">
                    Career discovery
                  </span>
                  <Sparkles size={20} className="text-amber-300" />
                </div>

                <h3 className="mt-5 text-2xl font-black sm:text-3xl">
                  Think bigger.
                  <br />
                  Go further.
                </h3>

                <p className="mt-2 max-w-xs text-sm leading-6 text-violet-100">
                  The right opportunity could be closer than you think.
                </p>

                <Link
                  to="/jobs"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-violet-500 px-4 py-2.5 text-sm font-bold text-violet-500 transition hover:bg-sky-500"
                >
                  Explore jobs <ArrowRight size={16} />
                </Link>
              </div>

              <div className="mt-6 flex items-center justify-between gap-3">
                <h3 className="text-sm font-extrabold text-slate-900">
                  Opportunities to explore
                </h3>

                <Link
                  to="/jobs"
                  className="shrink-0 text-xs font-bold text-violet-600 hover:text-violet-800"
                >
                  See all
                </Link>
              </div>

              <div className="mt-3 space-y-3">
                {jobs.slice(0, 3).map((job) => (
                  <Link
                    to={`/jobs/${job.id}`}
                    key={job.id}
                    className="group flex min-w-0 items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3 transition hover:border-violet-200 hover:shadow-md"
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-black ${job.logoColor}`}
                    >
                      {job.logo}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-extrabold text-slate-800">
                        {job.title}
                      </span>

                      <span className="mt-1 block truncate text-xs text-slate-500">
                        {job.company} · {job.location}
                      </span>
                    </span>

                    <ArrowUpRight
                      size={17}
                      className="shrink-0 text-slate-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-violet-600"
                    />
                  </Link>
                ))}
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -left-4 top-20 hidden items-center gap-3 rounded-2xl border border-white bg-white p-3.5 shadow-xl sm:flex">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 size={21} />
              </span>

              <span>
                <span className="block text-xs text-slate-500">
                  Your future
                </span>
                <span className="mt-0.5 block text-sm font-extrabold text-slate-900">
                  Starts here
                </span>
              </span>
            </div>

            <div className="absolute -right-3 bottom-16 hidden items-center gap-3 rounded-2xl border border-white bg-white p-3.5 shadow-xl sm:flex">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                <Heart size={20} />
              </span>

              <span>
                <span className="block text-xs text-slate-500">
                  Find your fit
                </span>
                <span className="mt-0.5 block text-sm font-extrabold text-slate-900">
                  Love your work
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className={`${sectionPadding} py-16 sm:py-20`}>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <SectionTitle
            label="Explore your options"
            title="Find your field."
            description="Discover opportunities in the areas that match your strengths and interests."
          />

          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 self-start whitespace-nowrap text-sm font-extrabold text-violet-600 transition hover:gap-3 sm:self-auto"
          >
            Browse all jobs <ArrowRight size={17} />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category, index) => {
            const Icon = categoryIcons[category.icon] || BriefcaseBusiness;

            return (
              <button
                key={category.name}
                type="button"
                onClick={() =>
                  navigate(
                    `/jobs?category=${encodeURIComponent(category.name)}`
                  )
                }
                className="group relative flex min-w-0 items-center gap-4 overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_20px_50px_-25px_rgba(109,40,217,0.25)] sm:p-6"
              >
                <span className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-violet-50 transition-transform duration-500 group-hover:scale-150" />

                <span
                  className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${categoryStyles[index % categoryStyles.length]}`}
                >
                  <Icon size={25} />
                </span>

                <span className="relative min-w-0 flex-1">
                  <span className="block font-extrabold text-slate-900">
                    {category.name}
                  </span>

                  <span className="mt-1.5 block text-sm text-slate-500">
                    {category.count} opportunities
                  </span>
                </span>

                <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition group-hover:border-violet-600 group-hover:bg-violet-600 group-hover:text-white">
                  <ArrowUpRight size={17} />
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured jobs */}
      <section className="w-full bg-[#f8f7ff] py-16 sm:py-20">
        <div className={sectionPadding}>
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <SectionTitle
              label="Handpicked opportunities"
              title="Jobs worth a look."
              description="Explore featured listings from our sample dataset and find a role that inspires you."
            />

            <Link
              to="/jobs"
              className="inline-flex items-center justify-center gap-2 self-start whitespace-nowrap rounded-xl border border-violet-200 bg-white px-5 py-3 text-sm font-bold text-violet-700 transition hover:border-violet-400 hover:bg-violet-50 sm:self-auto"
            >
              View all jobs <ArrowRight size={17} />
            </Link>
          </div>

          {featuredJobs.length > 0 ? (
            <div className="mt-9 grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {featuredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="mt-9 rounded-3xl border border-dashed border-violet-200 bg-white p-10 text-center">
              <BriefcaseBusiness
                size={32}
                className="mx-auto text-violet-400"
              />

              <h3 className="mt-4 text-lg font-extrabold text-slate-900">
                New opportunities are coming
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Explore all available roles in the meantime.
              </p>

              <Link to="/jobs" className="primary-btn mt-5 inline-flex">
                Explore jobs <ArrowRight size={17} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Companies */}
      <section className={`${sectionPadding} py-16 sm:py-20`}>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <SectionTitle
            label="Meet the teams"
            title="Companies to know."
            description="Explore sample company profiles and discover teams working across different industries."
          />

          <Link
            to="/companies"
            className="inline-flex items-center gap-2 self-start whitespace-nowrap text-sm font-extrabold text-violet-600 transition hover:gap-3 sm:self-auto"
          >
            Discover companies <ArrowRight size={17} />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8">
          {companies.map((company) => (
            <Link
              key={company.name}
              to={`/companies?company=${encodeURIComponent(company.name)}`}
              className="group flex min-w-0 flex-col items-center rounded-2xl border border-slate-200/70 bg-white p-4 text-center transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg sm:p-5"
            >
              <span
                className={`flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-black transition duration-300 group-hover:rotate-3 group-hover:scale-105 ${company.color}`}
              >
                {company.logo}
              </span>

              <span className="mt-4 w-full truncate text-sm font-extrabold text-slate-800 transition group-hover:text-violet-700">
                {company.name}
              </span>

              <span className="mt-1 w-full truncate text-xs text-slate-500">
                {company.industry}
              </span>

              <span className="mt-3 rounded-full bg-violet-50 px-2.5 py-1 text-[10px] font-bold text-violet-700">
                {company.openings} openings
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Full-width call to action */}
      <section className={`${sectionPadding} pb-16 sm:pb-20`}>
        <div className="relative isolate w-full overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-12 text-white sm:px-10 sm:py-16 lg:px-14">
          <div className="pointer-events-none absolute -right-16 -top-28 -z-10 h-80 w-80 rounded-full bg-purple-600/40 blur-[90px]" />
          <div className="pointer-events-none absolute -bottom-36 left-1/4 -z-10 h-80 w-80 rounded-full bg-indigo-600/30 blur-[100px]" />

          <div className="relative grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto]">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold text-violet-200">
                <Sparkles size={14} />
                YOUR NEXT CHAPTER STARTS HERE
              </span>

              <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Your talent deserves
                <span className="block text-violet-300">
                  the right opportunity.
                </span>
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                Create your profile, save the roles you love, and start
                exploring where your career could take you.
              </p>

              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-xs font-medium text-slate-300 sm:text-sm">
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  Save interesting roles
                </span>

                <span className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  Explore companies
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-800 px-6 py-3.5 text-sm font-extrabold text-violet-700 transition hover:bg-violet-500"
              >
                Create your profile <ArrowRight size={17} />
              </Link>

              <Link
                to="/jobs"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Browse opportunities <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
