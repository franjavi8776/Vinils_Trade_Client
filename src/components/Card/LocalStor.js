export const useLocalStorage = () => {
  const cartData = localStorage.getItem("cart");
  return cartData ? JSON.parse(cartData) : [];
};

export const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const addToCartInLocalStorage = (vinyl) => {
  const cart = useLocalStorage();
  const existingProduct = cart.find((item) => item.id === vinyl.id);

  if (existingProduct) {
    existingProduct.quantity += 1; // Si el producto ya existe, aumenta la cantidad
  } else {
    vinyl.quantity = 1; // Si es un nuevo producto, establece la cantidad en 1
    cart.push(vinyl);
  }

  saveCartToLocalStorage(cart);
};

// Eliminar un vinilo del carrito en el Local Storage por su ID
export const removeFromCartInLocalStorage = (vinylId) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const updatedCart = cart.filter((item) => item.id !== vinylId);

  localStorage.setItem("cart", JSON.stringify(updatedCart));
};

export const clearCartInLocalStorage = () => {
  localStorage.removeItem("cart");
};
