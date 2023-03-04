import { useSelector, useDispatch } from "react-redux";
import { loginSuccess, logout } from '../features/auth'
import {store} from '../store'



export const checkAuth =( async () => {
    try{
      const response = await fetch(`http://localhost:8080/api/checkUser`, {
        headers: {
          'Accept': 'application/json',
          'Credentials': 'include'
        },
        method: "GET",
        credentials: 'include',
      })
      if (response.ok){
        const data = await response.json(); 
        store.dispatch(loginSuccess({ username: data.Username }));
        return data;    
      }
      if (response.status === 401) {
        store.dispatch(logout());
        return null;
      }
    //const data = await response;
    } catch(error){
      console.log(error);
      return null;
      // throw new Error("Error fetching token data")
      // throw new Error(error)
      //console.log(error);
    }
  })