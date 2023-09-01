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
    ? "bg-black transparent transition-all duration-100"
    : "bg-black transparent from-white to-red-700 transition-all duration-100";

  const navbarContentClass = isScrolled
    ?"flex justify-between text-center items-center transition-all duration-100 h-30"
    : "flex justify-center items-center  transition-all duration-100";

  return (
        <><Search /><div className={`sticky top-0 ${navbarClass} text-white z-50 `}>
      <div className={navbarContentClass}>
        <Link
          to="/form"
          className="m-4 text-white font-semibold link-with-hover-line"
        >
          Publicar
        </Link>
        <Link
          to="/Home"
          className="m-4 text-white font-semibold link-with-hover-line"
        >
          Home
        </Link>
      </div>
    </div></>
  );
};

export default Navbar;



