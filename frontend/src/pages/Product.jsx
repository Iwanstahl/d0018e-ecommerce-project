import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import ProductGrid from '../components/ProductGrid'
import { cartService } from '../../services/cartService'

const Product = () => {
  const { productId } = useParams();
  const { currency } = useContext(ShopContext);
  
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProductData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/products/${productId}`);
      const data = await response.json();
    
      setProductData(data);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleAddToCart = async () => {
    try {
      await cartService.addToCart(productData.product_id, 1); // Send productId and the amount which is always 1 in our case
      alert(`${productData.name} has been added to cart.`) // We can change this later to something nicer
    } catch (error) {
      alert(error.message);
    }
  }


  useEffect(() => {
    if (productId) {
        fetchProductData();
    } window.scrollTo(0,0);
  }, [productId]);

  if (loading) return <div className='p-10 text-center font-light uppercase tracking-widest opacity-50'>Loading Product...</div>
  if (!productData) return <div className='p-10 text-center uppercase'>Product not found.</div>

  const isOutOfStock = !productData.inventory || productData.inventory.stock <= 0;
  console.log("Stock status for", productData.name, ":", productData.inventory?.stock);
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
            {productData.price} {currency}
          </p>

          <hr className='border-(--main-text-color) mb-6' /> 
          
          <h3 className='text-sm font-bold uppercase mb-2'>Desciption</h3>
          <p className='text-(--main-text-color) leading-relaxed text-sm sm:text-base mb-8'>
            {productData.description}
          </p>

          <div className='flex flex-col gap-4'>
            <button 
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`w-full py-4 px-10 text-sm font-bold transition-all 
                ${isOutOfStock 
                  ? 'bg-(--main-text-color) text-(--second-text-color) cursor-not-allowed'
                  : 'bg-(--main-text-color) text-(--second-text-color) hover:text-(--hover-color) active:scale-[0.98]'}`}
            >
              {isOutOfStock ? 'SOLD OUT' : 'ADD TO CART'}
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