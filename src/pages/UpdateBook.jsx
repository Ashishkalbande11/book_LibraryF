import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const UpdateBook = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [bookData, setBookData] = useState({
        url: "",
        title: "",
        author: "",
        price: "",
        desc: "",
        language: "",
    });

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid : id
    }

    const change = (e) => {
        const { name, value } = e.target;
        setBookData({ ...bookData, [name]: value });
    }

    useEffect(() => {
        const getData = async() => {
            const data = await axios.get(
              `https://booklibrarybackend-9e8y.onrender.com/api/get-book-by-id/${id}`
            );
            
            setBookData(data.data.data);
            // console.log(data.data.data);
        }
        getData();
    },[])
    const submit = async () => {
        try {
            if (bookData.url === "" || bookData.title === "" || bookData.author === "" || bookData.price === "" || bookData.desc === "" || bookData.language === "") {
                return alert("All fields are required");
            } else {
                const res = await axios.put('https://booklibrarybackend-9e8y.onrender.com/api/update-book', bookData, { headers });
                setBookData({
                    url: "",
                    title: "",
                    author: "",
                    price: "",
                    desc: "",
                    language: "",
                });
                alert(res.data.message);
                navigate('/all-books')
            }
        } catch (error) {
            alert(error.response?.data?.message);
        }
    }

    return (
        <div className='h-[100%] p-0 md:p-4  bg-zinc-900'>
            <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>Edit Book</h1>
            <div className='p-4 bg-zinc-800 rounded'>
                <div>
                    <label htmlFor="" className='text-zinc-400'>Image</label>
                    <input type="text"
                        className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                        placeholder='url of image'
                        name='url'
                        required
                        value={bookData.url}
                        onChange={change} />
                </div>
                <div className='mt-4'>
                    <label htmlFor="" className='text-zinc-400'>Title of book</label>
                    <input type="text"
                        className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                        placeholder='title of book'
                        name='title'
                        required
                        value={bookData.title}
                        onChange={change} />
                </div>
                <div className='mt-4'>
                    <label htmlFor="" className='text-zinc-400'>Author of book</label>
                    <input type="text"
                        className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                        placeholder='author of book'
                        name='author'
                        required
                        value={bookData.author}
                        onChange={change} />
                </div>
                <div className='mt-4 flex gap-4'>
                    <div className='w-full'>
                        <label htmlFor="" className='text-zinc-400'>Language</label>
                        <input type="text"
                            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                            placeholder='language'
                            name='language'
                            required
                            value={bookData.language}
                            onChange={change} />
                    </div>
                    <div className='w-full'>
                        <label htmlFor="" className='text-zinc-400'>Price</label>
                        <input type="text"
                            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                            placeholder='price'
                            name='price'
                            required
                            value={bookData.price}
                            onChange={change} />
                    </div>
                </div>
                <div className='mt-4'>
                    <label htmlFor="" className='text-zinc-400'>Description</label>
                    <textarea
                        className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                        placeholder='description'
                        name='desc'
                        rows={5}
                        required
                        value={bookData.desc}
                        onChange={change} />
                </div>
                <div className='flex justify-end items-center px-4'>
                    <button onClick={submit} className='mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300 flex justify-end items-end'>Edit Book</button>
                </div>
            </div>
        </div>
    )
}


export default UpdateBook;
