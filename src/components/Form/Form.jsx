import React, { useState } from "react";
import { validateVinylsForm } from "./validate";
import { useDispatch } from "react-redux";
import { postVinyls } from "../../redux/actions";

const Form = () => {
  const [vinyls, setVinyls] = useState({
    Title: "",
    Artist: "",
    Year: "",
    Image: "",
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
    setErrors({ Title: "", Artist: "", Year: "", Image: "" }); // Gender:"", Description:"", Price:"", Condition:"",

    dispatch(postVinyls(vinyls));

    alert("Vinilo creado correctamente");

    setVinyls({ Title: "", Artist: "", Year: "", Image: "" });
  };

  return (
    <div className="border p-4">
      <form onSubmit={handlerSubmit} className="max-w-md mx-auto">
        <div className="mb-4 ">
          <label className="block font-bold mb-1">Titulo:</label>
          <input
            type="text"
            name="Title"
            value={vinyls.Title}
            onChange={handleChange}
            className="border rounded w-full p-2"
            placeholder="Ingrese el titulo..."
            required
          />
          {errors.Title && <p className="text-red-500">{errors.Title}</p>}
        </div>
        <div>
          <label className="block font-bold mb-1">Artista:</label>
          <input
            type="text"
            name="Artist"
            value={vinyls.Artist}
            onChange={handleChange}
            className="border rounded w-full p-2"
            placeholder="Ingrese el artista..."
            required
          />
          {errors.Artist && <p className="text-red-500">{errors.Artist}</p>}
        </div>
        {/* <div>
          <label className="block font-bold mb-1">Pais:</label>
          <input
            type="text"
            name="Country"
            value={vinyls.Country}
            onChange={handleChange}
            className="border rounded w-full p-2 "
            placeholder="Ingrese país..."
            required
          />
          {errors.Country && <p className="text-red-500">{errors.Country}</p>}
        </div> */}
        {/* <div>
          <label className="block font-bold mb-1">Género:</label>
          <input
            type="text"
            name="Gender"
            value={vinyls.Gender}
            onChange={handleChange}
            className="border rounded w-full p-2"
            placeholder="Ingrese el genero..."
            required
          />
          {errors.Gender && <p className="text-red-500">{errors.Gender}</p>}
        </div> */}
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
            name="Year"
            value={vinyls.Year}
            onChange={handleChange}
            className="border rounded w-full p-2"
            placeholder="Ingrese el año..."
            required
          />
          {errors.Year && <p className="text-red-500">{errors.Year}</p>}
        </div>
        {/* <div>
          <label className="block font-bold mb-1">Precio:</label>
          <input
            type="number"
            name="Price"
            value={vinyls.Price}
            onChange={handleChange}
            className="border rounded w-full p-2"
            placeholder="Ingrese el precio..."
            required
          />
          {errors.Price && <p className="text-red-500">{errors.Price}</p>}
        </div> */}
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
            type="file"
            name="Image"
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
          {errors.Image && <p className="text-red-500">{errors.Image}</p>}
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
