import React from "react";
import Search from "../Search/Search";
import { Link } from "react-router-dom";
import Vinyls from "../../assets/Vinyls2.png";

const Navbar = () => {
  return (
    <div className="sticky top-0 bg-black bg-opacity-90  z-50">
      <div>
        <div className="w-full h-[16vh] bg-gradient-to-r from-red-700 to-red-950 animate-gradient-bg flex justify-center items-center">
          <img
            src={Vinyls}
            alt="Vinyls-Trade"
            className="w-[180px] h-[180px]"
          />
        </div>

        <div className="w-full h-[5vh] flex ">
          <div className="w-[50%] h-[5vh] flex justify-center items-center gap-20">
            {/* <Link to="/Login" className="text-white hover:text-blue-300">
              Crear tu cuenta
            </Link> */}
            <Link to="/form" className="text-white hover:text-blue-300">
              Publica tu vinilo
            </Link>
            <Link to="/" className="text-white hover:text-blue-300">
              Home
            </Link>
          </div>
          <div className="w-[50%] h-[5vh] flex justify-center items-center">
            <Search />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
