import { Navigate, Outlet } from "react-router";
import { useAuth } from "./hooks/useAuth";

export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();


  if (loading) return <h1>Loading...</h1>;

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
};
