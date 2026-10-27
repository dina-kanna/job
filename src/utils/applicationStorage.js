
const APPLICATIONS_KEY = "qh-applications";
const APPLIED_KEY = "qh-applied";

export function readApplications() {
  try {
    const data = JSON.parse(localStorage.getItem(APPLICATIONS_KEY) || "[]");
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function getApplication(id) {
  return readApplications().find((item) => item.id === id) || null;
}

export function saveApplication(application) {
  const applications = readApplications();
  const index = applications.findIndex((item) => item.id === application.id);

  if (index >= 0) {
    applications[index] = application;
  } else {
    applications.unshift(application);
  }

  localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(applications));

  const appliedIds = JSON.parse(localStorage.getItem(APPLIED_KEY) || "[]");
  const safeIds = Array.isArray(appliedIds) ? appliedIds : [];

  if (!safeIds.includes(application.jobId)) {
    localStorage.setItem(
      APPLIED_KEY,
      JSON.stringify([...safeIds, application.jobId])
    );
  }

  return application;
}

export function getApplicationsForUser(email) {
  if (!email) return [];

  return readApplications().filter(
    (item) => item.email?.toLowerCase() === email.toLowerCase()
  );
}

const DB_NAME = "qh-resume-db";
const STORE_NAME = "resumes";

function openResumeDB() {
  return new Promise((resolve, reject) => {
    if (!("indexedDB" in window)) {
      reject(new Error("Resume storage is not supported by this browser."));
      return;
    }

    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () =>
      reject(request.error || new Error("Unable to open resume storage."));
  });
}

export async function saveResume(applicationId, file) {
  const db = await openResumeDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    transaction.objectStore(STORE_NAME).put(file, applicationId);

    transaction.oncomplete = () => {
      db.close();
      resolve(true);
    };

    transaction.onerror = () => {
      db.close();
      reject(transaction.error || new Error("Unable to save resume."));
    };
  });
}

export async function getResume(applicationId) {
  const db = await openResumeDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const request = transaction.objectStore(STORE_NAME).get(applicationId);

    request.onsuccess = () => {
      db.close();
      resolve(request.result || null);
    };

    request.onerror = () => {
      db.close();
      reject(request.error || new Error("Unable to retrieve resume."));
    };
  });
}
