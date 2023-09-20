import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getVinylDetail, addToCart } from "../../redux/actions";
import { FaShoppingCart } from "react-icons/fa";

import style from "./Detail.module.css";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.detail);
  console.log(detail);
  // codigo nuevo
  const cartItems = useSelector((state) => state.cartItems);

  const { title, cover_image, price, stock } = detail;
  const [isGreen, setIsGreen] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const isAuthenticated = useSelector((state) => state.token !== null);
  // Verifica si el producto ya está en el carrito
  const itemInCart = cartItems.find((item) => item.id === id);

  useEffect(() => {
    // Verifica si el producto ya está en el carrito
    const itemInCart = cartItems.find((item) => item.id === id);

    // Establece isGreen en función de si itemInCart existe
    setIsGreen(!!itemInCart);
    setIsButtonDisabled(!!itemInCart);
  }, [cartItems, id]);

  const handleAddToCart = () => {
    if (isAuthenticated) {
      if (!isButtonDisabled) {
        setIsButtonDisabled(true);

        // Si el producto ya está en el carrito, aumenta la cantidad en lugar de agregar uno nuevo
        if (itemInCart) {
          if (itemInCart.cartQuantity < detail.stock) {
            dispatch(
              addToCart({
                ...itemInCart,
                cartQuantity: itemInCart.cartQuantity + 1,
              })
            );
          } else {
            alert("No hay suficiente stock disponible para este producto.");
          }
        } else {
          // Agrega el producto al carrito
          if (detail.stock > 0) {
            dispatch(
              addToCart({
                id,
                title,
                cover_image,
                price,
                stock: stock - 1,
                cartQuantity: 1,
              })
            );
          } else {
            alert("No hay stock disponible para este producto.");
          }
        }

        setIsGreen(true);
      }
    } else {
      alert("Para añadir al carrito debe iniciar sesion");
    }
  };
  //codigo nuevo

  useEffect(() => {
    dispatch(getVinylDetail(id));
  }, [dispatch, id]);

  return (
    <div className="w-[90%] ml-5 mt-5 pb-5 lg:mt-0 lg:pb-0 lg:ml-0 lg:w-[100%] min-h-[85vh] flex justify-center items-center">
      <div className="hidden lg:flex lg:mr-[-90px] :z-0">
        <img
          className={`lg:flex lg:rounded-full lg:w-[400px] lg:h-[400px] lg:mt-[35%] ${style["animate-spin"]}`}
          src="https://res.cloudinary.com/duclhjrri/image/upload/v1695222875/disco2_rqzk2e.jpg"
          alt="disco"
        />
      </div>
      <div className="z-0">
        <div className="w-[360px] h-[730px] sm:w-[500px] sm:h-[730px] bg-gradient-to-r from-red-700 to-red-950  animate-gradient-bg rounded-lg shadow-lg shadow-black overflow-hidden">
          <div className=" bg-black bg-opacity-90 p-4">
            <p className=" text-sm  text-white">ID: {detail.id}</p>
          </div>
          <div className="h-[165px] pl-4 pr-4">
            <h1 className="text-3xl font-semibold mb-2">{detail?.title}</h1>
            <div className="flex justify-between">
              <h2 className="text-black font-semibold">
                Estilo:{" "}
                <span className="text-slate-100">
                  {detail.style ? detail.style : "No especificado"}
                </span>
              </h2>
              <h2 className="text-black font-semibold">
                Año:{" "}
                <span className="text-slate-100">
                  {detail.year ? detail.year : "No especificado"}
                </span>
              </h2>
            </div>

            <h2 className="text-black font-semibold">
              Artista:{" "}
              <span className="text-slate-100">
                {" "}
                {detail.artists && detail.artists.length > 0
                  ? detail.artists[0].name
                  : "No especificado"}
              </span>
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
              Precio: <span className="text-slate-100">${detail.price}</span>
            </h2>
          </div>

          <div
            onClick={handleAddToCart}
            disabled={isButtonDisabled || detail.stock === 0}
            className={` bg-black flex justify-center items-center h-10 text-white rounded-md mb-4 cursor-pointer ${
              isGreen ? "pointer-events-none" : ""
            }`}
          >
            <span className="mr-2 hover:text-red-800 transition-colors">
              Agregar al carrito
            </span>
            <button>
              <FaShoppingCart className={isGreen ? "text-green-800 " : ""} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
