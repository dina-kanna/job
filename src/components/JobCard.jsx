
import { useEffect, useState } from "react";
import {
  Bookmark,
  BriefcaseBusiness,
  Clock3,
  MapPin,
  Wallet,
  ArrowUpRight,
  Check,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

const STORAGE_KEY = "qh-saved";

function getSaved() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export default function JobCard({ job, onSave, saved }) {
  const [isSaved, setIsSaved] = useState(() =>
    saved ?? getSaved().includes(job.id)
  );
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (saved !== undefined) {
      setIsSaved(saved);
    }
  }, [saved]);

  useEffect(() => {
    if (!notice) return;

    const timer = setTimeout(() => setNotice(""), 2600);
    return () => clearTimeout(timer);
  }, [notice]);

  function toggleSave() {
    const current = getSaved();
    const wasSaved = current.includes(job.id);

    const updatedIds = wasSaved
      ? current.filter((id) => id !== job.id)
      : [...current, job.id];

    const nextSaved = !wasSaved;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedIds));
    } catch {
      // Continue updating the current interface.
    }

    setIsSaved(nextSaved);
    setNotice(
      nextSaved ? "Added to your saved jobs" : "Removed from saved jobs"
    );

    window.dispatchEvent(
      new CustomEvent("qh-saved-updated", {
        detail: {
          ids: updatedIds,
          message: nextSaved
            ? `${job.title} saved successfully!`
            : `${job.title} removed from saved jobs`,
        },
      })
    );

    onSave?.(job.id, updatedIds);
  }

  return (
    <>
      <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/60 sm:p-6">
        {/* Top accent */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-400 opacity-70 transition-opacity group-hover:opacity-100" />

        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-xl font-black shadow-sm ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-105 ${job.logoColor}`}
            >
              {job.logo}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-slate-900">
                {job.company}
              </p>
              <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                <Clock3 size={12} />
                {job.posted}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={toggleSave}
            aria-label={isSaved ? "Remove saved job" : "Save job"}
            aria-pressed={isSaved}
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-200 active:scale-90 ${
              isSaved
                ? "border-indigo-200 bg-indigo-50 text-indigo-600 shadow-sm"
                : "border-slate-200 bg-white text-slate-400 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
            }`}
          >
            <Bookmark
              size={19}
              fill={isSaved ? "currentColor" : "none"}
            />
          </button>
        </div>

        {/* Job title */}
        <div className="mt-6">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            {job.featured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-amber-700 ring-1 ring-amber-200/70">
                <Sparkles size={11} />
                Featured
              </span>
            )}

            {job.type === "Remote" && (
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                Remote
              </span>
            )}
          </div>

          <Link to={`/jobs/${job.id}`} className="group/title block">
            <h3 className="text-xl font-extrabold leading-snug tracking-tight text-slate-900 transition-colors group-hover/title:text-indigo-600">
              {job.title}
            </h3>
          </Link>

          <p className="mt-2 line-clamp-2 min-h-[48px] text-sm leading-6 text-slate-500">
            {job.description}
          </p>
        </div>

        {/* Job tags */}
        <div className="mt-5 flex flex-wrap gap-2">
          <span className="rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700">
            {job.type}
          </span>
          <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
            {job.experience}
          </span>
        </div>

        {/* Salary */}
        <div className="mt-6 rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50/90 to-teal-50/50 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
            <Wallet size={15} />
            Annual salary
          </div>
          <p className="mt-1.5 text-xl font-black tracking-tight text-slate-900">
            {job.salary}
          </p>
        </div>

        {/* Details */}
        <div className="mt-5 space-y-3 text-sm">
          <div className="flex items-start gap-2.5 text-slate-500">
            <MapPin
              size={17}
              className="mt-0.5 shrink-0 text-indigo-500"
            />
            <span>{job.location}</span>
          </div>

          <div className="flex items-start gap-2.5 text-slate-500">
            <BriefcaseBusiness
              size={17}
              className="mt-0.5 shrink-0 text-indigo-500"
            />
            <span>{job.category}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-auto pt-6">
          <div className="mb-4 h-px bg-slate-100" />

          <div className="flex items-center gap-3">
            <Link
              to={`/jobs/${job.id}`}
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-violet-500 px-4 py-3 text-sm font-bold text-white transition-all hover:bg-indigo-600"
            >
              View details
              <ArrowUpRight size={17} />
            </Link>

            <button
              type="button"
              onClick={toggleSave}
              aria-label={isSaved ? "Unsave job" : "Save this job"}
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition-all active:scale-95 ${
                isSaved
                  ? "border-indigo-200 bg-indigo-50 text-indigo-600"
                  : "border-slate-200 text-slate-500 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
              }`}
            >
              {isSaved ? (
                <Check size={19} />
              ) : (
                <Bookmark size={19} />
              )}
            </button>
          </div>
        </div>
      </article>

      {/* Local toast notification */}
      {notice && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-5 z-[100] flex max-w-[calc(100%-2.5rem)] items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 shadow-2xl sm:right-7"
        >
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
              isSaved
                ? "bg-emerald-100 text-emerald-700"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            {isSaved ? <Check size={21} /> : <Bookmark size={20} />}
          </div>

          <div className="min-w-0">
            <p className="text-sm font-bold text-slate-900">
              {notice}
            </p>
            <p className="mt-0.5 text-xs text-slate-500">
              {job.company} · {job.title}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
