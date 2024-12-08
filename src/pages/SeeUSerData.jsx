import React from 'react'
import { RxCross1 } from "react-icons/rx";

const SeeUSerData = ({userDivData, userDiv, setUserDiv}) => {
  return (
    <>
        <div className={`${userDiv} top-0 left-0 h-screen w-full bg-zinc-800 opacity-80`}></div>
        <div className={`${userDiv} top-0 left-0 h-screen w-full flex items-center justify-center`}>
            <div className='bg-white rounded p-4 w-[80%] md:w-[50%] lg:w-[40%] text-zinc-800'>
               <div className='flex justify-between'>
               <h1 className='text-2xl font-semibold'>User Information</h1>
                <button onClick={() => setUserDiv("hidden")}><RxCross1 /></button>
            
               </div>
            <div className='mt-2'>
                <label htmlFor="" className='font-semibold'>Username:{" "} <span>{userDivData.username}</span></label>
            </div>
            <div className='mt-4'>
                <label htmlFor="" className='font-semibold'>Email:{" "} <span>{userDivData.email}</span></label>
            </div>
            <div className='mt-4'>
                <label htmlFor="" className='font-semibold'>Address:{" "} <span>{userDivData.address}</span></label>
            </div>
            </div>
        </div>
        
    </>
  )
}

export default SeeUSerData