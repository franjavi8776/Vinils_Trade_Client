import React from 'react';
import { useState } from 'react';
import {useDispatch } from 'react-redux';
import { getVinylsForName } from '../../redux/actions';
import Vinyls from '../../assets/Vinyls.png'

const Search = () => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  const handlerChange = (event) => {
    dispatch(getVinylsForName(event.target.value));
    setInputValue(event.target.value)
  };

  return (
    <div className="flex items-center w-[100vh] justify-center h-32  ">
<input
  onChange={handlerChange}
  type="search"
  value={inputValue}
  className=" mr-2 p-0.5 w-96 bg-red-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 border border-red-400" // Agrega las clases de borde
  placeholder="Buscar vinilos..."
/>

<button className="px-2 py-1 bg-red-500 text-white rounded-3g hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300">
 Search
</button>

    <img src={Vinyls} alt="Vinyls-Trade" className='w-28 ml-8' />

    </div>
  );
};

export default Search;

