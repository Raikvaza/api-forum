import React from 'react'
import InputForm from '../../components/Input-Form/Input-Form'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
const CreatePost = () => {
  // const navigate = useNavigate();
  const userData = useSelector(state => state.auth.username)
  console.log(userData);
  if (userData){
    return <InputForm/>
  } else {
    return <Navigate to="/signin"/>
  }
  
}
export default CreatePost;
