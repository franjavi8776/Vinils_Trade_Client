import axios from "axios";

export const GET_ALL_VINYLS = "GET_ALL_VINYLS";
export const GET_DETAIL = "GET_DETAIL";
export const GET_VINYLS_FOR_NAME = "GET_VINYLS_FOR_NAME";
export const ORDER_FOR_GENRE = "ORDER_FOR_ARTIST";
export const RESET = "RESET";
export const ORDER_BY_TITLE = "ORDER_BY_TITLE";
export const FILTER_BY_DECADE = "FILTER_BY_DECADE";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT="LOGOUT";
export const POST_VINYL = "POST_VINYL";


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

export const loginUserWithEmail = (email, password) => async (dispatch) => {
  try {
    // Hacer una solicitud al servidor para autenticar al usuario con correo y contraseña
    // Si la autenticación es exitosa, almacenar el token en el estado de Redux
    const response = await axios.post('/api/login', { email, password });
    const token = response.data.token;
    dispatch({ type: 'LOGIN_SUCCESS', payload: token });
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
  }
};

export const loginUserWithGoogle = (googleToken) => async (dispatch) => {
  try {
    // Hacer una solicitud al servidor para autenticar al usuario con Google
    // Si la autenticación es exitosa, almacenar el token en el estado de Redux
    const response = await axios.post('/api/google-login', { googleToken });
    const token = response.data.token;
    dispatch({ type: 'LOGIN_SUCCESS', payload: token });
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
  }
};

export const logoutUser = () => {
  // Eliminar el token de autenticación del estado de Redux al cerrar sesión
  return { type:'LOGOUT'};
};

