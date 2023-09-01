import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getVinylsForName } from "../../redux/actions";
import Vinyls from "../../assets/Vinyls2.png";

const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  const handlerChange = (event) => {
    dispatch(getVinylsForName(event.target.value));
    setInputValue(event.target.value);
  };

  return (

      <div className="bg-black bg-opacity-50 flex flex-col items-center w-full justify-center">
      <img src={Vinyls} alt="Vinyls-Trade" className="w-48 ml-8" />
      <div className="w-full h-0.5 bg-slate-400 bg-opacity-20 mt-2"></div>
        {/* <input
          onChange={handlerChange}
          type="search"
          value={inputValue}
          className="p-2 w-96 bg-red-800 text-white m-4 focus:outline-none focus:ring-2 focus:ring-red-400 border border-red-400 placeholder-gray-400"
          placeholder="Buscar vinilos..."
        />

        <button className="px-2 py-1 bg-red-500 text-white rounded-3g hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300">
          Search
        </button> */}
      </div>
  );
};

export default Search;

