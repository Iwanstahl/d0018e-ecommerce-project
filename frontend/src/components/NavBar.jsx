import React from 'react'
import {assets} from '../assets/assets.js'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='flex items-center justify-between py-5 font-medium'>

        <p className='font-brand text-3xl font-bold tracking-tight text-(--main-text-color)'>For Shred's Sake</p>

        <ul className='hidden sm:flex gap-5 text-sm text-(--main-text-color)'>
            <NavLink className='flex flex-col items-center gap-1'>
                <p>Home</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-(--main-text-color)'/>
            </NavLink>
        </ul>
      
    </div>
  )
}

export default NavBar
