
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Bookmark,
  UserRound,
  Menu,
  X,
  LogOut,
  ArrowUpRight,
} from "lucide-react";
import Logo from "./Logo";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Jobs", to: "/jobs" },
  { label: "Companies", to: "/companies" },
  { label: "About", to: "/about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("qh-user") || "null");
  } catch {
    user = null;
  }

  function closeMenu() {
    setOpen(false);
  }

  function logout() {
    localStorage.removeItem("qh-user");
    closeMenu();
    navigate("/");
  }

  const navLinkClass = ({ isActive }) =>
    `group relative whitespace-nowrap rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-300 ${
      isActive
        ? "bg-brand-50 text-brand-700"
        : "text-slate-600 hover:bg-brand-50 hover:text-brand-700"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/90 shadow-[0_4px_24px_rgba(15,23,42,0.04)] backdrop-blur-2xl">
      {/* Full-width navbar container */}
      <div className="flex h-[68px] w-full items-center justify-between gap-3 px-4 sm:h-[72px] sm:px-6 lg:px-8 xl:px-12 2xl:px-16">

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          aria-label="QuickHire home"
          className="shrink-0"
        >
          <Logo />
        </Link>

        {/* Full navigation on tablet and desktop */}
        <nav
          aria-label="Main navigation"
          className="hidden min-w-0 flex-1 items-center justify-center gap-1 md:flex lg:gap-2"
        >
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={navLinkClass}
            >
              {({ isActive }) => (
                <>
                  <span>{item.label}</span>
                  <span
                    className={`absolute bottom-1 left-3 right-3 h-0.5 rounded-full bg-gradient-to-r from-brand-600 to-cyan-400 transition-transform duration-300 ${
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Desktop and tablet actions */}
        <div className="hidden shrink-0 items-center gap-1.5 md:flex lg:gap-2">
          <Link
            to="/saved"
            aria-label="Saved jobs"
            title="Saved jobs"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition hover:bg-brand-50 hover:text-brand-700"
          >
            <Bookmark size={18} />
          </Link>

          {user ? (
            <>
              <Link
                to="/profile"
                title="My profile"
                aria-label="My profile"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 text-sm font-semibold text-slate-700 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
              >
                <UserRound size={17} />
                <span className="hidden lg:inline">Profile</span>
              </Link>

              <button
                type="button"
                onClick={logout}
                title="Logout"
                aria-label="Logout"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 px-3 text-sm font-bold text-white shadow-md shadow-indigo-200/50 transition hover:-translate-y-0.5 hover:shadow-lg lg:px-4"
              >
                <LogOut size={17} />
                <span className="hidden lg:inline">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="whitespace-nowrap rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-brand-700 lg:px-4"
              >
                Log in
              </Link>

              <Link
                to="/signup"
                className="group inline-flex h-10 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-gradient-to-r from-brand-500 to-indigo-600 px-3 text-sm font-bold text-white shadow-md shadow-indigo-200/50 transition hover:-translate-y-0.5 hover:shadow-lg lg:px-5"
              >
                <span className="hidden xl:inline">Get Started</span>
                <span className="xl:hidden">Sign up</span>
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </>
          )}
        </div>

        {/* Mobile actions */}
        <div className="flex shrink-0 items-center gap-2 md:hidden">
          <Link
            to="/saved"
            onClick={closeMenu}
            aria-label="Saved jobs"
            title="Saved jobs"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
          >
            <Bookmark size={18} />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((previous) => !previous)}
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700 active:scale-95"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile navigation menu */}
      {open && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="animate-fade-in border-t border-slate-100 bg-white/95 px-4 pb-5 pt-3 shadow-xl shadow-slate-200/30 backdrop-blur-xl md:hidden sm:px-6"
        >
          <div className="mx-auto flex w-full max-w-2xl flex-col gap-1.5">
            <p className="mb-1 px-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
              Explore QuickHire
            </p>

            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold transition ${
                    isActive
                      ? "bg-brand-50 text-brand-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-brand-700"
                  }`
                }
              >
                {item.label}
                <ArrowUpRight size={16} className="opacity-50" />
              </NavLink>
            ))}

            <Link
              to="/saved"
              onClick={closeMenu}
              className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-semibold text-slate-600 transition hover:bg-brand-50 hover:text-brand-700"
            >
              <Bookmark size={17} />
              Saved jobs
            </Link>

            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={closeMenu}
                  className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-semibold text-slate-600 transition hover:bg-brand-50 hover:text-brand-700"
                >
                  <UserRound size={17} />
                  My Profile
                </Link>

                <button
                  type="button"
                  onClick={logout}
                  className="mt-2 flex w-full items-center gap-2 rounded-xl bg-slate-900 px-4 py-3.5 text-left text-sm font-semibold text-white transition hover:bg-slate-700"
                >
                  <LogOut size={17} />
                  Logout
                </button>
              </>
            ) : (
              <div className="mt-3 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="flex items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
                >
                  Log in
                </Link>

                <Link
                  to="/signup"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-brand-500 to-indigo-600 px-3 py-3 text-sm font-bold text-white shadow-md shadow-indigo-200/50 transition hover:shadow-lg"
                >
                  Get Started
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
