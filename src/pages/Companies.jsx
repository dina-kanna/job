
import { useMemo } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Compass,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { companies, jobs } from "../data/jobs";

const accents = [
  {
    glow: "from-violet-500/15 to-indigo-500/5",
  },
  {
    glow: "from-cyan-500/15 to-blue-500/5",
  },
  {
    glow: "from-rose-500/15 to-pink-500/5",
  },
  {
    glow: "from-amber-500/15 to-orange-500/5",
  },
  {
    glow: "from-emerald-500/15 to-teal-500/5",
  },
  {
    glow: "from-indigo-500/15 to-blue-500/5",
  },
];

export default function Companies() {
  const [params, setParams] = useSearchParams();
  const search = params.get("company") || "";

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return companies;

    return companies.filter((company) =>
      `${company.name} ${company.industry} ${company.location}`
        .toLowerCase()
        .includes(query)
    );
  }, [search]);

  function updateSearch(value) {
    setParams(value ? { company: value } : {}, { replace: true });
  }

  const totalOpenings = companies.reduce(
    (total, company) => total + Number(company.openings || 0),
    0
  );

  return (
    <main className="min-h-screen w-full bg-[#fafaff] text-slate-900">
      {/* Full-width hero */}
      <section className="relative isolate w-full overflow-hidden bg-slate-950 text-white">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -right-24 -top-40 h-[32rem] w-[32rem] rounded-full bg-violet-600/30 blur-[100px]" />
          <div className="absolute -bottom-52 left-1/4 h-[30rem] w-[30rem] rounded-full bg-blue-600/20 blur-[110px]" />
          <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.3)_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>

        <div className="relative mx-auto w-full px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24 xl:px-16 2xl:px-20">
          <div className="mx-auto max-w-5xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-xs font-bold text-indigo-200 backdrop-blur sm:text-sm">
              <Sparkles size={15} />
              Discover where you belong
            </span>

            <h1 className="mt-7 text-4xl font-black leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              Great careers start
              <span className="mt-2 block bg-gradient-to-r from-indigo-300 via-violet-300 to-fuchsia-300 bg-clip-text pb-2 text-transparent">
                with great teams.
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
              Get to know the companies behind the opportunities. Explore
              industries, discover teams, and find a workplace that fits your
              ambitions.
            </p>

            <div className="mx-auto mt-8 flex w-full max-w-2xl items-center gap-3 rounded-2xl border border-white/15 bg-white p-2 pl-4 shadow-2xl shadow-black/20 focus-within:border-indigo-300">
              <Search size={21} className="shrink-0 text-brand-600" />
              <input
                value={search}
                onChange={(event) => updateSearch(event.target.value)}
                placeholder="Search companies, industries..."
                aria-label="Search companies or industries"
                className="min-w-0 flex-1 bg-transparent py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => updateSearch("")}
                  aria-label="Clear company search"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                >
                  <X size={17} />
                </button>
              )}
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
              <div className="flex items-center gap-3 text-left">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-indigo-200">
                  <Building2 size={21} />
                </span>
                <span>
                  <span className="block text-lg font-black">
                    {companies.length}
                  </span>
                  <span className="text-xs text-slate-400">
                    Companies to explore
                  </span>
                </span>
              </div>

              <span className="hidden h-9 w-px bg-white/15 sm:block" />

              <div className="flex items-center gap-3 text-left">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-emerald-300">
                  <BriefcaseBusiness size={21} />
                </span>
                <span>
                  <span className="block text-lg font-black">
                    {totalOpenings}+
                  </span>
                  <span className="text-xs text-slate-400">
                    Sample openings
                  </span>
                </span>
              </div>

              <span className="hidden h-9 w-px bg-white/15 sm:block" />

              <div className="flex items-center gap-3 text-left">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-amber-200">
                  <Compass size={21} />
                </span>
                <span>
                  <span className="block text-lg font-black">Explore</span>
                  <span className="text-xs text-slate-400">
                    Your next opportunity
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500" />
      </section>

      {/* Full-width company directory */}
      <section className="mx-auto w-full px-5 py-12 sm:px-8 sm:py-16 lg:px-12 xl:px-16 2xl:px-20">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-brand-600 sm:text-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-600" />
              The company directory
            </p>

            <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
              Find your kind of workplace
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Browse employers and discover their sample job listings.
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm">
            <Building2 size={17} className="text-brand-600" />
            <span>
              {filtered.length}{" "}
              {filtered.length === 1 ? "company" : "companies"}
            </span>
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {filtered.map((company) => {
              const companyJobs = jobs.filter(
                (job) => job.company === company.name
              );

              const companyIndex = companies.findIndex(
                (item) => item.name === company.name
              );

              const accent = accents[companyIndex % accents.length];

              return (
                <article
                  key={company.name}
                  className="group relative flex min-w-0 flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-indigo-200 hover:shadow-[0_24px_60px_-25px_rgba(79,70,229,0.25)]"
                >
                  <div
                    className={`pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-br ${accent.glow} opacity-80`}
                  />

                  <div className="relative p-6 sm:p-7">
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className={`flex h-[4.25rem] w-[4.25rem] shrink-0 items-center justify-center rounded-2xl text-2xl font-black shadow-sm ring-1 ring-black/[0.03] transition duration-300 group-hover:scale-105 group-hover:rotate-2 ${company.color}`}
                      >
                        {company.logo}
                      </div>

                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">
                        <CheckCircle2 size={12} />
                        Demo profile
                      </span>
                    </div>

                    <div className="mt-6">
                      <h3 className="break-words text-xl font-black tracking-tight text-slate-900 transition group-hover:text-brand-700">
                        {company.name}
                      </h3>
                      <p className="mt-1.5 text-sm font-semibold text-brand-600">
                        {company.industry}
                      </p>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <span className="inline-flex max-w-full items-center gap-1.5 rounded-lg bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600">
                        <MapPin size={14} className="shrink-0 text-slate-400" />
                        <span className="break-words">{company.location}</span>
                      </span>

                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600">
                        <BriefcaseBusiness
                          size={14}
                          className="shrink-0 text-slate-400"
                        />
                        {company.openings} openings
                      </span>
                    </div>
                  </div>

                  <div className="mx-6 border-t border-slate-100 sm:mx-7" />

                  <div className="relative flex flex-1 flex-col px-6 py-5 sm:px-7">
                    <div className="flex items-center justify-between gap-3">
                      <h4 className="text-xs font-extrabold uppercase tracking-[0.13em] text-slate-400">
                        Featured roles
                      </h4>
                      <span className="rounded-md bg-indigo-50 px-2 py-1 text-[10px] font-bold text-indigo-600">
                        {companyJobs.length} listed
                      </span>
                    </div>

                    {companyJobs.length > 0 ? (
                      <div className="mt-4 space-y-2">
                        {companyJobs.slice(0, 3).map((job) => (
                          <Link
                            to={`/jobs/${job.id}`}
                            key={job.id}
                            className="group/job flex min-w-0 items-center gap-3 rounded-xl border border-transparent px-2 py-2.5 transition hover:border-indigo-100 hover:bg-indigo-50/60"
                          >
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition group-hover/job:bg-white group-hover/job:text-brand-600">
                              <BriefcaseBusiness size={15} />
                            </span>

                            <span className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-700 transition group-hover/job:text-brand-700">
                              {job.title}
                            </span>

                            <ArrowUpRight
                              size={15}
                              className="shrink-0 text-slate-300 transition group-hover/job:text-brand-600"
                            />
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-4 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-500">
                        No jobs for this company are listed in the current
                        sample dataset.
                      </p>
                    )}

                    <Link
                      to={`/jobs?keyword=${encodeURIComponent(company.name)}`}
                      className="group/cta mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 px-4 py-3.5 text-sm font-bold text-white transition hover:bg-brand-500"
                    >
                      Explore company jobs
                      <ArrowRight
                        size={16}
                        className="transition-transform group-hover/cta:translate-x-1"
                      />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-brand-600">
              <Search size={27} />
            </div>

            <h3 className="mt-5 text-xl font-black text-slate-900">
              No companies found
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
              We couldn't find a company matching “{search}”. Try a different
              company name, location, or industry.
            </p>

            <button
              type="button"
              onClick={() => updateSearch("")}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-700"
            >
              <X size={16} />
              Clear search
            </button>
          </div>
        )}

        <div className="mt-10 flex flex-col items-center justify-center gap-2 border-t border-slate-200 pt-6 text-center sm:flex-row">
          <ShieldCheck size={15} className="shrink-0 text-slate-400" />
          <p className="text-xs leading-5 text-slate-400">
            Company profiles and openings are illustrative demo content and do
            not imply affiliation with the listed organizations.
          </p>
        </div>
      </section>
    </main>
  );
}
