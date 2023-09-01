import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getVinylDetail } from "../../redux/actions";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.detail);

  console.log(detail);

  useEffect(() => {
    dispatch(getVinylDetail(id));
  }, [dispatch, id]);

  return (
    // <div className="w-[100%] h-[70vh] flex justify-center items-center">
    //   <div className="w-[400px] h-[600px] flex flex-col align-middle bg-gradient-to-r from-red-700 to-red-950 animate-gradient-bg">
    //     <img
    //       className="w-[400px] m-auto border-4 border-black"
    //       src={detail?.cover_image}
    //       alt={detail?.title}
    //     />
    //     <p>{detail.id}</p>
    //     <h1>{detail?.title}</h1>
    //     <h2>{detail?.country}</h2>

    //     <h2>{detail?.year}</h2>
    //   </div>
    // </div>
    <div className="container mx-auto p-4">
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className=" bg-black bg-opacity-90 p-4">
          <p className=" text-sm  text-white">ID: {detail.id}</p>
        </div>
        <div className="p-4">
          <h1 className="text-3xl font-semibold mb-2">{detail?.title}</h1>
          <p className="text-gray-600">Pais: {detail?.country}</p>
          <p className="text-gray-600">
            Año: {detail.year ? detail.year : "No especificado"}
          </p>
        </div>
        <div className="p-4">
          <img
            src={detail?.cover_image}
            alt={detail?.title}
            className="w-full rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default Detail;
