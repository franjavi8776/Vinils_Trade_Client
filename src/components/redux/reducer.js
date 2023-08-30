import{
  GET_ALL_VINYLS
}from './actions';

const initialState = {
  allVinyls: [],
  vinyls:[]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      case GET_ALL_VINYLS:
        return{...state,allVinyls:action.payload,vinyls:action.payload};
      return {
        ...state,
      };
  }
};

export default reducer;
