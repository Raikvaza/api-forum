import { useDispatch } from "react-redux";
import auth, { logout, loginSuccess } from "../features/auth";
import { useNavigate } from "react-router";


const baseURL = 'http://localhost:8080/api';


export const signOutHandler = async (dispatch, navigate) =>{
  const response = await fetch(`${baseURL}/signout`, {
    headers: {
      'Accept': 'application/json',
      'Credentials': 'include',
    },
    method: "GET",
    credentials: "include",
  })
  if (!response.ok){
    dispatch(logout());
    console.log("Already signed out");
    throw Error("Could not sign out")
  }
  dispatch(logout());
  navigate("/signin");
  return
}



export const getData = () => {
  return fetch(`${baseURL}/data`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .catch(error => console.error(error));
};

export const postData = (data) => {
  return fetch(`${baseURL}/data`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .catch(error => console.error(error));
};
