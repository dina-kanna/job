import { Link } from "react-router-dom";
import { BriefcaseBusiness, Sparkles, ArrowUpRight } from "lucide-react";

export default function Logo({ onClick }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="QuickHire home"
      className="group inline-flex items-center gap-3"
    >
      {/* Premium logo icon */}
      <span className="relative flex h-11 w-11 shrink-0 items-center justify-center [perspective:500px]">
        {/* Glow */}
        <span className="absolute inset-0 rounded-2xl bg-indigo-500/30 opacity-60 blur-lg transition-all duration-500 group-hover:scale-125 group-hover:opacity-100" />

        {/* Rotating decorative ring */}
        <span className="absolute inset-0 rounded-2xl border border-indigo-400/30 transition-transform duration-500 group-hover:rotate-6" />

        {/* 3D gradient tile */}
        <span className="relative flex h-10 w-10 items-center justify-center rounded-[13px] border border-white/30 bg-gradient-to-br from-indigo-400 via-brand-600 to-violet-700 text-white shadow-[0_5px_0_#3730a3,0_10px_20px_rgba(79,70,229,0.25)] transition-all duration-300 [transform:rotateX(8deg)_rotateY(-8deg)] group-hover:-translate-y-1 group-hover:shadow-[0_8px_0_#3730a3,0_16px_25px_rgba(79,70,229,0.3)] group-hover:[transform:rotateX(0deg)_rotateY(0deg)]">
          <BriefcaseBusiness
            size={22}
            strokeWidth={2}
            className="transition-transform duration-300 group-hover:scale-110"
          />

          {/* Sparkle accent */}
          <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-md border border-white/50 bg-amber-300 text-indigo-950 shadow-sm transition-transform duration-300 group-hover:rotate-12">
            <Sparkles size={10} strokeWidth={2.5} />
          </span>
        </span>
      </span>

      {/* Brand name */}
      <span className="flex flex-col">
        <span className="flex items-center text-xl font-black leading-none tracking-tight text-slate-900">
          Quick
          <span className="bg-gradient-to-r from-brand-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
            Hire
          </span>
          <ArrowUpRight
            size={13}
            className="ml-1 text-indigo-500 opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
          />
        </span>

        <span className="mt-1.5 text-[9px] font-bold uppercase tracking-[2.2px] text-slate-400 transition-colors duration-300 group-hover:text-indigo-500">
          Your next chapter
        </span>
      </span>
    </Link>
  );
}