
const DB_NAME = "qh-resume-db";
const STORE_NAME = "resumes";
const USER_KEY = "current-user";

function openResumeDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveResume(file) {
  const db = await openResumeDB();
  const user = JSON.parse(localStorage.getItem("qh-user") || "null");

  if (!user?.email) {
    db.close();
    throw new Error("Please log in before uploading a resume.");
  }

  const key = user.email.toLowerCase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");

    transaction.objectStore(STORE_NAME).put(
      {
        name: file.name,
        type: file.type,
        size: file.size,
        updatedAt: new Date().toISOString(),
        file,
      },
      key
    );

    transaction.oncomplete = () => {
      db.close();
      resolve();
    };

    transaction.onerror = () => {
      const error = transaction.error;
      db.close();
      reject(error);
    };

    transaction.onabort = () => {
      const error = transaction.error;
      db.close();
      reject(error || new Error("Resume upload was cancelled."));
    };
  });
}

export async function getResume() {
  const db = await openResumeDB();
  const user = JSON.parse(localStorage.getItem("qh-user") || "null");

  if (!user?.email) {
    db.close();
    return null;
  }

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const request = transaction
      .objectStore(STORE_NAME)
      .get(user.email.toLowerCase());

    request.onsuccess = () => {
      const result = request.result || null;
      db.close();
      resolve(result);
    };

    request.onerror = () => {
      const error = request.error;
      db.close();
      reject(error);
    };
  });
}

export async function deleteResume() {
  const db = await openResumeDB();
  const user = JSON.parse(localStorage.getItem("qh-user") || "null");

  if (!user?.email) {
    db.close();
    throw new Error("Please log in again.");
  }

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");

    transaction.objectStore(STORE_NAME).delete(
      user.email.toLowerCase()
    );

    transaction.oncomplete = () => {
      db.close();
      resolve();
    };

    transaction.onerror = () => {
      const error = transaction.error;
      db.close();
      reject(error);
    };
  });
}
