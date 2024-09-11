import  UseAuthContext  from "./UseAuthContext";

export const useLogout = () => {
  const { dispatch } = UseAuthContext();
  const logout = () => {
    // remove user from storge
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
