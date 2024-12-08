import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../loader/Loader'
import { Link, useNavigate } from 'react-router-dom'

const UserOrderHistory = () => {
  const headers = {
    id : localStorage.getItem("id"),
    
    authorization : `Bearer ${localStorage.getItem("token")}`,
  }
  const [orderHistory,setOrderHistory] = useState();
  useEffect(() => {
      const getData = async() => {
        const res = await axios.get("https://booklibrarybackend-9e8y.onrender.com/api/order-history",{headers});
        setOrderHistory(res.data.data);
      }
      getData();
  },[])
  const navigate = useNavigate();
  return (
    <>
      {!orderHistory && <div className='flex items-center justify-center h-screen m-auto'>
            <Loader />
          </div>}
          
      {orderHistory && orderHistory.length === 0 && (
        <div className='h--[80vh] p-4 text-zinc-100'>
          <div className='h-[100%] flex flex-col items-center justify-center'>
            <h1 className='text-5xl font-semibold text-zinc-500 mb-8'>No Order History</h1>
            <img src="https://cdn-icons-png.flaticon.com/128/9961/99611219.png" alt="/" className='h-[20vh] mb-8' />
          </div>
        </div>
      )}
      {orderHistory && orderHistory.length > 0 && (
        <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
          <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>Your order History</h1>
          <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-1'>
            <div className='w-[3%]'>
              <h1 className='text-center'>Sr.</h1>
            </div>
            <div className='w-[40%] md:w-[22%]'>
              <h1 className=''>Books</h1>
            </div>
            <div className='w-0 md:w-[45%] hidden md:block'>
              <h1 className=''>Description</h1>
            </div>
            <div className='w-[17%] md:w-[9%]'>
              <h1 className=''>Price</h1>
            </div>
            <div className='w-[30%] md:w-[16%]'>
              <h1 className=''>Status</h1>
            </div>
            <div className='w-[10%] md:w-[5%]'>
              <h1 className=''>COD</h1>
            </div>
          </div>
          {orderHistory.map((item,index) => (
              <div className='bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer'> 
                  <div className='w-[3%]'>
                    <h1 className='text-center'>{index+1}</h1>
                  </div>
                  <div className=' w-[40%] md:w-[22%]'>
                    <Link to={`/view-book-details/${item.book._id}`} className='hover:text-blue-300'>{item.book.title}</Link>
                  </div>
                  <div className='w-0 md:w-[45%]'>
                    <h1 className=''>{item.book.desc.slice(0,50)}...</h1>
                  </div>
                  <div className='w-[17$] md:w-[9%]'>
                    <h1 className=''>₹{item.book.price}</h1>
                  </div>
                  <div className='w-[30%] md:w-[16%]'>
                    <h1 className='font-semibold text-green-500'>
                      {item.status === "Order Placed" ? (
                        <div className='text-yello-500'>{item.status}</div>
                      ) : item.status === "Canceled" ? (
                        <div className='text-red-500'>{item.status}</div>
                      ):(
                        item.status
                      )}
                    </h1>

                  </div>
                  
                  <div className='w-[10%] md:w-[5%] hidden md:block'>
                    <h1 className='text-zinc-400'>COD</h1>
                  </div>
              </div>
            ))}
        </div>
      )}
      {/* {orderHistory.map((item, i) => (
        <h1>{item.book.price}</h1>
      ) )} */}

      
    </>
  )
}

export default UserOrderHistory