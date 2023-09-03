import React from "react";
import { Link } from "react-router-dom";

const Card = ({ id, title, cover_image, cost, stock }) => {
  return (
    <div className="w-60 h-70 ">
      <Link to={`/detail/${id}`}>
        <img className="w-60 h-60" src={cover_image} alt={title} />
      </Link>
      <h2 className="text-md h-10 truncate text-center font-bold mb-[-20px]">
        {title}
      </h2>
      <div className="w-full flex justify-between">
        <h2 className="text-red-900">
          Stock: <b className="text-black">{stock}</b>
        </h2>
        <h2 className="text-red-900">
          Precio: <b className="text-black">{cost}$us</b>
        </h2>
      </div>

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
