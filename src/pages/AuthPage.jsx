
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  UserRound,
  Zap,
} from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const DEMO_EMAIL = "demo@quickhire.com";
const DEMO_PASSWORD = "Demo123";

export default function AuthPage({ mode = "login" }) {
  const isSignup = mode === "signup";
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  function updateField(field, value) {
    setForm((previous) => ({ ...previous, [field]: value }));
    setError("");
  }

  function useDemoAccount() {
    setForm({
      name: "Demo User",
      email: DEMO_EMAIL,
      password: DEMO_PASSWORD,
    });
    setError("");
    setShowPassword(false);
  }

  function submit(event) {
    event.preventDefault();
    setError("");

    if (loading) return;

    const email = form.email.trim().toLowerCase();
    const password = form.password;

    if (isSignup && !form.name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      // DEMO ONLY: This does not authenticate against a server.
      // Any valid email and password of 6+ characters are accepted.
      const user = {
        name:
          form.name.trim() ||
          email.split("@")[0].replace(/[._-]/g, " "),
        email,
      };

      localStorage.setItem("qh-user", JSON.stringify(user));

      const next = searchParams.get("next");
      const destination =
        next && next.startsWith("/") && !next.startsWith("//")
          ? next
          : "/profile";

      navigate(destination, { replace: true });
    } catch {
      setError(
        "Unable to save your account in this browser. Please check your browser storage settings."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-[80vh] w-full max-w-none bg-slate-50 lg:grid-cols-2">
      {/* Left promotional panel */}
      <section className="relative isolate hidden overflow-hidden bg-[#100c2b] lg:flex lg:min-h-[760px] lg:flex-col lg:justify-between">
        <div className="absolute -left-32 top-20 -z-10 h-96 w-96 rounded-full bg-indigo-600/30 blur-[100px]" />
        <div className="absolute -bottom-32 right-0 -z-10 h-96 w-96 rounded-full bg-fuchsia-600/20 blur-[100px]" />

        <div className="absolute right-12 top-32 h-36 w-36 rounded-full border border-white/10" />
        <div className="absolute right-20 top-40 h-20 w-20 rounded-full border border-violet-300/20" />

        <div className="relative px-8 pt-10 xl:px-14 xl:pt-14">
          <Link to="/" className="inline-flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-400 to-indigo-500 text-white shadow-lg shadow-indigo-500/30">
              <BriefcaseBusiness size={25} />
            </span>
            <span className="text-2xl font-black tracking-tight text-white">
              Quick<span className="text-violet-300">Hire.</span>
            </span>
          </Link>
        </div>

        <div className="relative w-full px-8 py-12 xl:px-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-violet-200">
            <Sparkles size={16} />
            Your future starts here
          </div>

          <h1 className="mt-7 text-5xl font-black leading-[1.12] tracking-tight text-white xl:text-6xl">
            Big ambitions.
            <span className="mt-2 block bg-gradient-to-r from-violet-300 via-fuchsia-300 to-indigo-300 bg-clip-text pb-2 text-transparent">
              Better opportunities.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-8 text-slate-300">
            Your next career chapter begins with a single step. Discover
            interesting roles, explore companies, and organize your job search
            with QuickHire.
          </p>

          {/* Feature preview */}
          <div className="mt-10 w-full max-w-lg rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-400/15 text-violet-200">
                <Zap size={23} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-white">
                  Your next move starts now
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  Explore possibilities at your pace.
                </p>
              </div>
              <ArrowRight className="text-violet-300" size={20} />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/[0.05] p-4">
                <CheckCircle2 size={20} className="text-emerald-300" />
                <p className="mt-3 text-sm font-bold text-white">
                  Discover roles
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Find your interests
                </p>
              </div>
              <div className="rounded-2xl bg-white/[0.05] p-4">
                <ShieldCheck size={20} className="text-violet-300" />
                <p className="mt-3 text-sm font-bold text-white">
                  Stay organized
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Manage your journey
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative border-t border-white/10 px-8 py-6 xl:px-14">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} QuickHire · Built for your next chapter.
          </p>
        </div>
      </section>

      {/* Authentication panel */}
      <section className="flex w-full min-w-0 items-center justify-center px-4 py-10 sm:px-8 sm:py-14 lg:px-10 xl:px-16">
        <div className="w-full max-w-xl">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-indigo-600"
          >
            <ArrowLeft size={17} />
            Back to home
          </Link>

          {/* Mobile brand */}
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/20">
              <BriefcaseBusiness size={24} />
            </span>
            <span className="text-2xl font-black tracking-tight text-slate-900">
              Quick<span className="text-indigo-600">Hire.</span>
            </span>
          </div>

          <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-900/[0.04] sm:p-9">
            <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-100 text-indigo-600">
              {isSignup ? (
                <UserRound size={27} />
              ) : (
                <LockKeyhole size={26} />
              )}
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
              {isSignup ? "Get started today" : "Welcome back"}
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              {isSignup ? "Create account" : "Sign in"}
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              {isSignup
                ? "Set up your profile and start exploring new career opportunities."
                : "Enter your details to continue your career journey."}
            </p>

            {/* Demo account shortcut */}
            {!isSignup && (
              <div className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50/70 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
                    <Zap size={19} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-extrabold text-slate-900">
                      Try the demo account
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-600">
                      Email: {DEMO_EMAIL}
                    </p>
                    <p className="text-xs leading-5 text-slate-600">
                      Password: {DEMO_PASSWORD}
                    </p>

                    <button
                      type="button"
                      onClick={useDemoAccount}
                      className="mt-3 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
                    >
                      Use demo account
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={submit} className="mt-8 space-y-5">
              {isSignup && (
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-bold text-slate-700"
                  >
                    Full name
                  </label>

                  <div className="group relative">
                    <UserRound
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition group-focus-within:text-indigo-600"
                    />
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Enter your full name"
                      value={form.name}
                      onChange={(event) =>
                        updateField("name", event.target.value)
                      }
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                    />
                  </div>
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Email address
                </label>

                <div className="group relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition group-focus-within:text-indigo-600"
                  />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(event) =>
                      updateField("email", event.target.value)
                    }
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label
                    htmlFor="password"
                    className="block text-sm font-bold text-slate-700"
                  >
                    Password
                  </label>
                  <span className="text-xs text-slate-400">
                    6+ characters
                  </span>
                </div>

                <div className="group relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition group-focus-within:text-indigo-600"
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete={
                      isSignup ? "new-password" : "current-password"
                    }
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={(event) =>
                      updateField("password", event.target.value)
                    }
                    required
                    minLength={6}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-3.5 pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    aria-pressed={showPassword}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium leading-6 text-red-700"
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:from-indigo-700 hover:to-violet-700 hover:shadow-xl hover:shadow-indigo-600/25 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {loading
                  ? "Please wait..."
                  : isSignup
                    ? "Create my account"
                    : "Sign in to QuickHire"}

                {!loading && (
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                )}
              </button>
            </form>

            <div className="my-7 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-100" />
              <span className="text-xs font-medium text-slate-400">
                YOUR NEXT CHAPTER
              </span>
              <div className="h-px flex-1 bg-slate-100" />
            </div>

            <p className="text-center text-sm text-slate-500">
              {isSignup
                ? "Already have an account?"
                : "New to QuickHire?"}{" "}
              <Link
                to={isSignup ? "/login" : "/signup"}
                className="font-extrabold text-indigo-600 transition hover:text-violet-700"
              >
                {isSignup ? "Sign in" : "Create an account"}
              </Link>
            </p>
          </div>

          <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-amber-100 bg-amber-50/80 p-3.5">
            <ShieldCheck
              size={17}
              className="mt-0.5 shrink-0 text-amber-700"
            />
            <p className="text-xs leading-5 text-amber-900/80">
              <strong>Demo mode:</strong> This page does not verify credentials
              with a server. Any email and password with at least 6 characters
              will be accepted. The demo credentials above are a convenience,
              not a secure account. Use test data only.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
