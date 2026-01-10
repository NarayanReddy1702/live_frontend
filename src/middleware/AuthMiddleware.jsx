import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";

const AuthMiddleware = () => {
  const { user, token, loading } = useContext(AuthContext);
  const location = useLocation();

 
  if (loading) return null; 

  // Not logged in
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

 
  if (user.role === "admin" && !location.pathname.startsWith("/admin")) {
    return <Navigate to="/admin" replace />;
  }


  if (user.role !== "admin" && location.pathname.startsWith("/admin")) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AuthMiddleware;
