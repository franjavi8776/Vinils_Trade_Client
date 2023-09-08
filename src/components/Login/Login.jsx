import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserWithEmail,loginUserWithGoogle } from "../../redux/actions";
import { validateLoginForm } from "./validatelogin.js";
import axios from "axios";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.token !== null);
  const error = useSelector((state) => state.error); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErrors(validateLoginForm({ ...user, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(errors).length === 0) {
      try {
        // Utiliza la acción loginUserWithEmail con el correo y la contraseña
        await dispatch(loginUserWithEmail(user.email, user.password));

        // Obtiene el token JWT del estado de Redux
        const token = response.payload.token;

        // Configura axios para enviar el token en el encabezado 'Authorization'
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        
        // Continúa con las solicitudes protegidas o redirecciona a otra página
        // Ejemplo: history.push('/dashboard');
      } catch (error) {
        console.error("Error de inicio de sesión:", error);
      }
    }
  };
  const handleGoogleLogin = async () => {
    try {
      // Realiza la autenticación con Google y obtén un token de acceso de Google
      const googleResponse = await authenticateWithGoogle(); // Implementa esta función para obtener el token de Google
      if (googleResponse && googleResponse.token) {
        // Utiliza la acción loginUserWithGoogle para autenticar al usuario con el token de Google
        dispatch(loginUserWithGoogle(googleResponse.token));
      }
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
    }
  };


  const renderError = (fieldName) => {
    const errorText = errors[fieldName] || error;

    if (errorText) {
      return <span style={{ color: "black" }}>{errorText}</span>;
    }

    return null;
  };

  return (
    <div className="h-[80vh] flex items-center justify-center">
      <div className="bg-gradient-to-r from-red-700 to-red-900 animate-gradient-bg p-8 rounded-lg w-96 shadow-lg shadow-black">
        <h2 className="text-2xl font-bold mb-4 text-white">
          ¡Hola! Para seguir, ingresa tu e-mail, Sino tienes una cuenta creala!
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-white">
              Email:
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Ingrese su correo electrónico"
              value={user.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            />
            {renderError("email")}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-white">
              Contraseña:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Ingrese su contraseña"
              value={user.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            />
            {renderError("password")}
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full h-10 bg-black text-white px-4 py-2 mt-6 mb-6 rounded hover:bg-white hover:text-black"
              disabled={isAuthenticated}
            >
              {isAuthenticated ? "Ya estás autenticado" : "Iniciar Sesión con tu Correo"}
            </button>
          </div>
          <div className="text-center mt-[-20px]">
            <button onClick={handleGoogleLogin} className="w-full h-10 bg-black text-white px-4 py-2 mt-6 mb-6 rounded hover:bg-white hover:text-black">Iniciar Sesión con Google</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;