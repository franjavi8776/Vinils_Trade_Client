import "./App.css";
import { Routes, Route, useLocation } from "react-router";
import Form from "./components/Form/Form";
import Home from "./components/Home/Home";
import Error from "./components/Error/Error";
import Detail from "./components/Detail/Detail";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import RegistroUsuario from "./components/Register/register";
import Dashboard from "./components/Dashboard/Dashboard";
import Users from "./components/UserList/UserList";
import VinylsDash from "./components/Dashboard/vinylsDash";
import About from "./components/About/About";
import Sell from "./components/sellvinyls/Sell.jsx";
import Garantia from "./components/Garantia/Garantia";
import Reviews from "./components/Reviews/Reviews";


function App() {
  const updateHtmlClass = (darkMode) => {
    const htmlElement = document.documentElement;
    if (darkMode) {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
  };

  const location = useLocation();

  return (
    <div className=" dark:text-white dark:bg-black dark:bg-opacity-80 duration-100">
      {location.pathname !== "/dashboard" &&
        !location.pathname.startsWith("/usarios") &&
        !location.pathname.startsWith("/form") &&
        !location.pathname.startsWith("/vinylsDash") &&
        !location.pathname.startsWith("/reviews") && (
          <Navbar updateHtmlClass={updateHtmlClass} />
        )}

      <Routes>
        // rutas de users
        <Route path="/register" element={<RegistroUsuario />} />
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/login" element={<Login />} />
        <Route path="about" element={<About />} />
        <Route path="/sellUser" element={<Sell />} />
        <Route path="/garantia" element={<Garantia />} />
        // Admins
        <Route path="/form" element={<Form />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/usarios" element={<Users />} />
        <Route path="/vinylsDash" element={<VinylsDash />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
