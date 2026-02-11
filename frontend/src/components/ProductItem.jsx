import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ product_id, name, price, image, category_name, stock }) => {
    const { currency } = useContext(ShopContext)
    const imagePath = `/product_images/${image}`;
  
    return (
        <Link className='text-(--main-text-color) cursor-pointer' to={`/product/${product_id}`}>
            <div className='aspect-square overflow-hidden bg-(--second-text-color)'>
                <img 
                    className='hover:scale-110 transition ease-in-out object-cover w-full h-full' 
                    src={imagePath} 
                    alt={name}
                    onError={(e) => { e.target.src ='https://placehold.co/300x100/png'}} 
                />
            </div>
            
            <p className='pt-3 pb-0.5 text-xs text-(--main-text-color) uppercase tracking-widest'>{category_name}</p>
            <p className='pt-0.5 text-sm text-(--main-text-color) font-medium'>{name}</p>
            <p className='text-sm font-bold text-(--main-text-color)'>{price}{currency}</p>
            
            {stock <= 0 && <p className='text-xs text-red-500'>OUT OF STOCK</p>}
        </Link>
    )
}

export default ProductItem
