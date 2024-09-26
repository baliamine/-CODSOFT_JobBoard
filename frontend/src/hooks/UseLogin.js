import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/API/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // Log the response for debugging
      const responseText = await response.text();
      console.log("Response Text:", responseText);

      if (!response.ok) {
        // Handle non-OK responses (404, 500, etc.)
        setIsLoading(false);
        setError(`Error: ${response.status} - ${response.statusText}`);
        return;
      }

      // If the response is OK, try parsing it as JSON
      const json = JSON.parse(responseText);

      // Save token and role from the response
      localStorage.setItem("user", JSON.stringify(json)); // Save entire user object
      setIsLoading(false);

      // Redirect based on role
      navigate(json.role === "employer" ? "/employer-home" : "/JobSeeker-home");
    } catch (err) {
      // Catch JSON parsing errors or network errors
      setIsLoading(false);
      setError("Something went wrong. Please try again.");
      console.error("Login Error:", err);
    }
  };

  return { login, error, isLoading };
};
