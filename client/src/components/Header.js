import React from "react";
import { Link, useLocation } from "react-router-dom";
import Search from "./Search";

const Header = () => {

  return (
    <div className="main-header">
      <div className="main-header__inner">
        <div className="main-header__left">
            <Link to="/">Main</Link>
            <Link to="/search">Search</Link>
            <Link to="/authbox">Register/Login</Link>
            <Link to="/">Favorites</Link>


        </div>
        <div className="main-header__right"></div>
      </div>
    </div>
  );
};

export default Header;
