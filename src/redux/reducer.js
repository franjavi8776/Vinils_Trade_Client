import {
  GET_ALL_VINYLS,
  GET_DETAIL,
  GET_VINYLS_FOR_NAME,
  ORDER_FOR_GENRE,
  RESET,
  FILTER_BY_DECADE,
  ORDER_BY_TITLE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  POST_VINYL,
} from "./actions";
const initialState = {
  allVinyls: [],
  vinyls: [],
  detail: {},
  search: [],
  filteredVinyls: [],
  cartItems: [],
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
    case POST_VINYL:
      return {
        ...state,
        allVinyls: [...state.allVinyls, action.payload],
      };

    case FILTER_BY_DECADE:
      const { startYear, endYear } = action.payload;
      const filteredVinyls = state.vinyls.filter((vinyl) => {
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
        detail: action.payload,
      };
    case ORDER_FOR_GENRE:
      return {
        ...state,
        allVinyls: state.vinyls.filter((vinyl) =>
          vinyl.genre.some((genre) => genre === action.payload)
        ),
      };

    case RESET:
      return {
        ...initialState,
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

    case ADD_TO_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        error: null,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
