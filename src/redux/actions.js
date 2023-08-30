import axios from "axios";

export const GET_ALL_VINYLS = "GET_ALL_VINYLS";
export const GET_DETAIL = "GET_DETAIL";

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
