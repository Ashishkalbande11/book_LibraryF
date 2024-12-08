import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import Loader from '../loader/Loader';
import { useSelector } from 'react-redux';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";


const ViewBookDetails = () => {
    const { id } = useParams();
    // console.log(id);
    const [book, setBook] = useState([]);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);
    // console.log(isLoggedIn);
    // console.log(role);
    const navigate = useNavigate();
    useEffect(() => {
        const getData = async() => {
            const data = await axios.get(
              `https://booklibrarybackend-9e8y.onrender.com/api/get-book-by-id/${id}`
            );
            
            setBook(data.data.data);
            // console.log(data.data.data);
        }
        getData();
    },[])
    const headers = {
        id : localStorage.getItem("id"),
        bookid : id,
        authorization : `Bearer ${localStorage.getItem("token")}`,
    }
    const handleFavourites = async() => {
        try {
            const data = await axios.put("https://booklibrarybackend-9e8y.onrender.com/api/add-book-to-favourite",{},{headers});
        alert(data.data.message);
        } catch (error) {
            console.log(error);
        }
    }
    const handleCart = async() => {
        const data = await axios.put("https://booklibrarybackend-9e8y.onrender.com/api/add-to-cart",{},{headers});
        alert(data.data.message);
    }

    const deleteBook = async() => {
        const res = await axios.delete("https://booklibrarybackend-9e8y.onrender.com/api/delete-book",{headers});
        // console.log(res);
        alert(res.data.message);
        navigate("/all-books")
    }
  return (
    <>
        {book ? (
            <div className='px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8 items-start h-[100%]'>
                <div className='w-full md:w-[70%] m-auto lg:w-3/6'>
                    <div className='flex flex-col lg:flex-row justify-around bg-zinc-800 p-12 rounded md:gap-1'>
                        <img src={book.url} alt="book"
                        className='h-[50vh] md:h-[60vh] lg:h-[70vh] rounded lg:w-[90%]' />
                        {isLoggedIn === true && role === "user" && (
                            <div className='flex flex-row   lg:flex-col items-center justify-between lg:justify-start mt-8 lg:mt-0'>
                                <button onClick={handleFavourites} className='bg-white rounded-full  text-3xl p-3 text-red-600'><FaHeart /></button>
                                <button onClick={handleCart} className='bg-white rounded-full  text-3xl p-3 lg:mt-8 text-blue-600'><FaShoppingCart /></button>
                            </div>
                        )}
                        
                        {isLoggedIn === true && role === "admin" && (
                            <div className='flex flex-row   lg:flex-col items-center justify-between lg:justify-start mt-8 lg:mt-0'>
                                <button onClick={deleteBook} className='bg-white rounded-full  text-3xl p-3 text-red-600'><RiDeleteBin6Line /></button>
                                <Link to={`/update-book/${id}`} className='bg-white rounded-full  text-3xl p-3 lg:mt-8 text-blue-600'><FaRegEdit /></Link>
                            </div>
                        )}
                    </div>
                </div>
                <div className='lg:w-3/6 flex flex-col justify-evenly gap-4  md:w-[70%] m-auto'>
                    <div>
                        <h1 className='text-white font-semibold text-2xl'>{book.title}</h1>
                    </div>
                    <div>
                        <p className='text-zinc-400 text-xl'>{book.desc}</p>
                    </div>
                    <div>
                        <p  className='font-semibold text-zinc-300 text-2xl'>₹{book.price}</p>
                    </div>
                    <div>
                        <p className='font-semibold text-zinc-200 text-2xl'>Language: {book.language}</p>
                    </div>
                    
        
                </div>
            </div>
        ):(
            <div className='flex justify-center items-center h-screen'>
                <Loader />
            </div>
        )}    
    </>
  )
}

export default ViewBookDetails