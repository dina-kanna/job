
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  Compass,
  HeartHandshake,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const values = [
  {
    Icon: Target,
    number: "01",
    title: "Purpose with direction",
    description:
      "Discover opportunities that align with your interests, strengths, and long-term career goals.",
    gradient: "from-violet-500 to-indigo-600",
    background: "bg-violet-50",
  },
  {
    Icon: HeartHandshake,
    number: "02",
    title: "People come first",
    description:
      "Enjoy a simpler job search with useful details, saved roles, and a more organized experience.",
    gradient: "from-pink-500 to-rose-500",
    background: "bg-pink-50",
  },
  {
    Icon: ShieldCheck,
    number: "03",
    title: "Clarity builds trust",
    description:
      "Explore opportunities with the information you need to make thoughtful career decisions.",
    gradient: "from-emerald-500 to-teal-500",
    background: "bg-emerald-50",
  },
];

const journey = [
  {
    Icon: Compass,
    title: "Discover",
    description: "Explore roles that match your ambitions.",
    number: "01",
  },
  {
    Icon: Search,
    title: "Find your fit",
    description: "Use helpful filters to narrow your search.",
    number: "02",
  },
  {
    Icon: Users,
    title: "Explore companies",
    description: "Get to know teams and workplaces.",
    number: "03",
  },
  {
    Icon: BriefcaseBusiness,
    title: "Move forward",
    description: "Keep your job search organized.",
    number: "04",
  },
];

const pageWidth =
  "mx-auto w-full max-w-none px-4 sm:px-6 lg:px-10 2xl:px-14";

function Eyebrow({ children, light = false }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] ${
        light
          ? "border-white/15 bg-white/10 text-indigo-100"
          : "border-indigo-100 bg-indigo-50 text-indigo-700"
      }`}
    >
      <Sparkles size={14} />
      {children}
    </span>
  );
}

export default function About() {
  return (
    <main className="min-h-screen w-full max-w-none overflow-x-clip bg-white">
      {/* Hero */}
      <section className="relative isolate w-full overflow-hidden bg-slate-950">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-indigo-600/30 blur-3xl" />
        <div className="absolute -bottom-40 left-1/4 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />

        <div
          className={`${pageWidth} relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:py-28`}
        >
          <div className="min-w-0">
            <Eyebrow light>Meet QuickHire</Eyebrow>

            <h1 className="mt-7 text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-7xl">
              Your career.
              <span className="block bg-gradient-to-r from-indigo-300 via-violet-300 to-pink-300 bg-clip-text pb-2 text-transparent">
                Your next chapter.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              Finding your next opportunity should feel exciting, not
              overwhelming. QuickHire makes it easier to explore possibilities
              and take your next step with confidence.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/jobs"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition hover:-translate-y-0.5 hover:bg-indigo-400"
              >
                Explore jobs
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/companies"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-sky-500 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-sky-300"
              >
                Discover companies
                <ArrowUpRight size={17} />
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-indigo-300" />
                Simple job discovery
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-indigo-300" />
                Organized search
              </span>
            </div>
          </div>

          {/* Decorative career card */}
          <div className="relative mx-auto w-full max-w-md lg:ml-auto">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-indigo-500/30 to-pink-500/20 blur-2xl" />

            <div className="relative rounded-[2rem] border border-white/15 bg-white/[0.07] p-5 shadow-2xl backdrop-blur-xl sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-200">
                    Your career dashboard
                  </p>
                  <h2 className="mt-2 text-2xl font-black text-white">
                    Make your move.
                  </h2>
                </div>

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-400/15 text-indigo-200">
                  <Zap size={24} />
                </div>
              </div>

              <div className="mt-7 rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white">
                    <BriefcaseBusiness size={23} />
                  </div>

                  <div className="min-w-0">
                    <p className="font-bold text-white">
                      Find your direction
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Start with what inspires you
                    </p>
                  </div>

                  <ArrowUpRight
                    className="ml-auto shrink-0 text-indigo-300"
                    size={19}
                  />
                </div>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-indigo-400 to-violet-400" />
                </div>

                <p className="mt-2 text-right text-xs text-slate-400">
                  One step at a time
                </p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-400/15 text-pink-300">
                    <Search size={18} />
                  </div>
                  <p className="mt-3 font-bold text-white">Explore</p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Find relevant roles
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-300">
                    <HeartHandshake size={18} />
                  </div>
                  <p className="mt-3 font-bold text-white">Grow</p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Plan your next move
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3 rounded-2xl bg-indigo-500/15 px-4 py-3">
                <Sparkles size={19} className="shrink-0 text-indigo-200" />
                <p className="text-sm leading-6 text-indigo-100">
                  Every great career starts with a first step.
                </p>
              </div>
            </div>

            <div className="absolute -right-3 top-20 hidden items-center gap-2 rounded-xl border border-white/20 bg-slate-900 px-4 py-3 shadow-xl sm:flex lg:-right-8">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/15 text-emerald-300">
                <CheckCircle2 size={17} />
              </span>
              <span className="text-sm font-bold text-white">
                Keep moving forward
              </span>
            </div>
          </div>
        </div>

        {/* Journey highlights */}
        <div className="relative border-t border-white/10">
          <div
            className={`${pageWidth} grid grid-cols-1 divide-y divide-white/10 py-2 sm:grid-cols-3 sm:divide-x sm:divide-y-0`}
          >
            {[
              ["Discover", "Explore new possibilities"],
              ["Connect", "Learn about companies"],
              ["Grow", "Build your next chapter"],
            ].map(([title, description]) => (
              <div key={title} className="px-4 py-5 sm:px-7">
                <p className="font-extrabold text-white">{title}</p>
                <p className="mt-1 text-sm text-slate-400">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Purpose */}
      <section className={`${pageWidth} py-16 sm:py-24`}>
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-20">
          <div>
            <Eyebrow>Why QuickHire exists</Eyebrow>

            <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">
              Less searching in circles.
              <span className="block text-indigo-600">
                More moving forward.
              </span>
            </h2>
          </div>

          <div className="space-y-5 text-sm leading-8 text-slate-600 sm:text-base">
            <p>
              Looking for work can involve many decisions, countless listings,
              and uncertainty about where to begin. QuickHire brings key parts
              of the discovery process together in one straightforward place.
            </p>

            <p>
              Browse job opportunities, explore companies, review role details,
              and use the available candidate features to organize your search.
              The goal is to make exploring your options feel clearer and more
              approachable.
            </p>

            <div className="rounded-2xl border border-indigo-100 bg-indigo-50/70 p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
                  <Sparkles size={20} />
                </div>

                <div>
                  <h3 className="font-extrabold text-slate-900">
                    A project built for exploration
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    QuickHire is a frontend demonstration built with React,
                    Tailwind CSS, and sample job data. Listings and features
                    illustrate a job-board experience and are not a guarantee
                    of live vacancies or backend-powered services.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="w-full bg-slate-50 py-16 sm:py-24">
        <div className={pageWidth}>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>What guides us</Eyebrow>

            <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
              Designed around people.
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              A thoughtful job search begins with a clear, useful, and
              candidate-focused experience.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {values.map(
              ({ Icon, number, title, description, gradient, background }) => (
                <article
                  key={title}
                  className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-950/5 sm:p-8"
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl ${background}`}
                    >
                      <Icon size={25} />
                    </div>

                    <span className="text-sm font-black tracking-widest text-slate-300">
                      {number}
                    </span>
                  </div>

                  <h3 className="mt-7 text-xl font-black text-slate-900">
                    {title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    {description}
                  </p>

                  <div
                    className={`mt-7 h-1 w-12 rounded-full bg-gradient-to-r ${gradient} transition-all duration-300 group-hover:w-24`}
                  />
                </article>
              )
            )}
          </div>
        </div>
      </section>

      {/* Career journey */}
      <section className={`${pageWidth} py-16 sm:py-24`}>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <Eyebrow>Your journey</Eyebrow>

            <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
              Four steps.
              <span className="block text-indigo-600">
                New possibilities.
              </span>
            </h2>

            <p className="mt-5 text-sm leading-8 text-slate-600 sm:text-base">
              Your next move does not need to happen all at once. Start by
              exploring, narrow down your options, and discover opportunities
              that feel right for you.
            </p>

            <Link
              to="/jobs"
              className="mt-7 inline-flex items-center gap-2 font-bold text-indigo-700 transition hover:gap-3"
            >
              Start exploring
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="space-y-3">
            {journey.map(({ Icon, title, description, number }) => (
              <div
                key={number}
                className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-indigo-200 hover:bg-indigo-50/40 sm:gap-5 sm:p-5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                  <Icon size={22} />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-extrabold text-slate-900">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    {description}
                  </p>
                </div>

                <span className="hidden text-sm font-black tracking-widest text-slate-300 sm:block">
                  {number}
                </span>

                <ArrowDownRight
                  size={18}
                  className="shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:text-indigo-600"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`${pageWidth} pb-16 sm:pb-24`}>
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-700 px-6 py-12 text-center shadow-2xl shadow-indigo-900/15 sm:px-12 sm:py-16">
          <div className="absolute -right-20 -top-28 -z-10 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-32 -left-20 -z-10 h-72 w-72 rounded-full bg-violet-300/20 blur-2xl" />

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white">
            <Sparkles size={27} />
          </div>

          <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-black tracking-tight text-white sm:text-5xl">
            Your next opportunity is worth exploring.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-indigo-100 sm:text-base">
            Take a look at the available listings, discover interesting
            companies, and begin exploring what your next career chapter could
            look like.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-extrabold text-indigo-700 transition hover:-translate-y-0.5 hover:bg-indigo-50"
            >
              Browse jobs
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/companies"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/20"
            >
              Meet the companies
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
