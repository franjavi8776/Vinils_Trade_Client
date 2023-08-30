import "./App.css";
import { Routes, Route } from "react-router";
import Form from "./components/Form/Form";
import Home from "./components/Home/Home";

function App() {
  return (
    <div className="App">
      <h1 className="font-bold underline">Hello world!!</h1>
      <div>
    <div>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/Form" element={<Form></Form>}></Route>
      </Routes>
    </div>
    
  </div>
    </div>
    
  );
}

export default App;
