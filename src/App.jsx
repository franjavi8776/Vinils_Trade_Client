import "./App.css";
import Search from "./components/Search/Search";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Error from "./components/Error/Error";
import Detail from "./components/Detail/Detail";

function App() {
  return (
    <div className="App">
      <Search />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
