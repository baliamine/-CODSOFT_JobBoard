import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UseAuthContext from "./UseAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = UseAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/API/user/login", {
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
        // Redirect based on role
        navigate(
          data.role === "employer" ? "/employer-home" : "/JobSeeker-home"
        );
      }
    } catch (err) {
      // Catch JSON parsing errors or network errors
      setIsLoading(false);
      setError("Something went wrong. Please try again.");
      console.error("Login Error:", err);
    }
  };

  return { login, error, isLoading };
};
