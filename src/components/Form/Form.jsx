import React, { useState, useEffect } from "react";
import { validateVinylsForm } from "./validate";
import { useDispatch } from "react-redux";
import { postVinyls } from "../../redux/actions";
import { useLocalStorage } from "../LocalStorage/useLocalStorage";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const Form = () => {
  const localStorageKey = "vinylsFormData";

  const [vinyls, setVinyls] = useLocalStorage(localStorageKey, {
    title: "",
    artists: [{ name: "" }],
    year: "",
    cover_image: "",
    genre: "",
    price: "",
    stock: "",
    style: "",
  });

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const clearFormData = () => {
    localStorage.removeItem(localStorageKey);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    // const newVinyls =
    //   name === "artists"
    //     ? { ...vinyls, artists: [{ name: value }] }
    //     : { ...vinyls, [name]: value };

    // setVinyls(newVinyls);

    // const ErrorDetect = validateVinylsForm({ ...vinyls, [name]: value });

    if (name === "artists") {
      // Si el campo es "artists", clonamos el arreglo y actualizamos el valor "name"
      const updatedArtists = [...vinyls.artists];
      updatedArtists[0].name = value;

      setVinyls({
        ...vinyls,
        artists: updatedArtists,
      });
    } else {
      setVinyls({
        ...vinyls,
        [name]: value.trim(),
      });
    }

    const ErrorDetect = validateVinylsForm({
      ...vinyls,
      [name]: name === "artists" ? value : value.trim(), // Aplica trim() aquí también si es necesario
    });

    setErrors((err) => ({
      ...err,
      [name]: ErrorDetect[name],
    }));
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    setErrors({
      title: "",
      artists: "",
      year: "",
      cover_image: "",
      genre: "",
      price: "",
      stock: "",
      style: "",
    }); // , Description:"", , Condition:"",

    dispatch(postVinyls(vinyls));

    toast("Se creo exitosamente", {
      icon: "👏",
      style: {
        borderRadius: "10px",
        background: "white",
        color: "red",
      },
    });

    setVinyls({
      title: "",
      artists: [{ name: "" }],
      year: "",
      cover_image: "",
      genre: "",
      price: "",
      stock: "",
      style: "",
    });

    clearFormData();
  };

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(vinyls));
  }, [vinyls]);

  return (
    <div className="w-full h-[100vh]">
      <div className="w-full h-[10vh] flex items-center pl-5 ">
        <div className="w-[150px] h-[50px] clip-path-custom bg-slate-900 flex items-center justify-end ">
          <Link to="/dashboard">
            <h1 className="text-white pr-2">Volver al Inicio</h1>
          </Link>
        </div>
      </div>

      <div className="w-full h-[90vh] lg:w-[100%] flex flex-col justify-center items-center ">
        <h1 className="text-3xl font-bold">Añade nuevos vinilos</h1>
        <div className="w-[500px] h-auto bg-black bg-opacity-80  text-white rounded-lg shadow-lg shadow-black overflow-hidden mt-8 dark:bg-slate-200">
          <form onSubmit={handlerSubmit} className="max-w-md mx-auto mt-4 p-2">
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
                name="artists"
                value={vinyls.artists[0].name}
                onChange={handleChange}
                className="border rounded w-full p-2 text-black"
                placeholder="Ingrese el artista..."
                required
              />
              {errors.artists && <p className="text-black">{errors.artists}</p>}
            </div>
            <div>
              <label className="block mb-1">Estilo:</label>
              <input
                type="text"
                name="style"
                value={vinyls.style}
                onChange={handleChange}
                className="border rounded w-full p-2 text-black"
                placeholder="Ingrese estilo..."
                required
              />
              {errors.style && <p className="text-black">{errors.style}</p>}
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
                name="price"
                value={vinyls.price}
                onChange={handleChange}
                className="border rounded w-full p-2 text-black"
                placeholder="Ingrese el precio..."
                required
              />
              {errors.price && <p className="text-black">{errors.price}</p>}
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
                className="bg-slate-200 text-black px-4 py-2 mt-6 mb-6 rounded hover:text-red-900 hover:font-bold dark:bg-black dark:text-white"
              >
                Crear vinilo
              </button>
            </div>
            <Toaster />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
