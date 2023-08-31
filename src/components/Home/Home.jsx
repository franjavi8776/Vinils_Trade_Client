import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterVinylsByDecade } from "../../redux/actions";

const Home = () => {
  const dispatch = useDispatch();
  const [selectedDecade, setSelectedDecade] = useState("");


  const handleFilter = () => {
    let startYear, endYear;
    if(selectedDecade === "2000") {
      startYear= 2000;
      endYear = new Date().getFullYear();
    } else {
      startYear = parseInt(selectedDecade);
      endYear = startYear + 9;
    }
    dispatch(filterVinylsByDecade(startYear, endYear))
  }


  return <div>
  <select
    value={selectedDecade}
    onChange={(e) => {
      setSelectedDecade(e.target.value);
      handleFilter(e.target.value);
    }}
    className="bg-black text-white p-2 rounded"
  >
    <option value="">Selecciona una década</option>
    <option value="1940">1940s</option>
    <option value="1950">1950s</option>
    <option value="1960">1960s</option>
    <option value="1970">1970s</option>
    <option value="1980">1980s</option>
    <option value="1990">1990s</option>
    <option value="2000">2000s en adelante</option>
  </select>
</div>
};

export default Home;
