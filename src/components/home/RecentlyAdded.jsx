import { data } from 'autoprefixer';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BookCard from '../bookcard/BookCard';
import Loader from '../loader/Loader';

// import BookCard from '../bookcard/BookCard.jsx'


const RecentlyAdded = () => {
  const [book, setBook] = useState([]);
    useEffect(() => {
        const getData = async() => {
            const data = await axios.get(
              "https://booklibrarybackend-9e8y.onrender.com/api/get-recent-book"
            );
            // const json = data.json();
            setBook(data.data.data);
        }
        getData();
    },[])
  return (
    <div className='mt-8 '>
        <h3 className='font-semibold text-3xl text-yellow-200'>Recently Added books</h3>
        {!book && (
          <div className='flex items-center justify-center my-8'>
            <Loader />
          </div>
        )}
        <div className='my-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
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

export default RecentlyAdded