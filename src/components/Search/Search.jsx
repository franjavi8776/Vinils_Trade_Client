import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVinylsForName, logoutUser } from "../../redux/actions";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";

const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const cart = useSelector((state) => state.cartItems);
  const token = useSelector((state) => state.token);

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
    dispatch(logoutUser());
  };

  return (
    <div className="w-[100%] flex  flex-row-reverse justify-between lg:flex lg:flex-row lg:justify-center">
      <div className="flex ">
        <div className="flex">
          <input
            onChange={handlerChange}
            type="search"
            value={inputValue}
            className="mr-2 p-0.5 xl:w-80 w-50 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 lg:ml-14 hidden sm:flex" // Agrega las clases de borde
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
            Cerrar sesion
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
    </div>
  );
};

export default Search;
