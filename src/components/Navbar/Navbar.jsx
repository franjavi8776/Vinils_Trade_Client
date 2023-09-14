import React, { useState, useEffect } from "react";
import Search from "../Search/Search";
import { Link } from "react-router-dom";
import { BsFillSunFill, BsFillMoonStarsFill } from "react-icons/bs";
import "./Navbar.css";


const Navbar = ({ updateHtmlClass }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 160) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    updateHtmlClass(!darkMode);
  };

  const navbarClass = isScrolled
    ? "transition-all duration-100 bg-black bg-opacity-70"
    : "transition-all duration-100 bg-black bg-opacity-90";

  return (
    <>
      <div className="flex items-center justify-center bg-gradient-to-r from-red-700 to-red-950 animate-gradient-bg z-0">
        <img
          src="https://res.cloudinary.com/duclhjrri/image/upload/v1694658155/Vinyls_Trade_rup9pc.png"
          alt="Vinyls-Trade"
          className="w-48 ml-8 "
        />
      </div>
      <div
        className={`sticky top-0 ${navbarClass} text-white w-[100%] flex z-10 `}
      >
        <div className="w-[40%] flex justify-center items-center xl:gap-20 lg:gap-10 ">
          <button onClick={toggleDarkMode}>
            {darkMode ? (
              <BsFillSunFill className="text-2xl text-yellow-500" />
            ) : (
              <BsFillMoonStarsFill className="text-xl text-blue-500" />
            )}
          </button>
          <Link
            to="/form"
            className="m-4 text-white font-semibold link-with-hover-line"
          >
            Publicar
          </Link>
          <Link
            to="/"
            className="m-4 text-white font-semibold link-with-hover-line"
          >
            Home
          </Link>
        </div>
        <div className="w-[60%] flex justify-center items-center">
          <Search />
        </div>
        {/* <div className=" w-[50%] flex justify-center items-center ">
      </div> */}
      </div>
    </>
  );
};

export default Navbar;
