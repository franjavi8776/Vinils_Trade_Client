import React,{ useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card";
import { getAllVinyls, filterVinylsByDecade } from "../../redux/actions";

const Home = () => {
  const dispatch= useDispatch();
  const allVinyls= useSelector((state)=>state.allVinyls); //trayendo info.
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDecade, setSelectedDecade] = useState("");

  
  const pageSize = 10;
  const totalVinyls =
    searchByName.length > 0 ? searchByName.length : allVinyls.length;
  const totalPages = Math.ceil(totalVinyls / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const renderVinyls = searchByName.length > 0 ? searchByName : allVinyls;
  const endIndex = startIndex + pageSize;
  const VinylsToRender = renderVinyls.slice(startIndex, endIndex);

  useEffect(()=>{
    dispatch(getAllVinyls)
  },[dispatch]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

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
     <div className="w-[100%] h-[92vh]">
        {VinylsToRender.length === pageSize && <p>Pag {currentPage}</p>}
     </div>
     <div>
      {currentPage > 1 && (
       <button className={style.btnL} onClick={handlePreviousPage}>
          P
       </button>
      )}
    </div>
    <div>
      {currentVinyls.map((vinyls)=>(
        <Card
          key={vinyls.id}
          id={vinyls.id}
          title={vinyls.title}
          year={vinyls.year}
          cover_image={vinyls.cover_image}
        />
      ))}
    </div>
    <div>
      {currentPage < totalPages && (
        <button className={style.btnR} onClick={handleNextPage}>
          N
        </button>
      )}
    </div>
    <div>
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
  </div>;
};

export default Home;
