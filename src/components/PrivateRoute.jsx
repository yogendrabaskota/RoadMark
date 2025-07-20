import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"; // Default import

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
