import React, { useContext, useEffect, useState } from 'react'
import "../stytesheets/home.css"
import Todoitem from '../components/Todoitem'
import { Context, server } from '../main'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Navigate } from 'react-router-dom'

const Home = () => {
    const [title, settitle] = useState("");
    const [discription, setdiscription] = useState("");
    const [mainTask, setmainTask] = useState([]);
    const [refresh,setrefresh]=useState(false);
    const {isauthanticated,Loading,setLoading}=useContext(Context);

    const submitHandler=async(e)=>{
        e.preventDefault();
        setLoading(true);
        try {
            const {data}=await axios.post(`${server}/todo/newTask`,{
                title,discription:discription,
            },{
                headers:{
                  "Content-Type":"application/json"
                },
                withCredentials:true,
              })
            settitle("");
            setdiscription("");
            toast.success(data.message);
            setLoading(false);
            setrefresh(prev=>!prev);
        } catch (error) {
            toast.error(error.response.data.message);
            setLoading(false);
        }
    }
    const updatehandler=async(id)=>{
        try {
            const {data}=await axios.put(`${server}/todo/${id}`,{},{
                withCredentials:true,
            })
            toast.success(data.message);
            setrefresh(prev=>!prev);
        } catch (error) {
            toast.error(error.response.data.message);
            
        }
    }
    const delethandler=async(id)=>{
        setLoading(true);
        try {
            const {data}=await axios.delete(`${server}/todo/${id}`,{
                headers:{
                  "Content-Type":"application/json"
                },
                withCredentials:true,
              })
            toast.success(data.message);
            setLoading(false);
            setrefresh(prev=>!prev);
        } catch (error) {
            toast.error(error.response.data.message);
            setLoading(false);
        }
    }
    let rendertask=<p>No Task available</p>
    if(mainTask.length>0){
        rendertask=mainTask.map((i)=>{
            return (
                <>
                    <Todoitem 
                    title={i.title}
                    discription={i.discription}
                    iscompleted={i.iscompleted}
                    updatehandler={updatehandler}
                    delethandler={delethandler}
                    id={i._id}
                    key={i._id}
                    />
                </>
            )
        })
    }
    useEffect(()=>{
        axios.get(`${server}/todo/all`,{
            withCredentials:true,
        })
        .then((res)=>{
            setmainTask(res.data.alltask);
        }).catch((e)=>{
            toast.error(e.response.data.message);

        })
    },[refresh]);
    if(!isauthanticated) return <Navigate to={"/login"}/>
  return (
    <>
        <form action="" onSubmit={submitHandler}>
            <input type="text" 
            placeholder='Enter Task' 
            value={title}
            onChange={(e)=>{
                settitle(e.target.value);
            }}
            required />
            <input type="text" 
            placeholder='Enter discription'
            value={discription}
            onChange={(e)=>{
                setdiscription(e.target.value);
            }}
            required/>
            <button disabled={Loading}>Add Task</button>
        </form>
        <hr />
        <div id="tasks">
            {rendertask}
        </div>
    </>
  )
}

export default Home
