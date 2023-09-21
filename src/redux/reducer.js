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
  CREATE_ORDER,
  SUCCESS_MP,
  PENDIGN_MP,
  FAILURE_MP,
  CLEAR_CART,
  USERS_SUCCESS,
  DISABLE_USER,
  ADMINS_SUCCESS,
  UPDATE_VINYLS,
  DELETE_USER,
  LOGIN_SUCCESS_GOOGLE,
  GET_REVIEWS,
  POST_ORDERDETAIL,
  STOCK_REDUC,
  DELETE_ORDERDETAIL,
} from "./actions";

const initialState = {
  allVinyls: [],
  vinyls: [],
  allVin: [],
  vinilos: [],
  detail: {},
  search: [],
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
  email: localStorage.getItem("email") || "",
  reviews: [],

  OrdenDetal: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_VINYLS:
      return {
        ...state,
        allVinyls: action.payload,
        vinyls: action.payload,
        vinilos: action.payload,
        allVin: action.payload,
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

    case ORDER_BY_TITLE: {
      const orderDirection = action.payload === "A" ? 1 : -1;
      const sortedVinyls = [...state.allVinyls].sort((a, b) => {
        return a.title.localeCompare(b.title) * orderDirection;
      });

      return {
        ...state,
        allVinyls: sortedVinyls,
      };
    }

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
      const userId = action.payload;
      const updatedUsers = state.users.map((user) =>
        user.id === userId ? { ...user, disabled: true } : user
      );
      return {
        ...state,
        users: updatedUsers,
      };

    case DELETE_USER:
      const userIdToDelete = action.payload;
      // Filtra los usuarios para eliminar el que coincide con el ID
      const updatedUsersAfterDelete = state.users.filter(
        (user) => user.id !== userIdToDelete
      );
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
    case UPDATE_VINYLS:
      const { stock, id } = action.payload;
      return {
        ...state,
        allVinyls: state.allVinyls.map((el) => {
          if (el.id === id) {
            return { ...el, stock };
          } else {
            return el;
          }
        }),
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

    case ORDER_FOR_GENRE:
      const vinilFilter = state.allVin.filter((vinyl) =>
        vinyl.genre.includes(action.payload)
      );
      return {
        ...state,
        allVinyls: vinilFilter,
        vinyls: vinilFilter,
      };
    case FILTER_BY_DECADE:
      const { startYear, endYear } = action.payload;
      const filteredVinyls = state.vinyls.filter((vinyl) => {
        const vinylYear = parseInt(vinyl.year);
        return vinylYear >= startYear && vinylYear <= endYear;
      });

      return {
        ...state,
        allVin: filteredVinyls,
        allVinyls: filteredVinyls,
      };

    case RESET:
      return {
        ...initialState,
      };

    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("email", action.payload.email);
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token, // Almacenar el token cuando la autenticación sea exitosa
        email: action.payload.email,
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
    case GET_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };

    case POST_ORDERDETAIL:
      return {
        ...state,
        orderDetail: action.payload,
      };
    case STOCK_REDUC:
    case STOCK_REDUC:
      const id1 = action.payload.id;
      const stock1 = action.payload.stock;

      // Resto de tu lógica aquí

      const updatedVinylsStock = state.allVinyls.map((vinyl) => {
        if (vinyl.id === id1) {
          // Encuentra el vinilo con el ID que coincida
          const cartItem = state.cartItems.find((item) => item.id === id1);
          if (cartItem) {
            // Si el vinilo está en el carrito, resta su cantidad al stock
            return {
              ...vinyl,
              stock: stock1,
            };
          }
        }
        return vinyl;
      });

      return {
        ...state,
        allVinyls: updatedVinylsStock,
      };

    case DELETE_ORDERDETAIL:
      return {
        ...state,
      };

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
