import React, { useEffect } from "react";
import { BsDiscFill } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DonutChart, Card, Text, Metric } from "@tremor/react";
import { getAllVinyls, getUsersAndSuccess } from "../../redux/actions";
import { MdRateReview, MdOutlineRateReview } from "react-icons/md";

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users);
  const vinyls = useSelector((state) => state.vinyls);

  const email = useSelector((state) => state.email);

  useEffect(() => {
    dispatch(getAllVinyls());
    dispatch(getUsersAndSuccess());
  }, [dispatch]);

  // Filtra y agrupa los vinilos por género
  const genres = vinyls.reduce((acc, vinyl) => {
    const genre = vinyl.genre || "No especificado";
    const normalizedGenre = normalizeGenre(genre);
    acc[normalizedGenre] = (acc[normalizedGenre] || 0) + 1;
    return acc;
  }, {});

  const currentYear = new Date().getFullYear();

  // Filtra y agrupa los vinilos por década
  const decades = vinyls.reduce((acc, vinyl) => {
    const year = vinyl.year ? parseInt(vinyl.year) : undefined;

    if (year && year >= 1950 && year <= currentYear) {
      const decade =
        year < 1960
          ? "50s"
          : year < 1970
          ? "60s"
          : year < 1980
          ? "70s"
          : year < 1990
          ? "80s"
          : year < 2000
          ? "90s"
          : `2000s-${currentYear}`;
      acc[decade] = (acc[decade] || 0) + 1;
    } else {
      // Cuando no hay año definido o está fuera del rango, se suma a la categoría "No especificado"
      acc["No especificado"] = (acc["No especificado"] || 0) + 1;
    }

    return acc;
  }, {});

  // Convierte los objetos de género y década en arreglos para usarlos en los Donut Charts
  const genreData = Object.entries(genres).map(([genre, count]) => ({
    name: genre,
    count,
  }));

  const decadeData = Object.entries(decades).map(([decade, count]) => ({
    name: decade,
    count,
  }));

  const totalUsers = user.length;

  // Normaliza los géneros y agrupa los no mencionados en "Otros"
  function normalizeGenre(genre) {
    // generos
    const normalizedGenres = [
      "Electronic",
      "Hip Hop",
      "Jazz",
      "Hard Rock",
      "Funk / Soul",
      "Pop",
      "Non-Music",
      "Stage & Screen",
      "Latin",
      "Classical",
      "Rock",
      "Folk",
      "World",
      "Country",
    ];

    return normalizedGenres.includes(genre) ? genre : "Otros";
  }

  return (
    <div className="w-full mi-h-[100vh]">
      <div className="w-full h-[10vh] pt-5 pl-5">
        <div className="w-[150px] h-[50px] clip-path-custom bg-black flex items-center justify-end">
          <Link to="/">
            <h1 className="text-white pr-2">Volver al Inicio</h1>
          </Link>
        </div>
      </div>
      <div className="w-full h-[5vh]">
        <h2 className="text-center text-2xl font-bold">Bienvenido {email}</h2>
      </div>
      <div className="w-full h-[35vh] flex justify-center  items-center gap-48 ">
        <Link to="/usarios">
          <div className="w-[200px] h-[200px] bg-black shadow-lg text-white shadow-black text-3xl flex flex-col justify-center items-center cursor-pointer active:translate-x-1 active:scale-95 gap-1">
            <h1>USUARIOS</h1>
            <button>
              <BiUserCircle className="w-24 h-24" />
            </button>
          </div>
        </Link>
        <Link to="/vinylsDash">
          <div className="w-[200px] h-[200px] bg-black shadow-lg text-white shadow-black text-3xl flex flex-col justify-center gap-3 items-center cursor-pointer active:translate-x-1 active:scale-95">
            <h1>VINILOS</h1>
            <button>
              <BsDiscFill className="w-20 h-20" />
            </button>
          </div>
        </Link>
        <Link to="/reviews">
          <div className="w-[200px] h-[200px] bg-black shadow-lg text-white shadow-black text-3xl flex flex-col justify-center items-center cursor-pointer active:translate-x-1 active:scale-95 gap-1">
            <h1>Reviews</h1>
            <button>
              <MdRateReview className="w-20 h-20" />
            </button>
          </div>
        </Link>
      </div>
      <div className="w-full min-h-[60vh] flex justify-center items-center  ">
        <div className="w-[80%] h-[55vh] m-auto flex justify-around items-center border-4 border-black">
          <div className="w-[230px] h-[300px]">
            <Card>
              <h1 className="text-white text-center">Géneros de Vinilos</h1>
              <DonutChart
                className="mt-6 w-[200px] h-[200px]"
                data={genreData}
                category="count"
                index="name"
                valueFormatter={(count) => count.toString()}
              />
            </Card>
          </div>
          <div className="w-[230px] h-[200px] p-[30px]">
            <Card>
              <Text className="text-white text-center">Usuarios</Text>
              <Metric className="text-center text-white">{totalUsers}</Metric>
            </Card>
          </div>
          <div className="w-[230px] h-[300px]">
            <Card>
              <h1 className="text-white text-center">
                Distribución por Décadas
              </h1>
              <DonutChart
                className="mt-6 w-[200px] h-[200px]"
                data={decadeData}
                category="count"
                index="name"
                valueFormatter={(count) => count.toString()}
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
