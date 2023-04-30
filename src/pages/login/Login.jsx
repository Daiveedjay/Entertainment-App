import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import showPassword from "../../../public/visibility-off.svg";
import hidePassword from "../../../public/visibility-on.svg";
import { useState } from "react";

import { useLogin } from "../../hooks/useLogin";

export default function Login() {
  const { error, login } = useLogin();

  const navigate = useNavigate();
  const [displayPassword, setDisplayPassword] = useState(null);

  const togglePasswordVisibility = () => {
    setDisplayPassword(!displayPassword);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = login(email, password);

    if (success) {
      navigate("/");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="login__section">
      <h1>Login</h1>
      <div className="email">
        <input
          className={`email--input ${email ? "has-value" : ""}`}
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <span>Email</span>
      </div>
      <div className="password">
        <input
          className={`password--input ${password ? "has-value" : ""}`}
          type={displayPassword ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <span>Password</span>
        <img
          onClick={togglePasswordVisibility}
          className="toggle-visibility"
          src={displayPassword ? hidePassword : showPassword}
          alt=""
        />
      </div>
      <button className="submit small--text">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Login
      </button>

      {error && <p>{error}</p>}
      <div className="sign-in-route">
        <p> Don&apos;t have an acount? </p>
        <Link to="/signup">Sign up here </Link>
      </div>
    </form>
  );
}
