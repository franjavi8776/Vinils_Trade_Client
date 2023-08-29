import axios from 'axios';

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