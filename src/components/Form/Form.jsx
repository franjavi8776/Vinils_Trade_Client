import React, { useState } from "react";
import { validateVinylsForm } from "./validate";
import { useDispatch } from "react-redux";
import { postVinyls } from "../../redux/actions";

const Form = () => {
  const [vinyls, setVinyls] = useState({
    title: "",
    artist: "",
    year: "",
    cover_image: "",
    genre:"", 
    cost:"", 
    stock:""
  });

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

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
    setErrors({ title: "", artist: "", year: "", cover_image: "", genre:"", cost:"", stock:"", country:"" }); // , Description:"", , Condition:"",

    dispatch(postVinyls(vinyls));

    alert("Vinilo creado correctamente");

    setVinyls({ title: "", artist: "", year: "", cover_image: "", genre:"", cost:"", stock:"", country:"" });
  };

  return (
    <div className="border p-4">
      <form onSubmit={handlerSubmit} className="max-w-md mx-auto">
        <div className="mb-4 ">
          <label className="block font-bold mb-1">Titulo:</label>
          <input
            type="text"
            name="title"
            value={vinyls.title}
            onChange={handleChange}
            className="border rounded w-full p-2"
            placeholder="Ingrese el titulo..."
            required
          />
          {errors.title && <p className="text-red-500">{errors.title}</p>}
        </div>
        <div>
          <label className="block font-bold mb-1">Artista:</label>
          <input
            type="text"
            name="artist"
            value={vinyls.artist}
            onChange={handleChange}
            className="border rounded w-full p-2"
            placeholder="Ingrese el artista..."
            required
          />
          {errors.artist && <p className="text-red-500">{errors.artist}</p>}
        </div>
        <div>
          <label className="block font-bold mb-1">Pais:</label>
          <input
            type="text"
            name="country"
            value={vinyls.country}
            onChange={handleChange}
            className="border rounded w-full p-2 "
            placeholder="Ingrese país..."
            required
          />
          {errors.country && <p className="text-red-500">{errors.country}</p>}
        </div>
        <div>
          <label className="block font-bold mb-1">Género:</label>
          <input
            type="text"
            name="genre"
            value={vinyls.genre}
            onChange={handleChange}
            className="border rounded w-full p-2"
            placeholder="Ingrese el genero..."
            required
          />
          {errors.genre && <p className="text-red-500">{errors.genre}</p>}
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
          <label className="block font-bold mb-1">Año:</label>
          <input
            type="number"
            name="year"
            value={vinyls.year}
            onChange={handleChange}
            className="border rounded w-full p-2"
            placeholder="Ingrese el año..."
            required
          />
          {errors.year && <p className="text-red-500">{errors.year}</p>}
        </div>
        <div>
          <label className="block font-bold mb-1">Precio:</label>
          <input
            type="number"
            name="cost"
            value={vinyls.cost}
            onChange={handleChange}
            className="border rounded w-full p-2"
            placeholder="Ingrese el precio..."
            required
          />
          {errors.cost && <p className="text-red-500">{errors.cost}</p>}
        </div>
        <div>
          <label className="block font-bold mb-1">Stock:</label>
            <input
              type="number"
              name="stock"
              value={vinyls.stock}
              onChange={handleChange}
              className="border rounded w-full p-2"
              placeholder="Ingrese el stock..."
              required
              min="0"
              max="20"
            />
            {errors.stock && <p className="text-red-500">{errors.stock}</p>}
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
          <label className="block font-bold mb-1">Imagen:</label>
          <input
            type="text"
            name="cover_image"
            onChange={handleChange}
            className="border rounded w-full p-2"
            placeholder="Ingrese una url..."
            required
          />
          {errors.cover_image && <p className="text-red-500">{errors.cover_image}</p>}
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Guardar Vinilo
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
