import React from 'react'
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import {authActions} from '../../store/auth.js'
const Sidebar = ({data}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const role = useSelector((state) => state.auth.role);

  return (
    <div className='bg-zinc-800 p-4  rounded flex flex-col items-center justify-start gap-0 md:gap-5 h-fit '>
        <div className='flex flex-col items-center'>
            <img src={data.avatar} alt="profile" className='h-[12vh]' />
            <p className='mt-3 text-xl text-zinc-100 font-semibold'>
                {data.username}
            </p>
            <p className='mt-3 text-normal text-zinc-300'>
                {data.email}
            </p>
            <div className='w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block'></div>
        </div>
        
        {role === "user" && 
            <div className='w-full flex-col items-center justify-center hidden md:flex'>
            <button onClick={() => navigate("/profile")} className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'>Favourites</button>
            <button onClick={() => navigate("/profile/order-history")} className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'>Order History</button>
            <button onClick={() => navigate("/profile/settings")} className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'>Settings</button>
            
        </div>
        }
        {role === "admin" && 
            <div className='w-full flex-col items-center justify-center hidden md:flex'>
            <button onClick={() => navigate("/profile")} className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'>All Orders</button>
            <button onClick={() => navigate("/profile/add-book")} className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'>Add Book</button>
            
        </div>
        }
        <button className='bg-zinc-900 w-3/6 lg:w-full mt-4 lg:mt-0 text-white font-semibold flex items-center justify-center py-2 rounded hover:bg-white hover:text-zinc-900 transition-all duration-300'
                onClick={()=> {
                    dispatch(authActions.logout());
                    dispatch(authActions.changeRole("user"));
                    localStorage.clear("id");
                    localStorage.clear("token");
                    localStorage.clear("role");
                    navigate('/')
                }}>
            Log out <MdLogout className='ms-4'/>
        </button>
    </div>
  )
}

export default Sidebar