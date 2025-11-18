import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { store } from "./data/store";

// Lazy-loaded pages (initial placeholders, will be implemented later)
const Landing = lazy(() => import("./pages/Landing"));
const Login = lazy(() => import("./pages/Login"));
const Booking = lazy(() => import("./pages/Booking"));

function Layout() {
  return (
    <div className="app-shell">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main" role="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function RequireAuth({ children }: { children: React.ReactNode }) {
  if (!store.user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

export function AppRouter() {
  return (
    <Suspense
      fallback={
        <div role="status" aria-live="polite">
          Loading...
        </div>
      }
    >
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Landing />} />
            <Route path="login" element={<Login />} />
            <Route
              path="booking"
              element={
                <RequireAuth>
                  <Booking />
                </RequireAuth>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default AppRouter;
