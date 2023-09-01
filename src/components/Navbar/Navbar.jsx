import React from "react";
import Search from "../Search/Search";
import { Link } from "react-router-dom";
import Vinyls from "../../assets/vinyl.jpg";

const Navbar = () => {
  return (
    <div className="sticky top-0 bg-black  z-50">
      <div>
        <div className="w-full h-[18vh] bg-white flex justify-center align-middle">
          <img
            src={Vinyls}
            alt="Vinyls-Trade"
            className="w-[180px] h-[180px]"
          />
        </div>
        <div className="w-full h-[5vh]">
          <div>
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
          <div>
            <Search />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
