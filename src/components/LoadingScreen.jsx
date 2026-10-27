import { useEffect, useRef, useState } from "react";
import {
  BriefcaseBusiness,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const completedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setProgress((current) => {
        if (current >= 100) {
          window.clearInterval(timer);
          return 100;
        }

        return Math.min(current + 1, 100);
      });
    }, 30);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress === 100 && !completedRef.current) {
      completedRef.current = true;
      onCompleteRef.current?.();
    }
  }, [progress]);

  const loadingText =
    progress < 30
      ? "Initializing your experience"
      : progress < 60
        ? "Discovering opportunities"
        : progress < 90
          ? "Preparing your dashboard"
          : progress < 100
            ? "Almost ready"
            : "You're all set!";

  const circumference = 2 * Math.PI * 48;

  return (
    <div className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-5 text-white">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(79,70,229,0.22),_transparent_65%)]" />

      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-indigo-600/20 blur-[100px]" />

      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-violet-600/20 blur-[110px]" />

      {/* Background grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      {/* Floating decorations */}
      <div className="pointer-events-none absolute left-[15%] top-[20%] h-2 w-2 animate-pulse rounded-full bg-indigo-400 shadow-[0_0_20px_#818cf8]" />

      <div className="pointer-events-none absolute right-[18%] top-[30%] h-3 w-3 animate-bounce rounded-sm bg-violet-400/70 [animation-duration:2.5s]" />

      <div className="pointer-events-none absolute bottom-[22%] left-[22%] h-2 w-2 animate-ping rounded-full bg-blue-400/50 [animation-duration:3s]" />

      {/* Main content */}
      <div className="relative z-10 flex w-full max-w-md flex-col items-center">
        {/* 3D logo */}
        <div className="group relative mb-9 flex h-36 w-36 items-center justify-center [perspective:800px]">
          <div className="absolute inset-1 rounded-[36px] border border-indigo-400/20 shadow-[0_0_60px_rgba(99,102,241,0.15)]" />

          <div className="absolute inset-3 rounded-[32px] border border-white/10" />

          <div className="absolute inset-0 rounded-[36px] border-2 border-dashed border-indigo-400/40 motion-safe:animate-[spin_12s_linear_infinite]" />

          <div className="relative flex h-24 w-24 items-center justify-center rounded-[28px] border border-white/25 bg-gradient-to-br from-indigo-400 via-indigo-600 to-violet-800 shadow-[0_22px_45px_rgba(79,70,229,0.4),inset_0_1px_1px_rgba(255,255,255,0.5)] transition-transform duration-500 [transform:perspective(800px)_rotateX(12deg)_rotateY(-12deg)] group-hover:scale-110 group-hover:[transform:perspective(800px)_rotateX(0deg)_rotateY(0deg)_scale(1.08)]">
            <div className="absolute inset-x-4 top-0 h-px bg-white/70" />

            <BriefcaseBusiness
              size={42}
              strokeWidth={1.7}
              className="drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)]"
            />

            <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-xl border border-white/30 bg-slate-900 shadow-xl">
              <Sparkles size={16} className="text-amber-300" />
            </div>
          </div>

          <div className="absolute -bottom-3 h-4 w-20 rounded-[100%] bg-indigo-500/30 blur-xl" />
        </div>

        {/* Brand */}
        <div className="text-center motion-safe:animate-[pulse_3s_ease-in-out_infinite]">
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
            Quick
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-blue-400 bg-clip-text text-transparent">
              Hire
            </span>
          </h1>

          <p className="mt-3 text-sm tracking-wide text-slate-400 sm:text-base">
            Your next opportunity starts here.
          </p>
        </div>

        {/* Circular progress */}
        <div className="relative mt-10 flex h-28 w-28 items-center justify-center">
          <svg
            viewBox="0 0 120 120"
            className="-rotate-90"
            width="112"
            height="112"
            aria-hidden="true"
          >
            <circle
              cx="60"
              cy="60"
              r="48"
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="5"
            />

            <circle
              cx="60"
              cy="60"
              r="48"
              fill="none"
              stroke="#818cf8"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress / 100)}
              className="transition-[stroke-dashoffset] duration-200 ease-out"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-extrabold tabular-nums tracking-tight">
              {progress}%
            </span>

            <span className="mt-1 text-[9px] font-semibold uppercase tracking-[2px] text-slate-500">
              {progress === 100 ? "Complete" : "Loading"}
            </span>
          </div>
        </div>

        {/* Loading status */}
        <div
          className="mt-5 flex min-h-6 items-center justify-center gap-2 text-center text-sm text-slate-300"
          role="status"
          aria-live="polite"
        >
          {progress === 100 ? (
            <CheckCircle2
              size={16}
              className="text-emerald-400"
            />
          ) : (
            <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-400" />
          )}

          <span>{loadingText}</span>
        </div>

        {/* Horizontal progress bar */}
        <div
          className="mt-6 h-1.5 w-full max-w-[260px] overflow-hidden rounded-full bg-white/10"
          role="progressbar"
          aria-label="Loading progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <div
            className="relative h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-400 to-blue-400 shadow-[0_0_15px_rgba(129,140,248,0.65)] transition-[width] duration-200 ease-out"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-r from-transparent to-white/60 blur-[2px]" />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex items-center gap-2 text-[10px] font-semibold tracking-[3px] text-slate-500">
          <Sparkles size={12} className="text-indigo-400" />
          POWERING YOUR CAREER
        </div>
      </div>
    </div>
  );
}