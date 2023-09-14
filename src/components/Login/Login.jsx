import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserByEmail} from "../../redux/actions.js";
import { Link } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth,signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import ListOfTodo from "./ListOfTodos.jsx";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authy, setAuthy] = useState(false);
  const [token, setToken] = useState("");
  console.log(token);
  

  const dispatch = useDispatch();
  const authe = useSelector((state) => state.isAuthenticated);
  // const token = useSelector((state) => state.token);
  // console.log(token);
  

  const handleEmailLogin = () => {
    dispatch(loginUserByEmail({ email, password }));
  };

  const firebaseConfig = {
    apiKey: "AIzaSyC1-NuZIpLvp1OQvuEx2NJe5uYkbPzg_rk",
    authDomain: "helpful-rope-398503.firebaseapp.com",
    projectId: "helpful-rope-398503",
    storageBucket: "helpful-rope-398503.appspot.com",
    messagingSenderId: "230827125634",
    appId: "1:230827125634:web:ba8db6cb77ee75f4727d9b",
    measurementId: "G-VRFCJHFX5Y"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app); 
  

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) =>  {
        // Inicio de sesión exitoso
        const user = result.user;
        console.log("Usuario autenticado:", user);
        if(user){
          setAuthy(true);
          setToken(user.accessToken)
        }
        // Realiza cualquier acción adicional que necesites aquí
        // dispatch(loginUserWithGoogle(user));
      })
      .catch((error) => {
        // Manejo de errores
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error al iniciar sesión con Google:", errorMessage);
        // Puedes mostrar un mensaje de error al usuario aquí
      });
  };
  ListOfTodo(token);
  

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
        >
          {authe ? "¡Ya estás logueado!" : "Ingresa con email"}
        </button>
        {authy ? (<h1 className="w-full h-10 bg-black text-white px-4 py-2 mt-6 mb-6 rounded hover:bg-white hover:text-black">Autentificado</h1>) : (
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
    </div>
  );
}

export default Login;
