
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Award,
  Bookmark,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  CircleUserRound,
  Edit3,
  FileText,
  Mail,
  MapPin,
  Plus,
  Save,
  Sparkles,
  UserRound,
  X,
  Zap,
  Upload,
  Download,
  Trash2,
  FileCheck2,
} from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { jobs } from "../data/jobs";
import {
  saveResume,
  getResume,
  deleteResume,
} from "../utils/resumeStorage";

function readList(key) {
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

function readProfile(user) {
  const defaults = {
    ...user,
    headline: "Aspiring professional | Open to opportunities",
    location: "Chennai, India",
    skills: "Communication, Problem Solving, Teamwork",
    bio: "I am excited to explore new opportunities, contribute to meaningful projects, and continue developing my professional skills.",
  };

  try {
    return {
      ...defaults,
      ...(JSON.parse(localStorage.getItem("qh-profile") || "{}") || {}),
      name: defaults.name,
      email: defaults.email,
    };
  } catch {
    return defaults;
  }
}

function formatFileSize(bytes = 0) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function isAllowedResume(file) {
  const extension = file.name.split(".").pop()?.toLowerCase();

  return ["pdf", "doc", "docx"].includes(extension);
}

export default function Profile() {
  const user = readUser();

  const [savedIds] = useState(() => readList("qh-saved"));
  const [appliedIds] = useState(() => readList("qh-applied"));
  const [editing, setEditing] = useState(false);
  const [notice, setNotice] = useState("");
  const [profile, setProfile] = useState(() => readProfile(user));

  // Resume state
  const [resume, setResume] = useState(null);
  const [resumeLoading, setResumeLoading] = useState(true);
  const [resumeBusy, setResumeBusy] = useState(false);
  const [resumeError, setResumeError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadResume() {
      try {
        const savedResume = await getResume();

        if (active) {
          setResume(savedResume);
        }
      } catch {
        if (active) {
          setResumeError(
            "Unable to load your resume. Please try refreshing the page."
          );
        }
      } finally {
        if (active) setResumeLoading(false);
      }
    }

    if (user) {
      loadResume();
    } else {
      setResumeLoading(false);
    }

    return () => {
      active = false;
    };
  }, [user?.email]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const savedJobs = jobs.filter((job) => savedIds.includes(job.id));
  const appliedJobs = jobs.filter((job) => appliedIds.includes(job.id));

  const skills = (profile.skills || "")
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);

  function updateField(key, value) {
    setProfile((current) => ({ ...current, [key]: value }));
  }

  function saveProfile(e) {
    e.preventDefault();

    const updatedProfile = {
      name: profile.name,
      headline: profile.headline,
      location: profile.location,
      skills: profile.skills,
      bio: profile.bio,
    };

    try {
      localStorage.setItem("qh-profile", JSON.stringify(updatedProfile));
      localStorage.setItem(
        "qh-user",
        JSON.stringify({ name: profile.name, email: profile.email })
      );

      setEditing(false);
      setNotice("Your profile has been saved successfully.");
    } catch {
      setNotice("Unable to save changes. Please check your browser storage.");
    }
  }

  async function handleResumeUpload(event) {
    const file = event.target.files?.[0];

    // Allow selecting the same file again after an upload attempt.
    event.target.value = "";

    if (!file) return;

    setResumeError("");

    if (!isAllowedResume(file)) {
      setResumeError("Please upload a PDF, DOC, or DOCX file.");
      return;
    }

    // 10 MB limit for this demo application.
    if (file.size > 10 * 1024 * 1024) {
      setResumeError("Your resume must be smaller than 10 MB.");
      return;
    }

    if (file.size === 0) {
      setResumeError("The selected file is empty.");
      return;
    }

    setResumeBusy(true);

    try {
      await saveResume(file);
      const savedResume = await getResume();

      setResume(savedResume);
      setNotice("Your resume has been uploaded successfully.");
    } catch {
      setResumeError(
        "Unable to save your resume. Your browser may have limited storage available."
      );
    } finally {
      setResumeBusy(false);
    }
  }

  async function handleResumeDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to remove your uploaded resume?"
    );

    if (!confirmed) return;

    setResumeBusy(true);
    setResumeError("");

    try {
      await deleteResume();
      setResume(null);
      setNotice("Your resume has been removed.");
    } catch {
      setResumeError("Unable to remove your resume. Please try again.");
    } finally {
      setResumeBusy(false);
    }
  }

  async function handleResumeDownload() {
    setResumeError("");

    try {
      const savedResume = await getResume();

      if (!savedResume?.file) {
        setResume(null);
        setResumeError("Resume not found. Please upload it again.");
        return;
      }

      const url = URL.createObjectURL(savedResume.file);
      const link = document.createElement("a");

      link.href = url;
      link.download = savedResume.name || "resume";
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch {
      setResumeError("Unable to download your resume. Please try again.");
    }
  }

  const stats = [
    {
      label: "Applications",
      count: appliedJobs.length,
      caption: "Roles you've applied for",
      Icon: BriefcaseBusiness,
      iconStyle: "bg-blue-100 text-blue-700",
      accent: "from-blue-500 to-indigo-500",
    },
    {
      label: "Saved jobs",
      count: savedJobs.length,
      caption: "Roles on your shortlist",
      Icon: Bookmark,
      iconStyle: "bg-violet-100 text-violet-700",
      accent: "from-violet-500 to-purple-500",
    },
    {
      label: "Profile status",
      count: "Active",
      caption: "Ready for your next move",
      Icon: CheckCircle2,
      iconStyle: "bg-emerald-100 text-emerald-700",
      accent: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 pb-16">
      {/* Dashboard hero */}
      <section className="relative isolate overflow-hidden bg-slate-950">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.3),transparent_48%),radial-gradient(ellipse_at_bottom_left,rgba(139,92,246,0.18),transparent_42%)]" />

        <div className="page-container py-10 sm:py-14 lg:py-16">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-full">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-indigo-200">
                <Sparkles size={14} />
                Candidate dashboard
              </div>

              <h1 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                Welcome back,{" "}
                <span className="bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent">
                  {profile.name || "there"}
                </span>
                !
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                Your career journey, all in one place. Track your applications,
                manage your profile, and discover opportunities made for you.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/jobs"
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-950/30 transition hover:-translate-y-0.5 hover:bg-indigo-400"
                >
                  <Plus size={18} />
                  Find your next role
                  <ArrowRight size={16} />
                </Link>

                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  <Edit3 size={16} />
                  Edit profile
                </button>
              </div>
            </div>

            {/* Profile identity card */}
            <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/[0.07] p-5 shadow-2xl backdrop-blur-xl sm:p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-400 to-violet-600 text-white shadow-lg">
                  <CircleUserRound size={38} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-lg font-extrabold text-white">
                    {profile.name || "Your profile"}
                  </p>
                  <p className="mt-1 truncate text-sm text-slate-300">
                    {profile.headline}
                  </p>
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
                    <MapPin size={13} />
                    <span>{profile.location || "Add your location"}</span>
                  </div>
                </div>
              </div>

              <div className="my-5 h-px bg-white/10" />

              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-white">Keep growing</p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Keep your experience and skills up to date.
                  </p>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400/10 text-amber-300">
                  <Award size={21} />
                </div>
              </div>

              <button
                type="button"
                onClick={() => setEditing(true)}
                className="mt-5 flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
              >
                Complete your profile
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="page-container">
        {notice && (
          <div
            role="status"
            className="mt-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm font-semibold text-emerald-800"
          >
            <CheckCircle2 size={19} className="mt-0.5 shrink-0" />
            <span>{notice}</span>
            <button
              type="button"
              onClick={() => setNotice("")}
              className="ml-auto rounded-lg p-1 hover:bg-emerald-100"
              aria-label="Dismiss notification"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Stats */}
        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {stats.map(({ label, count, caption, Icon, iconStyle, accent }) => (
            <div
              key={label}
              className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6"
            >
              <div
                className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent}`}
              />

              <div className="flex items-center justify-between gap-3">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconStyle}`}
                >
                  <Icon size={23} />
                </div>
                <span className="text-xs font-semibold text-slate-400">
                  Overview
                </span>
              </div>

              <p className="mt-5 text-3xl font-black tracking-tight text-slate-950">
                {count}
              </p>
              <p className="mt-1 font-bold text-slate-800">{label}</p>
              <p className="mt-2 text-sm text-slate-500">{caption}</p>
            </div>
          ))}
        </section>

        {/* Main dashboard */}
        <div className="mt-8 grid items-start gap-7 lg:grid-cols-[0.88fr_1.12fr]">
          {/* Profile panel */}
          <div className="space-y-7">
            <section className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5 sm:px-7">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                    Personal information
                  </p>
                  <h2 className="mt-1 text-xl font-black text-slate-950">
                    My profile
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setEditing(!editing);
                    setNotice("");
                  }}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm font-bold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                >
                  {editing ? <X size={16} /> : <Edit3 size={16} />}
                  {editing ? "Cancel" : "Edit"}
                </button>
              </div>

              <div className="p-5 sm:p-7">
                {editing ? (
                  <form onSubmit={saveProfile} className="space-y-5">
                    {[
                      ["name", "Full name"],
                      ["headline", "Professional headline"],
                      ["location", "Location"],
                      ["skills", "Skills (comma-separated)"],
                    ].map(([key, label]) => (
                      <div key={key}>
                        <label
                          htmlFor={`profile-${key}`}
                          className="mb-2 block text-sm font-bold text-slate-700"
                        >
                          {label}
                        </label>
                        <input
                          id={`profile-${key}`}
                          className="form-input w-full"
                          value={profile[key] || ""}
                          onChange={(e) => updateField(key, e.target.value)}
                          required
                        />
                      </div>
                    ))}

                    <div>
                      <label
                        htmlFor="profile-bio"
                        className="mb-2 block text-sm font-bold text-slate-700"
                      >
                        About me
                      </label>
                      <textarea
                        id="profile-bio"
                        className="form-input min-h-32 w-full resize-y"
                        value={profile.bio || ""}
                        onChange={(e) => updateField("bio", e.target.value)}
                        placeholder="Tell employers a little about yourself..."
                      />
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                      <button
                        type="submit"
                        className="primary-btn flex-1 justify-center"
                      >
                        <Save size={17} />
                        Save changes
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setProfile(readProfile(readUser()));
                          setEditing(false);
                        }}
                        className="secondary-btn justify-center"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                        <Mail size={18} />
                      </div>
                      <div className="min-w-0 pt-0.5">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Email address
                        </p>
                        <p className="mt-1 break-all text-sm font-semibold text-slate-800">
                          {profile.email || "No email added"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                        <MapPin size={18} />
                      </div>
                      <div className="min-w-0 pt-0.5">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Location
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-800">
                          {profile.location || "Add your location"}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="flex items-center gap-2 font-extrabold text-slate-900">
                        <FileText size={17} className="text-indigo-600" />
                        About me
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        {profile.bio || "Add a short introduction about yourself."}
                      </p>
                    </div>

                    <div>
                      <h3 className="flex items-center gap-2 font-extrabold text-slate-900">
                        <Zap size={17} className="text-indigo-600" />
                        Skills & strengths
                      </h3>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {skills.length ? (
                          skills.map((skill, index) => (
                            <span
                              key={`${skill}-${index}`}
                              className="rounded-lg border border-indigo-100 bg-indigo-50 px-3 py-2 text-xs font-bold text-indigo-700"
                            >
                              {skill}
                            </span>
                          ))
                        ) : (
                          <p className="text-sm text-slate-500">
                            Add skills to highlight your strengths.
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setEditing(true);
                        setNotice("");
                      }}
                      className="secondary-btn w-full justify-center"
                    >
                      <UserRound size={17} />
                      Update my information
                    </button>
                  </div>
                )}
              </div>
            </section>

            {/* Resume section */}
            <section className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Career documents
                </p>
                <h2 className="mt-1 flex items-center gap-2 text-xl font-black text-slate-950">
                  <FileText size={21} className="text-indigo-600" />
                  My resume
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Upload your latest resume so it is ready when you apply for
                  your next opportunity.
                </p>
              </div>

              <div className="p-5 sm:p-7">
                {resumeLoading ? (
                  <p className="text-sm text-slate-500">
                    Loading your resume...
                  </p>
                ) : resume ? (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm">
                        <FileCheck2 size={24} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="break-words text-sm font-extrabold text-slate-900">
                          {resume.name}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {formatFileSize(resume.size)}
                          {resume.updatedAt &&
                            ` · Uploaded ${new Date(
                              resume.updatedAt
                            ).toLocaleDateString()}`}
                        </p>
                        <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-emerald-700">
                          <CheckCircle2 size={14} />
                          Resume uploaded
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      <button
                        type="button"
                        onClick={handleResumeDownload}
                        disabled={resumeBusy}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-3 py-3 text-sm font-bold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Download size={16} />
                        Download
                      </button>

                      <button
                        type="button"
                        onClick={handleResumeDelete}
                        disabled={resumeBusy}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-3 py-3 text-sm font-bold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Trash2 size={16} />
                        Remove resume
                      </button>
                    </div>

                    <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-bold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-700">
                      <Upload size={16} />
                      Replace resume
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="sr-only"
                        disabled={resumeBusy}
                        onChange={handleResumeUpload}
                      />
                    </label>
                  </div>
                ) : (
                  <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center transition hover:border-indigo-300">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
                      <Upload size={25} />
                    </div>

                    <h3 className="mt-4 text-base font-extrabold text-slate-900">
                      Upload your resume
                    </h3>
                    <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                      Choose a resume from your device to keep it with your
                      profile.
                    </p>

                    <label className="mt-5 inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-700">
                      <Upload size={17} />
                      {resumeBusy ? "Uploading..." : "Choose file"}
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="sr-only"
                        disabled={resumeBusy}
                        onChange={handleResumeUpload}
                      />
                    </label>

                    <p className="mt-4 text-xs text-slate-400">
                      PDF, DOC or DOCX · Maximum 10 MB
                    </p>
                  </div>
                )}

                {resumeBusy && (
                  <p role="status" className="mt-3 text-sm text-indigo-600">
                    Please wait while your resume is being processed...
                  </p>
                )}

                {resumeError && (
                  <div
                    role="alert"
                    className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
                  >
                    <X size={17} className="mt-0.5 shrink-0" />
                    <span>{resumeError}</span>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Applications and saved jobs */}
          <div className="space-y-7">
            <JobListSection
              title="Applied jobs"
              subtitle="Your submitted demo applications"
              icon={BriefcaseBusiness}
              jobs={appliedJobs}
              emptyTitle="Your journey starts here"
              emptyText="Explore available roles and apply for opportunities that match your goals."
              emptyAction="Find jobs"
              emptyLink="/jobs"
              showApplied
            />

            <JobListSection
              title="Saved jobs"
              subtitle="Opportunities worth another look"
              icon={Bookmark}
              jobs={savedJobs}
              emptyTitle="Make a shortlist"
              emptyText="Save interesting jobs to compare them and come back when you're ready."
              emptyAction="Explore opportunities"
              emptyLink="/jobs"
            />

            <div className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 p-6 text-white sm:p-7">
              <div className="absolute -right-8 -top-10 -z-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15">
                  <Sparkles size={23} />
                </div>
                <div>
                  <h3 className="text-lg font-black">
                    Your next opportunity is out there.
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-indigo-100">
                    Keep exploring and find a role that fits your ambitions.
                  </p>
                </div>
              </div>

              <Link
                to="/jobs"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-violet-400 px-4 py-3 text-sm font-extrabold text-indigo-700 transition hover:bg-indigo-50"
              >
                Explore all jobs
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function JobListSection({
  title,
  subtitle,
  icon: Icon,
  jobs: items,
  emptyTitle,
  emptyText,
  emptyAction,
  emptyLink,
  showApplied = false,
}) {
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-5 sm:px-7">
        <div>
          <h2 className="text-xl font-black text-slate-950">{title}</h2>
          <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
          <Icon size={22} />
        </div>
      </div>

      <div className="p-5 sm:px-7 sm:py-6">
        {items.length ? (
          <div className="divide-y divide-slate-100">
            {items.map((job) => (
              <Link
                to={`/jobs/${job.id}`}
                key={job.id}
                className="group flex items-center gap-3 py-4 first:pt-0 last:pb-0"
              >
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-black ${
                    job.logoColor || "bg-indigo-50 text-indigo-700"
                  }`}
                >
                  {job.logo || job.company?.charAt(0) || "J"}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-extrabold text-slate-800 transition group-hover:text-indigo-700">
                    {job.title}
                  </span>
                  <span className="mt-1 block truncate text-xs text-slate-500">
                    {job.company} · {job.location}
                  </span>
                  {job.salary && (
                    <span className="mt-1 block truncate text-xs font-semibold text-slate-600">
                      {job.salary}
                    </span>
                  )}
                </span>

                {showApplied ? (
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1.5 text-xs font-bold text-emerald-700">
                    <CheckCircle2 size={13} />
                    Applied
                  </span>
                ) : (
                  <Bookmark
                    size={17}
                    className="shrink-0 text-indigo-500 transition group-hover:scale-110"
                  />
                )}

                <ChevronRight
                  size={16}
                  className="shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-indigo-600"
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-slate-50 px-4 py-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm">
              <Icon size={23} />
            </div>
            <h3 className="mt-4 text-sm font-extrabold text-slate-800">
              {emptyTitle}
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
              {emptyText}
            </p>
            <Link
              to={emptyLink}
              className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-indigo-600 transition hover:text-indigo-800"
            >
              {emptyAction}
              <ArrowRight size={15} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
