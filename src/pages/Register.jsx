import React, { useContext, useState } from 'react'
import '../stytesheets/register.css'
import axios from 'axios'
import { Context, server } from '../main'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom';
const Register = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password,setpassword]=useState("");
  const {isauthanticated,setisauthanticated,Loading,setLoading}=useContext(Context);
  const submitHandler=async(e)=>{
    e.preventDefault();
    setLoading(true);
    try {
      const {data}=await axios.post(`${server}/user/register`,{
        name,email,password
      },{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true,
      })
      toast.success(data.message);
      setisauthanticated(true);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setisauthanticated(false);
      setLoading(false);
    }
  }
  if(isauthanticated){
    return <Navigate to="/"/>
  }
  return (
    <>
    <div id="main">
          <div id="text">Register</div>
          <form action="" onSubmit={submitHandler}>
            <input 
            value={name}
            onChange={(e)=>{
              setname(e.target.value);
            }} 
            type="Name" 
            placeholder='Nickname' 
            required/>

            <input 
            value={email}
            onChange={(e)=>{
              setemail(e.target.value);
            }}
            type="email"
            placeholder='Email'
            required/>

            <input
            value={password} 
            onChange={(e)=>{
              setpassword(e.target.value);
            }} 
            type="password" 
            placeholder='Password' 
            required/>
            <button disabled={Loading}>Sign Up</button>
          </form>
        </div>
    </>
  )
}

export default Register
