import { useState } from "react";
import UseAuthContext from "./UseAuthContext";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = UseAuthContext();
  const navigate = useNavigate();

  const signup = async ({email, password, role, name, bio, img, companyName, phone, address, skills, education}) => {
    setIsLoading(true);
    setError(null);

    // Create a request body based on the role
    const body = role == "employer"
      ? { email, password, role, name, bio, img, companyName } // Employer-specific data
      : { email, password, role, name, bio, img, phone, address, skills, education }; // Job Seeker-specific data
console.log('body', body)
    const response = await fetch("/api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    console.log('response', response)

    const data = await response.json();
console.log('data', data)
    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
    } else {
      // save the user to localStorage
      localStorage.setItem("user", JSON.stringify(data));

      // update the context
      dispatch({ type: "LOGIN", payload: data });

      setIsLoading(false);
      
      // Redirect based on role
      console.log('role', role)
      navigate(role === "employer" ? "/employer-home" : "/jobseeker-home");
    }
  };

  return { signup, isLoading, error };
};
