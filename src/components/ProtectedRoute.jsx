import { useContext } from "react";
import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuthContext();

  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;
