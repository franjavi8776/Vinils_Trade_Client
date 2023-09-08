import axios from "axios";

export const GET_ALL_VINYLS = "GET_ALL_VINYLS";
export const GET_DETAIL = "GET_DETAIL";
export const GET_VINYLS_FOR_NAME = "GET_VINYLS_FOR_NAME";
export const ORDER_FOR_GENRE = "ORDER_FOR_ARTIST";
export const RESET = "RESET";
export const ORDER_BY_TITLE = "ORDER_BY_TITLE";
export const FILTER_BY_DECADE = "FILTER_BY_DECADE";
export const ADD_TO_CART = "SET_ADD_ITEM_TO_CART";
export const ORDER_FOR_ARTIST = "ORDER_FOR_ARTIST";
export const POST_REGISTER_USER = "POST_REGISTER_USER";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";
export const POST_VINYL = "POST_VINYL";
export const INCREASE_ITEM = "INCREASE_ITEM";
export const DECREASE_ITEM = "DECREASE_ITEM";
const endpoint = "http://localhost:3001/";

export const getAllVinyls = () => async (dispatch) => {
  try {
    const response = await axios.get(endpoint);
    const data = response.data;

    dispatch({
      type: GET_ALL_VINYLS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getVinylDetail = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${endpoint}${id}`);
    const data = response.data;
    if (Array.isArray(data) && data.length > 0) {
      // Verificamos si data es un array y si contiene al menos un elemento
      const vinylDetail = data[0];
      console.log(vinylDetail);
      dispatch({ type: GET_DETAIL, payload: vinylDetail });
    }
  } catch (error) {
    console.log(error);
  }
};

export const postRegisterUser = (x) => {
  const newEndpoint = "http://localhost:3001/createUser"
  return async function (dispatch) {
    try {
      const { data } = await axios.post(newEndpoint, x);
      return dispatch({
        type: POST_REGISTER_USER,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FAIL_REGISTER_USER,
        payload: error.message,
      });
    }
  };
};
export const getVinylsForName = (title) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(endpoint);
      if (
        response.status === 200 &&
        response.data &&
        Array.isArray(response.data)
        
      ) {
        const filteredData = response.data.filter((vinyl) =>
          vinyl.title.toLowerCase().includes(title.toLowerCase())
        );
        dispatch({
          type: GET_VINYLS_FOR_NAME,
          payload: filteredData,
        });
      } else {
        console.log("API response does not have the expected structure.");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// export const getVinylCart = (id) => {
//   return async function (dispatch) {
//     console.log(id);
//     try {
//       const { data } = await axios.get(endpoint + id);
//       dispatch({
//         type: ADD_TO_CART,
//         payload: data,
//       });
//       console.log(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

export const orderByTitle = (order) => {
  return {
    type: ORDER_BY_TITLE,
    payload: order,
  };
};

export const postVinyls = (dato) => async (dispatch) => {
  try {
    const response = await axios.post(endpoint, dato);
    const data = response.data;
    dispatch({
      type: POST_VINYL,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const reset = () => {
  return {
    type: RESET,
  };
};

export const orderForGenre = (name) => {
  return {
    type: ORDER_FOR_GENRE,
    payload: name,
  };
};

export const filterVinylsByDecade = (startYear, endYear) => {
  return {
    type: FILTER_BY_DECADE,
    payload: { startYear, endYear },
  };
};

export const addToCart = (vinyl) => ({
  type: ADD_TO_CART,
  payload: vinyl,
});

export const removeFromCart = (vinylId) => ({
  type: REMOVE_FROM_CART,
  payload: vinylId,
});

export const loginUserWithEmail = (email, password) => async (dispatch) => {
  try {

    // Hacer una solicitud al servidor para autenticar al usuario con correo y contraseña
    // Si la autenticación es exitosa, almacenar el token en el estado de Redux
    const response = await axios.post("/api/login", { email, password });
    const token = response.data.token;
    dispatch({ type: LOGIN_SUCCESS, payload: token });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
    const response = await axios.post("http://localhost:3001/login", { email, password });
    
    if (response.status === 200) {
      // Si la solicitud es exitosa y el servidor devuelve un código 200,
      // entonces consideramos que la autenticación fue exitosa.
      const token = response.data.token;
      dispatch({ type: "LOGIN_SUCCESS", payload: token });
    } else {
      // Aquí puedes manejar diferentes casos de error según el código de respuesta del servidor.
      // Por ejemplo, si el servidor devuelve 401 (No autorizado) para credenciales incorrectas,
      // podrías manejarlo de manera diferente.
      dispatch({ type: "LOGIN_FAILURE", payload: "Credenciales incorrectas" });
    }
  } catch (error) {
    // Manejar errores de red u otros errores que puedan ocurrir en la solicitud.
    dispatch({ type: "LOGIN_FAILURE", payload: "Error de red" });

  }
};

export const loginUserWithGoogle = (googleToken) => async (dispatch) => {
  try {
    // Hacer una solicitud al servidor para autenticar al usuario con Google
    // Si la autenticación es exitosa, almacenar el token en el estado de Redux
    const response = await axios.post("/api/google-login", { googleToken });
    const token = response.data.token;
    dispatch({ type: LOGIN_SUCCESS, payload: token });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
  }
};

export const logoutUser = () => {
  // Eliminar el token de autenticación del estado de Redux al cerrar sesión
  return { type:LOGOUT };
};

export const increaseItem = (vinyl) => ({
  type: "INCREASE_ITEM",
  payload: vinyl,
});

export const decreaseItem = (vinyl) => ({
  type: "DECREASE_ITEM",
  payload: vinyl,
});
