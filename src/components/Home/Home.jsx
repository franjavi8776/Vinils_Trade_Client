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
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import seedrandom from "seedrandom";
import { carImage } from "../cloudinary/carouselImages";

const Home = () => {
  const dispatch = useDispatch();
  const vinyls = useSelector((state) => state.allVinyls);
  const vinil = useSelector((state) => state.vinyls);
  const vinyl = useSelector((state) => state.vinilos);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterGener, setFilterGener] = useState("");
  const [filterDecad, setFilterDecad] = useState("");
  const [filterAlf, setFilterAlf] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [randomVinyls, setRandomVinyls] = useState([]);
  const [seed, setSeed] = useState("");
  const [currentFilterTitle, setCurrentFilterTitle] = useState("");

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
  }, [dispatch]);

  useEffect(() => {
    // Función para actualizar el estado de pageSize
    const updatePageSize = () => {
      if (window.innerWidth < 1700) {
        setPageSize(8);
      } else {
        setPageSize(10);
      }

      if (window.innerWidth < 1472) {
        setPageSize(6);
      }

      if (window.innerWidth < 862) {
        setPageSize(4);
      }
    };

    // Escuchar cambios en el tamaño de la pantalla
    window.addEventListener("resize", updatePageSize);

    // Llamamos a la función una vez para configurar el valor inicial
    updatePageSize();

    // Limpieza del event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener("resize", updatePageSize);
    };
  }, []);

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

  const handleGenre = (event) => {
    setCurrentPage(1);
    setFilterGener(event.target.value);
    dispatch(orderForGenre(event.target.value));
    setCurrentFilterTitle("Genero " + event.target.value);
  };

  const handleOrderByTitle = (e) => {
    setCurrentPage(1);
    setFilterAlf(e.target.value);
    dispatch(orderByTitle(e.target.value));
    setCurrentFilterTitle("Filtro alfabetico " + e.target.value);
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
    setCurrentFilterTitle("Decada de los " + event.target.value);
  };

  const resetAllButton = () => {
    setCurrentPage(1);
    setFilterGener("");
    setFilterAlf("");
    setFilterDecad("");
    setCurrentFilterTitle("");
    dispatch(reset());
    dispatch(getAllVinyls());
  };

  useEffect(() => {
    const startDate = new Date("2023-09-11");

    const currentDate = new Date();

    const weeksElapsed = Math.floor(
      (currentDate - startDate) / (7 * 24 * 60 * 60 * 10000)
    );

    const newSeed = `$seed-${weeksElapsed}`;
    setSeed(newSeed);

    function getRandomVinyls(vinyl, num, seed) {
      const rng = seedrandom(seed);
      const shuffledVinyls = [...vinyl];

      function randomSort() {
        return rng() - 0.5;
      }

      shuffledVinyls.sort(randomSort);

      return shuffledVinyls.slice(0, num);
    }

    //Obtener 5 vinilos aleatorios basados en la semilla actual
    const randomSelection = getRandomVinyls(vinyl, 5, newSeed);
    setRandomVinyls(randomSelection);
  }, [vinyl]);

  return (
    <div>
      <div className="w-[100%] h-auto relative">
        <div className="lg:w-[100%] lg:h-[423px] lg:flex lg:border-b-8 lg:border-black lg:mb-8 lg:mt-[-3px]">
          <div className="lg:w-[40%] lg:h-[420px]">
            <VideoPlayer />
          </div>
          <div className="lg:w-[60%] lg:h-[420px] lg:block hidden">
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              navigation={false}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper"
            >
              {carImage.map((image) => (
                <SwiperSlide key={image.id}>
                  <img
                    className="w-[100%] h-[420px]"
                    src={`https://res.cloudinary.com/duclhjrri/image/upload/${image.cloudinaryName}.jpg`}
                    alt={image.alt}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className="w-full h-[15vh] flex text-center justify-center items-center">
          <h1 className="w-[450px] h-[50px] flex justify-center items-center bg-black  text-slate-200 text-3xl font-bold dark:bg-slate-200 dark:text-black ">
            LISTA DE VINILOS
          </h1>
        </div>
        <div className="text-center mb-2 xl:pl-[20%]">{currentFilterTitle}</div>

        <div className="md:w-[100%] xl:flex xl:flex-row  md:flex-col md:min-h-[70vh]">
          <div className="xl:w-[20%] xl:min-h-[70vh] xl:flex xl:items-center lg:w-[100%] lg:min-h-[12vh]">
            <div className="xl:w-[70%] xl:m-auto xl:flex xl:flex-col xl:gap-20 md:w-[90%] md:m-auto md:flex md:flex-row  md:justify-between md:mb-20 md:mt-[-10px] w-[60%] m-auto flex flex-col gap-4 mb-4">
              <select
                onChange={handleFilter}
                className="bg-black text-white p-2 rounded  dark:bg-slate-200 dark:text-black"
                value={filterDecad}
              >
                <option value="">Filtro p/década</option>
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
                <option value="">Orden p/Titulo</option>
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
                <option value="">Filtro p/genero</option>
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
          <div className="xl:w-[78%] xl:min-h-[70vh] xl:flex items-center lg:w-[90%] lg:min-h-[70vh] lg:m-auto">
            <div className="w-[100%] min-h-[70vh] flex items-center ">
              <div className="w-[5%] ">
                {currentPage > 1 && (
                  <button onClick={handlePreviousPage}>
                    <MdKeyboardDoubleArrowLeft className="hidden sm:flex text-[50px] " />
                  </button>
                )}
              </div>

              <div className="w-[90%] min-h-[70vh] flex flex-wrap justify-center gap-5">
                {VinylsToRender.map((vinyls) => (
                  <Card
                    key={vinyls.id}
                    id={vinyls.id}
                    title={vinyls.title}
                    year={vinyls.year}
                    cover_image={vinyls.cover_image}
                    stock={vinyls.stock}
                    price={vinyls.price}
                  />
                ))}
              </div>
              <div className="w-[5%] flex justify-center">
                {currentPage < totalPages && (
                  <button onClick={handleNextPage}>
                    <MdKeyboardDoubleArrowRight className="hidden sm:flex  text-[50px]" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-[100%] h-[10vh] flex justify-center items-center space-x-4 ">
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
          <div className="w-[15%] ml-2 lg:ml-0 h-auto flex justify-center items-center text-white text-lg sm:text-2xl font-bold relative bg-red-700 transform rotate-45">
            <div className="hidden lg:absolute w-16 h-16 -top-4 -left-4 text-white rounded-full lg:flex justify-center items-center transform -rotate-45">
              ★
            </div>
            <span className="relative z-10">50% OFF</span>
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
              />
            ))}
          </div>
          <div className="w-[15%] ml-2 lg:ml-0 h-auto flex justify-center items-center text-white text-lg sm:text-2xl font-bold relative bg-red-700 transform -rotate-45">
            <div className="hidden lg:absolute w-16 h-16 -top-4 -left-4 text-white rounded-full lg:flex justify-center items-center transform rotate-45">
              ★
            </div>
            <span className="relative z-10 transform -rotate-60">50% OFF</span>
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
