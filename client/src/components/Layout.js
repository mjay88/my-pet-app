import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Search from "./Search";
import AuthBox from "./AuthBox";
import "../App.scss";

const Layout = (props) => {
const {animals} = props; 
  return (
    <BrowserRouter>
       <Header />
      <Routes>
        <Route exact path="/" element={<h1>Home</h1>} />
        <Route exact path="/search" element={<Search animals={animals}/>} />
        {/**if login prop is true, conditional logic for login router, else - register route */}
        <Route exact path="/authbox" element={<AuthBox registration/>} />

      </Routes>
    </BrowserRouter>
  );
};

export default Layout;