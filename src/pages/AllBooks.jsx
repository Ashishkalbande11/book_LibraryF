import React, { useEffect, useState } from 'react'
import Loader from '../components/loader/Loader';
import BookCard from '../components/bookcard/BookCard';
import axios from 'axios';


const AllBooks = () => {
  const [book, setBook] = useState([]);
    useEffect(() => {
        const getData = async() => {
            const data = await axios.get(
              "https://booklibrarybackend-9e8y.onrender.com/api/get-all"
            );
            // const json = data.json();
            setBook(data.data.data);
        }
        getData();
    },[])
  return (
      <div className='bg-zinc-900 px-12 py-8 h-full'>
        <h3 className='font-semibold text-3xl text-yellow-200'>All Books</h3>
        {!book && (
          <div className='flex items-center justify-center h-screen'>
          <Loader />
        </div>
        )}
        <div className='my-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {book && book.map((items, index) => {
            return (
              <div key={index}>
                {/* {console.log(items)} */}
                <BookCard items={items}/>
              </div>
            )
          })}
        </div>
        
    </div>
  )
}

export default AllBooks