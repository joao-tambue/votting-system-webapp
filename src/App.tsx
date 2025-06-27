import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import nookies, { parseCookies } from "nookies";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import RankingPage from "./pages/RankingPage";
import { queryClient } from "./lib/react-query";
import ActivityPage from "./pages/ActivityPage";
import { ToastContainer } from "react-toastify";
import ProjectsPage from "./pages/ProjectsPage";
import { STORAGE_KEYS } from "./constants/storage-keys";
import SubcategoriesPage from "./pages/SubcategoriesPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import { VTS_AUTH_TOKEN } from "./constants/cookies-keys";
import { QueryClientProvider } from "@tanstack/react-query";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const cookies = parseCookies();
  const accessToken = cookies[VTS_AUTH_TOKEN];

  if (!accessToken) {
    STORAGE_KEYS.forEach((item) => {
      localStorage.removeItem(item);
      sessionStorage.removeItem(item);
    });
    nookies.destroy(null, VTS_AUTH_TOKEN, { path: "/" });

    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

const GuestRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const cookies = parseCookies();
  const accessToken = cookies[VTS_AUTH_TOKEN];

  if (accessToken) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <GuestRoute>
                <LoginPage />
              </GuestRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <GuestRoute>
                <SignUpPage />
              </GuestRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/activity/:activityId"
            element={
              <ProtectedRoute>
                <ActivityPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/category/:categoryId/subcategories"
            element={
              <ProtectedRoute>
                <SubcategoriesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/category/:categoryType/:categoryId/projects"
            element={
              <ProtectedRoute>
                <ProjectsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/subcategory/:categoryType/:subcategoryId/projects"
            element={
              <ProtectedRoute>
                <ProjectsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/project/:projectId"
            element={
              <ProtectedRoute>
                <ProjectDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ranking"
            element={
              <ProtectedRoute>
                <RankingPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>

      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
