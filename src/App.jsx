import React, { useEffect } from 'react'
import Home from './pages/Home'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import AllBooks from './pages/AllBooks'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import AboutUs from './pages/AboutUs'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import ViewBookDetails from './components/viewBookDetails/ViewBookDetails'
import { useDispatch, useSelector } from 'react-redux'

import { authActions } from './store/auth.js'
import Favourites from './components/profile/Favourites.jsx'
import UserOrderHistory from './components/profile/UserOrderHistory.jsx'
import Settings from './components/profile/Settings.jsx'
import AllOrders from './pages/AllOrders.jsx'
import AddBook from './pages/AddBook.jsx'
import UpdateBook from './pages/UpdateBook.jsx'

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role)
  useEffect(() => {
    if(localStorage.getItem("id") && localStorage.getItem("token") && localStorage.getItem("role")){
        dispatch(authActions.login());
        dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  },[])
  return (
   
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/home' element={<Home />}/>
          <Route path='/' element={<Home />}/>
          <Route path='/all-books' element={<AllBooks />}/>
          <Route path='/cart' element={<Cart />}/>
          <Route path='/profile' element={<Profile />}>
            {role === "user" ? (<Route  element={<Favourites />}/>) : (<Route  element={<AllOrders />}/>)}
            {role === 'admin' && <Route path='/profile/add-book' element={<AddBook />}/>}
            <Route path='/profile/order-history' element={<UserOrderHistory />}/>
            <Route path='/profile/settings' element={<Settings />}/>
          </Route>
          <Route path='/about-us' element={<AboutUs />}/>
          <Route path='/sign-up' element={<SignUp />}/>
          <Route path='/log-in' element={<LogIn />}/>
          <Route path='/update-book/:id' element={<UpdateBook />}/>
          <Route path='/view-book-details/:id' element={<ViewBookDetails />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    
  )
}

export default App