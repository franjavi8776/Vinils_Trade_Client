import axios from 'axios';

export const GET_ALL_VINYLS='GET_ALL_VINYLS';

export const getAllVinyls=()=>async(dispatch)=>{
    try {
        const endpoint="http://localhost:3000/results"
        const response= await axios.get(endpoint);
        const data=response.data;
        return dispatch({
            type:GET_ALL_VINYLS,
            payload:data
        });
    } catch (error) {
        console.log(error);
    }
};