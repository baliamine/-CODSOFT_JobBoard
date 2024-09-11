import { useState } from "react";
import UseAuthContext from "./UseAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(null);
  const { dispatch } = UseAuthContext();

  const signup = async (email, password) => {
    setisLoading(true);
    setError(null);

    const response = await fetch("api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!data) {
      setisLoading(false);
      setError(data.error);
    }
    if (data) {
      // save the user to localStorage
      localStorage.setItem("user", JSON.stringify(data));
      // update the context;
      dispatch({ type: "Login", payload: data });
      setisLoading(false);
      
    }
    return {signup,isLoading,error}
  };
};
