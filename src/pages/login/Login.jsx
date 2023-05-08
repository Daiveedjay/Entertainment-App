import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import showPassword from "../../assests/visibility-off.svg";
import hidePassword from "../../assests/visibility-on.svg";
import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { AnimatePresence, motion } from "framer-motion";

function Login() {
  const { isPending, error, login } = useLogin();

  const navigate = useNavigate();
  const [displayPassword, setDisplayPassword] = useState(null);

  const togglePasswordVisibility = () => {
    setDisplayPassword(!displayPassword);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);

    if (success) {
      navigate("/");
    }
  };
  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      <motion.form
        onSubmit={handleSubmit}
        initial="initial"
        animate="animate"
        exit="exit"
        transition="transition"
        variants={fadeIn}
        className="login__section"
      >
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
        {isPending && (
          <div className="loading__container">
            <div className="loading">
              <div className=" boxes">
                <div className="box">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div className="box">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div className="box">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div className="box">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        )}
        {error && <p>{error}</p>}
        <div className="sign-in-route">
          <p> Don&apos;t have an acount? </p>
          <Link to="/signup">Sign up here </Link>
        </div>
      </motion.form>
    </AnimatePresence>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default Login;
