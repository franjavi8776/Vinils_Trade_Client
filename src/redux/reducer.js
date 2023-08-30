import { GET_ALL_VINYLS, GET_DETAIL, GET_VINYLS_FOR_NAME } from "./actions";

const initialState = {
  allVinyls: [],
  vinyls: [],
  detail: {},
  search: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_VINYLS:
      return {
        ...state,
        allVinyls: action.payload,
        vinyls: action.payload,
      };

    case GET_VINYLS_FOR_NAME:
      return {
        ...state,
        search: action.payload,
      };
    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
