import React from "react";
import { Link } from "react-router-dom";

const Card = ({ id, title, year, cover_image }) => {
  return (
    <div className="w-60 h-70 ">
      <Link to={`/detail/${id}`}>
        <img className="w-60 h-60" src={cover_image} alt={title} />
      </Link>
      <h2 className="text-md h-10 truncate text-center font-bold mb-[-20px]">
        {title}
      </h2>
      <h2>{year ? year : "No especificado"}</h2>
      <Link to={"/"}>
        <div className=" bg-black flex justify-center items-center h-8 text-white rounded-md mb-4">
          <span className="mr-2 hover:text-red-600 transition-colors">
            Agregar al carrito
          </span>
          <button>
            <img src="/carrito.png" alt="carrito" className="w-5" />
          </button>
        </div>
      </Link>
    </div>
  );
};

export default Card;
