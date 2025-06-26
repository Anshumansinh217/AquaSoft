// src/components/AdminPrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

const AdminPrivateRoute = ({ children }) => {
  const { isAdminAuthenticated } = useAdminAuth();
  return isAdminAuthenticated ? children : <Navigate to="/admin-login" />;
};

export default AdminPrivateRoute;
