import { useState } from "react";

import showPassword from "../../assests/visibility-off.svg";
import hidePassword from "../../assests/visibility-on.svg";
import UploadIcon from "../../assests/upload.svg";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { auth } from "../../firebase/config";
import { AnimatePresence, motion } from "framer-motion";

function Signup() {
  const navigate = useNavigate();
  const { error, isPending, signup } = useSignup();
  const [displayPassword, setDisplayPassword] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);

  const [emailError, setEmailError] = useState(null);

  const handleFileChange = (e) => {
    setThumbnail(null);
    let selected = e.target.files[0];

    if (!selected) {
      setThumbnailError("Please select a file");
      return;
    }

    if (!selected.type.includes("image")) {
      setThumbnailError("Selected file must be an image");
      return;
    }

    if (selected.size > 1000000) {
      setThumbnailError("Image File size must be less than 1mb");
      return;
    }

    setThumbnailError(null);
    setThumbnail(selected);
  };

  const togglePasswordVisibility = () => {
    setDisplayPassword(!displayPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods.length > 0) {
        setEmailError("This email is already in use");
        setTimeout(() => {
          setEmailError(null);
        }, 3000);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setDisplayName("");
        return;
      }
    } catch (err) {
      console.log(err);
    }

    if (password === confirmPassword) {
      signup(email, password, displayName, thumbnail).then(() => navigate("/"));
    } else {
      setPasswordError("Passwords do not match");
      setTimeout(() => {
        setPasswordError(null);
      }, 3000);
    }

    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setDisplayName("");
  };

  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    // transition: { duration: 4 },
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
        className="signup__section"
      >
        <h1>Sign up</h1>
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
            required
            value={password}
          />
          <span>Password</span>
          <img
            onClick={togglePasswordVisibility}
            className="toggle-visibility"
            src={displayPassword ? hidePassword : showPassword}
            alt="Visbility toggle"
          />
        </div>
        <div className="password">
          <input
            className={`password--input ${confirmPassword ? "has-value" : ""}`}
            type={displayPassword ? "text" : "password"}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            value={confirmPassword}
          />

          <span>Confirm Password</span>
          <img
            onClick={togglePasswordVisibility}
            className="toggle-visibility"
            src={displayPassword ? hidePassword : showPassword}
            alt="Visibility toggle"
          />
        </div>

        <div className="display__name">
          <input
            className={`display--input ${displayName ? "has-value" : ""}`}
            required
            type="text"
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
          />
          <span>Username</span>
        </div>
        <div className="profile__picture">
          <input
            id="file"
            className="avatar--input"
            onChange={handleFileChange}
            type="file"
            src={showPassword}
            alt="Avatar"
            required
            name="file"
          />
          {thumbnailError && <p className="error">{thumbnailError}</p>}
          <label className="avatar--label" htmlFor="file">
            Uplaod your Avatar{" "}
            <img className="upload--icon" src={UploadIcon} alt="" />
          </label>
        </div>
        <button className="submit small--text">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Sign up
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
        {error && <p className="error">{error}</p>}
        {passwordError && <p className="error">{passwordError}</p>}

        {emailError && <p className="error email--error">{emailError}</p>}
        <div className="sign-in-route">
          <p> Already have an acount? </p>
          <Link to="/login">Login here </Link>
        </div>
      </motion.form>
    </AnimatePresence>
  );
}

export default Signup;
