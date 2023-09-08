import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions"; // Asegúrate de importar la acción correcta
import { FaShoppingCart } from "react-icons/fa";

const Card = ({ id, title, cover_image, price, stock }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItems);

  const [isGreen, setIsGreen] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleAddToCart = () => {
    if (!isButtonDisabled) {
      setIsButtonDisabled(true);

      // Verifica si el producto ya está en el carrito
      const itemInCart = cartItems.find((item) => item.id === id);

      // Si el producto ya está en el carrito, aumenta la cantidad en lugar de agregar uno nuevo
      if (itemInCart) {
        if (itemInCart.cartQuantity < stock) {
          dispatch(
            addToCart({
              ...itemInCart,
              cartQuantity: itemInCart.cartQuantity + 1,
            })
          );
        } else {
          alert("No hay suficiente stock disponible para este producto.");
        }
      } else {
        // Agrega el producto al carrito
        if (stock > 0) {
          dispatch(
            addToCart({
              id,
              title,
              cover_image,
              price,
              stock,
              cartQuantity: 1,
            })
          );
        } else {
          alert("No hay stock disponible para este producto.");
        }
      }

      setIsGreen(true);
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
        disabled={isButtonDisabled || stock === 0}
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
