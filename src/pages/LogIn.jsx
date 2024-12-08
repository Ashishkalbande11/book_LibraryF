import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import {authActions} from '../store/auth.js'

const LogIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    username:"", 
    password:"",
  })
  
  const change = (e) => {
    const{name, value} = e.target;
    setUserData({...userData, [name] : value})
  }
  const submit = async() => {
    // console.log("clicked")
      try {
        if(userData.username === "" || userData.password === ""){
          alert("All fields required !!");
        }else{
          const response = await axios.post("https://booklibrarybackend-9e8y.onrender.com/api/sign-in", userData);
          // console.log(response.data);
          dispatch(authActions.login());
          dispatch(authActions.changeRole(response.data.role));
          localStorage.setItem("id", response.data.id);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("role", response.data.role);
          navigate("/profile")
        }
      } catch (error) {
        alert(error.response.data.message);
      }
  }
  return (
    <div className='h-[85vh] bg-zinc-900 px-12 py-8 flex items-center justify-center'>
      <div className='bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
        <p className='text-zinc-200 text-xl'>log In</p>
        <div className='mt-4'>
          <label htmlFor=''  className='text-zinc-400'>
            Username
          </label>
          <input type="text"
                 className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                 placeholder='username'
                 name='username'
                 required   
                 value={userData.username}   
                 onChange={change}
          />
        </div>
        
        <div className='mt-4'>
          <label htmlFor=''  className='text-zinc-400'>
            Password
          </label>
          <input type="password"
                 className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                 placeholder='password'
                 name='password'
                 required      
                 value={userData.password}
                 onChange={change}
          />
        </div>
        
        <div className='mt-4'>
          <button onClick={submit} className='w-full bg-blue-500 text-xl text-white font-semibold rounded py-2 hover:bg-blue-600'>LogIn</button>
        </div>
        <div className='mt-1'>
          <p className='text-center text-zinc-200 text-xl'>or</p>
        </div>
        <div className=''>
          <p className='text-center text-zinc-200 text-l'>Don't have and account?<span><button onClick={() => navigate("/sign-up")} className='hover:text-blue-500 underline px-1'>SignUp</button></span></p>
        </div>
      </div>
    </div>
  )
}

export default LogIn