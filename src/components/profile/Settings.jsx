import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from '../loader/Loader';

const Settings = () => {
  const [value,setValue] = useState({address: ""});
  const [profileData, setProfileData] = useState();
  const headers = {
    id : localStorage.getItem("id"),
    authorization : `Bearer ${localStorage.getItem("token")}`,
  }

  const changeAddress = (e) => {
    const {name, value} = e.target;
    setValue({...value, [name]: value});
  };
  useEffect(() => {
      const getData = async() => {
        const res = await axios.get("https://booklibrarybackend-9e8y.onrender.com/api/get-user-information",{headers});
        // console.log(res)
        setProfileData(res.data);
        setValue({address : res.data.address})
      }
      getData();
  },[])


  const updateAddress = async() => {
    const res = await axios.put("https://booklibrarybackend-9e8y.onrender.com/api/update-address",value, {headers});
    alert(res.data.message);
  }
  
  return (
    <>
      {!profileData && ( <div className='flex items-center justify-center h-screen'>
                          <Loader />
                       </div>
      )}
      {profileData && (
        <div className='h-[100%] p-0 md:p-4 text-zinc-100 '>
          <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>Settings</h1>
          <div className='flex gap-12'>
            <div className=''>
              <label htmlFor=''>Username</label>
              <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>{profileData.username}</p>
            </div>
            <div className=''>
              <label htmlFor=''>Email</label>
              <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>{profileData.email}</p>
            </div>
          </div>
          <div className='mt-4 flex flex-col'>
            <label htmlFor="">Address</label>
            <textarea name="address" 
                      className='p-2 rounded bg-zinc-800 mt-2 font-semibold'
                      rows="5"
                      value={value.address}
                      onChange={changeAddress}></textarea>
                      
          </div>
          <div className='mt-4 flex justify-end'>
            <button onClick={updateAddress} className='bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400'>Update</button>
          </div>
        </div>
      )}

    </>
  )
}

export default Settings