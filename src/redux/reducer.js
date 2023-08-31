import { GET_ALL_VINYLS, GET_DETAIL, GET_VINYLS_FOR_NAME, FILTER_BY_DECADE } from "./actions";

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
    case FILTER_BY_DECADE:
      const { startYear, endYear } = action.payload;
      const filteredVinyls = state.allVinyls.filter((vinyl) => {
        const vinylYear = parseInt(vinyl.Year);
        return vinylYear >= startYear && vinylYear <= endYear;
      });

      return {
        ...state,
        vinyls: filteredVinyls,
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
