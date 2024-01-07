import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import "../stytesheets/Header.css"
import Home from '../pages/Home'
import Profile from '../pages/profile'
import Login from '../pages/Login'
import Register from '../pages/Register'
import { Context, server } from '../main'
import { toast } from 'react-toastify'
import axios from 'axios'

const Header = () => {
  const {isauthanticated,setisauthanticated,Loading,setLoading}=useContext(Context);
  const [shown, setshown] = useState(false);
  
  const handleclick=()=>{
    setshown(!shown);
  }
  const LogoutHandler=async()=>{
    setLoading(true);
    try {
      const {data}=await axios.get(`${server}/user/logout`,{
        withCredentials:true,
      })
      toast.success(data.message);
      setisauthanticated(false);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setisauthanticated(true);
      setLoading(false);
    }
  }
  return (
    <>
        <div id="header">
          <div id="leftheader">TODO</div>
          {!shown&&(<div className="rightheader" >
            <Link id="home" to="/" element={<Home/>}>Home</Link>
            <Link id="profile" to="/profile" element={<Profile/>}>Profile</Link>
            {isauthanticated?
            <button id="login" disabled={Loading} onClick={LogoutHandler} >Logout</button>
            :<Link id="login" to="/login" element={<Login/>}>Login</Link>}
          </div>)}
          <img src="https://cdn-icons-png.flaticon.com/512/7710/7710488.png" alt="" onClick={handleclick}/>
        </div>
    </>
  )
}

export default Header

