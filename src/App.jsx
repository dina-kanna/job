
import {
  lazy,
  Suspense,
  useEffect,
  useState,
} from "react";

import {
  Route,
  Routes,
  useLocation,
  Link,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const Jobs = lazy(() => import("./pages/Jobs"));
const JobDetails = lazy(() => import("./pages/JobDetails"));
const JobApplication = lazy(() => import("./pages/JobApplication"));
const ApplicationTracking = lazy(
  () => import("./pages/ApplicationTracking")
);
const AuthPage = lazy(() => import("./pages/AuthPage"));
const Profile = lazy(() => import("./pages/Profile"));
const Saved = lazy(() => import("./pages/Saved"));
const Companies = lazy(() => import("./pages/Companies"));
const About = lazy(() => import("./pages/About"));

// Scroll to the top whenever the route changes.
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
}

function AppLayout() {
  const [initialLoading, setInitialLoading] = useState(true);

  return (
    <>
      {initialLoading && (
        <LoadingScreen
          onComplete={() => setInitialLoading(false)}
        />
      )}

      {!initialLoading && (
        <div className="flex min-h-screen flex-col bg-white">
          <ScrollToTop />

          <Navbar />

          <main className="flex-1 animate-fade-in">
            <Suspense fallback={null}>
              <Routes>
                {/* Home */}
                <Route
                  path="/"
                  element={<Home />}
                />

                {/* Jobs */}
                <Route
                  path="/jobs"
                  element={<Jobs />}
                />

                <Route
                  path="/jobs/:id"
                  element={<JobDetails />}
                />

                {/* Application form: candidate details and resume upload */}
                <Route
                  path="/jobs/:id/apply"
                  element={<JobApplication />}
                />

                {/* Application tracking and status */}
                <Route
                  path="/applications/:applicationId/tracking"
                  element={<ApplicationTracking />}
                />

                {/* Authentication */}
                <Route
                  path="/login"
                  element={<AuthPage mode="login" />}
                />

                <Route
                  path="/signup"
                  element={<AuthPage mode="signup" />}
                />

                {/* Candidate dashboard */}
                <Route
                  path="/profile"
                  element={<Profile />}
                />

                <Route
                  path="/saved"
                  element={<Saved />}
                />

                {/* Other pages */}
                <Route
                  path="/companies"
                  element={<Companies />}
                />

                <Route
                  path="/about"
                  element={<About />}
                />

                {/* 404 */}
                <Route
                  path="*"
                  element={
                    <section className="page-container py-24 text-center">
                      <p className="text-sm font-bold uppercase tracking-widest text-brand-600">
                        404 error
                      </p>

                      <h1 className="mt-4 text-4xl font-black text-slate-900">
                        Page not found
                      </h1>

                      <p className="mt-3 text-slate-500">
                        The page you are looking for does not exist.
                      </p>

                      <Link
                        to="/"
                        className="primary-btn mt-6 inline-flex"
                      >
                        Return home
                      </Link>
                    </section>
                  }
                />
              </Routes>
            </Suspense>
          </main>

          <Footer />
        </div>
      )}
    </>
  );
}

export default function App() {
  return <AppLayout />;
}
