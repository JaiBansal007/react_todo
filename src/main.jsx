import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import {App} from "./App.jsx"

export const server="https://todo-app-m4h6.onrender.com/api/v1";
export const Context=createContext({isauthanticated:false});

const AppWraper=()=>{
  const [isauthanticated,setisauthanticated]=useState(false);
  const [Loading, setLoading] = useState(false);
  const [User, setUser] = useState({});
  return (
    <Context.Provider value={{
      isauthanticated,
      setisauthanticated,
      Loading,
      setLoading,
      User,
      setUser
      }}>
    <App/>
  </Context.Provider>
  )
}
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWraper/>
  </React.StrictMode>

)