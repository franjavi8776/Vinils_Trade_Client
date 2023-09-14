import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions"; // Asegúrate de importar la acción correcta
import { FaShoppingCart } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';
const Card = ({ id, title, cover_image, price, stock }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItems);
  const notify1 = () => toast.error("Debes iniciar sesion");
  const notify2 = () => toast.error("No hay stock disponible");
  const [isGreen, setIsGreen] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const isAuthenticated = useSelector((state) => state.token !== null);
  // Verifica si el producto ya está en el carrito
  const itemInCart = cartItems.find((item) => item.id === id);

  useEffect(() => {
    // Verifica si el producto ya está en el carrito
    const itemInCart = cartItems.find((item) => item.id === id);

    // Establece isGreen en función de si itemInCart existe
    setIsGreen(!!itemInCart);
    setIsButtonDisabled(!!itemInCart);
  }, [cartItems, id]);

  const handleAddToCart = () => {
    if (isAuthenticated) {
      if (!isButtonDisabled) {
        setIsButtonDisabled(true);

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
            notify2(); // Notificación de falta de stock
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
                stock: stock - 1,
                cartQuantity: 1,
              })
            );
          } else {
            notify2(); // Notificación de falta de stock
          }
        }

        setIsGreen(true);
      }
    } else {
      notify1(); // Notificación de "Debes iniciar sesión"
    }
  };

  return (
    <div className="w-60 h-[315px] text-md dark:bg-slate-200 dark:text-black rounded-md">
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
      <Toaster/>
    </div>
  );
};

export default Card;
