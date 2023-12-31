import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postVinyls } from "../../redux/actions";
import toast, { Toaster } from "react-hot-toast";
import Contract from "./Contrato";
import { useNavigate } from "react-router-dom";
const Sell = () => {
  const [vinyls, setVinyls] = useState({
    title: "",
    artists: [{ name: "" }],
    year: "",
    cover_image: "",
    genre: "",
    price: "",
    stock: "",
    style: "",
  });
  const [showContract, setShowContract] = useState(true); // Estado para mostrar el contrato o el formulario
const navigate = useNavigate()
  

  const handleAcceptContract = () => {
    setShowContract(false); // Oculta el contrato y muestra el formulario
  };

  const handleRejectContract = () => {
    navigate("/"); // Redirige al usuario a la página de inicio ("/")
  };
  

  const [errors, setErrors] = useState({});

  const user = useSelector((state) => state.users);

  const dispatch = useDispatch();

  useEffect(() => {
    // Asignar el ID del usuario actual al campo "createdBy" del vinilo
    if (user) {
      setVinyls((prevVinyls) => ({
        ...prevVinyls,
        createdBy: user.id,
        createdByName: user.name,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "artists") {
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

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "upload_vinyl_image"); // Set the upload preset here

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dxaj4cgeb/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log(data.secure_url);
      return data.secure_url; // Return the secure URL of the uploaded image
    } catch (error) {
      console.error("Error uploading image to Cloudinary", error);
      throw error;
    }
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0]; // Get the selected file from the input
    if (!file) {
      return;
    }

    try {
      const imageUrl = await uploadImage(file);
      console.log(imageUrl);
      setVinyls((prevFormData) => ({
        ...prevFormData,
        cover_image: imageUrl,
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handlerSubmit = (e) => {
    e.preventDefault();

    dispatch(postVinyls(vinyls));

    toast("Se creó exitosamente", {
      icon: "👏",
      style: {
        borderRadius: "10px",
        background: "white",
        color: "red",
      },
    });
  };

  return (
    <div className="w-[90%] m-auto lg:w-[100%] min-h-[100vh] flex flex-col justify-center items-center pb-10">
      {showContract ? (
        <Contract
          onAccept={handleAcceptContract}
          onReject={handleRejectContract}
        />
      ) : (
        <div className="w-[500px] h-auto bg-gradient-to-r from-red-700 to-red-950 animate-gradient-bg text-white rounded-lg shadow-lg shadow-black overflow-hidden mt-8">
          <form onSubmit={handlerSubmit} className="max-w-md mx-auto mt-4 p-2">
            <h1 className="text-2xl font-bold text-center text-white mb-8 retro-font">
              Bienvenido!!! Ingresa los datos de tu vinilo a vender
            </h1>

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
            <div>
              <label className="block mb-1">Imagen:</label>
              <input
                type="file"
                name="cover_image"
                accept="image/*"
                onChange={handleImageChange}
                className="border rounded w-full p-2 text-black"
                placeholder="Seleccione una imagen..."
                required
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 mt-6 mb-6 rounded hover:text-red-900 hover:font-bold"
              >
                Crear Vinilo
              </button>
            </div>
            <Toaster />
          </form>
        </div>
      )}
    </div>
  );
};

export default Sell;

