import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserByEmail, loginUserWithGoogle } from "../../redux/actions.js";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.isAuthenticated);

  const handleEmailLogin = () => {
    dispatch(loginUserByEmail({ email, password }));
  };

  const handleGoogleLogin = () => {
    dispatch(loginUserWithGoogle());
  };


  return (
    <div className="h-[81vh] flex items-center justify-center">
      <div className="bg-gradient-to-r from-red-700 to-red-900 animate-gradient-bg p-8 rounded-lg w-96 shadow-lg shadow-black dark:text-black">
        <h2 className="text-2xl font-bold mb-4 text-white">
          ¡Hola! Para seguir, ingresa tu e-mail y password
        </h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-white">
            Email:
          </label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-white">
            Contraseña:
          </label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <button
          onClick={handleEmailLogin}
          className="w-full h-10 bg-black text-white px-4 py-2 mt-6 mb-6 rounded hover:bg-white hover:text-black"
        >
          {auth ? "¡Ya estás logueado!" : "Login with Email"}
        </button>
        <button
          onClick={handleGoogleLogin}
          className="w-full h-10 bg-black text-white px-4 py-2 mt-6 mb-6 rounded hover:bg-white hover:text-black"
        >
          Login with Google
        </button>
        <span className="text-white">
          ¿No tienes tu cuenta?{" "}
          <Link className="text-blue-600 font-bold ml-3" to="/register">
            Registrate aqui!!!{" "}
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Login;
