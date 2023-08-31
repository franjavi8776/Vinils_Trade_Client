import {
  GET_ALL_VINYLS,
  GET_DETAIL,
  GET_VINYLS_FOR_NAME,
  ORDER_FOR_GENRE,
  RESET,
  FILTER_BY_DECADE,
  ORDER_BY_TITLE
} from "./actions";
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
        const vinylYear = parseInt(vinyl.year);
        return vinylYear >= startYear && vinylYear <= endYear;
      });

      return {
        ...state,
        allVinyls: filteredVinyls,
      };

    case GET_DETAIL:
      return {
        ...state,
        allVinyls: action.payload,
      };
    case ORDER_FOR_GENRE:
      return {
        ...state,
        vinyls: state.allVinyls.filter((vinyl) =>
          vinyl.genre.some((genre) => genre === action.payload)
        ),
      };

    case RESET:
      return {
        ...state,
        vinyls: state.allVinyls,
      };
    case ORDER_BY_TITLE: {
      const orderDirection = action.payload === "A" ? 1 : -1; //ordenamiento por nombre  si recibo a es verdadero 1 y -1 es falso
      return {
        ...state,
        allVinyls: state.allVinyls.slice().sort((a, b) => {
          return a.title.localeCompare(b.title) * orderDirection; //slice para cortar cuando haga el sort y lo compare con el nombre de a y nombre de b para ascendente o descendente 
        }),
      };
    }

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
