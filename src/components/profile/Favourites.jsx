import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BookCard from '../bookcard/BookCard';

const Favourites = () => {
  const [favBooks, setFavBooks] = useState();
  const headers = {
    id : localStorage.getItem("id"),
    authorization : `Bearer ${localStorage.getItem("token")}`,
  }
  useEffect(() => {
    const getData = async() => {
      const data = await axios.get("https://booklibrarybackend-9e8y.onrender.com/api/get-favourite-books",{
        headers
      });
      // console.log(data);
      setFavBooks(data.data.data);
      // console.log(data.data.data);
    }
    getData();
  },[favBooks])
  // console.log(favBooks)
  return (
    <>
    {favBooks && favBooks.length === 0 && 
      <div className='text-4xl flex items-center justify-center  h-[200px] font-semibold text-yellow-500'>No Favourite book</div>}
      <div className='grid  grid-cols-2 md:grid-cols-3 gap-2'>
        
        {favBooks && favBooks.map((item, index) => {
          return (
            <div key={index}><BookCard items={item} fav={true}/></div>
          )
        })}
      </div>
    </>
  )
}

export default Favourites