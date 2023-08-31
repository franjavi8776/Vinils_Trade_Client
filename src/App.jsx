import "./App.css";
import { Routes, Route } from "react-router";
import Form from "./components/Form/Form";
import Home from "./components/Home/Home";
import Error from "./components/Error/Error";
import Detail from "./components/Detail/Detail";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/form" element={<Form />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
