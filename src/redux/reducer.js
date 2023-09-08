import {
  GET_ALL_VINYLS,
  GET_DETAIL,
  GET_VINYLS_FOR_NAME,
  ORDER_FOR_GENRE,
  RESET,
  FILTER_BY_DECADE,
  ORDER_BY_TITLE,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  POST_VINYL,
  INCREASE_ITEM,
  DECREASE_ITEM,
} from "./actions";
const initialState = {
  allVinyls: [],
  vinyls: [],
  detail: {},
  search: [],
  filteredVinyls: [],
  token:null,
  error:null,
  cartState: false,
  cartItems: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  cartTotalAmount: 0,
  cartTotalQuantity: 0,
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

    case ADD_TO_CART:
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[itemIndex] = {
          ...updatedCartItems[itemIndex],
          cartQuantity: updatedCartItems[itemIndex].cartQuantity + 1,
        };

        localStorage.setItem("cart", JSON.stringify(updatedCartItems));

        return { ...state, cartItems: updatedCartItems };
      } else {
        const temp = { ...action.payload, cartQuantity: 1 };
        const updatedCartItems = [...state.cartItems, temp];

        localStorage.setItem("cart", JSON.stringify(updatedCartItems));

        return { ...state, cartItems: updatedCartItems };
      }

    case REMOVE_FROM_CART:
      const removeItemId = action.payload; // action.payload debe ser solo el ID
      const updateCartItems = state.cartItems.filter(
        (item) => item.id !== removeItemId
      );
      localStorage.setItem("cart", JSON.stringify(updateCartItems));
      return {
        ...state,
        cartItems: updateCartItems,
      };

    case INCREASE_ITEM:
      const updatedCartItems = state.cartItems.map((item) => {
        if (item.id === action.payload.id) {
          // Verifica que el stock no sea menor que la cantidad en el carrito
          item.cartQuantity += 1;
          item.stock -= 1; // Reduce el stock
        }
        return item;
      });

      localStorage.setItem("cart", JSON.stringify(updatedCartItems));

      return {
        ...state,
        cartItems: updatedCartItems,
      };

    case DECREASE_ITEM: {
      const updatedCartItems = state.cartItems.map((item) => {
        if (item.id === action.payload.id) {
          // Verifica que la cantidad en el carrito sea mayor que 1 antes de disminuir
          if (item.cartQuantity > 1) {
            item.cartQuantity -= 1;
            item.stock += 1; // Aumenta el stock
          }
        }
        return item;
      });

      localStorage.setItem("cart", JSON.stringify(updatedCartItems));

      return {
        ...state,
        cartItems: updatedCartItems,
      };
    }

    case ORDER_FOR_GENRE:
      return {
        ...state,
        allVinyls: state.vinyls.filter((vinyl) =>
          vinyl.genre.includes(action.payload)
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

    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload, // Almacenar el token cuando la autenticación sea exitosa
        error: null, // Restablecer cualquier mensaje de error anterior
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        token: null, // Borrar el token en caso de error de autenticación
        error: action.payload, // Almacenar el mensaje de error
      };
    case LOGOUT:
      return {
        ...state,
        token: null, // Borrar el token cuando se cierre sesión
        error: null, // Restablecer cualquier mensaje de error anterior
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
