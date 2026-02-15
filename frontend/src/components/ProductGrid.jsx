import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem'

const ProductGrid = ({ category = "all", limit = null }) => {
  const { products, loading } = useContext(ShopContext);
  const [displayProducts, setDisplayProducts] = useState([]);

  useEffect(() => {
    if (!loading) {
      let filtered = [...products];

      if (category !== "all") {
        filtered = filtered.filter(item => 
          item.category_name?.toLowerCase() === category.toLowerCase()
        );
      }

      if (limit) {
        filtered = filtered.slice(0, limit);
      }

      setDisplayProducts(filtered);
    }
  }, [products, category, limit, loading]);

  if (loading) {
    return <div className='py-10 text-center uppercase tracking-widest opacity-50'>Loading Gear...</div>
  }

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-6'>
      {displayProducts.map((item) => (
        <ProductItem 
          key={item.product_id} 
          product_id={item.product_id} 
          image={item.image} 
          name={item.name} 
          price={item.price}
        />
      ))}
    </div>
  )
}

export default ProductGrid