import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVinylsForName, logoutUser } from "../../redux/actions";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const cart = useSelector((state) => state.cartItems);
  const token = useSelector((state) => state.token);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const dispatch = useDispatch();

  const handlerChange = (event) => {
    dispatch(getVinylsForName(event.target.value));
    setInputValue(event.target.value);
  };

  const contador = cart.length;

  function handlerButton() {
    const shoppCart = document.getElementById("card");
    shoppCart.classList.remove("hidden");
  }

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    // Cierra el modal de confirmación
    setShowLogoutModal(false);

    // Realiza el logout
    dispatch(logoutUser());

    // Muestra un Toast de éxito después de cerrar sesión
    toast.success("¡Sesión cerrada exitosamente!");
  };

  return (
    <div className="flex">
      <div>
        <div className="flex">
          <input
            onChange={handlerChange}
            type="search"
            value={inputValue}
            className="mr-2 p-0.5 xl:w-80 lg:w-50 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 ml-14 "
            placeholder="Buscar vinilos..."
          />

          <div className="relative ml-5">
            <AiOutlineShoppingCart
              className="w-7 h-7 cursor-pointer z-0"
              onClick={handlerButton}
            />
            <span className="w-4 h-4 absolute top-[-6px] right-[-6px] p-[10px] z-10 flex justify-center items-center bg-red-600 rounded-full ">
              {contador}
            </span>
          </div>
        </div>
      </div>
      <div>
        {token ? (
          <button
            onClick={handleLogout}
            className="text-white font-semibold link-with-hover-line ml-5"
          >
            Cerrar sesión
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="m-4 text-white font-semibold link-with-hover-line ml-7"
            >
              Ingresa
            </Link>
            <Link
              to="/register"
              className="m-4 text-white font-semibold link-with-hover-line ml-5"
            >
              Crea tu cuenta
            </Link>
          </>
        )}
      </div>
      <Toaster />

      {showLogoutModal && (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
    <div className="absolute w-full h-full bg-gray-900 opacity-70"></div>
    <div className="modal bg-white p-4 rounded-lg z-10">
      <h2 className="text-black text-2xl font-bold mb-4">¿Estás seguro de que quieres cerrar sesión?</h2>
      <div className="flex items-center justify-center">
        <button
          onClick={confirmLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2"
        >
          Sí
        </button>
        <button
          onClick={() => setShowLogoutModal(false)}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
        >
          No
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Search;
