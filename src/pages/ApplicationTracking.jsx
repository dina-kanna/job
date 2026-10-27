
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  Clock3,
  Download,
  FileText,
  MapPin,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import {
  getApplication,
  getResume,
} from "../utils/applicationStorage";

const STATUS_STEPS = [
  "Applied",
  "Under Review",
  "Shortlisted",
  "Confirmed",
];

const STATUS_DETAILS = {
  Applied: "Your application has been submitted successfully.",
  "Under Review": "The hiring team is reviewing your application.",
  Shortlisted: "You have been shortlisted for the next stage.",
  Rejected: "The application was not selected to proceed further.",
  Confirmed: "Your selection has been confirmed.",
};

function formatDate(value) {
  if (!value) return "Pending";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Pending";

  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function ApplicationTracking() {
  const { applicationId } = useParams();
  const [application, setApplication] = useState(null);
  const [resumeError, setResumeError] = useState("");
  const [loadingResume, setLoadingResume] = useState(false);

  useEffect(() => {
    setApplication(getApplication(applicationId));
  }, [applicationId]);

  async function downloadResume() {
    setResumeError("");
    setLoadingResume(true);

    try {
      const file = await getResume(applicationId);

      if (!file) {
        setResumeError(
          "The resume file is unavailable in this browser. Please upload it again if you still have the original file."
        );
        return;
      }

      const url = URL.createObjectURL(file);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = application.resumeName || file.name || "resume";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch {
      setResumeError("Unable to download the resume in this browser.");
    } finally {
      setLoadingResume(false);
    }
  }

  if (!application) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-5 py-16">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <BriefcaseBusiness size={28} />
          </div>
          <h1 className="mt-5 text-2xl font-black text-slate-950">
            Application not found
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            This tracking link may be invalid, or the application may not exist
            in this browser.
          </p>
          <Link
            to="/jobs"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white hover:bg-indigo-700"
          >
            Browse jobs <ArrowLeft size={17} />
          </Link>
        </div>
      </main>
    );
  }

  const currentStatus = application.status || "Applied";
  const isRejected = currentStatus === "Rejected";
  const isConfirmed = currentStatus === "Confirmed";
  const currentStep = STATUS_STEPS.indexOf(currentStatus);
  const history = Array.isArray(application.history)
    ? application.history
    : [];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link
          to={`/jobs/${application.jobId}`}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-indigo-600"
        >
          <ArrowLeft size={17} /> Back to job
        </Link>

        <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0 space-y-6">
            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="bg-slate-950 p-6 text-white sm:p-8">
                <div className="flex items-center gap-3 text-indigo-200">
                  <ShieldCheck size={21} />
                  <span className="text-xs font-extrabold uppercase tracking-[0.16em]">
                    Application tracking
                  </span>
                </div>
                <h1 className="mt-4 text-2xl font-black sm:text-3xl">
                  Track your application
                </h1>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Your application reference is shown below. Keep it for future
                  reference.
                </p>
                <div className="mt-5 inline-flex max-w-full break-all rounded-xl border border-white/10 bg-white/10 px-4 py-3 font-mono text-sm font-bold">
                  {application.id}
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                    <BriefcaseBusiness size={23} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-xl font-black text-slate-950">
                      {application.jobTitle}
                    </h2>
                    <p className="mt-1 font-semibold text-indigo-600">
                      {application.company}
                    </p>
                    <p className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                      <Clock3 size={16} />
                      Submitted {formatDate(application.createdAt)}
                    </p>
                  </div>

                  <StatusBadge status={currentStatus} />
                </div>

                <div className="mt-8 rounded-2xl border border-slate-100 bg-slate-50 p-5">
                  <p className="text-xs font-extrabold uppercase tracking-widest text-slate-500">
                    Current status
                  </p>
                  <h3 className="mt-2 text-xl font-black text-slate-950">
                    {currentStatus}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {STATUS_DETAILS[currentStatus] ||
                      "Your application status has been updated."}
                  </p>
                  <p className="mt-3 text-xs text-slate-400">
                    Last updated: {formatDate(application.updatedAt)}
                  </p>
                </div>

                {!isRejected && (
                  <section className="mt-8">
                    <h3 className="text-lg font-black text-slate-950">
                      Application progress
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Your progress will change when the application status is
                      updated.
                    </p>

                    <div className="mt-6 space-y-0">
                      {STATUS_STEPS.map((step, index) => {
                        const complete =
                          currentStep >= 0 && index <= currentStep;
                        const active = index === currentStep;

                        return (
                          <div key={step} className="flex gap-4">
                            <div className="flex w-8 shrink-0 flex-col items-center">
                              <span
                                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                                  complete
                                    ? "bg-indigo-600 text-white"
                                    : "border-2 border-slate-200 bg-white text-slate-400"
                                }`}
                              >
                                {complete ? (
                                  <Check size={16} />
                                ) : (
                                  <span className="text-xs font-bold">
                                    {index + 1}
                                  </span>
                                )}
                              </span>
                              {index < STATUS_STEPS.length - 1 && (
                                <span
                                  className={`my-1 min-h-9 w-0.5 ${
                                    complete && index < currentStep
                                      ? "bg-indigo-600"
                                      : "bg-slate-200"
                                  }`}
                                />
                              )}
                            </div>

                            <div className="pb-7">
                              <p
                                className={`font-bold ${
                                  active
                                    ? "text-indigo-700"
                                    : complete
                                      ? "text-slate-900"
                                      : "text-slate-400"
                                }`}
                              >
                                {step}
                                {active && (
                                  <span className="ml-2 text-xs font-semibold">
                                    Current
                                  </span>
                                )}
                              </p>
                              <p className="mt-1 text-sm leading-6 text-slate-500">
                                {STATUS_DETAILS[step]}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                )}

                {isRejected && (
                  <div className="mt-8 flex gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800">
                    <XCircle size={22} className="mt-0.5 shrink-0" />
                    <div>
                      <p className="font-bold">Application not selected</p>
                      <p className="mt-1 text-sm leading-6">
                        This application is marked as rejected. You can
                        continue exploring other opportunities.
                      </p>
                    </div>
                  </div>
                )}

                {isConfirmed && (
                  <div className="mt-8 flex gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
                    <CheckCircle2 size={22} className="mt-0.5 shrink-0" />
                    <div>
                      <p className="font-bold">Selection confirmed</p>
                      <p className="mt-1 text-sm leading-6">
                        Your application is marked as confirmed in this demo.
                        Contact the employer directly for official next steps.
                      </p>
                    </div>
                  </div>
                )}

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to="/jobs"
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-extrabold text-white hover:bg-indigo-700"
                  >
                    Browse more jobs
                  </Link>
                  <Link
                    to="/profile"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
                  >
                    My dashboard
                  </Link>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-lg font-black text-slate-950">
                Status history
              </h2>
              <div className="mt-5 space-y-5">
                {history.length > 0 ? (
                  history.map((entry, index) => (
                    <div key={`${entry.status}-${entry.date}-${index}`} className="flex gap-3">
                      <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                        <CheckCircle2 size={17} />
                      </span>
                      <div className="min-w-0">
                        <p className="font-bold text-slate-900">
                          {entry.status}
                        </p>
                        <p className="mt-1 text-sm leading-6 text-slate-500">
                          {entry.note || STATUS_DETAILS[entry.status] || ""}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {formatDate(entry.date)}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">
                    No status history is available.
                  </p>
                )}
              </div>
            </section>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-black text-slate-950">
                Candidate details
              </h2>
              <div className="mt-5 space-y-4 text-sm">
                <Detail label="Full name" value={application.name} />
                <Detail label="Email" value={application.email} />
                <Detail label="Phone" value={application.phone} />
                <Detail
                  label="Location"
                  value={application.location || "Not provided"}
                />
                <Detail
                  label="Experience"
                  value={application.experience || "Not provided"}
                />
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <FileText size={21} />
                </span>
                <div className="min-w-0">
                  <h2 className="font-black text-slate-950">Your resume</h2>
                  <p className="mt-1 break-all text-xs leading-5 text-slate-500">
                    {application.resumeName || "Resume attached"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={downloadResume}
                disabled={loadingResume}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
              >
                <Download size={17} />
                {loadingResume ? "Preparing..." : "Download resume"}
              </button>

              {resumeError && (
                <p role="alert" className="mt-3 text-sm leading-6 text-red-600">
                  {resumeError}
                </p>
              )}
            </section>

            {application.coverLetter && (
              <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="font-black text-slate-950">Cover letter</h2>
                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">
                  {application.coverLetter}
                </p>
              </section>
            )}

            <div className="rounded-3xl bg-slate-950 p-6 text-white">
              <MapPin size={23} className="text-indigo-300" />
              <h2 className="mt-4 text-lg font-black">
                Keep moving forward
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Keep your application reference and check back for updates.
              </p>
              <Link
                to="/jobs"
                className="mt-5 inline-flex items-center gap-2 font-bold text-indigo-300 hover:text-white"
              >
                Find another job <ArrowLeft size={16} />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-1 break-words font-bold text-slate-900">
        {value || "Not provided"}
      </p>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Applied: "bg-blue-50 text-blue-700 ring-blue-200",
    "Under Review": "bg-amber-50 text-amber-700 ring-amber-200",
    Shortlisted: "bg-violet-50 text-violet-700 ring-violet-200",
    Rejected: "bg-red-50 text-red-700 ring-red-200",
    Confirmed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  };

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-xs font-extrabold ring-1 ${
        styles[status] || styles.Applied
      }`}
    >
      {status === "Rejected" ? (
        <XCircle size={15} />
      ) : status === "Confirmed" ? (
        <CheckCircle2 size={15} />
      ) : (
        <Clock3 size={15} />
      )}
      {status}
    </span>
  );
}
