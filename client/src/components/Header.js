import React from "react";
import { Link, useLocation } from "react-router-dom";
import Search from "./Search";
import { useGlobalContext } from "../context/GlobalContext";

const Header = () => {
  //get user from context, so we can use it for our conditional rendering
  const { user, logout } = useGlobalContext();
  //destructure pathname from useLocation
  const { pathname } = useLocation();

  return (
    <div className="main-header">
      <div className="main-header__inner">
        <div className="main-header__left">
          <Link to="/">Main</Link>
          <Link to="/search">Search</Link>
          <Link to="/">Favorites</Link>
          <Link to="/registration">Register</Link>
          <Link to="/login">Login</Link>
        </div>
      
      </div>
    </div>
  );
};

export default Header;
