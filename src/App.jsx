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
      {location.pathname !== "/dashboard" && (
        <Navbar updateHtmlClass={updateHtmlClass} />
      )}

      <Routes>
        <Route path="/register" element={<RegistroUsuario />} />
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/form" element={<Form />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
