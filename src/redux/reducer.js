import { GET_ALL_VINYLS, GET_DETAIL } from "./actions";

const initialState = {
  allVinyls: [],
  vinyls: [],
  detail: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };
    default:
    case GET_ALL_VINYLS:
      return { ...state, allVinyls: action.payload, vinyls: action.payload };
      return {
        ...state,
      };
  }
};

export default reducer;
