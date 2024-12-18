import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username:"",
    email:"",
    password:"",
    address:"",
  })
  
  const change = (e) => {
    const{name, value} = e.target;
    setUserData({...userData, [name] : value})
  }
  const submit = async() => {
      try {
        if(userData.username === "" || userData.email === "" || userData.password === "" || userData.address === ""){
          alert("All fields required !!");
        }else{
          const response =await axios.post("https://booklibrarybackend-9e8y.onrender.com/api/sign-up", userData);
          alert(response.data.message);
          navigate("/log-in")
        }
      } catch (error) {
        alert(error.response.data.message);
      }
  }
  return (
    <div className='h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center'>
      <div className='bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
        <p className='text-zinc-200 text-xl'>Sign Up</p>
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
            Email
          </label>
          <input type="text"
                 className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                 placeholder='xyz@gmail.com'
                 name='email'
                 required    
                 value={userData.email}
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
          <label htmlFor=''  className='text-zinc-400'>
            Address
          </label>
          <textarea type=""
                 className='w-full mt-2  bg-zinc-900 text-zinc-100 p-2 outline-none'
                 placeholder='address'
                 name='address'
                 rows='5'
                 required    
                 value={userData.address}
                 onChange={change}   
          />
        </div>
        <div className='mt-4'>
          <button onClick={submit} className='w-full bg-blue-500 text-xl text-white font-semibold rounded py-2 hover:bg-blue-600'>Sign Up</button>
        </div>
        <div className='mt-1'>
          <p className='text-center text-zinc-200 text-xl'>or</p>
        </div>
        <div className=''>
          <p className='text-center text-zinc-200 text-l'>Already have and account?<span><button onClick={() => navigate("/log-in")} className='hover:text-blue-500 underline px-1'>LogIn</button></span></p>
        </div>
      </div>
    </div>
  )
}

export default SignUp