import React, { useState } from "react";
import { postRegisterUser } from "../../redux/actions";
import validate from "./validate";
function RegistroUsuario() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setErrors] = useState({});
  const [usuario, setUsuario] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    contraseña: "",
    pais: "",
    ciudad: "",
    confirmarContraseña: "",
  });

  const password = () => {
    setShowPassword(!showPassword);
  };

  const cleanForm = () => {
    setUsuario({
      nombre: "",
      correo: "",
      telefono: "",
      contraseña: "",
      pais: "",
      ciudad: "",
      confirmarContraseña: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(validate === 0)) {
      postRegisterUser(usuario);
      alert("Joya");
      cleanForm();
    } else {
      console.log("ERROR");
    }
  };

  return (
    <div className="h-[100vh] flex items-center justify-center">
      <div className="bg-gradient-to-r from-red-700 to-red-900 animate-gradient-bg p-8 rounded-lg w-[35%] shadow-lg shadow-black">
        <h2 className="text-3xl font-extrabold text-white mb-8">
          ¡Regístrate Ahora!
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-4 mb-4">
            <div className="w-1/2 px-4 mb-4">
              <label htmlFor="nombre" className="text-white text-sm mb-2">
                Nombre
              </label>
              <input
                autoComplete="off"
                type="text"
                id="nombre"
                name="nombre"
                value={usuario.nombre}
                onChange={handleChange}
                className="bg-transparent border-b-2 border-white rounded-none px-3 py-2 w-full text-white focus:outline-none focus:border-black-300"
                required
              />
              <span>{error.nombre}</span>
            </div>
            <div className="w-1/2 px-4 mb-4">
              <label htmlFor="correo" className="text-white text-sm mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="correo"
                name="correo"
                value={usuario.correo}
                onChange={handleChange}
                className="bg-transparent border-b-2 border-white rounded-none px-3 py-2 w-full text-white focus:outline-none focus:border-black-300"
                required
              />
              <span>{error.correo}</span>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="contraseña" className="text-white text-sm mb-2">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="contraseña"
                name="contraseña"
                value={usuario.contraseña}
                onChange={handleChange}
                className="bg-transparent border-b-2 border-white rounded-none px-3 py-2 w-full text-white focus:outline-none focus:border-black-300"
                required
              />
              <button
                type="button"
                onClick={password}
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
          <span>{error.contraseña}</span>
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
              onClick={password}
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
            <label htmlFor="telefono" className="text-white text-sm mb-2">
              Teléfono
            </label>
            <input
            autoComplete="off"
              type="text"
              id="telefono"
              name="telefono"
              value={usuario.telefono}
              onChange={handleChange}
              className="bg-transparent border-b-2 border-white rounded-none px-3 py-2 w-full text-white focus:outline-none focus:border-black-300"
              required
            />
          </div>
          <span>{error.telefono}</span>
          <div className="mb-4">
            <label htmlFor="pais" className="text-white text-sm mb-2">
              País
            </label>
            <input
            autoComplete="off"
              type="text"
              id="pais"
              name="pais"
              value={usuario.pais}
              onChange={handleChange}
              className="bg-transparent border-b-2 border-white rounded-none px-3 py-2 w-full text-white focus:outline-none focus:border-black-300"
              required
            />
          </div>
          <span>{error.pais}</span>
          <div className="mb-4 relative">
            <label htmlFor="ciudad" className="text-white text-sm mb-2">
              Ciudad
            </label>
            <input
            autoComplete="off"
              type="text"
              id="ciudad"
              name="ciudad"
              value={usuario.ciudad}
              onChange={handleChange}
              className="bg-transparent border-b-2 border-white rounded-none px-3 py-2 w-full text-white focus:outline-none focus:border-black-300"
              required
            />
          </div>
          <span>{error.ciudad}</span>
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
    </div>
  );
}

export default RegistroUsuario;
