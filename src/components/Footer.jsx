
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

// Custom SVG brand icons
const GithubIcon = ({ size = 18 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = ({ size = 18 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const groups = [
  {
    title: "For candidates",
    links: [
      ["Browse jobs", "/jobs"],
      ["Saved jobs", "/saved"],
      ["My profile", "/profile"],
      ["Create account", "/signup"],
    ],
  },
  {
    title: "Explore",
    links: [
      ["Companies", "/companies"],
      ["About us", "/about"],
      ["Home", "/"],
    ],
  },
];

const socialLinks = [
  { Icon: LinkedinIcon, href: "https://linkedin.com", label: "LinkedIn" },
  { Icon: TwitterIcon, href: "https://twitter.com", label: "Twitter" },
  { Icon: GithubIcon, href: "https://github.com", label: "GitHub" },
];

export default function Footer() {
  return (
    <footer className="mt-20 w-full overflow-hidden bg-slate-950 text-slate-300">
      {/* Full-width footer content */}
      <div className="grid w-full grid-cols-1 gap-10 px-5 py-12 sm:grid-cols-2 sm:px-8 sm:py-14 md:gap-12 lg:grid-cols-4 lg:gap-10 lg:px-10 xl:px-16 2xl:px-20 lg:py-16">
        {/* Brand section */}
        <div className="min-w-0">
          <Link
            to="/"
            aria-label="QuickHire home"
            className="inline-flex rounded-xl bg-white p-2"
          >
            <Logo />
          </Link>

          <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
            Connecting ambitious people with opportunities that help them
            build meaningful careers.
          </p>

          <div className="mt-5 flex gap-3">
            {socialLinks.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit ${label}`}
                className="rounded-xl border border-white/10 p-2.5 transition duration-300 hover:-translate-y-1 hover:border-brand-400 hover:bg-brand-600 hover:text-white"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Footer navigation groups */}
        {groups.map((group) => (
          <div key={group.title} className="min-w-0">
            <h3 className="text-sm font-bold text-white sm:text-base">
              {group.title}
            </h3>

            <ul className="mt-5 space-y-4 text-sm">
              {group.links.map(([label, to]) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="inline-block transition duration-200 hover:translate-x-1 hover:text-indigo-300"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Call to action */}
        <div className="min-w-0">
          <h3 className="text-sm font-bold text-white sm:text-base">
            Get started today
          </h3>

          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
            Discover your next opportunity and take the next step in your
            career.
          </p>

          <Link
            to="/jobs"
            className="group mt-5 inline-flex items-center gap-2 font-semibold text-indigo-300 transition hover:text-white"
          >
            Explore jobs
            <ArrowUpRight
              size={17}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>
      </div>

      {/* Full-width copyright bar */}
      <div className="w-full border-t border-white/10">
        <div className="flex w-full flex-col gap-3 px-5 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10 xl:px-16 2xl:px-20">
          <p>
            © {new Date().getFullYear()} QuickHire. All rights reserved.
          </p>
          <p>Built for your next career move.</p>
        </div>
      </div>
    </footer>
  );
}
