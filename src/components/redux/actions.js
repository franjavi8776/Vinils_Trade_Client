import axios from "axios";

export const GET_ALL_VINYLS='GET_ALL_VINYLS';





export const getAllVinyls=()=>async()=>{
  try {
      const data=response.data;
      return dispatch({
          type:GET_ALL_VINYLS,
          payload:data
      });
  } catch (error) {
      
  }
};

export const postVinyls = (dato)  => {
    return async () => {
      try {
        await axios.post(`http://localhost:3001/vinyls`, dato).then((response) => response.data)
        
      } catch (err) {
        console.log(err)
      }
    }
  }