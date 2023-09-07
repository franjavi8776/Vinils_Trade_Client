import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getVinylsForName } from "../../redux/actions";

const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  const handlerChange = (event) => {
    dispatch(getVinylsForName(event.target.value));
    setInputValue(event.target.value);
  };

  return (
    <div>
      <div>
        <input
          onChange={handlerChange}
          type="search"
          value={inputValue}
          className="mr-2 p-0.5 w-96 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 " // Agrega las clases de borde
          placeholder="Buscar vinilos..."
        />
      </div>
    </div>
  );
};

export default Search;
