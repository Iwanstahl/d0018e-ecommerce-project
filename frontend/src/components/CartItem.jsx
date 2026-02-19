import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { cartService } from '../../services/cartService';


const CartItem = ({ cartItem, refreshCart }) => {
    const { currency } = useContext(ShopContext);
    const { product, quantity } = cartItem;

    const [localQuantity, setLocalQuantity] = useState(quantity);

    const handleDelete = async () => {
        try {
            await cartService.removeItem(product.product_id, quantity);
            refreshCart();
        } catch (error) {
            console.error("Error removing item:", error.message);
        }
    }

    return (
        <div className='mb-3 px-4 py-5 border-full border-(--main-text-color) bg-(--main-text-color) grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
            
            <div className='flex items-start gap-4 sm:gap-6'>
                {/* Vi hämtar bilden från den länkade produkten */}
                <img 
                    className='w-16 sm:w-24 object-cover border border-(--second-text-color)' 
                    src={product.image} 
                    alt={product.name} 
                />
                <div>
                    <p className='text-sm sm:text-lg font-bold uppercase italic tracking-tighter text-(--second-text-color)'>
                        {product.name}
                    </p>
                    <p className='text-sm sm:text-base font-light text-(--second-text-color)'>
                        {product.price} {currency}
                    </p>
                </div>
            </div>

            <div className='flex justify-center'>
                <input 
                    className='border border-(--second-text-color) w-10 sm:w-16 px-1 sm:px-2 py-1 text-center bg-(--second-text-color) text-(--main-text-color)' 
                    type="number" 
                    min={1} 
                    value={localQuantity}
                    onChange={async (e) => {
                        const newQuantity = Number(e.target.value);
                        if (newQuantity < 1) return;

                        const delta = newQuantity - quantity;

                        try {
                            await cartService.addToCart(product.product_id, delta);
                            refreshCart();
                            setLocalQuantity(newQuantity);
                        } catch (error) {
                            console.error("Error updating quantity:", error.message);
                        }
                    }}
                />
            </div>
            {/* Trash Icon */}
            <div className='flex justify-end'>
                <button 
                    onClick={handleDelete}
                    className='text-xl opacity-80 hover:opacity-100 transition-all cursor-pointer p-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" className='group p-2 transition-all active:scale-90'
                    height="48px" viewBox="0 -960 960 960" width="48px" fill="var(--second-text-color)"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                </button>
            </div>
        </div>
    )
}

export default CartItem
