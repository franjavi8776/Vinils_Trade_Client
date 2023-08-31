import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card";
import {
  getAllVinyls,
  orderForGenre,
  reset,
  filterVinylsByDecade,
  orderByTitle,
} from "../../redux/actions";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";


const Home = () => {
  const dispatch = useDispatch();
  const vinyls = useSelector((state) => state.allVinyls); //trayendo info.
  const [currentPage, setCurrentPage] = useState(1);
  const searchByName = useSelector((state) => state.search);

  const pageSize = 10;
  const totalVinyls =
    searchByName.length > 0 ? searchByName.length : vinyls.length;
  const totalPages = Math.ceil(totalVinyls / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const renderVinyls = searchByName.length > 0 ? searchByName : vinyls;
  const endIndex = startIndex + pageSize;
  const VinylsToRender = renderVinyls.slice(startIndex, endIndex);

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

  const handleReset = () => {
    dispatch(reset());
  };
  const handleGenre = (event) => {
    dispatch(orderForGenre(event.target.value));
  };

  const handleOrderByTitle = (e) => {
    dispatch(orderByTitle(e.target.value));
    setName(!title);
  };

  const handleFilter = (event) => {
    const selectedDecades = event.target.value;
    let startYear, endYear;
    if (selectedDecades === "2000") {
      startYear = 2000;
      endYear = new Date().getFullYear();
    } else {
      startYear = parseInt(selectedDecades);
      endYear = startYear + 9;
    }
    dispatch(filterVinylsByDecade(startYear, endYear));
  };
  return (
    <div className="w-[100%] h-[92vh]">
      <div>
        <select
          onChange={handleFilter}
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
      <select onChange={handleOrderByTitle}>
        <option value="">Ordenar p/Titulo</option>
        <option value="A">Ascendente</option>
        <option value="D">Descendente</option>
      </select>
      <div>
        {VinylsToRender.length === pageSize && <p>Pag {currentPage}</p>}
      </div>
      <button onClick={handleReset}>Reset</button>
      <select name="genre" onChange={handleGenre} id="">
        <option value="" disabled>
          Generos
        </option>
        <option value="Funk / Soul">Funk / Soul</option>
        <option value="Rock">Rock</option>
        <option value="Electronic">Electronic</option>
        <option value="Hip Hop">Hip Hop</option>
        <option value=""></option>
      </select>
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
  )
};

export default Home;
