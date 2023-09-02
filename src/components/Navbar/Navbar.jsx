import React, { useState, useEffect } from "react";
import Search from "../Search/Search";
import { Link } from "react-router-dom";
import "./Navbar.css";



const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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

  const navbarClass = isScrolled
    ? "  transition-all duration-100 bg-black bg-opacity-90 "
    : " transition-all duration-100 bg-black bg-opacity-90";

  const navbarContentClass = isScrolled
    ?"flex bg-black bg-opacity-90  justify-between text-center items-center transition-all duration-100 h-30  "
    : "flex bg-black bg-opacity-90  justify-center items-center  transition-all duration-100";

  return (
    <>
    <div className="flex items-center justify-center bg-gradient-to-r from-red-700 to-red-950 animate-gradient-bg">
      <img src="/Vinyls_Trade.png" alt="Vinyls-Trade" className="w-48 ml-8 " />
    </div>
    <div className={`sticky top-0 ${navbarClass} text-white z-50`}>
      <div className={navbarContentClass}>
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
        <Search />
      </div>
      {/* <div className=" w-[50%] flex justify-center items-center ">
      </div> */}
    </div></>
  );
};

export default Navbar;



