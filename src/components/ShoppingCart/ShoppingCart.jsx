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



const ShoppingCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartItems);
  const MP = useSelector((state) => state.dataMP)
  const stateMP = useSelector((state) => state.stateMP)
  const handleRemoveFromCart = (vinylId) => {
    dispatch(removeFromCart(vinylId));
  };
  console.log(MP)
  console.log(stateMP)
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


  const units = cart.length
  const datos = {
    title: "Vinyls-Trade",
    price: totalValue,
    units: units
  }

  
  console.log(datos)
  
  
    const handleMP = () => {
      dispatch(postMP(datos))
      if (MP.length > 0 ) {
        window.location.href = MP
      }
    }

  



  return (
    <div
      className="w-full h-[100vh] bg-black bg-opacity-70 flex justify-center items-center"
      style={{ zIndex: 2 }}
    >
      <div className="w-[700px] h-[800px] bg-white  relative z-50 ">
        <h1 className="text-center mt-4 font-bold">CARRITO DE COMPRAS</h1>
        <button
          onClick={handlerButtom}
          className="text-red-600 text-2xl fixed top-4 right-4 font-bold"
        >
          X
        </button>
        <ul className="w-[700px] h-[630px] overflow-y-auto">
          {cart.length ? (cart.map((item) => (
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
          ))) : (<div className=" flex flex-col justify-center items-center w-[700px] h-[630px]">
            <MdOutlineRemoveShoppingCart className="w-[150px] h-[150px] text-red-800"/>
            <div className="font-bold text-xl">Carrito vacio</div>
            </div>)
          }
        </ul>
        <div className="p-4 text-right w-full h-[130px] absolute bottom-0 border-[1px] border-black">
          <div>Total: ${totalValue}</div>
          <div className=" flex justify-between">
            <button onClick={handlerButtom} className="bg-red-800 text-white px-4 py-2 rounded mt-4">
              Seguir Comprando
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded mt-4" onClick={handleMP}>
              Finalizar Compra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
