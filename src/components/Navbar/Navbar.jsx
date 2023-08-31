import React from "react";
import Search from "../Search/Search";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="sticky top-0 bg-gradient-to-r from-red-700 to-red-900 animate-gradient-bg  z-50">
      <div className=" flex items-center justify-between max-w-screen-xl mx-auto">
        <div className="  gap-6 flex flex-wrap w-2/3">
          <Link to="/Login" className="text-white hover:text-blue-300">
            Crear tu cuenta
          </Link>
          <Link to="/form" className="text-white hover:text-blue-300">
            Publica tu vinilo
          </Link>
          <Link to="/" className="text-white hover:text-blue-300">
            Home
          </Link>
        </div>
        <Search />
      </div>
    </div>
  );
};

export default Navbar;
