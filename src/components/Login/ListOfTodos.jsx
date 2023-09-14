import {useEffect} from "react";
import axios from "axios";

export default function ListOfTodo(token){
    console.log(token)
    const fetchData=async(token)=>{
        const res=await axios.get("http://localhost:3001/auth/google",{
            headers:{
                Authorization:'Bearer ' + token,
            }
        });
        console.log(res.data)
    }

    useEffect(()=>{
        if(token){
            fetchData(token);
        }
    },[token]) 


    return(
        <div>
            <h1>Lista</h1>
        </div>
    )
}