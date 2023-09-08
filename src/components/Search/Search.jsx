import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getVinylsForName } from "../../redux/actions";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";

const Search = () => {
  const [inputValue, setInputValue] = useState("");

  const dispatch = useDispatch();

  const handlerChange = (event) => {
    dispatch(getVinylsForName(event.target.value));
    setInputValue(event.target.value);
  };

  function handlerButton() {
    const shoppCart = document.getElementById("card");
    shoppCart.classList.remove("hidden");
  }

  return (
    <div className="flex">
      <div>
        <div className="flex">
          <input
            onChange={handlerChange}
            type="search"
            value={inputValue}
            className="mr-2 p-0.5 w-96 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 " // Agrega las clases de borde
            placeholder="Buscar vinilos..."
          />

          <div className="relative">
            <AiOutlineShoppingCart
              className="w-7 h-7 cursor-pointer z-0"
              onClick={handlerButton}
            />
            <span className="w-4 h-4 absolute top-[-6px] right-[-6px] z-10 flex justify-center items-center bg-red-600 rounded-full ">
              0
            </span>
          </div>
        </div>
        {/* <div className="flex" >
      </div> */}
      </div>
      <div>
        <Link
          to="/login"
          className="m-4 text-red-700 font-semibold link-with-hover-line "
        >
          Ingresa
        </Link>
      </div>
    </div>
  );
};

export default Search;
