import axios from "axios";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
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
export const LOGIN_USER_WITH_GOOGLE_SUCCESS = "LOGIN_USER_WITH_GOOGLE_SUCCESS";
export const LOGIN_USER_WITH_GOOGLE_FAILURE = "LOGIN_USER_WITH_GOOGLE_FAILURE";
export const LOGOUT = "LOGOUT";
export const POST_VINYL = "POST_VINYL";
export const INCREASE_ITEM = "INCREASE_ITEM";
export const DECREASE_ITEM = "DECREASE_ITEM";
export const CREATE_ORDER = "CREATE_ORDER";
export const SUCCESS_MP = "SUCCESS_MP";
export const FAILURE_MP = "FAILURE_MP";
export const PENDIGN_MP = "PENDIGN_MP";
export const CLEAR_CART = "CLEAR_CART";
export const FAIL_REGISTER_USER = "FAIL_REGISTER_USER";
export const TOGGLE_DARK_MODE = "TOGGLE_DARK_MODE";
export const UPDATE_VINYLS = "UPDATE_VINYLS";
export const USERS_SUCCESS = "USERS_SUCCESS";
export const DISABLE_USER = "DISABLE_USER";
export const RESTORE_USER="RESTORE_USER";
export const USER_RESTORE_SUCCESS="USER_RESTORE_SUCCESS";
export const USER_RESTORE_FAILURE="USER_RESTORE_FAILURE";
export const ADMINS_SUCCESS = "ADMINS_SUCCESS";
export const DELETE_USER = "DELETE_USER";
export const LOGIN_SUCCESS_GOOGLE = "LOGIN_SUCCESS_GOOGLE";
export const POST_REVIEW="POST_REVIEW";
export const GET_REVIEWS = "GET_REVIEWS";
export const POST_ORDERDETAIL = "POST_ORDERDETAIL";
export const STOCK_REDUC = "STOCK_REDUC";
export const DELETE_ORDERDETAIL = "DELETE_ORDERDETAIL"

const endpoint = "https://vinyls-trade-back-production.up.railway.app/";

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
    const response = await axios.get(
      `https://vinyls-trade-back-production.up.railway.app/${id}`
    );
    const data = response.data;
    if (Array.isArray(data) && data.length > 0) {
      // Verificamos si data es un array y si contiene al menos un elemento
      const vinylDetail = data[0];
      dispatch({ type: GET_DETAIL, payload: vinylDetail });
    }
  } catch (error) {
    console.log(error);
  }
};

export const postRegisterUser = (x) => {
  const newEndpoint =
    "https://vinyls-trade-back-production.up.railway.app/createUser";
  console.log(x);
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

export const disableUser = (id) => async (dispatch) => {
  try {
    // Envía el userId como parte de la URL en lugar del cuerpo de la solicitud
    await  axios.put(
      `https://vinyls-trade-back-production.up.railway.app/inhabilityUser/${id}`
    );
    // Despacha una acción para actualizar el estado de Redux después de la eliminación
    dispatch({ type: "DISABLE_USER"});
  } catch (error) {
    // Maneja errores aquí si es necesario
    console.error("Error al eliminar el usuario", error);
  }
};

export const restoreUser = (id) => async (dispatch) => {
  try {
    // Envía el userId como parte de la URL en lugar del cuerpo de la solicitud
    await axios.put(
      `https://vinyls-trade-back-production.up.railway.app/restoreUser/${id}`
    );
    // Despacha una acción para actualizar el estado de Redux después de restaurar al usuario
    dispatch({ type: "RESTORE_USER"});
  } catch (error) {
    // Maneja errores aquí si es necesario
    console.error("Error al restaurar el usuario", error);
  }
};

export const getUsersAndSuccess = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(
        "https://vinyls-trade-back-production.up.railway.app/get/users"
      );
      dispatch({
        type: USERS_SUCCESS,
        payload: data,
      });
    } catch (err) {
      console.error("Error al obtener la lista de usuarios: ", err);
    }
  };
};

export const deleteUser = (userId) => {
  return async (dispatch) => {
    try {
      // Realiza la petición para eliminar al usuario por ID
      await axios.delete(
        `https://vinyls-trade-back-production.up.railway.app/deleteUser/${userId}`
      );

      // Despacha la acción DELETE_USER con el ID del usuario eliminado
      dispatch({
        type: DELETE_USER,
        payload: userId,
      });
    } catch (error) {
      console.error("Error al eliminar el usuario: ", error);
    }
  };
};

export const getAdmins = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(
        "https://vinyls-trade-back-production.up.railway.app/get/admins"
      );
      dispatch({
        type: ADMINS_SUCCESS,
        payload: data,
      });
    } catch (err) {
      console.error("Error al obtener la lista de usarios", err);
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

export const postMP = (dato) => async (dispatch) => {
  const { data } = await axios.post(
    "https://vinyls-trade-back-production.up.railway.app/create_order",
    dato
  );
  dispatch({
    type: CREATE_ORDER,
    payload: data,
  });
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

export const clearCart = () => ({
  type: CLEAR_CART,
});

export const loginUserByEmail = (loginData) => async (dispatch) => {
  try {
    const response = await axios.post(
      "https://vinyls-trade-back-production.up.railway.app/login",
      loginData
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const loginUserByGoogle = (token) => async (dispatch) => {
  try {
    const response = await axios.get(
      "https://vinyls-trade-back-production.up.railway.app/auth/google",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const logoutUser = () => {
  // Eliminar el token de autenticación del estado de Redux al cerrar sesión
  return { type: LOGOUT };
};

export const increaseItem = (vinyl) => ({
  type: "INCREASE_ITEM",
  payload: vinyl,
});

export const decreaseItem = (vinyl) => ({
  type: "DECREASE_ITEM",
  payload: vinyl,
});


export const updateVinyls = (id, stock) => async (dispatch) => {
  const newEndpoint = `https://vinyls-trade-back-production.up.railway.app/upgrade_vinyls/${id}`;
  try {
    const response = await axios.put(newEndpoint, { stock });
    const data = response.data;
    dispatch({
      type: UPDATE_VINYLS,
      payload: { id, stock: data.stock}, // Asegúrate de obtener el campo correcto de la respuesta de la API
    });
  } catch (error) {
    console.error("Error en la solicitud PUT:", error);
  }
};



export const getReviews = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "https://vinyls-trade-back-production.up.railway.app/get/allReviews"
    );
    dispatch({ type: GET_REVIEWS, payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

export const postReview=(datos)=> async (dispatch)=>{
  try {
    const response = await axios.post(
      "https://vinyls-trade-back-production.up.railway.app/reviews",
       datos
    );
    dispatch({
      type:POST_REVIEW,
      payload:response.data
    })
    
  } catch (error) {
    console.log(error);
  }
}

export const postOrdernDetial = (info) => async (dispatch) => {
  try {
    const {data} = await axios.post("https://vinyls-trade-back-production.up.railway.app/createOrderDetail", info);
    dispatch({
      type: POST_ORDERDETAIL,
      payload: data,
    })
  } catch (err) {
    
  }
}

export const deleteOrderDeteil = () => async (dispatch) => {
  const {data} = await axios.delete("https://vinyls-trade-back-production.up.railway.app/delete/deleteOrderDetail")
  dispatch({
    type:DELETE_ORDERDETAIL,
    payload: data
  })
}

export const StockReduc = (id, stock) => async (dispatch) => {
  const { data } = await axios.put(`https://vinyls-trade-back-production.up.railway.app/upgrade_vinyls/${id}`, { stock });
  dispatch({
    type: STOCK_REDUC,
    payload: { id, stock: data.stock }, // Envía tanto el id como el stock
  });
};


