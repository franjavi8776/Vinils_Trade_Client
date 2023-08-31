import axios from "axios";

export const GET_ALL_VINYLS = "GET_ALL_VINYLS";
export const GET_DETAIL = "GET_DETAIL";
export const GET_VINYLS_FOR_NAME = "GET_VINYLS_FOR_NAME";
export const FILTER_BY_DECADE = "FILTER_BY_DECADE";


const endpoint = "http://localhost:3000/results";

export const getAllVinyls = () => async () => {
  try {
    const data = response.data;
    return dispatch({
      type: GET_ALL_VINYLS,
      payload: data,
    });
  } catch (error) {}
};

export const getVinylDetail = (id) => async (dispatch) => {
  try {
    const endpoint = `http://localhost:3000/results/${id}`;
    const response = await axios.get(endpoint);
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

export const postVinyls = (dato)  => {
    return async () => {
      try {
        await axios.post(`http://localhost:3001/vinyls`, dato).then((response) => response.data)
        
      } catch (err) {
        console.log(err)
      }
    }
  }

export const filterVinylsByDecade = (startYear, endYear) => {
  return {
    type: FILTER_BY_DECADE,
    payload: { startYear, endYear },
  };
};