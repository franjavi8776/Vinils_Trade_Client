import axios from "axios";

export const GET_ALL_VINYLS = "GET_ALL_VINYLS";
export const GET_DETAIL = "GET_DETAIL";
export const GET_VINYLS_FOR_NAME = "GET_VINYLS_FOR_NAME";

const endpoint = "http://localhost:3001/results/";

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
    const response = await axios.get(endpoint + id);
    const data = response.data;
    dispatch({ type: GET_DETAIL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getVinylsForName = (name) => {
  return async (dispatch) => {
    try {
      const { data } = axios.get(endpoint + name);
      return dispatch({
        type: GET_VINYLS_FOR_NAME,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
