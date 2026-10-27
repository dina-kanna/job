
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Bookmark,
  BriefcaseBusiness,
  CheckCircle2,
  Compass,
  Heart,
  Search,
  Sparkles,
  TrendingUp,
  X,
  Bell,
} from "lucide-react";
import { Link } from "react-router-dom";
import { jobs } from "../data/jobs";
import JobCard from "../components/JobCard";

const STORAGE_KEY = "qh-saved";

function readSavedIds() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

export default function Saved() {
  const [savedIds, setSavedIds] = useState(readSavedIds);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    function handleSavedUpdate(event) {
      const ids = Array.isArray(event.detail?.ids)
        ? event.detail.ids
        : readSavedIds();

      setSavedIds(ids);

      if (event.detail?.message) {
        setNotification({
          id: Date.now(),
          message: event.detail.message,
        });
      }
    }

    function handleStorage(event) {
      if (event.key === STORAGE_KEY) {
        setSavedIds(readSavedIds());
      }
    }

    window.addEventListener("qh-saved-updated", handleSavedUpdate);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("qh-saved-updated", handleSavedUpdate);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  useEffect(() => {
    if (!notification) return;

    const timer = setTimeout(() => setNotification(null), 3000);
    return () => clearTimeout(timer);
  }, [notification]);

  const savedJobs = jobs.filter((job) =>
    savedIds.includes(job.id)
  );

  function updateSaved(id, next) {
    const updatedIds = Array.isArray(next)
      ? next
      : savedIds.includes(id)
        ? savedIds.filter((savedId) => savedId !== id)
        : [...savedIds, id];

    const wasSaved = savedIds.includes(id);
    const isSaved = updatedIds.includes(id);

    setSavedIds(updatedIds);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedIds));
    } catch {
      // Keep the page usable if storage is unavailable.
    }

    window.dispatchEvent(
      new CustomEvent("qh-saved-updated", {
        detail: {
          ids: updatedIds,
          message:
            wasSaved && !isSaved
              ? "Job removed from saved jobs"
              : !wasSaved && isSaved
                ? "Job saved successfully!"
                : null,
        },
      })
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 pb-16">
      {/* Notification */}
      {notification && (
        <div
          role="status"
          aria-live="polite"
          className="fixed right-4 top-20 z-[100] flex w-[calc(100%-2rem)] max-w-sm items-center gap-3 rounded-2xl border border-emerald-200 bg-white p-4 shadow-2xl sm:right-6"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
            <CheckCircle2 size={23} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="font-bold text-slate-900">
              {notification.message}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Your saved jobs have been updated.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setNotification(null)}
            aria-label="Dismiss notification"
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-slate-950">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.3),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(168,85,247,0.16),transparent_45%)]" />

        <div className="page-container py-12 sm:py-16 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_340px]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-indigo-200">
                <Sparkles size={15} />
                Your career, your way
              </div>

              <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                Your next big move,
                <span className="block bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent">
                  all in one place.
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
                Keep track of the opportunities you love.
                Compare roles, revisit your favorites, and take
                the next step when you are ready.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to="/jobs"
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-indigo-400"
                >
                  <Search size={17} />
                  Discover jobs
                  <ArrowRight size={16} />
                </Link>

                <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3.5 text-sm font-medium text-slate-300">
                  <Heart size={17} className="text-pink-400" />
                  Made for your ambitions
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-6 shadow-2xl backdrop-blur-xl sm:p-7">
              <p className="text-sm font-medium text-slate-400">
                Your shortlist
              </p>

              <p className="mt-2 text-5xl font-black text-white">
                {savedJobs.length}
              </p>

              <p className="mt-2 text-sm text-slate-400">
                {savedJobs.length === 1
                  ? "opportunity saved"
                  : "opportunities saved"}
              </p>

              <div className="my-6 h-px bg-white/10" />

              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-300" size={22} />
                <div>
                  <p className="font-bold text-white">Stay organized</p>
                  <p className="mt-1 text-xs text-slate-400">
                    Your favorite roles, ready when you are.
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3">
                <TrendingUp className="text-violet-300" size={22} />
                <div>
                  <p className="font-bold text-white">
                    Keep moving forward
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Find the role that fits your future.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Saved jobs */}
      <section className="page-container pt-10 sm:pt-14">
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-indigo-600">
              <BriefcaseBusiness size={16} />
              Career collection
            </div>

            <h2 className="mt-2 text-2xl font-black text-slate-950 sm:text-3xl">
              Saved opportunities
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
              {savedJobs.length
                ? "Pick up where you left off and explore your favorite roles."
                : "The right opportunity could be one search away."}
            </p>
          </div>

          {savedJobs.length > 0 && (
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm">
              <Bookmark size={15} className="text-indigo-600" />
              {savedJobs.length} saved{" "}
              {savedJobs.length === 1 ? "job" : "jobs"}
            </div>
          )}
        </div>

        {savedJobs.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {savedJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                saved
                onSave={updateSaved}
              />
            ))}
          </div>
        ) : (
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-5 py-14 text-center shadow-sm sm:px-10 sm:py-20">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-violet-100/70 blur-3xl" />
            <div className="absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-indigo-100/70 blur-3xl" />

            <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-xl">
              <Bookmark size={34} />
            </div>

            <div className="relative mx-auto mt-7 max-w-lg">
              <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-indigo-700">
                <Sparkles size={13} />
                Start your shortlist
              </span>

              <h3 className="mt-5 text-2xl font-black text-slate-950 sm:text-3xl">
                Good things are worth saving.
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-500 sm:text-base">
                Found a role that feels right? Tap the bookmark
                on any job card and it will show up here.
                Build your shortlist and plan your next career move.
              </p>

              <Link
                to="/jobs"
                className="primary-btn mt-7 inline-flex items-center gap-2"
              >
                <Compass size={18} />
                Explore opportunities
                <ArrowRight size={17} />
              </Link>

              <p className="mt-5 text-xs text-slate-400">
                Your next chapter starts with one great opportunity.
              </p>
            </div>
          </div>
        )}

        {savedJobs.length > 0 && (
          <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-indigo-100 bg-indigo-50/70 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
                <Sparkles size={19} />
              </div>
              <div>
                <p className="font-bold text-slate-900">
                  Found your favorite?
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Review the details and apply when you are ready.
                </p>
              </div>
            </div>

            <Link
              to="/jobs"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-indigo-700 hover:text-indigo-900"
            >
              Browse more jobs
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
