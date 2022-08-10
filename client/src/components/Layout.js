import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Search from "./Search";
import AuthBox from "./AuthBox";
import Footer from "./Footer";
import Home from "./Home";
import FavoritesLayout from "./FavoritesLayout";
import "../App.scss";
import { useGlobalContext } from "../context/GlobalContext";

const Layout = (props) => {

const {animals} = props;
   //checks state and returns whether fetchingUser is true or false
   const { fetchingUser } = useGlobalContext();
   //if fetching User is false, display our loading div
  return  fetchingUser ? (
    <div className="loading">
   <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
  ) : (
    <BrowserRouter>
       <Header />
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/search" element={<Search animals={animals}/>} />
        {/**if registration prop is true, conditional logic for login router, else -  route */}
        <Route exact path="/favorites" element={<FavoritesLayout />} />
        <Route exact path="/register" element={<AuthBox register/>} />
        <Route exact path="/login" element={<AuthBox />} />

      </Routes>
        <Footer />
    </BrowserRouter>
  );
};

export default Layout;