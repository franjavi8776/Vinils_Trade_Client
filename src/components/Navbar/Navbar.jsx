import React, { useState, useEffect } from "react";
import Search from "../Search/Search";
import { Link } from "react-router-dom";
import { BsFillSunFill, BsFillMoonStarsFill } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { GoX } from "react-icons/go";
import "./Navbar.css";

const Navbar = ({ updateHtmlClass }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        className={`sticky top-0 ${navbarClass} text-white lg:w-[100%] h-[6vh] lg:flex z-10`}
      >
        <div className="lg:hidden w-full h-[6vh] flex justify-between items-center p-3">
          <button onClick={toggleDarkMode} className="lg:flex">
            {darkMode ? (
              <BsFillMoonStarsFill className="text-xl text-blue-500" />
            ) : (
              <BsFillSunFill className="text-2xl text-yellow-500" />
            )}
          </button>
          <div className="w-[80%] flex justify-center items-center ">
            <Search />
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? (
              <GoX className="w-8 h-8 font-bold" />
            ) : (
              <RxHamburgerMenu className="w-8 h-8 " />
            )}
          </button>
        </div>
        <div
          className={`lg:flex lg:w-[100%]  ${
            mobileMenuOpen ? "block" : "hidden"
          }`}
        >
          <div className="h-[96vh] flex flex-col items-center bg-black bg-opacity-80 lg:w-[40%] lg:h-[6vh] lg:flex lg:flex-row lg:justify-center lg:items-center xl:gap-20 lg:gap-10 lg:bg-transparent lg:text-md">
            <button onClick={toggleDarkMode} className="hidden lg:flex">
              {darkMode ? (
                <BsFillSunFill className="text-2xl text-yellow-500" />
              ) : (
                <BsFillMoonStarsFill className="text-xl text-blue-500" />
              )}
            </button>
            <Link
              onClick={() => setMobileMenuOpen(false)}
              to="/form"
              className="mt-40 lg:m-4  lg:text-white lg:font-semibold lg:link-with-hover-line lg:text-md "
            >
              Publicar
            </Link>
            <Link
              to="/dashboard"
              className="mt-40 lg:m-4  lg:text-white lg:font-semibold lg:link-with-hover-line lg:text-md"
            >
              Dashboard
            </Link>
            <Link
              onClick={() => setMobileMenuOpen(false)}
              to="/"
              className="mt-40 k lg:m-4 lg:text-white lg:font-semibold lg:link-with-hover-line
              lg:text-md"
            >
              Home
            </Link>
          </div>
          <div className="lg:w-[60%] lg:flex lg:justify-center lg:items-center hidden">
            <Search />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
