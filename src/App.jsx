import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router,Routes,Route, Link } from 'react-router-dom';
import './global.css'
import Login from './pages/Login'
import Register from './pages/Register';
import Header from './components/Header';
import Home from './pages/Home';
import Profile from './pages/Profile';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Context, server } from './main';
export const App = () => {
  const {setUser,setisauthanticated,setLoading}=useContext(Context);
  useEffect(()=>{
    setLoading(true);
    axios.get(`${server}/user/profile`,{
      withCredentials:true,
    }).then((res)=>{
      setUser(res.data.message);
      setisauthanticated(true);
      setLoading(false);
    }).catch((error)=>{
      setUser({});
      setisauthanticated(false);
      setLoading(false);
    })
  },[])
  return (
      <>
        <Router>
          <Header/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
          </Routes>
          <ToastContainer/>
        </Router>
      </>
  )
}






