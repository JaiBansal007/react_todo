import React, { useContext, useState } from 'react'
import '../stytesheets/Login.css'
import { Context, server } from '../main';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Register from './Register';

const Login = () => {
  const {isauthanticated,setisauthanticated,Loading,setLoading}=useContext(Context);
  const [email, setemail] = useState("");
  const [password,setpassword]=useState("");

  const submitHandler=async(e)=>{
    e.preventDefault();
    setLoading(true);
    try {
      const {data}=await axios.post(`${server}/user/login`,{
        email,password
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
          <div id="text">Login</div>
          <form action="" onSubmit={submitHandler}>
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
            <button disabled={Loading}>Log In</button>
            <hr />
            <Link id="signup" to="/register" element={<Register/>}>Sign Up</Link>
          </form>
        </div>
    </>
  )
}

export default Login
