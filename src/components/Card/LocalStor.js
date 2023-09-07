export const useLocalStorage = () => {
    const cartData = localStorage.getItem("cart");
    return cartData ? JSON.parse(cartData) : [];
};

export const saveCartToLocalStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

export const addToCartInLocalStorage = (vinyl) => {
  const cart = useLocalStorage();
  cart.push(vinyl);
  saveCartToLocalStorage(cart);
};

// Eliminar un vinilo del carrito en el Local Storage por su ID
export const removeFromCartInLocalStorage = (vinylId) => {
  const cart = useLocalStorage();
  const updatedCart = cart.filter((vinyl) => vinyl.id !== vinylId);
  saveCartToLocalStorage(updatedCart);
};