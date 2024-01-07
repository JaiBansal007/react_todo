import React from 'react'
import "../stytesheets/Todoitem.css"
const Todoitem = ({
    title,
    discription,
    iscompleted,
    updatehandler,
    delethandler,
    id
}) => {
  return (
    <>
    <div id="todo" key={id} >
        <div id="left-todo">
            <h4>{title}</h4>
            <p>{discription}</p>
        </div>
        <div id="right-todo">
            <input type="checkbox" checked={iscompleted} onChange={()=>{
                updatehandler(id);
            }}/>
            <button onClick={()=>{
                        delethandler(id);
                    }}>Delete</button>
        </div>
    </div>
    </>
  )
}

export default Todoitem
