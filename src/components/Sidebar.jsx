import "./Sidebar.css";

import Logo from "../assests/logo.svg";
import HomeIcon from "../assests/icon-nav-home.svg";
import HomeActive from "../assests/icon-nav-home-active.svg";

import MovieIcon from "../assests/icon-nav-movies.svg";
import MovieLight from "../assests/icon-nav-movies-light.svg";
import SeriesLight from "../assests/icon-nav-tv-series-light.svg";
import SeriesIcon from "../assests/icon-nav-tv-series.svg";
import Bookmark from "../assests/icon-nav-bookmark.svg";
import BookmarkLight from "../assests/icon-nav-bookmark-active.svg";
import ManageIcon from "../assests/manage-account.svg";
import ManageIconActive from "../assests/manage-account-active.svg";
import ToggleOnIcon from "../assests/toggle-on.svg";
import ToggleOffIcon from "../assests/toggle-off.svg";
import LogoutIcon from "../assests/logout.svg";

import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { useLogout } from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";
import { useTheme } from "../hooks/useTheme";

export default function Sidebar() {
  const location = useLocation();
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const navigate = useNavigate();
  const [settings, showSettings] = useState(false);

  const [accountActive, setAccountActive] = useState(false);

  const toggleSettings = () => {
    showSettings(!settings);
    setAccountActive(!accountActive);
  };

  const { changeMode, mode } = useTheme();
  const toggleMode = () => {
    console.log("before", mode);
    changeMode(mode === "dark" ? "light" : "dark");
    console.log("after", mode);
  };

  const navLinks = [
    {
      path: "/",
      title: "Home",
      activeIcon: HomeActive,
      inactiveIcon: HomeIcon,
    },
    {
      path: "/movies",
      title: "Movies",
      activeIcon: MovieLight,
      inactiveIcon: MovieIcon,
    },
    {
      path: "/series",
      title: "TV Series",
      activeIcon: SeriesLight,
      inactiveIcon: SeriesIcon,
    },
    {
      path: "/bookmarks",
      title: "Bookmarks",
      activeIcon: BookmarkLight,
      inactiveIcon: Bookmark,
    },
  ];

  return (
    <aside className="sidebar__container">
      <NavLink to="/" className="sidebar__logo" title="Logo">
        <img src={Logo} alt="" />
      </NavLink>
      <div className="sidebar__nav">
        {navLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className="sidebar__nav-item"
            title={link.title}
          >
            <img
              src={
                link.path === location.pathname
                  ? link.activeIcon
                  : link.inactiveIcon
              }
              alt=""
            />
          </NavLink>
        ))}
      </div>

      <div className="sidebar__functionalities">
        <img
          onClick={toggleSettings}
          className="account--settings"
          src={accountActive ? ManageIconActive : ManageIcon}
          alt=""
        />

        {settings && (
          <>
            <img
              className="theme--changer"
              onClick={toggleMode}
              src={mode === "light" ? ToggleOnIcon : ToggleOffIcon}
              alt=""
            />

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

      <div className="account__image sidebar--image">
        <img src={user.photoURL} alt="" />
      </div>
    </aside>
  );
}
