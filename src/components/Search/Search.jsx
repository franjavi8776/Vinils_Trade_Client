import React from 'react';
import {useSelector, useDispatch } from 'react-redux';
import { getVinylsForName } from '../../redux/actions';
const Search = () => {
  const searchs = useSelector((state)=> state.search)
  const dispatch  = useDispatch()
const handlerChange = (event)=>{
dispatch(getVinylsForName(event.target.value))
}

  return (

    <div className="flex items-center justify-center p-8 bg-gradient-to-r from-gray-700 to-gray-900">
      <input
        onChange={handlerChange}
        type="text"
        className="p-2 mr-2 w-96 bg-gray-800 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Buscar vinilos..."
      />
      <button className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
        Explorar
      </button>
    </div>
  );
};

export default Search;

