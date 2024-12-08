import React, { useEffect, useState } from 'react'
import Sidebar from '../components/profile/Sidebar'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Loader from '../components/loader/Loader'
import MobileNav from '../components/profile/MobileNav'

const Profile = () => {
  const headers = {
    id : localStorage.getItem("id"),
    authorization : `Bearer ${localStorage.getItem("token")}`,
  };
  const [profile, setProfile] = useState();
  useEffect(() => {
    const getData = async () => {
        const data = await axios.get("https://booklibrarybackend-9e8y.onrender.com/api/get-user-information",{headers});
        setProfile(data.data);
    }
    getData();
  },[])
  return (
    <div className='bg-zinc-900 px-2 md:px-12 flex flex-col lg:flex-row py-8 gap-4 text-white'>
        {!profile &&
          <div className='flex justify-center items-center h-screen w-full'>
              <Loader />
          </div>
        } 
          
        {profile && 
          <>
            <div className='w-full  lg:w-1/6 h-auto lg:h-screen'>
                <Sidebar data={profile} />
                <MobileNav />
              </div>
              <div className='w-5/6'>
                <Outlet />
              </div>
          </>
        }
    </div>
  )
}

export default Profile