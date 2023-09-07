import { useState } from "react";
import { Link } from "react-router-dom";
import { addToCartInLocalStorage, useLocalStorage } from "./LocalStor"; // Importa la función de agregar al carrito
import { FaShoppingCart } from "react-icons/fa";

const Card = ({ id, title, cover_image, price, stock }) => {
  const [isGreen, setIsGreen] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleAddToCart = () => {
    // Llama a la función para agregar al carrito con los datos correctos
    if (!isButtonDisabled) {
      // Evita múltiples clics deshabilitando el botón
      setIsButtonDisabled(true);

      // Llama a la función para agregar al carrito con los datos correctos
      addToCartInLocalStorage({ id, title, cover_image, price, stock });
      setIsGreen(true);
      useLocalStorage();
    }
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
          Precio: <span className="text-black">${price}</span>
        </h2>
      </div>
      <div
        onClick={handleAddToCart}
        disabled={isButtonDisabled}
        className={` bg-black flex justify-center items-center h-8 text-white rounded-md mb-4 cursor-pointer ${
          isGreen ? "pointer-events-none" : ""
        }`}
      >
        <span className="mr-2 hover:text-red-800 transition-colors">
          Agregar al carrito
        </span>
        <button>
          <FaShoppingCart className={isGreen ? "text-green-800 " : ""} />
        </button>
      </div>
    </div>
  );
};

export default Card;
