import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { authActions } from '../../store/auth';


const MobileNav = () => {
    const navigate = useNavigate();
    const role = useSelector((state) => state.auth.role);

  return (
    <>
      {role === 'user' && 
        <div className='w-full flex items-center justify-center  md:hidden'>
        <button onClick={() => navigate("/profile")} className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'>Favourites</button>
        <button onClick={() => navigate("/profile/order-history")} className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'>Order History</button>
        <button onClick={() => navigate("/profile/settings")} className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'>Settings</button>
        
      </div>} 
      {role === 'admin' && 
        <div className='w-full flex items-center justify-center  md:hidden'>
        <button onClick={() => navigate("/profile")} className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'>All Orders</button>
        <button onClick={() => navigate("/profile/add-book")} className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'>Add Book</button>
        
      </div>} 
      
    </>
  )
}

export default MobileNav