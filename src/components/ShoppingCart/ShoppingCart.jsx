import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  increaseItem,
  decreaseItem,
  postMP,
  succesMP,
  pendingMP,
  failureMP,
  clearCart,
} from "../../redux/actions";
import { MdOutlineRemoveShoppingCart } from "react-icons/md"
import toast, { Toaster } from "react-hot-toast";

const ShoppingCart = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartItems);
  const MP = useSelector((state) => state.dataMP);
  // const stateMP = useSelector((state) => state.stateMP)
  console.log(MP)
  const handleRemoveFromCart = (vinylId) => {
    dispatch(removeFromCart(vinylId));
    toast.success("Vinilo eliminado correctamente")
  };
  //console.log(MP);
  //console.log(stateMP);
  const handleIncreaseQty = (vinyl) => {
    dispatch(increaseItem(vinyl));
  };

  const handleDecrease = (vinyl) => {
    dispatch(decreaseItem(vinyl));
  };

  function handlerButtom() {
    const shoppCart = document.getElementById("card");
    shoppCart.classList.add("hidden");
  }

  const totalValue = cart.reduce(
    (total, item) => total + item.price * item.cartQuantity,
    0
  );

  const handleShowConfirmation = () => {
    setShowConfirmation(true);
  };

  // const units = cart.length;

  //console.log(datos);

  const handleMP = () => {
    if (cart.length > 0) {
      const datos = {
        title: "Vinyls-Trade",
        price: totalValue,
        units: cart.length,
      };
      // cart.forEach((item) => {
      //   const vinylId = item.id; // ID del vinilo
      //   const stockReduction = item.cartQuantity; // Cantidad a reducir del stock
      //   dispatch(updateVinyls(vinylId, stockReduction));
      // });
      dispatch(postMP(datos));
      if (MP.length > 0) {
        // Redirigir al usuario a Mercado Pago
        window.location.href = MP;

        // Restablecer el estado de showConfirmation
        setShowConfirmation(false);
      }
    }
  };

  // if(succesMP) {
  //   dispatch(clearCart())
  // }
  // if(pendingMP) {
  //   return "pendign"
  // }
  // if(failureMP) {
  //   return "fallo"
  // }

  return (
    <div
      className="w-full h-[100vh] bg-black bg-opacity-70 flex justify-center items-center"
      style={{ zIndex: 2 }}
    >
      <div className="w-[700px] h-[800px] bg-white  relative z-50 dark:bg-black ">
        <h1 className="text-center mt-4 font-bold">CARRITO DE COMPRAS</h1>
        <button
          onClick={handlerButtom}
          className="text-red-600 text-2xl fixed top-4 right-4 font-bold"
        >
          X
        </button>
        <ul className="w-[700px] h-[630px] overflow-y-auto">
          {cart.length ? (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center p-2 border-b"
              >
                <img
                  src={item.cover_image}
                  alt={item.title}
                  className="w-20 h-20"
                />
                <div className="flex flex-col flex-grow">
                  <span>{item.title}</span>
                  <span>Stock: {item.stock}</span>
                  <span>Precio total: ${item.price * item.cartQuantity}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDecrease(item)}
                    className="bg-red-500 text-white px-2 rounded"
                  >
                    -
                  </button>
                  <span>{item.cartQuantity}</span>
                  <button
                    onClick={() => handleIncreaseQty(item)}
                    className="bg-green-500 text-white px-2 rounded"
                    disabled={item.stock === 0}
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="bg-red-500 text-white px-2 rounded"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className=" flex flex-col justify-center items-center w-[700px] h-[630px]">
              <MdOutlineRemoveShoppingCart className="w-[150px] h-[150px] text-red-800" />
              <div className="font-bold text-xl">Carrito vacio</div>
            </div>
          )}
        </ul>
        <div className="p-4 text-right w-full h-[130px] absolute bottom-0 border-[1px] border-black dark:border-white">
          <div>Total: ${totalValue}</div>
          <div className=" flex justify-between">
            <button
              onClick={handlerButtom}
              className="bg-red-800 text-white px-4 py-2 rounded mt-4"
            >
              Seguir Comprando
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded mt-4"
              onClick={handleShowConfirmation}
            >
              Finalizar Compra
            </button>
          </div>
        </div>
        <Toaster/>
        {showConfirmation && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 h-[100px] w-[530px] -translate-y-1/2 flex flex-col items-center text-black from-red-700 to-red-950 p-4 border border-gray-300 shadow-lg z-50 dark:text-white">
            <p className="mb-4">
              ¿Estás seguro de que deseas finalizar la compra?
            </p>
            <div className="space-x-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white  font-bold py-2 px-4 rounded mr-2"
                onClick={handleMP}
              >
                Sí
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setShowConfirmation(false)}
              >
                No
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
