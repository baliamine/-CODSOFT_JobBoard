import { useState } from "react";
import { useSignup } from "../../hooks/UseSignup";
import "./signup.css"; // Assuming you're using a dedicated CSS file

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h3>Create Your Account</h3>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          
           
          />
        </div>

        <button type="submit" className="singup-btn" disabled={isLoading}>
          {isLoading ? "Signing up..." : "Sign Up"}
        </button>

        {error && <div className="error-msg">{error}</div>}
      </form>
    </div>
  );
};

export default Signup;
