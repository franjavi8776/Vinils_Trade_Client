import React, { useState, useEffect } from "react";
import {
  useLocalStorage,
  removeFromCartInLocalStorage,
  addToCartInLocalStorage,
  clearCartInLocalStorage,
} from "../Card/LocalStor";

const ShoppingCart = () => {
  const [cart, setCart] = useState(useLocalStorage());

  // Utiliza React.useEffect para actualizar el estado local cuando cambie el carrito
  useEffect(() => {
    setCart(useLocalStorage());
  }, [cart]);

  const handleRemoveFromCart = (vinylId) => {
    const updatedCart = [...cart];
    const existingProductIndex = updatedCart.findIndex(
      (item) => item.id === vinylId
    );

    if (existingProductIndex !== -1) {
      // Resta 1 a la cantidad del producto
      updatedCart[existingProductIndex].quantity -= 1;

      // Si la cantidad llega a cero, elimina el producto del carrito
      if (updatedCart[existingProductIndex].quantity === 0) {
        updatedCart.splice(existingProductIndex, 1);
      }

      setCart(updatedCart);
      removeFromCartInLocalStorage(vinylId); // Actualiza el almacenamiento local
    }
  };

  const handleFinalizarCompra = () => {
    clearCartInLocalStorage(); // Llama a la función para borrar el carrito del localStorage
    setCart([]); // Limpia el carrito en el estado local
  };

  const handleAddToCart = (vinyl) => {
    const updatedCart = [...cart];
    const existingProductIndex = updatedCart.findIndex(
      (item) => item.id === vinyl.id
    );

    if (existingProductIndex !== -1) {
      // Si el producto ya está en el carrito, aumenta la cantidad si es menor al stock
      if (updatedCart[existingProductIndex].quantity < vinyl.stock) {
        updatedCart[existingProductIndex].quantity += 1;
      }
    } else {
      // Si es un nuevo producto, agrégalo con cantidad 1
      updatedCart.push({ ...vinyl, quantity: 1 });
    }

    setCart(updatedCart);
    addToCartInLocalStorage(vinyl); // Asegúrate de que se esté llamando aquí
  };

  function handlerButtom() {
    const shoppCart = document.getElementById("cart");
    shoppCart.classList.add("hidden");
  }

  // Calcular el total del valor de los productos en el carrito
  const totalValue = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const cartWithoutEmptyItems = cart.filter((item) => item);

  return (
    <div
      className="w-full h-[100vh] bg-black bg-opacity-70 flex justify-center items-center"
      style={{ zIndex: 2 }}
    >
      <div className="w-[700px] bg-white relative z-50">
        <button
          onClick={handlerButtom}
          className="text-red-600 text-2xl fixed top-4 right-4 font-bold"
        >
          X
        </button>
        <div className="overflow-auto" style={{ maxHeight: "600px" }}>
          <h2>Carrito de Compras</h2>
          <ul>
            {cartWithoutEmptyItems.map((item, index) => (
              <div
                key={index}
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
                  <span>Precio total: ${item.price * item.quantity}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="bg-red-500 text-white px-2 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-green-500 text-white px-2 rounded"
                    disabled={item.quantity >= item.stock}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </ul>
        </div>
        <div className="p-4 text-right">
          <div>Total: ${totalValue}</div>
          <button
            onClick={handleFinalizarCompra}
            className="bg-green-500 text-white px-4 py-2 rounded mt-4"
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
