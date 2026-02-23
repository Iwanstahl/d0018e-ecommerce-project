import React, { useState, useEffect } from 'react'
import { productService } from '../../services/productService'

const AddProduct = ({ isOpen, onClose, onSave }) => {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: 0,
        image: null
    });


    useEffect(() => {
        const fetchCats = async () => {
            if (isOpen) {
                try {
                    const data = await productService.getCategories();
                    setCategories(data);
                } catch (error) {
                    console.error("Error loading categories:", error);
                }
            }
        };
        fetchCats();
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };


    return (
        <div className='fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
        <div className='bg-(--second-text-color) w-full max-w-md p-8 shadow-2xl border border-(--main-text-color)'>
            <div className='flex justify-between items-start mb-6'>
            <h3 className='text-xl font-bold uppercase text-(--main-text-color)'>
                New Product
            </h3>
            <button onClick={onClose} className='text-xl'>✕</button>
            </div>
            
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input 
                type="text" placeholder="PRODUCT NAME" required
                className='border-b border-(--main-text-color) p-2 text-sm outline-none bg-transparent'
                onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            
            <textarea 
                placeholder="DESCRIPTION" required
                className='border border-(--main-text-color) p-2 text-sm h-24 outline-none bg-transparent'
                onChange={(e) => setFormData({...formData, description: e.target.value})}
            />

            <div className='grid grid-cols-2 gap-4'>
                <input 
                type="number" placeholder="PRICE (SEK)" required
                className='border-b border-(--main-text-color) p-2 text-sm outline-none bg-transparent'
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                />
                <input 
                type="number" placeholder="INITIAL STOCK" required
                className='border-b border-(--main-text-color) p-2 text-sm outline-none bg-transparent'
                onChange={(e) => setFormData({...formData, stock: e.target.value})}
                />
            </div>

            <select 
                required
                className='border-b border-(--main-text-color) p-2 text-sm bg-transparent outline-none'
                onChange={(e) => setFormData({...formData, category: e.target.value})}>
                <option value="" className='text-(--main-text-color)'>SELECT CATEGORY</option>
                    {categories.map((cat) => (
                        <option key={cat.category_id} value={cat.category_name} className='text-black'>
                            {cat.category_name.toUpperCase()}
                        </option>
                    ))} 
            </select>

            <div className='mt-2'>
                <label className='text-[10px] uppercase font-bold mb-1 block opacity-60'>Product Image</label>
                <input 
                type="file" 
                required
                className='text-xs file:bg-(--main-text-color) file:text-(--second-text-color) file:border-none file:px-3 file:py-1 file:uppercase file:text-[9px] cursor-pointer'
                onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
                />
            </div>

            <div className='flex gap-2 mt-6'>
                <button 
                type="submit"
                className='flex-1 bg-(--main-text-color) text-(--second-text-color) py-3 text-xs font-bold uppercase hover:opacity-90 transition-opacity'
                >
                Add to Inventory
                </button>
                <button 
                type="button"
                onClick={onClose}
                className='px-6 py-3 text-xs font-bold uppercase border border-(--main-text-color)'
                >
                Cancel
                </button>
            </div>
            </form>
        </div>
     </div>
    );
};

export default AddProduct;
