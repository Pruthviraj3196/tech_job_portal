import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import SignUpPage from './components/SignUpPage'
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import { ProtectedRoute, PublicRoute } from "./components/AuthRoutes";
import EditJobPage from "./components/pages/EditJobPage";
import Navbar from "./components/Navbar";
import CreateJobPage from "./components/pages/CreateJobPage";
import { useEffect, useState } from "react";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Convert token to boolean
  }, []);
console.log(isAuthenticated);

  return (
    <Router>
      {/* Show Navbar only when user is authenticated */}
      {isAuthenticated && <Navbar />}
    <Routes>
      {/* Public Routes: Redirect to Home if logged in */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <SignUpPage />
          </PublicRoute>
        }
      />

      {/* Protected Route: Only logged-in users can access */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route path="/edit-job/:jobId" element={<EditJobPage />} />
      <Route path="/create-job" element={<ProtectedRoute><CreateJobPage /></ProtectedRoute>} />
    </Routes>
  </Router>
  )
}

export default App
