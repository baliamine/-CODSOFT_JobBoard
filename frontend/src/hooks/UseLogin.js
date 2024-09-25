import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      // Save token and role from the response
      localStorage.setItem("user", JSON.stringify(json)); // Save entire user object
      setIsLoading(false);
      // Redirect based on role
      navigate(json.role === "employer" ? "/employer-home" : "/JobSeeker-home");
    }
  };

  return { login, error, isLoading };
};
