import  UseAuthContext  from "./UseAuthContext";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const { dispatch } = UseAuthContext();
  const navigate = useNavigate();
  const logout = () => {
    // remove user from storge
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    navigate("/"); // Redirect to login page after logout
  };

  return { logout };
};
