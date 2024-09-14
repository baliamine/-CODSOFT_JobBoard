import { useState } from "react";
import { useLogin } from "../../hooks/UseLogin";
import "./login.css"; // Assuming you use a separate CSS file for login

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h3>Login to Your Account</h3>

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

        <button type="submit" className="login-btn" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>

        {error && <div className="error-msg">{error.message}</div>}
      </form>
    </div>
  );
};

export default Login;
