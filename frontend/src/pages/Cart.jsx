import React from 'react'
import Title from '../components/Title'
import CartItem from '../components/CartItem';
import { useEffect, useState } from 'react';
import { cartService } from '../../services/cartService';


const Cart = () => {
  const [cartItems, setCartItems] = useState(null);
  const [loading, setLoading] = useState(true);


  const fetchCart = async () => {
    try {
      const data = await cartService.getCart(); // Calls the service
      setCartItems(data);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch('http://localhost:8000/orders/checkout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail);
      }

      navigate('/orders');

    } catch (error) {
      console.error(error.message);
    }
  };


  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) return <div className='pt-14 text-center text-(--main-text-color)'>Loading Cart...</div>

  const items = cartItems?.items || [];
  const totalPrice = cartItems?.cart_price || 0;

  return (
    <div className='bordet-t pt-14'>
      {/* TITLE */}
      <div className='text-2xl mb-3'>
        <Title text1='YOUR' text2='CART' />
      </div>
      {/* DISPLAY PRODUCTS FOR CART */}
      <div>
        {items.length > 0 ? (
          items.map((item) => ( 
            <CartItem 
            key={item.product.product_id} 
            cartItem={item} 
            refreshCart={fetchCart} />
          ))
        ) : (
          <p className='text-(--main-text-color)'>Your cart is empty.</p>
        )}
      </div>

      {/* CHECKOUT SECTION */}
      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-112.5 flex flex-col gap-6'>
          
          {/* HEADER */}
          <div className='flex items-center gap-2'>
            <h2 className='text-2xl font-medium uppercase text-(--main-text-color)'>Cart <span className='text-(--highlight-color)'>Totals</span></h2>
            <div className='h-px flex-1 bg-(--main-text-color)'></div>
          </div>

          {/* PRICE DETAILS */}
          <div className='flex flex-col gap-3 text-sm'>
            <div className='flex justify-between'>
              <p className='uppercase tracking-widest text-(--main-text-color)'>Subtotal</p>
              <p className='text-(--main-text-color)'>{Number(totalPrice).toLocaleString()} SEK </p>
            </div>

            <hr className='border-(--main-text-color)' />

            <div className='flex justify-between font-bold text-lg uppercase italic'>
              <p className='text-(--main-text-color)'>Total</p>
              <p className='text-(--main-text-color)'>{Number(totalPrice).toLocaleString()} SEK </p>
            </div>
          </div>

          {/* CHECKOUT BUTTON */}
          <button className='w-full bg-(--main-text-color) text-(--second-text-color) py-4 font-bold uppercase tracking-widest hover:text-(--hover-color) transition-all active:scale-[0.98]' onClick={handleCheckout}>
            Proceed to Checkout
          </button>

        </div>
      </div>

    </div>
  )
}

export default Cart
