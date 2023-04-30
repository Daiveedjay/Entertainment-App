import { useState } from "react";

import showPassword from "../../../public/visibility-off.svg";
import hidePassword from "../../../public/visibility-on.svg";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";

export default function Signup() {
  const navigate = useNavigate();
  const { error, signup } = useSignup();
  const [displayPassword, setDisplayPassword] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);

  const handleFileChange = (e) => {
    setThumbnail(null);
    let selected = e.target.files[0];
    // console.log(selected);

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
    console.log("Thumbnail Updated");
  };

  const togglePasswordVisibility = () => {
    setDisplayPassword(!displayPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    signup(email, password);
    navigate("/");
    console.log(email, password);

    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setDisplayName("");
  };

  return (
    <form onSubmit={handleSubmit} className="signup__section">
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
          // required
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
          // required
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
        <span>Username</span>
      </div>
      <div className="profile__picture">
        <span>Choose Avatar</span>
        <input
          id="avatar-input"
          onChange={handleFileChange}
          type="file"
          src={showPassword}
          alt="Avatar"
          // required
        />
        {thumbnailError && <p className="error">{thumbnailError}</p>}
      </div>
      <button className="submit small--text">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Sign up
      </button>
      {error && <p>{error}</p>}
      <div className="sign-in-route">
        <p> Already have an acount? </p>
        <Link to="/login">Login here </Link>
      </div>
    </form>
  );
}
