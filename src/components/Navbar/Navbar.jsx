import React from "react";
import Search from "../Search/Search";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-r from-gray-700 to-gray-900">
      <Search />
      <div className="mt-4">
        <Link to="/Login" className="text-white hover:text-blue-300">
          Crear tu cuenta
        </Link>
        <Link to="/form" className="text-white ml-4 hover:text-blue-300">
        Publica tu vinilo
        </Link>ç
        <Link to="/" className="text-white ml-4 hover:text-blue-300">
        Home
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
