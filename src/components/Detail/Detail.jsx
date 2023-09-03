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
          className={`rounded-full w-[400px] h-[400px] mt-[40%] ${style["animate-spin"]}`}
          src="/disco2.jpg"
          alt="disco"
        />
      </div>

      <div className="z-50">
        <div className="w-[500px] h-[740px] bg-white rounded-lg shadow-lg overflow-hidden">
          <div className=" bg-black bg-opacity-90 p-4">
            <p className=" text-sm  text-white">ID: {detail.id}</p>
          </div>
          <div className="pl-4 pr-4">
            <h1 className="text-3xl font-semibold mb-2">{detail?.title}</h1>
            <h2 className="text-gray-900">Pais: {detail?.country}</h2>
            <h2 className="text-gray-900">
              Año: {detail.year ? detail.year : "No especificado"}
            </h2>
            <h2 className="text-gray-900">Pais: {detail.country}</h2>
            <h2 className="text-gray-900">
              Genero: {detail.genre ? detail.genre : "No especificado"}
            </h2>
          </div>
          <div>
            <img
              src={detail?.cover_image}
              alt={detail?.title}
              className="w-full h-[430px] border-4 border-black border-opacity-95"
            />
          </div>
          <div className="w-full flex justify-between p-2 ">
            <h2 className="text-red-900 font-bold text-lg">
              Stock: <b className="text-black">{detail.stock}</b>
            </h2>
            <h2 className="text-red-900 font-bold text-lg">
              Precio: <b className="text-black">{detail.cost}$us</b>
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
