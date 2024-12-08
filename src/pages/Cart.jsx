import React, { useEffect, useState } from 'react'
import Loader from '../components/loader/Loader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaOpencart } from "react-icons/fa";


const Cart = () => {
  const[cart,setCart] = useState();
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const headers = {
    id : localStorage.getItem("id"),
    authorization : `Bearer ${localStorage.getItem("token")}`,
  }
  useEffect(() => {
      const getData = async() => {
          const data = await axios.get("https://booklibrarybackend-9e8y.onrender.com/api/get-user-cart",{headers});
          // const json = data.json();
          setCart(data.data.data);
      }
      getData();
  },[cart])
  
  const deleteItem = async(item_id) => {
    const res = await axios.put(`https://booklibrarybackend-9e8y.onrender.com/api/remove-from-cart/${item_id}`,{},{headers});
    alert(res.data.message);
  }
  
  const placeOrder = async() => {
    try {
      const res = await axios.post(`https://booklibrarybackend-9e8y.onrender.com/api/place-order`,{order:cart},{headers});
      alert(res.data.message);
      navigate("/profile/order-history");
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if(cart && cart.length > 0){
      let amount = 0;
      cart.map((item) => {
        amount += item.price;
      });
      setTotal(amount);
      amount = 0;
    }
  },[cart])
  return (
    <div className='bg-zinc-900 px-12 h-screen py-8'>
      {!cart &&  <div className='flex items-center justify-center h-screen'>
            <Loader />
          </div>}
      
      {cart && cart.length === 0 && (
        <div className='h-screen'>
          <div className='h-[100%] flex items-center gap-5 flex-col'>
            <div><h1 className='text-5xl lg:text-6xl font-semibold text-zinc-400'>Empty cart</h1></div>
            <div className='text-white text-[200px] md:text-[500px]'><FaOpencart /></div>

          </div>
        </div>
      )}
      {cart && cart.length > 0 && (
        <>
          <h1 className='text-5xl font-semibold text-zinc-500 mb-8'>Your Cart</h1>
          {cart.map((item, index) => (
            <div className='w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center' key={index}>
              <img src={item.url} alt="/" className='h-[20vh] md:h-[10vh] object-cover'/>
              <div className='w-full md:w-auto px-5'>
                <h1 className='text -2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0'>
                  {item.title}
                </h1>
                <p className='text-normal text-zinc-300 mt-2 hidden lg:block'>{item.desc.slice(0,100)}...</p>
                <p className='text-normal text-zinc-300 mt-2 hidden md:block lg:hidden'>{item.desc.slice(0,65)}...</p>
                <p className='text-normal text-zinc-300 mt-2 block md:hidden'>{item.desc.slice(0,100)}...</p>
              </div>
              <div className='flex mt-4 w-full md:w-auto items-center justify-between'>
                <h2 className='text-zinc-100 text-3xl font-semibold flex'>
                ₹{item.price}
                </h2>
                <button onClick={() => {
                  deleteItem(item._id)
                }} className='bd-red-100 text-red-700 border border-red-700 rounded p-2 ms-12 hover:bg-red-400 hover:text-white'>delete</button>

              </div>
            </div>
          ))}
        </>
      )}
      {cart && cart.length > 0 && (
        <div className='mt-4 w-full flex items-center justify-end'>
          <div className='p-4 bg-zinc-800 rounded'>
            <h1 className='text-3xl text-zinc-200 font-semibold'>Total amount</h1>
            <div className='flex justify-between mt-2'>
              <h2 className='text-xl text-zinc-200'>{cart.length} books</h2>
              <h2 className='text-xl text-zinc-200'>₹{total}</h2>
            </div>

            <div className='w-[100%] mt-3'>
              <button onClick={placeOrder} className='bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-green-400 transition-all duration-300 '>Place your order</button>
            </div>
          </div>

        </div>
      )}
    </div>
  )
}

export default Cart