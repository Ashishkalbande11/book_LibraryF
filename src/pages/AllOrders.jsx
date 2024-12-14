import axios, { all } from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../components/loader/Loader';
import { FaUser } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { IoMdOpen } from "react-icons/io";
import SeeUSerData from './SeeUSerData';
import { FaUserLarge } from "react-icons/fa6";

const AllOrders = () => {
  const [allOrders, setAllOrders] = useState();
  const [options, setOptions] = useState(-1);
  const [values, setValues] = useState({status: ""});
  const [userDiv, setUserDiv] = useState("hidden");
  const [userDivData, setUserDivData] = useState();
  const headers = {
    id : localStorage.getItem("id"),
    authorization : `Bearer ${localStorage.getItem("token")}`,
  }
  useEffect(() => {
    const getData = async() => {
      const res = await axios.get("https://booklibrarybackend-9e8y.onrender.com/api/get-all-orders",{headers});
      setAllOrders(res.data.data);
      console.log(res.data);
    }
    getData();
  },[allOrders])

  const change = (e) => {
    const {value} = e.target;
    setValues({status : value});
  }

  const submitChanges = async(i) => {
    const id = allOrders[i]._id;
    const res = await axios.put(`https://booklibrarybackend-9e8y.onrender.com/api/update-status/${id}`,values, {headers});

    alert(res.data.message);
    // console.log(res)
  }
// console.log(allOrders)
  allOrders && allOrders.splice(allOrders.length-1,1);
  return (
    <>
      {!allOrders && <div className='h-[100%] flex items-center justify-center'><Loader /></div>}
      {allOrders && allOrders.length > 0 && (
        <div className=' p-0 md:p-4 text-zinc-100'>
          <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>All Order</h1>
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
              <h1 className=''><FaUserLarge /></h1>
            </div>
          </div>
          {allOrders.map((item,i) => (
            
              <div className='bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer'> 
              {/* <h1>{console.log(item)}</h1> */}
                <div className='w-[3%]'>
                    <h1 className='text-center'>{i+1}</h1>
                  </div>
                  <div className='w-[40%] md:w-[22%]'>
                    <Link to={`/view-book-details/${item._id}`} className='hover:text-blue-300'>{item.book.title}</Link>
                  </div>
                  <div className='w-0 md:w-[45%] hidden md:block'>
                    <h1 className=''>{item.book.desc.slice(0,50)}...</h1>
                  </div>
                  <div className='w-[17%] md:w-[9%]'>
                    <h1 className=''>₹{item.book.price}</h1>
                  </div>
                  <div className='w-[30%] md:w-[16%]'>
                    <h1 className='font-semibold'>
                      <button onClick={()=>setOptions(i)} className="hover:scale-105 transition-all duration-300" >
                        {item.status === "Order Placed" ? (
                          <div className='text-yellow-500'>{item.status}</div>
                        ) : item.status === "Cancelled" ? (
                          <div className='text-red-500'>{item.status}</div>
                        ):(
                          <div className='text-green-500'>{item.status}</div>
                        )}
                      </button>
                      <div className={`${options === i ? "flex" : "hidden"}`}>
                        <select onChange={change} name="status" id="" className="bg-gray-800">
                          {
                            ["Order Placed" , "Out for delivery", "Delivered", "Cancelled"].map((items,i) => 
                                <option value={items} key={i} >{items}</option>
                            )
                          }
                        </select>
                        <button onClick={() => {
                          setOptions(-1);
                          submitChanges(i);
                        }} className='text-green-500 hover:text-pink-600 mx-2'><FaCheck /></button>
                      </div>
                    </h1>

                  </div>
                  
                  <div className='w-[10%] md:w-[5%] hidden md:block'>
                      <button className='text-xl hover:text-orange-500' onClick={() => {
                        setUserDiv("fixed");
                        setUserDivData(item.user);
                      }}><IoMdOpen /></button>
                  </div>
              </div>
            ))}
        </div>
      )}
    
      {userDivData && (
        <SeeUSerData userDivData={userDivData} userDiv={userDiv} setUserDiv={setUserDiv} />
      )}
    </>
  )
}

export default AllOrders