import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserByEmail, loginUserWithGoogle } from "../../redux/actions.js";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.isAuthenticated);
  console.log(auth);
  const handleEmailLogin = async () => {
    await dispatch(loginUserByEmail({ email, password }));
    if (auth) {
      toast.error("Datos incorrectos");
    } else {
      toast.success("Inicio de sesión exitoso");
    }
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
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-white">
              Email:
            </label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-black border border-gray-300 rounded p-2"
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
              className="w-full text-black border border-gray-300 rounded p-2"
            />
          </div>
        </form>
        <button
          onClick={handleEmailLogin}
          className="w-full h-10 bg-black text-white px-4 py-2 mt-6 mb-6 rounded hover:bg-white hover:text-black"
          disabled={auth}
        >
          {auth ? "Estás logueado" : "Ingresar"}
        </button>

        <button
          onClick={handleGoogleLogin}
          className="w-full h-10 bg-black text-white px-4 py-2 mt-6 mb-6 rounded hover:bg-white hover:text-black"
        >
          Ingresa con Google
        </button>
        <span className="text-white">
          ¿No tienes tu cuenta?{" "}
          <Link className="text-blue-600 font-bold ml-3" to="/register">
            Registrate aqui!!!{" "}
          </Link>
        </span>

      </div>
        <Toaster />
    </div>
  );
}

export default Login;
