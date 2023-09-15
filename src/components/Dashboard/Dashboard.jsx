import React from "react";
import { BsDiscFill } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
const Dashboard = () => {
  return (
    <div className="w-full h-[100vh] bg-slate-200">
      <div className="w-full h-[5vh] pt-5 pl-5">
        <div className="w-[150px] h-[50px] clip-path-custom bg-slate-400 flex items-center justify-end">
          <Link to="/">
            <h1 className="text-white pr-2">Volver al home</h1>
          </Link>
        </div>
      </div>
      <div className="w-full h-[95vh] flex justify-center items-center gap-48 ">
        <div className="w-[200px] h-[200px] bg-slate-400 shadow-lg shadow-black text-3xl flex flex-col justify-center items-center cursor-pointer active:translate-x-1 active:scale-95 gap-1">
          <h1>USUARIOS</h1>
          <buttom>
            <BiUserCircle className="w-24 h-24" />
          </buttom>
        </div>
        <Link to="/vinylsDash">
        <div className="w-[200px] h-[200px] bg-slate-400 shadow-lg shadow-black text-3xl flex flex-col justify-center gap-3 items-center cursor-pointer active:translate-x-1 active:scale-95">
          <h1>VINILOS</h1>
          <buttom>
            <BsDiscFill className="w-20 h-20" />
          </buttom>
        </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
