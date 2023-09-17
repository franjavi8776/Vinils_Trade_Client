import React, { useState } from "react";
import { postRegisterUser } from "../../redux/actions";
import validate from "./validate";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // Añade los estilos CSS

function RegistroUsuario() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setErrors] = useState({});
  const dispatch = useDispatch();
  const [usuario, setUsuario] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    country: "",
    city: "",
    confirmarContraseña: "",
    codArea: "",
  });
  //console.log(usuario);
  const passwordd = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate();

  const cleanForm = () => {
    setUsuario({
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      country: "",
      city: "",
      confirmarContraseña: "",
      codArea: "",
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
    //console.log(error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(validate === 0)) {
      await dispatch(postRegisterUser(usuario));
      cleanForm();
      alert("Usario creado");
    } else {
      console.log("ERROR");
    }
    navigate("/login");
  };

  return (
    <div className="w-[100%] min-h-[100vh] flex items-center justify-center">
      <div className="w-[360px] bg-gradient-to-r from-red-700 to-red-900 animate-gradient-bg p-8 rounded-lg md:w-[650px] shadow-lg shadow-black mt-5 mb-5 lg:mt-0 lg:mb-0">
        <h2 className="text-3xl font-extrabold text-white mb-8">
          ¡Regístrate Ahora!
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-4 mb-4">
            <div className="w-1/2 px-4 mb-4">
              <label
                htmlFor="name"
                className="text-white text-sm mb-2 font-bold"
              >
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
              <label
                htmlFor="email"
                className="text-white text-sm mb-2 font-bold"
              >
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
            <label
              htmlFor="password"
              className="text-white text-sm mb-2 font-bold"
            >
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
              className="text-white text-sm mb-2 font-bold"
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
            <label
              htmlFor="phoneNumber"
              className="text-white text-sm mb-2 font-bold"
            >
              Teléfono
            </label>
            <PhoneInput
              country={"ar"} // Establece el país predeterminado (puedes cambiarlo según tus necesidades)
              value={usuario.phoneNumber} // Asigna el valor del teléfono desde el estado
              onChange={(phoneNumber) =>
                setUsuario({ ...usuario, phoneNumber })
              } // Actualiza el estado del teléfono cuando cambie
              inputClass="bg-transparent  border-white rounded-none text-white focus:outline-none focus:border-black-300"
              inputProps={{
                name: "phoneNumber",
                id: "phoneNumber",
              }}
              dropdownStyle={{
                marginTop: "1rem",
                border: "1px solid #ccc", // Borde de la lista de países
                borderRadius: "0.25rem",
                backgroundColor: "black",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                zIndex: "9999",
              }}
              inputStyle={{
                width: "100%",
                height: "2.5rem",
                border: "2px solid #ffffff",
                borderRadius: "0.25rem",
                padding: "0.5rem",
                fontSize: "1rem",
                outline: "none",
                backgroundColor: "transparent",
                color: "#ffffff",
                marginBottom: "1rem", // Espacio inferior
                paddingLeft: "3rem", // Espacio izquierdo
                paddingRight: "1rem", // Espacio derecho
              }}
              containerStyle={{
                marginBottom: "1.5rem", // Mayor espacio inferior para el contenedor
              }}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="codArea"
              className="text-white text-sm mb-2 font-bold"
            >
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
              <label
                htmlFor="country"
                className="text-white text-sm mb-2 font-bold"
              >
                País
              </label>
              <input
                autoComplete="off"
                type="text"
                id="country"
                name="country"
                value={usuario.country}
                onChange={handleChange}
                className="bg-transparent border-b-2 border-white rounded-none px-3 py-2 w-full text-white focus:outline-none focus:border-black-300"
                required
              />
            </div>
            <div className="w-1/2 px-4 mb-4">
              <label
                htmlFor="city"
                className="text-white text-sm mb-2 font-bold"
              >
                Ciudad
              </label>
              <input
                autoComplete="off"
                type="text"
                id="city"
                name="city"
                value={usuario.city}
                onChange={handleChange}
                className="bg-transparent border-b-2 border-white rounded-none px-3 py-2 w-full text-white focus:outline-none focus:border-black-300"
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
    </div>
  );
}
export default RegistroUsuario;
