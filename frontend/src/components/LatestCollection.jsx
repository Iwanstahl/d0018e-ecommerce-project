import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import { useEffect, useState } from 'react';
import ProductItem from './ProductItem';

const LatestCollection = () => {
    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    const marqueeText = "KLANGWERK STUDIO \u00A0\u00A0 • \u00A0\u00A0 KLANGWERK STUDIO \u00A0\u00A0 • \u00A0\u00A0 KLANGWERK STUDIO \u00A0\u00A0 • \u00A0\u00A0 ";

    useEffect(() => {
        setLatestProducts(products.slice(0,10));
    },[products])

  return (
    <div className='my-0'>
        {/* RIGHT UNDER HERO */}
        <div className='bg-(--highlight-color) py-5 overflow-hidden'>
            <div className='animate-marquee whitespace-nowrap flex'>
                {/* render text 2 times to create infinit loop */}
                {[...Array(2)].map((_, i) => (
                    <span key={i} className='text-2xl md:text-4xl font-bold text-(--main-text-color) tracking-tighter'>
                        {marqueeText.repeat(4)}
                    </span>
                ))}
            </div>
        </div>

        {/* Rendering of products */ }
        <div className='my-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                latestProducts.map((item)=>(
                    <ProductItem 
                    key={item.product_id} 
                    product_id={item.product_id} 
                    image={item.image} 
                    name={item.name} 
                    price={item.price}
                    category_name={item.category_name} 
                    stock={item.stock}               
                    />
                ))
            }
        </div>
    </div>
  )
}

export default LatestCollection
