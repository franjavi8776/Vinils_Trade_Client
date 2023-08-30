import { GET_ALL_VINYLS } from "./actions";
import { GET_VINYLS_FOR_NAME } from "./actionType";
const initialState = {
  allVinyls: [],
  vinyls: [],
  search: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_VINYLS:
      return { ...state, allVinyls: action.payload, vinyls: action.payload };

      case GET_VINYLS_FOR_NAME:
        return{
          ...state,
          search: action.payload
        }
    default:
      return state;
  }
};

export default reducer;

