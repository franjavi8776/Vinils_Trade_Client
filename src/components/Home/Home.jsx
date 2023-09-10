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
import Footer from "../Footer/Footer";
import "./Home.css";
import VideoPlayer from "./Video/VideoPlayer";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import { addToCartInLocalStorage, useLocalStorage } from "../Card/LocalStor";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import seedrandom from "seedrandom";

const Home = () => {
  const dispatch = useDispatch();
  const vinyls = useSelector((state) => state.allVinyls); //trayendo info.
  const [currentPage, setCurrentPage] = useState(1);
  const [filterGener, setFilterGener] = useState("");
  const [filterDecad, setFilterDecad] = useState("");
  const [filterAlf, setFilterAlf] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [randomVinyls, setRandomVinyls] = useState([]);
  const [seed, setSeed] = useState("");

  const searchByName = useSelector((state) => state.search);
  const totalVinyls =
    searchByName.length > 0 ? searchByName.length : vinyls.length;
  const totalPages = Math.ceil(totalVinyls / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const renderVinyls = searchByName.length > 0 ? searchByName : vinyls;
  const endIndex = startIndex + pageSize;
  const VinylsToRender = renderVinyls.slice(startIndex, endIndex);
  const pagesArray = [];

  for (let i = 1; i <= totalPages; i++) {
    pagesArray.push(i);
  }

  useEffect(() => {
    dispatch(getAllVinyls());

    // Verificar el tamaño de la pantalla y actualizar cardsPerPage en consecuencia
    const handleResize = () => {
      if (window.innerWidth >= 1624) {
        setPageSize(10);
      } else if (window.innerWidth >= 1424) {
        setPageSize(8);
      } else if (window.innerWidth >= 1224) {
        setPageSize(6);
      } else {
        setPageSize(4);
      }
    };

    handleResize();
    // Escuchar eventos de cambio de tamaño de ventana
    window.addEventListener("resize", handleResize);

    // Limpieza de eventos al desmontar el componente
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch, vinyls]);

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

  const handleAddToCart = (id, title, cover_image, price, stock) => {
    addToCartInLocalStorage({ id, title, cover_image, price, stock }); // Agrega el producto al carrito
  };

  const handleGenre = (event) => {
    setCurrentPage(1);
    setFilterGener(event.target.value);
    dispatch(orderForGenre(event.target.value));
  };

  const handleOrderByTitle = (e) => {
    setCurrentPage(1);
    setFilterAlf(e.target.value);
    dispatch(orderByTitle(e.target.value));
  };

  const handleFilter = (event) => {
    setCurrentPage(1);
    setFilterDecad(event.target.value);
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

  const resetAllButton = () => {
    setCurrentPage(1);
    setFilterGener("");
    setFilterAlf("");
    setFilterDecad("");
    dispatch(reset());
    dispatch(getAllVinyls());
  };

  useEffect(() => {
    // Obtener la fecha de inicio (puedes ajustarla según tus necesidades)
    const startDate = new Date("2023-09-10");
    // Obtener la fecha actual
    const currentDate = new Date();
    // Calcular el número de semanas transcurridas desde la fecha de inicio
    const weeksElapsed = Math.floor(
      (currentDate - startDate) / (7 * 24 * 60 * 60 * 1000)
    );
    // Usar la semana actual para generar números aleatorios consistentes
    const newSeed = `seed-${weeksElapsed}`;
    setSeed(newSeed);

    // Función para obtener vinilos aleatorios basados en una semilla
    function getRandomVinyls(vinyls, num, seed) {
      const rng = seedrandom(seed);
      const shuffledVinyls = [...vinyls];

      function randomSort() {
        return rng() - 0.5;
      }

      shuffledVinyls.sort(randomSort);

      return shuffledVinyls.slice(0, num);
    }

    // Obtener 5 vinilos aleatorios basados en la semilla actual
    const randomSelection = getRandomVinyls(vinyls, 5, newSeed);
    setRandomVinyls(randomSelection);
  }, [vinyls]);

  return (
    <div>
      <div className="w-[100%] h-auto relative">
        <div className="w-[100%] h-[423px] flex border-b-8 border-black mb-8 mt-[-3px]">
          <div className="w-[40%] h-[420px] ">
            <VideoPlayer />
          </div>
          <div className="w-[60%] h-[420px]">
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              // pagination={{
              //   clickable: true,
              // }}
              navigation={false}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper"
            >
              <SwiperSlide>
                <img
                  className="w-[100%] h-[420px] "
                  src="/carrusel2.jpg"
                  alt="image"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className="w-[100%] h-[420px]"
                  src="/carrusel3.jpg"
                  alt="image"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className="w-[100%] h-[420px]"
                  src="/carrusel1.jpg"
                  alt="image"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className="w-[100%] h-[420px] "
                  src="/carrusel5.jpg"
                  alt="image"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className="w-[100%] h-[420px]"
                  src="/carrusel2.jpg"
                  alt="image"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className="w-[100%] h-[420px] "
                  src="/carrusel3.jpg"
                  alt="image"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className="w-[100%] h-[420px] "
                  src="/carrusel5.jpg"
                  alt="image"
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
        <div className="w-full h-[15vh] flex justify-center items-center">
          <h1 className="w-[450px] h-[50px] flex justify-center items-center bg-black text-slate-200 text-3xl font-bold dark:bg-slate-200 dark:text-black ">
            LISTA DE VINILOS
          </h1>
        </div>
        <div className="w-[100%] h-[70vh] flex flex-row ">
          <div className="w-[20%] h-[70vh] flex items-center ">
            <div className="w-[70%] m-auto flex flex-col gap-20">
              <select
                onChange={handleFilter}
                className="bg-black text-white p-2 rounded  dark:bg-slate-200 dark:text-black"
                value={filterDecad}
              >
                <option value="">Selecciona una década</option>
                <option value="1950">1950s</option>
                <option value="1960">1960s</option>
                <option value="1970">1970s</option>
                <option value="1980">1980s</option>
                <option value="1990">1990s</option>
                <option value="2000">2000s en adelante</option>
              </select>
              <select
                onChange={handleOrderByTitle}
                value={filterAlf}
                className="bg-black text-white p-2 rounded  dark:bg-slate-200 dark:text-black"
              >
                <option value="">Ordenar p/Titulo</option>
                <option value="A">Ascendente</option>
                <option value="D">Descendente</option>
              </select>
              <select
                name="genre"
                value={filterGener}
                onChange={handleGenre}
                id=""
                className="bg-black text-white p-2 rounded dark:bg-slate-200 dark:text-black"
              >
                <option value="">Filtrar por genero</option>
                <option value="Funk / Soul">Funk / Soul</option>
                <option value="Rock">Rock</option>
                <option value="Electronic">Electronic</option>
                <option value="Hip Hop">Hip Hop</option>
                <option value="Pop">Pop</option>
              </select>
              <button
                onClick={resetAllButton}
                className="bg-black text-white p-2 rounded text-left  dark:bg-slate-200 dark:text-black"
              >
                Restablecer
              </button>
            </div>
          </div>
          <div className="w-[78%] h-[70vh] flex items-center">
            <div className="w-[100%] h-[70vh] flex items-center">
              <div className="w-[5%]">
                {currentPage > 1 && (
                  <button onClick={handlePreviousPage}>
                    <MdKeyboardDoubleArrowLeft className="text-[50px]" />
                  </button>
                )}
              </div>

              <div className="w-[90%] flex flex-wrap justify-center gap-5">
                {VinylsToRender.map((vinyls) => (
                  <Card
                    key={vinyls.id}
                    id={vinyls.id}
                    title={vinyls.title}
                    year={vinyls.year}
                    cover_image={vinyls.cover_image}
                    stock={vinyls.stock}
                    price={vinyls.price}
                    addToCart={handleAddToCart}
                  />
                ))}
              </div>
              <div className="w-[5%] flex justify-center">
                {currentPage < totalPages && (
                  <button onClick={handleNextPage}>
                    <MdKeyboardDoubleArrowRight className="text-[50px]" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center space-x-4 mt-6">
          {pagesArray.map((pageNumber) => (
            <span
              key={pageNumber}
              onClick={() => setCurrentPage(pageNumber)}
              className={`pagination-hover-line ${
                pageNumber === currentPage
                  ? "active-page"
                  : "font-bold cursor-pointer"
              }`}
            >
              {pageNumber}
            </span>
          ))}
        </div>
        <div className="w-full h-[15vh] flex justify-center items-center mt-5">
          <h1 className="w-[450px] h-[50px] flex justify-center items-center bg-black text-slate-200 text-3xl font-bold dark:bg-slate-200 dark:text-black ">
            OFERTAS DE LA SEMANA
          </h1>
        </div>
        <div className="w-[100%] h-auto flex items-center">
          <div className="w-[15%] h-auto flex justify-center items-center text-red-700 text-4xl font-bold transform -rotate-45">
            50% OFF
          </div>
          <div className="w-[70%] h-auto flex flex-wrap justify-center items-center gap-5">
            {randomVinyls.map((vinyls) => (
              <Card
                key={vinyls.id}
                id={vinyls.id}
                title={vinyls.title}
                year={vinyls.year}
                cover_image={vinyls.cover_image}
                stock={vinyls.stock}
                price={vinyls.price * 0.5}
                addToCart={handleAddToCart}
              />
            ))}
          </div>
          <div className="w-[15%] h-auto flex justify-center items-center text-red-700 text-4xl font-bold transform -rotate-45">
            50% OFF
          </div>
        </div>

        <div className="mt-20">
          <Footer />
        </div>

        <div id="card" className="top-0 left-0 fixed inset-0 hidden z-50">
          <ShoppingCart className="z-50" />
        </div>
      </div>
    </div>
  );
};

export default Home;
