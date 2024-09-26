import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios';
function App() {
  const [users,setUsers]=useState([]);
  useEffect(()=>{
    axios.get('http://localhost:5000/api/users')
    .then((response)=>{
      setUsers(response.data.data)
    })
    .catch((error)=>{
      console.error("There was an Error!",error);
    })
  },[]);

  return (
   <>
    <h1>Users</h1>
    <div>
      {users.map((user)=>(
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
   </>
  )
}

export default App
