import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUserByEmail,
  getAdmins,
  getUsersAndSuccess,
  loginUserByGoogle,
} from "../../redux/actions.js";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [authy, setAuthy] = useState(false);

  const dispatch = useDispatch();
  const authe = useSelector((state) => state.token);
  const user = useSelector((state) => state.users);
  const admin = useSelector((state) => state.admins);

  const filtro = admin.filter((us) => {
    return us.isAdmin === true && email === us.email;
  });
  const filtro1 = user.filter((us) => {
    return us.isAdmin === false && email === us.email;
  });
  const navigate = useNavigate(); // Utilizamos useNavigate para la navegación

  useEffect(() => {
    dispatch(getAdmins());
    dispatch(getUsersAndSuccess());
  }, [dispatch]);

  const handleEmailLogin = () => {
    dispatch(loginUserByEmail({ email, password }));
    dispatch(getUsersAndSuccess());

    if (filtro.length > 0) {
      navigate("/dashboard");
    } else if (filtro1.length > 0) {
      navigate("/");
      toast.success("Inicio de sesión exitoso", {
        duration: 1000, // Duración en milisegundos (2 segundos)
      });
    } else {
      navigate("/register");
      toast.error("Necesitas registarte", {
        duration: 2000,
      });
    }
  };

  const firebaseConfig = {
    apiKey: "AIzaSyC1-NuZIpLvp1OQvuEx2NJe5uYkbPzg_rk",
    authDomain: "helpful-rope-398503.firebaseapp.com",
    projectId: "helpful-rope-398503",
    storageBucket: "helpful-rope-398503.appspot.com",
    messagingSenderId: "230827125634",
    appId: "1:230827125634:web:ba8db6cb77ee75f4727d9b",
    measurementId: "G-VRFCJHFX5Y",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // Inicio de sesión exitoso
        const user = result.user;
        console.log("Usuario autenticado:", user);
        if (user) {
          setAuthy(true);
          setToken(user.accessToken);
        }
      })
      .catch((error) => {
        // Manejo de errores
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error al iniciar sesión con Google:", errorMessage);
        // Puedes mostrar un mensaje de error al usuario aquí
      });
  };
  useEffect(() => {
    dispatch(loginUserByGoogle(token));
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="h-[81vh] flex items-center justify-center">
      <div className=" bg-gradient-to-r from-red-700 to-red-900 animate-gradient-bg p-8 rounded-lg w-[360px] lg:w-[400px] shadow-lg shadow-black dark:text-black">
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
              required
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
              required
            />
          </div>
        </form>
        <button
          onClick={handleEmailLogin}
          className="w-full h-10 bg-black text-white px-4 py-2 mt-6 mb-6 rounded hover:bg-white hover:text-black"
        >
          {authe ? "¡Ya estás logueado!" : "Ingresa con email"}
        </button>

        {authe ? (
          <h1 className="w-full h-10 bg-black text-white px-4 py-2 mt-6 mb-6 rounded hover:bg-white hover:text-black text-center">
            Autentificado
          </h1>
        ) : (
          <button
            onClick={handleGoogleLogin}
            className="w-full h-10 bg-black text-white px-4 py-2 mt-6 mb-6 rounded hover:bg-white hover:text-black"
          >
            Ingresa con Google
          </button>
        )}
        <span className="text-white">
          ¿No tienes tu cuenta?{" "}
          <Link className="text-blue-600 font-bold ml-3" to="/register">
            Registrate aqui!!!{" "}
          </Link>
        </span>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default Login;
