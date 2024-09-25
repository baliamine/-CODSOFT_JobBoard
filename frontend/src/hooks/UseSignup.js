import { useState } from "react";
import UseAuthContext from "./UseAuthContext";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = UseAuthContext();
  const navigate = useNavigate();

  const signup = async (email, password,role) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password,role }),
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
      navigate(
        role === "employer" ? "/employer-home" : "/JobSeeker-home"
      );
    }
  };

  return { signup, isLoading, error };
};
