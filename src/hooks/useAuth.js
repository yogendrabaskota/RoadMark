import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

// Default export version
const useAuth = () => useContext(AuthContext);
export default useAuth;

// OR named export version:
// export const useAuth = () => useContext(AuthContext);
