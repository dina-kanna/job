
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock,
  MapPin,
  Share2,
  ShieldCheck,
  Sparkles,
  Wallet,
  X,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { jobs } from "../data/jobs";
import { getApplicationsForUser } from "../utils/applicationStorage";

function readStoredIds(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function readUser() {
  try {
    return JSON.parse(localStorage.getItem("qh-user") || "null");
  } catch {
    return null;
  }
}

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const job = jobs.find((item) => item.id === Number(id));

  const [applied, setApplied] = useState(() =>
    readStoredIds("qh-applied").includes(Number(id))
  );

  const [saved, setSaved] = useState(() =>
    readStoredIds("qh-saved").includes(Number(id))
  );

  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  if (!job) {
    return (
      <main className="flex min-h-[65vh] items-center justify-center bg-slate-50 px-5 py-20">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-100 text-indigo-600">
            <BriefcaseBusiness size={34} />
          </div>

          <h1 className="mt-6 text-3xl font-black tracking-tight text-slate-950">
            Job not found
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-500">
            This opportunity may have been removed or the link may be invalid.
            Explore other listings to find your next opportunity.
          </p>

          <Link
            to="/jobs"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-indigo-700"
          >
            Browse all jobs <ArrowRight size={18} />
          </Link>
        </div>
      </main>
    );
  }

  // Navigate to the application form or an existing application.
  function applyNow() {
    setError("");
    setNotice("");

    const user = readUser();

    if (!user || !user.email) {
      navigate(
        `/login?next=${encodeURIComponent(`/jobs/${job.id}/apply`)}`
      );
      return;
    }

    try {
      const existingApplication = getApplicationsForUser(user.email).find(
        (application) => Number(application.jobId) === Number(job.id)
      );

      if (existingApplication) {
        navigate(
          `/applications/${encodeURIComponent(existingApplication.id)}/tracking`
        );
        return;
      }

      navigate(`/jobs/${job.id}/apply`);
    } catch {
      setError("Unable to open the application. Please try again.");
    }
  }

  // Save or remove this job from the candidate's saved list.
  function toggleSaved() {
    setError("");
    setNotice("");

    try {
      const current = readStoredIds("qh-saved");
      const alreadySaved = current.includes(job.id);

      const next = alreadySaved
        ? current.filter((item) => item !== job.id)
        : [...current, job.id];

      localStorage.setItem("qh-saved", JSON.stringify(next));
      setSaved(!alreadySaved);

      setNotice(
        alreadySaved
          ? "Job removed from your saved list."
          : "Job added to your saved list."
      );
    } catch {
      setError("Unable to update saved jobs in this browser.");
    }
  }

  // Share the job using native sharing or copy the URL.
  async function shareJob() {
    setError("");
    setNotice("");

    const shareData = {
      title: job.title,
      text: `${job.title} at ${job.company}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setNotice("Job shared successfully.");
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setNotice("Job link copied to clipboard.");
      } else {
        setError("Sharing is not supported by this browser.");
      }
    } catch (shareError) {
      if (shareError.name !== "AbortError") {
        setError("Unable to share this job. Please try again.");
      }
    }
  }

  const overview = [
    {
      Icon: Wallet,
      label: "Salary range",
      value: job.salary,
    },
    {
      Icon: BriefcaseBusiness,
      label: "Experience",
      value: job.experience,
    },
    {
      Icon: MapPin,
      label: "Location",
      value: job.location,
    },
    {
      Icon: CalendarDays,
      label: "Date posted",
      value: job.posted,
    },
    {
      Icon: Clock,
      label: "Employment type",
      value: job.type,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero header */}
      <section className="relative isolate overflow-hidden bg-slate-950">
        <div className="absolute -right-20 -top-40 -z-10 h-96 w-96 rounded-full bg-indigo-600/25 blur-[100px]" />
        <div className="absolute -bottom-40 left-1/4 -z-10 h-96 w-96 rounded-full bg-violet-600/20 blur-[100px]" />

        <div className="page-container relative py-8 sm:py-12">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-8 inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-slate-300 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to listings
          </button>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div
              className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl text-3xl font-black shadow-xl ring-1 ring-white/10 ${job.logoColor}`}
            >
              {job.logo}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                {job.featured && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/15 px-3 py-1.5 text-xs font-bold text-amber-300 ring-1 ring-amber-300/20">
                    <Sparkles size={13} />
                    Featured role
                  </span>
                )}

                <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-indigo-100 ring-1 ring-white/10">
                  {job.type}
                </span>
              </div>

              <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                {job.title}
              </h1>

              <p className="mt-3 text-base font-semibold text-indigo-200">
                {job.company}
              </p>

              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-300">
                <span className="flex items-center gap-2">
                  <MapPin size={16} className="text-indigo-300" />
                  {job.location}
                </span>

                <span className="flex items-center gap-2">
                  <Clock size={16} className="text-indigo-300" />
                  Posted {job.posted}
                </span>
              </div>
            </div>
          </div>

          {/* Job actions */}
          <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row">
            <button
              type="button"
              onClick={applyNow}
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-500 px-6 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-indigo-950/30 transition hover:bg-indigo-400"
            >
              {applied ? (
                <>
                  <CheckCircle2 size={18} />
                  View application status
                </>
              ) : (
                <>
                  Apply for this job
                  <ArrowRight size={18} />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={toggleSaved}
              aria-pressed={saved}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              <Bookmark
                size={18}
                fill={saved ? "currentColor" : "none"}
              />
              {saved ? "Saved" : "Save job"}
            </button>

            <button
              type="button"
              onClick={shareJob}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              <Share2 size={18} />
              Share
            </button>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="page-container py-8 sm:py-12">
        {(notice || error) && (
          <div
            role={error ? "alert" : "status"}
            className={`mb-6 flex items-start gap-3 rounded-xl border px-4 py-3 text-sm font-medium ${
              error
                ? "border-red-200 bg-red-50 text-red-700"
                : "border-emerald-200 bg-emerald-50 text-emerald-800"
            }`}
          >
            {error ? <X size={18} /> : <Check size={18} />}
            <span>{error || notice}</span>
          </div>
        )}

        <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_330px]">
          {/* Job description */}
          <div className="min-w-0 space-y-6">
            <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <BriefcaseBusiness size={22} />
                </span>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-indigo-600">
                    About this opportunity
                  </p>
                  <h2 className="mt-1 text-xl font-black text-slate-950">
                    About the role
                  </h2>
                </div>
              </div>

              <p className="mt-5 whitespace-pre-line text-sm leading-8 text-slate-600 sm:text-base">
                {job.about}
              </p>
            </section>

            {[
              {
                title: "What you'll do",
                subtitle: "Responsibilities",
                items: job.responsibilities || [],
                color: "bg-violet-50 text-violet-600",
              },
              {
                title: "What you'll bring",
                subtitle: "Requirements",
                items: job.requirements || [],
                color: "bg-emerald-50 text-emerald-600",
              },
            ].map(({ title, subtitle, items, color }) => (
              <section
                key={subtitle}
                className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8"
              >
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-indigo-600">
                  {subtitle}
                </p>

                <h2 className="mt-2 text-xl font-black text-slate-950">
                  {title}
                </h2>

                <ul className="mt-6 space-y-4">
                  {items.length > 0 ? (
                    items.map((item, index) => (
                      <li
                        key={`${subtitle}-${index}`}
                        className="flex items-start gap-3 text-sm leading-7 text-slate-600 sm:text-base"
                      >
                        <span
                          className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg ${color}`}
                        >
                          <Check size={15} />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-slate-500">
                      Details have not been provided for this section.
                    </li>
                  )}
                </ul>
              </section>
            ))}

            <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-indigo-600">
                Your toolkit
              </p>

              <h2 className="mt-2 text-xl font-black text-slate-950">
                Skills and expertise
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Skills associated with this position.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {(job.skills || []).map((skill) => (
                  <span
                    key={skill}
                    className="rounded-xl border border-indigo-100 bg-indigo-50/70 px-4 py-2.5 text-sm font-semibold text-indigo-700 transition hover:border-indigo-300 hover:bg-indigo-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-24">
            <section className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm">
              <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-5 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-indigo-100">
                  At a glance
                </p>
                <h2 className="mt-2 text-xl font-black">Job overview</h2>
              </div>

              <div className="space-y-5 p-5 sm:p-6">
                {overview.map(({ Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-indigo-600">
                      <Icon size={19} />
                    </span>

                    <div className="min-w-0 flex-1 pt-0.5">
                      <p className="text-xs font-medium text-slate-500">
                        {label}
                      </p>
                      <p className="mt-1 break-words text-sm font-bold leading-6 text-slate-900">
                        {value || "Not specified"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-100 px-5 py-4 sm:px-6">
                <p className="text-xs leading-5 text-slate-400">
                  Salary and job details are illustrative sample data for this
                  demo.
                </p>
              </div>
            </section>

            <section className="relative isolate overflow-hidden rounded-3xl bg-slate-950 p-6 text-white">
              <div className="absolute -right-12 -top-12 -z-10 h-40 w-40 rounded-full bg-indigo-500/30 blur-3xl" />

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-indigo-200">
                <ShieldCheck size={24} />
              </div>

              <h2 className="mt-5 text-xl font-black">
                Keep your career organized
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-300">
                Visit your candidate dashboard to review your saved jobs and
                application records.
              </p>

              <Link
                to="/profile"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-500 px-4 py-3.5 text-sm font-extrabold text-slate-950 transition hover:bg-indigo-50"
              >
                Open my dashboard
                <ArrowRight size={17} />
              </Link>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}
