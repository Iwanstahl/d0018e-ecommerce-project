import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Product = () => {
  const { productId } = useParams();
  
  //placeholder-data se designen direkt
  const [productData, setProductData] = useState({
    name: "Placeholder productname",
    description: "THIS SHOULD BE THE DESCRIPTION FOR THE PRODUCT; BUT ITS NOT DONE YET SO HERE WE ARE.",
    price: 499,
    image: ["https://placehold.co/300x100/png"]
  });
  
  const [loading, setLoading] = useState(false);

  const fetchProductData = async () => {
    try {
      // NÅTT SÅNT HÄR KANSKE FÖR API?
      // const response = await fetch(`http://localhost:4000/api/product/single/${productId}`);
      // const data = await response.json();
      // if (data.success) { setProductData(data.product); }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  }

  useEffect(() => {
    if (productId) {
        fetchProductData();
    }
  }, [productId]);

  if (loading) return <div className='p-10 text-center font-light'>Loading...</div>

  return (
    <div className='max-w-6xl mx-auto p-5 sm:p-10 mt-10'>
      <div className='flex flex-col sm:flex-row gap-12'>
        
        {/* LEFT SIDE: PICTURE SECTION */}
        <div className='w-full sm:w-1/2 flex flex-col gap-4'>
          <div className='overflow-hidden bg-(--second-text-color)'>
            <img 
              src={Array.isArray(productData.image) ? productData.image[0] : productData.image} 
              alt={productData.name} 
              className='w-full h-125 object-cover hover:scale-105 transition-transform duration-500'
            />
          </div>
        </div>

        {/* RIGHT SIDE: Information */}
        <div className='w-full sm:w-1/2 flex flex-col'>
          <nav className='text-xs uppercase text-(--main-text-color) mb-4 tracking-widest'>
            Products / {productData.name}
          </nav>
          
          <h1 className='text-4xl font-semibold text-(--main-text-color) mb-2 uppercase italic tracking-tighter'>
            {productData.name}
          </h1>

          <p className='text-3xl font-light text-(--main-text-color) mb-6'>
            {productData.price} SEK
          </p>

          <hr className='border-(--main-text-color) mb-6' /> 
          
          <h3 className='text-sm font-bold uppercase mb-2'>Desciption</h3>
          <p className='text-(--main-text-color) leading-relaxed text-sm sm:text-base mb-8'>
            {productData.description}
          </p>

          <div className='flex flex-col gap-4'>
            <button className='w-full bg-(--main-text-color) text-(--second-text-color) py-4 px-10 text-sm font-bold hover:text-(--hover-color) transition-colors active:bg-(--main-text-color)'>
              ADD TO CART
            </button>
            <p className='text-[10px] text-(--main-text-color) text-center uppercase tracking-widest'>
              Free shipping on all orders • 30-day return policy
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Product