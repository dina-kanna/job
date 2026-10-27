
import { useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  FileText,
  Upload,
  UserRound,
  X,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { jobs } from "../data/jobs";
import { saveApplication, saveResume } from "../utils/applicationStorage";

const MAX_RESUME_SIZE = 10 * 1024 * 1024;
const ALLOWED_EXTENSIONS = ["pdf", "doc", "docx"];

function readUser() {
  try {
    return JSON.parse(localStorage.getItem("qh-user") || "null");
  } catch {
    return null;
  }
}

export default function JobApplication() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const job = jobs.find((item) => item.id === Number(id));
  const user = readUser();

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    location: user?.location || "",
    experience: "",
    coverLetter: "",
  });

  const [resume, setResume] = useState(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function selectResume(event) {
    setError("");
    const file = event.target.files?.[0];
    if (!file) return;

    const extension = file.name.split(".").pop()?.toLowerCase();

    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      setResume(null);
      event.target.value = "";
      setError("Please upload a PDF, DOC, or DOCX resume.");
      return;
    }

    if (file.size > MAX_RESUME_SIZE) {
      setResume(null);
      event.target.value = "";
      setError("Your resume must be 10 MB or smaller.");
      return;
    }

    setResume(file);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!job) {
      setError("This job could not be found.");
      return;
    }

    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setError("Please fill in your name, email address, and phone number.");
      return;
    }

    if (!resume) {
      setError("Please upload your resume before submitting.");
      return;
    }

    const applicationId = `QH-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 7)
      .toUpperCase()}`;

    const application = {
      id: applicationId,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      location: form.location.trim(),
      experience: form.experience.trim(),
      coverLetter: form.coverLetter.trim(),
      resumeName: resume.name,
      status: "Applied",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      history: [
        {
          status: "Applied",
          date: new Date().toISOString(),
          note: "Your application was submitted successfully.",
        },
      ],
    };

    setSubmitting(true);

    try {
      await saveResume(applicationId, resume);
      saveApplication(application);
      navigate(`/applications/${applicationId}/tracking`, {
        replace: true,
      });
    } catch {
      setError(
        "Unable to save your application or resume in this browser. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (!job) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="text-center">
          <h1 className="text-2xl font-black text-slate-900">
            Job not found
          </h1>
          <Link
            to="/jobs"
            className="mt-5 inline-flex items-center gap-2 font-bold text-indigo-600"
          >
            <ArrowLeft size={17} /> Browse jobs
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <Link
          to={`/jobs/${job.id}`}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-indigo-600"
        >
          <ArrowLeft size={17} /> Back to job details
        </Link>

        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-slate-950 px-6 py-8 text-white sm:px-9">
            <div className="flex items-center gap-4">
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl font-black ${job.logoColor}`}
              >
                {job.logo}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-widest text-indigo-300">
                  Job application
                </p>
                <h1 className="mt-1 text-2xl font-black sm:text-3xl">
                  {job.title}
                </h1>
                <p className="mt-1 text-sm text-slate-300">{job.company}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 p-6 sm:p-9">
            <section>
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <UserRound size={20} />
                </span>
                <div>
                  <h2 className="text-lg font-black text-slate-900">
                    Personal details
                  </h2>
                  <p className="text-sm text-slate-500">
                    Tell the employer how to contact you.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full name *">
                  <input
                    name="name"
                    value={form.name}
                    onChange={updateField}
                    autoComplete="name"
                    required
                    maxLength={100}
                    className={inputClass}
                    placeholder="Enter your full name"
                  />
                </Field>

                <Field label="Email address *">
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={updateField}
                    autoComplete="email"
                    required
                    maxLength={254}
                    className={inputClass}
                    placeholder="you@example.com"
                  />
                </Field>

                <Field label="Phone number *">
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={updateField}
                    autoComplete="tel"
                    required
                    maxLength={30}
                    className={inputClass}
                    placeholder="Enter phone number"
                  />
                </Field>

                <Field label="Current location">
                  <input
                    name="location"
                    value={form.location}
                    onChange={updateField}
                    autoComplete="address-level2"
                    maxLength={120}
                    className={inputClass}
                    placeholder="City, state"
                  />
                </Field>

                <div className="sm:col-span-2">
                  <Field label="Relevant experience">
                    <input
                      name="experience"
                      value={form.experience}
                      onChange={updateField}
                      maxLength={120}
                      className={inputClass}
                      placeholder="e.g. 2 years in frontend development"
                    />
                  </Field>
                </div>
              </div>
            </section>

            <section>
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                  <FileText size={20} />
                </span>
                <div>
                  <h2 className="text-lg font-black text-slate-900">
                    Upload your resume
                  </h2>
                  <p className="text-sm text-slate-500">
                    PDF, DOC, or DOCX · Maximum 10 MB
                  </p>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={selectResume}
                className="hidden"
              />

              <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 text-center sm:p-8">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-indigo-600 shadow-sm">
                  <Upload size={23} />
                </span>

                {resume ? (
                  <>
                    <p className="mt-4 break-all font-bold text-slate-900">
                      {resume.name}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      {(resume.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-sm font-bold text-indigo-600 hover:text-indigo-800"
                      >
                        Choose another file
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setResume(null);
                          if (fileInputRef.current) {
                            fileInputRef.current.value = "";
                          }
                        }}
                        className="inline-flex items-center gap-1 text-sm font-bold text-red-600"
                      >
                        <X size={15} /> Remove
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="mt-4 font-bold text-slate-900">
                      Upload your latest resume
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Select a file from your device.
                    </p>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-indigo-700"
                    >
                      <Upload size={17} /> Choose resume
                    </button>
                  </>
                )}
              </div>
            </section>

            <section>
              <h2 className="text-lg font-black text-slate-900">
                Cover letter
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Optional: explain why you are a good fit.
              </p>
              <textarea
                name="coverLetter"
                value={form.coverLetter}
                onChange={updateField}
                rows={5}
                maxLength={5000}
                className={`${inputClass} mt-4 resize-y`}
                placeholder="Write a short introduction for the hiring team..."
              />
              <p className="mt-1 text-right text-xs text-slate-400">
                {form.coverLetter.length}/5000
              </p>
            </section>

            {error && (
              <div
                role="alert"
                className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700"
              >
                <X size={18} className="mt-0.5 shrink-0" />
                {error}
              </div>
            )}

            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-between">
              <Link
                to={`/jobs/${job.id}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-extrabold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Submit application"}
                {!submitting && <ArrowRight size={18} />}
              </button>
            </div>
          </form>
        </div>

        <p className="mt-4 text-center text-xs leading-5 text-slate-400">
          Demo application data is saved in this browser and is not sent to an employer.
        </p>
      </div>
    </main>
  );
}

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10";

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-slate-700">
        {label}
      </span>
      {children}
    </label>
  );
}
