import { useState } from "react";

// Declara una función personalizada llamada useLocalStorage que acepta dos parámetros: key y initialValue
export function useLocalStorage(key, initialValue) {
    // Utiliza useState para crear una variable de estado llamada storedValue
    const [storedValue, setStoredValue] = useState(() => {
        try {
            // Intenta obtener un elemento de la memoria local con la clave key
            const item = window.localStorage.getItem(key);
            // Si existe un elemento, lo parsea desde JSON y lo devuelve como valor inicial
            return item ? JSON.parse(item) : initialValue;
        } catch (err) {
            // Si ocurre algún error al obtener el elemento, devuelve el valor initialValue
            return initialValue;
        }
    });

    // Declara una función llamada setValue que permite actualizar el valor en la memoria local
    const setValue = (value) => {
        try {
            // Actualiza el estado storedValue con el nuevo valor proporcionado
            setStoredValue(value);
            // Convierte el valor a formato JSON y lo almacena en la memoria local con la clave key
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (err) {
            // Si ocurre algún error al guardar en la memoria local, muestra un error en la consola
            console.error(err);
        }
    }

    // Devuelve un arreglo con dos elementos: storedValue (el valor actual en la memoria local) y setValue (la función para actualizarlo)
    return [storedValue, setValue];
}

