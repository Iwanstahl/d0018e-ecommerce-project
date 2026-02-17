import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useState } from 'react'
import Title from '../components/Title'
import { useEffect } from 'react'
import ProductItem from '../components/ProductItem'

const Products = () => {
  const { products } = useContext(ShopContext);
  const [filterProducts, setFilterProducts] = useState([]);

  useEffect(() => {
    setFilterProducts(products);
  }, [products]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-(--main-text-color)'>

      {/* Left side */}
      {/* Filter Options */}
      <div className='min-w-60'>
        {/* CATEGORY FILTER, THE BOX AROUND CATEGORIES */}
        <div className='hidden sm:block border border-(--main-text-color) bg-(--main-text-color) pl-5 py-3 mt-6'>
          <p className='mb-3 text-sm font-medium text-(--second-text-color)'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-(second-text-color)'>
            {/* CATEGORY OPTIONS */}
            <p className='flex gap-2 text-(--second-text-color)'>
              <input type="checkbox" 
              value={'guitars'} /> Guitars
            </p>
            <p className='flex gap-2 text-(--second-text-color)'>
              <input type="checkbox" 
              value={'amplifiers'} /> Amplifiers
            </p>
            <p className='flex gap-2 text-(--second-text-color)'>
              <input type="checkbox" 
              value={'effects'} /> Effects
            </p>
            <p className='flex gap-2 text-(--second-text-color)'>
              <input type="checkbox" 
              value={'accessories'} /> Accessories
            </p>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2x1 mb-4'>
          <Title text1={'OUR'} text2={'PRODUCTS'} />
          {/* Product Sort */}
          <select className='border-2 border-(--main-text-color) bg-(--main-text-color) text-sm text-(--second-text-color) px-2'>
            <option value="low-high"
            className='text-(--second-text-color)'>Sort-by: Low to High</option>
            <option value="high-low"
            className='text-(--second-text-color'>Sort-by: High to Low</option>
          </select>
        </div>

        {/* MAP PRODUCTS */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item) => (
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
    </div>
  )
}

export default Products
