import React from 'react'
import Title from '../components/Title'
import CartItem from '../components/CartItem';

const mockCartResponse = {
  cart_id: 1,
  user_id: 1,
  cart_price: "17249.00",
  items: [
    {
      cart_item_id: 10,
      product_id: 1,
      quantity: 1,
      product: {
        product_id: 1,
        name: "Fender Stratocaster",
        price: "15999.00",
        image: "https://placehold.co/600x600?text=Stratocaster",
      }
    },
    {
      cart_item_id: 11,
      product_id: 4,
      quantity: 2,
      product: {
        product_id: 4,
        name: "Ibanez Tube Screamer TS9",
        price: "1250.00",
        image: "https://placehold.co/600x600?text=Tube+Screamer",
      }
    }
  ]
};

const Cart = () => {
  const cartFromApi = mockCartResponse;

  return (
    <div className='bordet-t pt-14'>
      {/* TITLE */}
      <div className='text-2xl mb-3'>
        <Title text1='YOUR' text2='CART' />
      </div>
      {/* DISPLAY PRODUCTS FOR CART */}
      <div>
        {cartFromApi.items.map((item) =>
          <CartItem key={item.cart_item_id} cartItem={item} />
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
              <p className='text-(--main-text-color)'>17 249.00 kr</p>
            </div>

            <hr className='border-(--main-text-color)' />

            <div className='flex justify-between font-bold text-lg uppercase italic'>
              <p className='text-(--main-text-color)'>Total</p>
              <p className='text-(--main-text-color)'>17 398.00 kr</p>
            </div>
          </div>

          {/* CHECKOUT BUTTON */}
          <button className='w-full bg-(--main-text-color) text-(--second-text-color) py-4 font-bold uppercase tracking-widest hover:text-(--hover-color) transition-all active:scale-[0.98]'>
            Proceed to Checkout
          </button>

        </div>
      </div>

    </div>
  )
}

export default Cart
