import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions"; // Asegúrate de importar la acción correcta
import { FaShoppingCart } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const Card = ({ id, title, cover_image, price, stock }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItems);
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

  const notify1 = (message, type) => {
    toast.custom(
      (t) => (
        <div
          className={`${
            type === "success"
              ? "bg-green-500"
              : type === "error"
              ? "bg-white"
              : "bg-blue-500 p-1"
          } p-2 w-80 flex justify-center items-center rounded-2xl mt-14 relative text-black font-light`}
        >
          <div className="text-center justify-center text-lg">{message}</div>
          <div
            className="ml-5 text-red-900 text-2xl"
            onClick={() => t.dismiss()}
          >
            X
          </div>
        </div>
      ),
      {
        duration: 1000,
      }
    );
  };

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
            // Mueve la llamada a toast.success aquí para mostrar el mensaje de éxito
            toast.success("Producto agregado al carrito correctamente");
          } else {
            notify1("No hay disponibles", "error"); // Notificación de falta de stock
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
            // Mueve la llamada a toast.success aquí para mostrar el mensaje de éxito
          } else {
            notify1("No hay disponibles", "error"); // Notificación de falta de stock
          }
        }
        
        toast.success("Producto agregado al carrito correctamente");
        setIsGreen(true);
      }
      notify1("Item agregado", "success");
    } else {
      notify1("Debes iniciar sesión", "error"); // Notificación de "Debes iniciar sesión"
    }
  };

  return (
    <div className="w-60 h-[315px] text-md dark:bg-slate-200 dark:text-black rounded-md">
      <Link to={`/detail/${id}`}>
        <img className="w-60 h-60 relative" src={cover_image} alt={title} />
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
      <Toaster />
    </div>
  );
};

export default Card;
