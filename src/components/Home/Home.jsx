import React,{useEffect,useState} from "react";
import { useDispatch,useSelector } from "react-redux";
import Card from "../Card/Card";
import { getAllVinyls } from "../../redux/actions";

const Home = () => {
  const dispatch=useDispatch();
  const allVinyls=useSelector((state)=>state.allVinyls); //trayendo info.
  const [currentPage, setCurrentPage] = useState(1);
  
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

  return <div>
     <div className={style.homeNumber}>
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
  </div>;
};

export default Home;
