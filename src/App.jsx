import "./App.css";
import { Routes, Route } from "react-router";
import Form from "./components/Form/Form";
import Home from "./components/Home/Home";
import Error from "./components/Error/Error";
import Detail from "./components/Detail/Detail";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import RegistroUsuario from "./components/Register/register";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/register" element={<RegistroUsuario />} />
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/form" element={<Form />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
