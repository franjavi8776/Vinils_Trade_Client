import React from "react";
import { useLocalStorage, removeFromCartInLocalStorage } from "../Card/LocalStor";

export default function ShoppingCart() {
    
    function handlerButtom() {
        const shoppCart = document.getElementById("cart")
        shoppCart.classList.add("hidden")
    }

    
    const cart = useLocalStorage();
    console.log(cart)
    
    return (
        <div className="w-full h-[100vh] bg-black bg-opacity-70 flex justify-center items-center">
            <div className="w-[700px] h-[800px] bg-white relative">
                <button onClick={handlerButtom} className="text-red-600 text-2xl fixed top-4 right-4 font-bold">X</button>
                <div>
                    <h2>Carrito de Compras</h2>
                    <ul>
                    {cart.map((item, index) => (
                        <div key={index}>
                            <span>{item.title}</span>
                            <span>${item.cost}</span>
                            
                            <button onClick={() => removeFromCartInLocalStorage(item.id)}>Borrar</button>

                        </div>
                    ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}