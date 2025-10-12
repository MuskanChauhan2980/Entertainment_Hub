// AdminRoute.jsx
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  if (!isAdmin) {
    alert("Access denied! Only admin can view this page.");
    return <Navigate to="/" />; // redirect to home
  }

  return children;
};

export default AdminRoute;
