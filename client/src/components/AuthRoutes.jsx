import { Navigate } from "react-router-dom";

// Protects routes from unauthorized users
export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

// Prevents logged-in users from accessing login/signup pages
export const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/" /> : children;
};
