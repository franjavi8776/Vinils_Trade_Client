import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  increaseItem,
  decreaseItem,
} from "../../redux/actions";

const ShoppingCart = () => {
  // Utiliza el selector de Redux para obtener el carrito desde el estado global
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartItems);

  const handleRemoveFromCart = (vinylId) => {
    dispatch(removeFromCart(vinylId));
  };

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
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div
      className="w-full h-[100vh] bg-black bg-opacity-70 flex justify-center items-center"
      style={{ zIndex: 2 }}
    >
      <div className="w-[700px] h-[800px] bg-white relative z-50">
        <h1 className="text-center">CARRITO DE COMPRAS</h1>
        <button
          onClick={handlerButtom}
          className="text-red-600 text-2xl fixed top-4 right-4 font-bold"
        >
          X
        </button>
        <ul>
          {cart.map((item) => (
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
          ))}
        </ul>
      </div>
      <div className="p-4 text-right">
        <div>Total: ${totalValue}</div>
      </div>
    </div>
  );
};

export default ShoppingCart;
