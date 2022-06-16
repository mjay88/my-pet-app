import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import "../App.scss";

const Header = () => {
  //get user from context, so we can use it for our conditional rendering
  const { user, logout } = useGlobalContext();
  //destructure pathname from useLocation
  const { pathname } = useLocation();

  return (
    <div className="main-header">
      <div className="main-header__inner">
        <div className="main-header__left">
          <Link to="/">Home</Link>
          <Link to="/search">Search</Link>
          <Link to="/favorites">Favorites</Link>
        </div>

        <div className="main-header__right">
          {/*if user is true we are logged in so our button is a logout button, if user is not true and we are on the home page or path, display our register/login page, and if we are logging in the button reads "register"*/}
          {user ? (
            <button className="btn" onClick={logout}>
              Logout
            </button>
          ) : pathname === "/" ? (
            <Link to="/register" className="btn">
              Register
            </Link>
          ) : (
            <Link to="/login" className="btn">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
