import "./App.css";
import { Routes, Route } from "react-router";
import Form from "./components/Form/Form";
import Home from "./components/Home/Home";
import Search from "./components/Search/Search";


function App() {
  return (
    <div className="App">
      <Search/>
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
