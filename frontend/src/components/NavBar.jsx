import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext.jsx'

const NavBar = () => {
  const isAdmin = true;
  
  const{ showSearch, setShowSearch} = useContext(ShopContext)

  const navigate = useNavigate();

  const handleProfileClick = () => {
    const token = localStorage.getItem('token');

    if (token) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className='flex items-center justify-between py-5 font-medium'>

        {/* LOGO */}
        <p className='font-brand text-3xl font-bold tracking-tight text-(--main-text-color)'>Klangwerk
          <span className='text-(--highlight-color)'>.</span>
        </p>
        {/* MIDDLE PART */}
        <ul className='hidden sm:flex gap-5 text-sm text-(--main-text-color)'>
            <NavLink to='/' className='flex flex-col items-center gap-1'>
                <p>HOME</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-(--highlight-color)'/>
            </NavLink>
            <NavLink to='/products' className='flex flex-col items-center gap-1'>
                <p>PRODUCTS</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-(--highlight-color)'/>
            </NavLink>
            <NavLink to='/about' className='flex flex-col items-center gap-1'>
                <p>ABOUT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-(--highlight-color)'/>
            </NavLink>

        </ul>

        <div className='flex items-center gap-6'>
          {/* SEARCH ICON */}
          <svg onClick={()=>setShowSearch(!showSearch)}
          xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="var(--main-text-color)" strokeWidth="0.5" className="cursor-pointer">
          <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
          
          <div onClick={handleProfileClick} className="cursor-pointer">
            {/* PROFILE ICON */}
            <Link>
              <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="var(--main-text-color)" strokeWidth="0.5" className="cursor-pointer">
              <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm146.5-204.5Q340-521 340-580t40.5-99.5Q421-720 480-720t99.5 40.5Q620-639 620-580t-40.5 99.5Q539-440 480-440t-99.5-40.5ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm100-95.5q47-15.5 86-44.5-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160q53 0 100-15.5ZM523-537q17-17 17-43t-17-43q-17-17-43-17t-43 17q-17 17-17 43t17 43q17 17 43 17t43-17Zm-43-43Zm0 360Z"/></svg>
            </Link>
          </div>
          {/* CART ICON */}
          <Link to='/cart' className='relative'>
            <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="var(--main-text-color)" strokeWidth="0.5" className="">
            <path d="M240-80q-33 0-56.5-23.5T160-160v-480q0-33 23.5-56.5T240-720h80q0-66 47-113t113-47q66 0 113 47t47 113h80q33 0 56.5 23.5T800-640v480q0 33-23.5 56.5T720-80H240Zm0-80h480v-480h-80v80q0 17-11.5 28.5T600-520q-17 0-28.5-11.5T560-560v-80H400v80q0 17-11.5 28.5T360-520q-17 0-28.5-11.5T320-560v-80h-80v480Zm160-560h160q0-33-23.5-56.5T480-800q-33 0-56.5 23.5T400-720ZM240-160v-480 480Z"/></svg>
          </Link>
          {/* ADMIN PANEL ICON */} {/* THIS SHOULD ONLY BE SEEN BY ADMINS */}
         { isAdmin && (
          <Link to='/admin'>
              <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="var(--main-text-color)"><path d="M440-520v-280h440v280H440ZM80-160v-280h400v280H80Zm0-360v-280h280v280H80Zm440-80h280v-120H520v120ZM160-240h240v-120H160v120Zm0-360h120v-120H160v120Zm360 0ZM400-360ZM280-600ZM560-80v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q9 9 13 20t4 22q0 11-4 22.5T903-300L683-80H560Zm300-263-37-37 37 37ZM620-140h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z"/></svg>
            </Link>
          )}
        </div> 
    </div>
  )
}

export default NavBar
