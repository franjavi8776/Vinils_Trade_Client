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
  LOGIN_USER_WITH_GOOGLE_SUCCESS,
  LOGIN_USER_WITH_GOOGLE_FAILURE,
  POST_VINYL,
  INCREASE_ITEM,
  DECREASE_ITEM,
  CREATE_ORDER,
  SUCCESS_MP,
  PENDIGN_MP,
  FAILURE_MP,
  CLEAR_CART,
  USERS_SUCCESS,
  DISABLE_USER,
  ADMINS_SUCCESS,
  DELETE_USER,
} from "./actions";
const initialState = {
  allVinyls: [],
  vinyls: [],
  vinilos: [],
  detail: {},
  search: [],
  filteredVinyls: [],
  isAuthenticated: false,
  token: localStorage.getItem("token") || null,
  error: null,
  user: null,
  cartState: false,
  cartItems: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  cartTotalAmount: 0,
  cartTotalQuantity: 0,
  stock: {},
  dataMP: {},
  stateMP: {
    success: null,
    failure: null,
    pending: null,
  },
  users: [],
  admins: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_VINYLS:
      return {
        ...state,
        allVinyls: action.payload,
        vinyls: action.payload,
        vinilos: action.payload,
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
        vinyls: [...state.allVinyls, action.payload],
      };

    

    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };
    case USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
    case ADMINS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        admins: action.payload,
      };
    case DISABLE_USER:
      const updatedUsers = state.users.filter((user) =>
        user.id !== action.payload 
      );
      return {
        ...state,
        users: updatedUsers,
      };

    case DELETE_USER:
      const userIdToDelete = action.payload;
      // Filtra los usuarios para eliminar el que coincide con el ID
      const updatedUsersAfterDelete = state.users.filter((user) => user.id !== userIdToDelete);
      return {
        ...state,
        users: updatedUsersAfterDelete,
      };

    case ADD_TO_CART:
      const addedItem = state.vinyls.find(
        (vinyl) => vinyl.id === action.payload.id
      );
      if (!addedItem) {
        return state; // El vinilo no existe, no hacemos nada
      }

      const updatedVinyls = state.vinyls.map((vinyl) => {
        if (vinyl.id === action.payload.id) {
          return {
            ...vinyl,
            stock: vinyl.stock - 1, // Reduce el stock
          };
        }
        return vinyl;
      });

      localStorage.setItem(
        "cart",
        JSON.stringify([...state.cartItems, action.payload])
      );

      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
        vinyls: updatedVinyls,
      };

    case CLEAR_CART:
      localStorage.removeItem("cart");
      return {
        ...state,
        cartItems: [],
      };

    case CREATE_ORDER:
      return {
        ...state,
        dataMP: action.payload,
      };

    case SUCCESS_MP:
      return {
        ...state,
        stateMP: { ...state.stateMP, success: action.payload },
      };
    case PENDIGN_MP:
      return {
        ...state,
        stateMP: { ...state.stateMP, pending: action.payload },
      };
    case FAILURE_MP:
      return {
        ...state,
        stateMP: { ...state.stateMP, failure: action.payload },
      };

    case CLEAR_CART:
      localStorage.removeItem("cart");
      return {
        ...state,
        cartItems: [],
      };

    case CREATE_ORDER:
      return {
        ...state,
        dataMP: action.payload,
      };

    case SUCCESS_MP:
      return {
        ...state,
        stateMP: { ...state.stateMP, success: action.payload },
      };
    case PENDIGN_MP:
      return {
        ...state,
        stateMP: { ...state.stateMP, pending: action.payload },
      };
    case FAILURE_MP:
      return {
        ...state,
        stateMP: { ...state.stateMP, failure: action.payload },
      };

    case REMOVE_FROM_CART:
      const removeItemId = action.payload;
      const removedItem = state.cartItems.find(
        (item) => item.id === removeItemId
      );
      if (!removedItem) {
        return state; // El elemento no existe en el carrito, no hacemos nada
      }

      const updatedVinylsAfterRemove = state.vinyls.map((vinyl) => {
        if (vinyl.id === removedItem.id) {
          return {
            ...vinyl,
            stock: vinyl.stock + removedItem.cartQuantity, // Restaura el stock
          };
        }
        return vinyl;
      });

      const updatedCartItemsAfterRemove = state.cartItems.filter(
        (item) => item.id !== removeItemId
      );

      localStorage.setItem("cart", JSON.stringify(updatedCartItemsAfterRemove));

      return {
        ...state,
        cartItems: updatedCartItemsAfterRemove,
        vinyls: updatedVinylsAfterRemove,
      };

    case INCREASE_ITEM:
      const increasedCartItems = state.cartItems.map((item) => {
        if (item.id === action.payload.id) {
          // Verifica que el stock no sea menor que la cantidad en el carrito
          item.cartQuantity += 1;
          item.stock -= 1; // Reduce el stock
        }
        return item;
      });

      localStorage.setItem("cart", JSON.stringify(increasedCartItems));

      return {
        ...state,
        cartItems: increasedCartItems,
      };

    case DECREASE_ITEM:
      const decreasedCartItems = state.cartItems.map((item) => {
        if (item.id === action.payload.id) {
          // Verifica que la cantidad en el carrito sea mayor que 1 antes de disminuir
          if (item.cartQuantity > 1) {
            item.cartQuantity -= 1;
            item.stock += 1; // Aumenta el stock
          }
        }
        return item;
      });

      localStorage.setItem("cart", JSON.stringify(decreasedCartItems));

      return {
        ...state,
        cartItems: decreasedCartItems,
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
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token, // Almacenar el token cuando la autenticación sea exitosa
        error: null, // Restablecer cualquier mensaje de error anterior
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        token: null, // Borrar el token en caso de error de autenticación
        error: action.payload, // Almacenar el mensaje de error
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        token: null, // Borrar el token cuando se cierre sesión
        error: null, // Restablecer cualquier mensaje de error anterior
      };
    // case LOGIN_USER_WITH_GOOGLE_SUCCESS:
    //     return {
    //       ...state,
    //       user: action.payload,
    //       token: action.payload.token,
    //       error: null,
    //   };
    // case LOGIN_USER_WITH_GOOGLE_FAILURE:
    //     return {
    //       ...state,
    //       user:null,
    //       token: null,
    //       error: action.payload,
    //   };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
