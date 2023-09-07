import React, { useState, useEffect } from "react";
import { validateVinylsForm } from "./validate";
import { useDispatch } from "react-redux";
import { postVinyls } from "../../redux/actions";
import { useLocalStorage } from "../LocalStorage/useLocalStorage";

const Form = () => {
  const localStorageKey = "vinylsFormData"

  const [vinyls, setVinyls] = useLocalStorage(localStorageKey, {
    title: "",
    artist: "",
    year: "",
    cover_image: "",
    genre: "",
    cost: "",
    stock: "",
  });

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const clearFormData = () => {
    localStorage.removeItem(localStorageKey);
  };  

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newVinyls = { ...vinyls, [name]: value };
    
    setVinyls(newVinyls);

    const ErrorDetect = validateVinylsForm({ ...vinyls, [name]: value });

    setErrors((err) => ({
      ...err,
      [name]: ErrorDetect[name],
    }));
  };

  const handlerSubmit = () => {
    setErrors({
      title: "",
      artist: "",
      year: "",
      cover_image: "",
      genre: "",
      cost: "",
      stock: "",
      country: "",
    }); // , Description:"", , Condition:"",

    dispatch(postVinyls(vinyls));

    alert("Vinilo creado correctamente");

    setVinyls({
      title: "",
      artist: "",
      year: "",
      cover_image: "",
      genre: "",
      cost: "",
      stock: "",
      country: "",
    });

    clearFormData();
  };

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(vinyls));
  }, [vinyls]);

  return (
    <div className="w-[100%] h-auto flex justify-center items-center">
      <div className="w-[500px] h-auto bg-gradient-to-r from-red-700 to-red-950 animate-gradient-bg text-white rounded-lg shadow-lg shadow-black overflow-hidden mt-8">
        <form onSubmit={handlerSubmit} className="max-w-md mx-auto mt-4">
          <div className="mb-4 ">
            <label className="block mb-1">Titulo:</label>
            <input
              type="text"
              name="title"
              value={vinyls.title}
              onChange={handleChange}
              className="border rounded w-full p-2 text-black"
              placeholder="Ingrese el titulo..."
              required
            />
            {errors.title && <p className="text-black">{errors.title}</p>}
          </div>
          <div>
            <label className="block mb-1">Artista:</label>
            <input
              type="text"
              name="artist"
              value={vinyls.artist}
              onChange={handleChange}
              className="border rounded w-full p-2 text-black"
              placeholder="Ingrese el artista..."
              required
            />
            {errors.artist && <p className="text-black">{errors.artist}</p>}
          </div>
          <div>
            <label className="block mb-1">Pais:</label>
            <input
              type="text"
              name="country"
              value={vinyls.country}
              onChange={handleChange}
              className="border rounded w-full p-2 text-black"
              placeholder="Ingrese país..."
              required
            />
            {errors.country && <p className="text-black">{errors.country}</p>}
          </div>
          <div>
            <label className="block mb-1">Género:</label>
            <input
              type="text"
              name="genre"
              value={vinyls.genre}
              onChange={handleChange}
              className="border rounded w-full p-2 text-black"
              placeholder="Ingrese el genero..."
              required
            />
            {errors.genre && <p className="text-black">{errors.genre}</p>}
          </div>
          {/* <div>
          <label className="block font-bold mb-1">Descripción:</label>
          <textarea
            name="Description"
            value={vinyls.Description}
            onChange={handleChange}
            className="border rounded w-full p-2"
            placeholder="Ingrese la descripción..."
            required
          />

          {errors.Description && <p className="text-red-500">{errors.Description}</p>}
        </div> */}
          <div>
            <label className="block mb-1">Año:</label>
            <input
              type="number"
              name="year"
              value={vinyls.year}
              onChange={handleChange}
              className="border rounded w-full p-2 text-black"
              placeholder="Ingrese el año..."
              required
            />
            {errors.year && <p className="text-black">{errors.year}</p>}
          </div>
          <div>
            <label className="block mb-1">Precio:</label>
            <input
              type="number"
              name="cost"
              value={vinyls.cost}
              onChange={handleChange}
              className="border rounded w-full p-2 text-black"
              placeholder="Ingrese el precio..."
              required
            />
            {errors.cost && <p className="text-black">{errors.cost}</p>}
          </div>
          <div>
            <label className="block mb-1">Stock:</label>
            <input
              type="number"
              name="stock"
              value={vinyls.stock}
              onChange={handleChange}
              className="border rounded w-full p-2 text-black"
              placeholder="Ingrese el stock..."
              required
              min="0"
              max="20"
            />
            {errors.stock && <p className="text-black">{errors.stock}</p>}
          </div>
          {/* <div>
          <label className="block font-bold mb-1">Condición:</label>
          <input
            type="text"
            name="Condition"
            value={vinyls.Condition}
            onChange={handleChange}
            className="border rounded w-full p-2"
            placeholder="Ingrese la condicion..."
            required
          />
          {errors.Condition && <p className="text-red-500">{errors.Condition}</p>}
        </div> */}
          <div>
            <label className="block mb-1">Imagen:</label>
            <input
              type="text"
              name="cover_image"
              onChange={handleChange}
              className="border rounded w-full p-2 text-black"
              placeholder="Ingrese una url..."
              required
            />
            {/* {errors.cover_image && (
              <p className="text-black">{errors.cover_image}</p>
            )} */}
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 mt-6 mb-6 rounded hover:text-red-900 hover:font-bold"
            >
              Guardar Vinilo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
