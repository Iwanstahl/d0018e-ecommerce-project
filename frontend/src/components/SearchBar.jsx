import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useLocation, useNavigate } from 'react-router-dom'

const SearchBar = () => {
    const {showSearch, setShowSearch} = useContext(ShopContext)
    const [visible, setVisible] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (showSearch && !location.pathname.includes('collection')) {
            navigate('/collection')
        }
    }, [showSearch]) // Lyssnar BARA på när knappen trycks

    useEffect(() => {
        if (location.pathname.includes('collection')) {
            setVisible(true)
        } else {
            setVisible(false)
            setShowSearch(false)
        }
    }, [location])
        if (!showSearch || !visible) return null

  return showSearch && visible ? (
    <div className='text-center'>
        <div className='inline-flex items-center justify-center border border-(--main-text-color) bg-(--main-text-color) px-5 py-2 my-5 mx-3 w-3/4 sm:w-1/2'>
            <input className='flex-1 outline-none, bg-(--main-text-color) text-sm text-(--second-text-color)' type="text" placeholder='Search' />
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--second-text-color)"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
        </div>
        <svg onClick={()=>setShowSearch(false)} className='inline w-3 cursor-pointer'
        xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--main-text-color)"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
    </div>
  ) : null
}

export default SearchBar
