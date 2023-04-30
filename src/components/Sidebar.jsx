import "./Sidebar.css";

import Logo from "../../public/logo.svg";
import HomeIcon from "../../public/icon-nav-home.svg";
import MovieIcon from "../../public/icon-nav-movies.svg";
import SeriesIcon from "../../public/icon-nav-tv-series.svg";
import Bookmark from "../../public/icon-nav-bookmark.svg";
import ManageIcon from "../../public/manage-account.svg";
import ToggleOnIcon from "../../public/toggle-on.svg";
import LogoutIcon from "../../public/logout.svg";

import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useLogout } from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const { logout } = useLogout();

  const navigate = useNavigate();
  const [settings, showSettings] = useState(false);

  const toggleSettings = () => {
    showSettings(!settings);
  };
  return (
    <aside className="sidebar__container">
      <div className="sidebar__nav">
        <NavLink to="/" className="sidebar__nav-item">
          <img src={Logo} alt="" />
        </NavLink>
        <NavLink to="/" className="sidebar__nav-item">
          <img src={HomeIcon} alt="" />
        </NavLink>
        <NavLink to="/movies" className="sidebar__nav-item">
          <img src={MovieIcon} alt="" />
        </NavLink>
        <NavLink to="/series" className="sidebar__nav-item">
          <img src={SeriesIcon} alt="" />
        </NavLink>
        <NavLink to="/bookmarks" className="sidebar__nav-item">
          <img src={Bookmark} alt="" />
        </NavLink>
      </div>
      <div className="sidebar__functionalities">
        <img
          onClick={toggleSettings}
          className="account--settings"
          src={ManageIcon}
          alt=""
        />
        {settings && (
          <>
            <img className="theme--changer" src={ToggleOnIcon} alt="" />

            <img
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="logout"
              src={LogoutIcon}
              alt=""
            />
          </>
        )}
      </div>

      <div className="account__image">
        <img src="" alt="" />
      </div>
    </aside>
  );
}
