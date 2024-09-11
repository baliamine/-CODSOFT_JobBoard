import { useState } from "react";
import UseAuthContext from "./UseAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = UseAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
    }

    if (response.ok) {
      // save the user to localStorage
      localStorage.setItem("user", JSON.stringify(data));

      // update the context
      dispatch({ type: "LOGIN", payload: data });

      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
