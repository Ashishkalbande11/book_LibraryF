import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { IoMenuSharp } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { RiAccountCircleFill } from "react-icons/ri";

const Navbar = () => {
    const navigate = useNavigate();
    const [mobileNav, setMobileNav] = useState("hidden")
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role)
    // console.log(isLoggedIn);

    const links = [
        {
            title : "Home",
            link : "/",
        },
        {
            title : "About Us",
            link : "/about-us",
        },
        {
            title : "All Books",
            link : "/all-books",
        },
        {
            title : "Cart",
            link : "/cart",
        },
        
        {
            title : "Profile",
            link : "/profile",
        },
        {
            title : "Admin Profile",
            link : "/profile",
        },
    ];
    if(isLoggedIn === false){
        links.splice(3,3)
    }
    if(isLoggedIn && role === "user"){
        links.splice(5,1)
    }

    if(isLoggedIn && role === 'admin'){
        links.splice(3,2)
    }
  return (

    <>
        <nav className='z-50 relative flex bg-zinc-800 text-white px-8 py-4 items-center justify-between '>
        
        <div className='flex items-center'>
            <img className='h-10 me-1' src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png" alt="logo" />
            <h1 className='text-2xl font-semibold hover:text-blue-500 transition-all duration-300'>BookLibrary</h1>
        </div>
        <div className='nav-links-booklibrary md:flex items-center gap-4'>
            <div className='hidden  md:flex gap-8'>
                {links.map((items, index) => {
                    return(
                        items.title === "Profile" && isLoggedIn || items.title === "Admin Profile" && isLoggedIn
                            ? (
                                <div key={index} className='text-4xl hover:text-blue-500 transition-all duration-300 cursor-pointer'>
                                    <RiAccountCircleFill onClick={() => navigate("/profile")} />
                                </div>
                            ):
                            <Link to={items.link} className='hover:text-blue-500 transition-all duration-300 text-xl' key={index}>
                                {items.title}
                            </Link>
                         
                        )
                })}
            </div>
            {isLoggedIn === false ? 
                (
                    <div className='hidden  md:flex gap-4'>
                        <button onClick={()=> {
                            navigate("/log-in")
                        }} className='px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-700 transition-all duration-300 '>LogIn</button>
                        <button onClick={()=> {
                            navigate("/sign-up")
                        }} className='px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-700 transition-all duration-300'>SignUp</button>
                    </div>
                ):
                <></>
            }
            <button onClick={()=> mobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden")} className=' block md:hidden text-white text-2xl hover:text-blue-400 duration-300 transition-all'>
                <IoMenuSharp />
            </button>
        </div>
        </nav>
        <div className={` ${mobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
            {links.map((items, index) => {
                return( 
                    items.title === "Profile" && isLoggedIn
                    ? (
                        <div key={index} className='text-4xl hover:text-blue-500 transition-all duration-300 cursor-pointer text-zinc-300'>
                            <RiAccountCircleFill onClick={() => {
                                mobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden")
                                navigate("/profile")}
                                } />
                        </div>
                    ):<Link to={items.link} 
                                className={`${mobileNav} text-white font-semibold mb-4 hover:text-blue-500 transition-all duration-300 text-xl`} 
                                key={index}
                                onClick={()=> mobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden")} >
                        {items.title}
                    </Link>)
            })}
            {!isLoggedIn ? 
                (
                    <>
                        <button onClick={()=> {
                            mobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden")
                            navigate("/log-in")
                        }} className={`${mobileNav} px-4 py-2 mb-4 border border-blue-500 rounded  text-white hover:bg-white hover:text-zinc-700 transition-all duration-300 `}>LogIn</button>
                        <button onClick={()=> {
                             mobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden")
                            navigate("/sign-up")
                        }} className={`${mobileNav} px-4 py-2 mb-4 bg-blue-500 rounded text-white  hover:bg-white hover:text-zinc-700 transition-all duration-300`}>SignUp</button>
                    </>
                ):<></>
            }
        </div>
    </>
  )
}

export default Navbar