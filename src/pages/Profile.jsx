import React, { useContext } from 'react'
import { Context } from '../main'
import { Navigate } from 'react-router-dom';
import "../stytesheets/profile.css"
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
const Profile = () => {
  const{isauthanticated,Loading,User}=useContext(Context);
  if(!isauthanticated){
    toast.error("Login First");
  }
  if(!isauthanticated) return <Navigate to={"/login"}/>
  return Loading?(<Loader/>):(<p id="userdata">
    <h1>{User?.name}</h1>
    <h2>{User?.email}</h2>
    </p>)
}

export default Profile
