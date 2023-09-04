import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getVinylDetail } from "../../redux/actions";

import style from "./Detail.module.css";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getVinylDetail(id));
  }, [dispatch, id]);

  return (
    <div className="w-[100%] h-[80vh] flex justify-center items-center">
      <div className="mr-[-90px] z-0">
        <img
          className={`rounded-full w-[400px] h-[400px] mt-[35%] ${style["animate-spin"]}`}
          src="/disco2.jpg"
          alt="disco"
        />
      </div>
      <div className="z-50">
        <div className="w-[500px] h-[730px] bg-gradient-to-r from-red-700 to-red-950  animate-gradient-bg rounded-lg shadow-lg shadow-black overflow-hidden">
          <div className=" bg-black bg-opacity-90 p-4">
            <p className=" text-sm  text-white">ID: {detail.id}</p>
          </div>
          <div className="h-[165px] pl-4 pr-4">
            <h1 className="text-3xl font-semibold mb-2">{detail?.title}</h1>
            <div className="flex justify-between">
              <h2 className="text-black font-semibold">
                Pais: <span className="text-slate-100">{detail?.country}</span>
              </h2>
              <h2 className="text-black font-semibold">
                Año:{" "}
                <span className="text-slate-100">
                  {detail.year ? detail.year : "No especificado"}
                </span>
              </h2>
            </div>

            <h2 className="text-black font-semibold">
              Artista: <span className="text-slate-100">{detail.artist}</span>
            </h2>
            <h2 className="text-black font-semibold">
              Genero:{" "}
              <span className="text-slate-100">
                {detail.genre ? detail.genre : "No especificado"}
              </span>
            </h2>
          </div>
          <div>
            <img
              src={detail?.cover_image}
              alt={detail?.title}
              className="w-full h-[430px] border-2 border-black border-opacity-95 shadow-md shadow-black"
            />
          </div>
          <div className="w-full flex justify-between p-2 pr-4 pl-4 ">
            <h2 className="text-black font-bold text-lg">
              Stock: <span className="text-slate-100"> {detail.stock}</span>
            </h2>
            <h2 className="text-black font-bold text-lg">
              Precio: <span className="text-slate-100">${detail.cost}</span>
            </h2>
          </div>
          <Link to="/">
            <div className=" bg-black flex justify-center items-center h-10 text-white cursor-pointer">
              <span className="mr-2 hover:text-red-600 transition-colors">
                Agregar al carrito
              </span>
              <button>
                <img src="/carrito.png" alt="carrito" className="w-5" />
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Detail;
