
import React,{ useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card";
import { getAllVinyls, filterVinylsByDecade } from "../../redux/actions";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Home = () => {

  const dispatch= useDispatch();
  const allVinyls= useSelector((state)=>state.allVinyls); //trayendo info.
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDecade, setSelectedDecade] = useState("");
  
  
  const pageSize = 10;
  const totalVinyls =
    searchByName.length > 0 ? searchByName.length : vinyls.length;
  const totalPages = Math.ceil(totalVinyls / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const renderVinyls = searchByName.length > 0 ? searchByName : vinyls;
  const endIndex = startIndex + pageSize;
  const VinylsToRender = renderVinyls.slice(startIndex, endIndex);

  //console.log(VinylsToRender);

  useEffect(() => {
    dispatch(getAllVinyls());
  }, [dispatch]);

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

  return (
    <div className="w-[100%] h-[92vh]">
      <div>
        {VinylsToRender.length === pageSize && <p>Pag {currentPage}</p>}
      </div>
      <div className="w-[60%] h-[46vh] m-auto ">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img
              className="w-[100%] h-[40vh]"
              src="/carrusel.jpg"
              alt="image"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="w-[100%] h-[40vh] "
              src="/carrusel.jpg"
              alt="image"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="w-[100%] h-[40vh]"
              src="/carrusel.jpg"
              alt="image"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="w-[100%] h-[40vh]"
              src="/carrusel.jpg"
              alt="image"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="w-[100%] h-[40vh] "
              src="/carrusel.jpg"
              alt="image"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="w-[100%] h-[40vh]"
              src="/carrusel.jpg"
              alt="image"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="w-[100%] h-[40vh] "
              src="/carrusel.jpg"
              alt="image"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="w-[100%] h-[40vh] "
              src="/carrusel.jpg"
              alt="image"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="w-[100%] h-[40vh] "
              src="/carrusel.jpg"
              alt="image"
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="w-[100%] h-[56vh] flex flex-row">
        <div className="w-[20%] bg-gray-100"></div>
        <div className="w-[80%] flex">
          <div>
            {currentPage > 1 && <button onClick={handlePreviousPage}>P</button>}
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {VinylsToRender.map((vinyls) => (
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
              <button onClick={handleNextPage}>N</button>
            )}
          </div>
        </div>
      </div>
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
  );
};

export default Home;
