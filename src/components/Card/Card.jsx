import React from "react";
import { Link } from "react-router-dom";
import { addToCartInLocalStorage } from "./LocalStor"; // Importa la función de agregar al carrito

const Card = ({ id, title, cover_image, cost, stock }) => {
  const handleAddToCart = () => {
    // Llama a la función para agregar al carrito con los datos correctos
    addToCartInLocalStorage({ id, title, cover_image, cost, stock });
  };

  return (
    <div className="w-60 h-70 text-md">
      <Link to={`/detail/${id}`}>
        <img className="w-60 h-60" src={cover_image} alt={title} />
      </Link>
      <h2 className=" h-10 truncate text-center mb-[-20px]">{title}</h2>
      <div className="w-full flex justify-between text-md">
        <h2 className="text-red-900">
          Stock: <span className="text-black">{stock}</span>
        </h2>
        <h2 className="text-red-900">
          Precio: <span className="text-black">${cost}</span>
        </h2>
      </div>
      <div
        onClick={handleAddToCart}
        className=" bg-black flex justify-center items-center h-8 text-white rounded-md mb-4 cursor-pointer"
      >
        <span className="mr-2 hover:text-red-600 transition-colors">
          Agregar al carrito
        </span>
        <button>
          <img src="/carrito.png" alt="carrito" className="w-5" />
        </button>
      </div>
    </div>
  );
};

export default Card;
