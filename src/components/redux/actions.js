import axios from "axios";


export const postVinyls = (dato)  => {
    return async () => {
      try {
        await axios.post(`http://localhost:3001/vinyls`, dato).then((response) => response.data)
        
      } catch (err) {
        console.log(err)
      }
    }
  }