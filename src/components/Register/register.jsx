import React, { useState } from "react";
import { postRegisterUser } from "../../redux/actions";
import validate from "./validate";
import { useDispatch } from "react-redux";

function RegistroUsuario() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setErrors] = useState({});
  const dispatch = useDispatch()
  const [usuario, setUsuario] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    country: "",
    city: "",
    confirmarContraseña: "",
    codArea:"",
  });
console.log(usuario)
  const passwordd = () => {
    setShowPassword(!showPassword);
  };

  const cleanForm = () => {
    setUsuario({
      name: "",
    email: "",
    phoneNumber: "",
    password: "",
    country: "",
    city: "",
    confirmarContraseña: "",
    codArea:""
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({
      ...usuario,
      [name]: value,
    });
    const validationErrors = validate({ ...usuario, [name]: value });
    setErrors(validationErrors);
    console.log(error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(validate === 0)) {
      await dispatch(postRegisterUser(usuario));
      cleanForm()
      alert("Joya");
    } else {
      console.log("ERROR");
    }
  };

  return (
    <div className="bg-red-500 max-w-2xl mx-auto mt-10 p-6 rounded-lg shadow-xl">
      <h2 className="text-3xl font-extrabold text-black mb-8">
        ¡Regístrate Ahora!
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-4 mb-4">
          <div className="w-1/2 px-4 mb-4">
            <label htmlFor="name" className="text-white text-sm mb-2">
              Nombre
            </label>
            <input
              autoComplete="off"
              type="text"
              id="name"
              name="name"
              value={usuario.name}
              onChange={handleChange}
              className="bg-transparent border-b-2 border-white rounded-none px-3 py-2 w-full text-white focus:outline-none focus:border-black-300"
              required
            />
            <span>{error.name}</span>
          </div>
          <div className="w-1/2 px-4 mb-4">
            <label htmlFor="email" className="text-white text-sm mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={usuario.email}
              onChange={handleChange}
              className="bg-transparent border-b-2 border-white rounded-none px-3 py-2 w-full text-white focus:outline-none focus:border-black-300"
              required
            />
            <span>{error.email}</span>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="text-white text-sm mb-2">
            Contraseña
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={usuario.password}
              onChange={handleChange}
              className="bg-transparent border-b-2 border-white rounded-none px-3 py-2 w-full text-white focus:outline-none focus:border-black-300"
              required
            />
            <button
              type="button"
              onClick={passwordd}
              className=" absolute right-0 top-1/2 transform -translate-y-1/2 w-5 h-5 mr-2 text-gray-500 focus:outline-none"
            >
              {showPassword ? (
                <img src="./ojo-rojo.png" alt="Mostrar Contraseña" />
              ) : (
                <img src="./visible.png" alt="Ocultar Contraseña" />
              )}
            </button>
          </div>
        </div>
        <span>{error.password}</span>
        <div className=" mb-4 relative">
          <label
            htmlFor="confirmar-contraseña"
            className="text-white text-sm mb-2"
          >
            Confirmar Contraseña
          </label>
          <input
            autoComplete="off"
            type={showPassword ? "text" : "password"}
            id="confirmar-contraseña"
            name="confirmarContraseña"
            value={usuario.confirmarContraseña}
            onChange={handleChange}
            className="bg-transparent border-b-2 border-white rounded-none px-3 py-2 w-full text-white focus:outline-none focus:border-black-300"
            required
          />
          <button
            type="button"
            onClick={passwordd}
            className=" absolute right-0 top-11 transform -translate-y-1/2 w-5 h-5 mr-2 text-gray-500 focus:outline-none"
          >
            {showPassword ? (
              <img src="./ojo-rojo.png" alt="Mostrar Contraseña" />
            ) : (
              <img src="./visible.png" alt="Ocultar Contraseña" />
            )}
          </button>
        </div>
        <span className="">{error.confirmarContraseña}</span>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="text-white text-sm mb-2">
            Teléfono
          </label>
          <input
           autoComplete="off"
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={usuario.phoneNumber}
            onChange={handleChange}
            className="bg-transparent border-b-2 border-white rounded-none px-3 py-2 w-full text-white focus:outline-none focus:border-black-300"
            required
          />
        </div>
        <span>{error.phoneNumber}</span>
        <div className="mb-4">
          <label htmlFor="codArea" className="text-white text-sm mb-2">
           Codigo Postal
          </label>
          <input
           autoComplete="off"
            type="text"
            id="codArea"
            name="codArea"
            value={usuario.codArea}
            onChange={handleChange}
            className="bg-transparent border-b-2 border-white rounded-none px-3 py-2 w-full text-white focus:outline-none focus:border-black-300"
          />
          <span>{error.codArea}</span>
        </div>
        <div className="flex flex-wrap -mx-4 mb-4">
  <div className="w-1/2 px-4 mb-4">
    <label htmlFor="country" className="text-white text-sm mb-2">
      País
    </label>
    <input
      autoComplete="off"
      type="text"
      id="country"
      name="country"
      value={usuario.country}
      onChange={handleChange}
      className="bg-transparent border-b border-red-300 rounded-none px-3 py-2 w-full text-red-900 focus:outline-none"
      required
    />
  </div>
  <div className="w-1/2 px-4 mb-4">
    <label htmlFor="city" className="text-white text-sm mb-2">
      Ciudad
    </label>
    <input
      autoComplete="off"
      type="text"
      id="city"
      name="city"
      value={usuario.city}
      onChange={handleChange}
      className="bg-transparent border-b border-red-300 rounded-none px-3 py-2 w-full text-red-900 focus:outline-none"
      required
    />
  </div>
</div>
<span className="">{error.country}</span>
<span className="">{error.city}</span>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-white mt-9 text-black px-6 py-3 rounded-full hover:bg-red-700 focus:outline-none focus:bg-red-300"
          >
            ¡Registrarme!
          </button>
        </div>
      </form>
    </div>
  );
}
export default RegistroUsuario