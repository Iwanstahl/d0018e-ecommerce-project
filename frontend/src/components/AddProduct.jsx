import React, { useState, useEffect } from 'react'
import { productService } from '../../services/productService'

const AddProduct = ({ isOpen, onClose, onSave, initialData }) => {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: 0,
        image: null
    });

    // Populate form if we are editing
    useEffect(() => {
        if (isOpen && initialData) {
            setFormData({
                name: initialData.name || '',
                description: initialData.description || '',
                price: initialData.price || '',
                category: initialData.category?.category_name || '',
                stock: initialData.inventory?.stock || 0,
                image: initialData.image // Här sparar vi namnet på den existerande bilden
            });
        } else if (isOpen) {
            // Reset if opening new product
            setFormData({
                name: '', description: '', price: '', category: '', stock: 0, image: null
            });
        }
    }, [isOpen, initialData]);

    // Load Categories
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
        <div className='fixed inset-0 bg-(--main-text-color)/80 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
            <div className='bg-(--second-text-color) w-full max-w-md p-8 shadow-2xl border border-(--main-text-color)'>
                <div className='flex justify-between items-start mb-6'>
                    <h3 className='text-xl font-bold uppercase text-(--main-text-color)'>
                        {initialData ? 'Update Product' : 'New Product'}
                    </h3>
                    <button onClick={onClose} className='text-xl'>✕</button>
                </div>
                
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <input 
                        type="text" placeholder="PRODUCT NAME" required
                        value={formData.name}
                        className='border-b border-(--main-text-color) p-2 text-sm outline-none bg-transparent'
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                    
                    <textarea 
                        placeholder="DESCRIPTION" required
                        value={formData.description}
                        className='border border-(--main-text-color) p-2 text-sm h-24 outline-none bg-transparent'
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />

                    <div className='grid grid-cols-2 gap-4'>
                        <input 
                            type="number" placeholder="PRICE (SEK)" required
                            value={formData.price}
                            className='border-b border-(--main-text-color) p-2 text-sm outline-none bg-transparent'
                            onChange={(e) => setFormData({...formData, price: e.target.value})}
                        />
                        <input 
                            type="number" placeholder="STOCK" required
                            value={formData.stock}
                            className='border-b border-(--main-text-color) p-2 text-sm outline-none bg-transparent'
                            onChange={(e) => setFormData({...formData, stock: e.target.value})}
                        />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label className='text-[10px] uppercase font-bold mb-1 block opacity-60'>Category</label>
                        <input 
                            list="category-list" type="text" placeholder="E.G. GUITARS" required
                            value={formData.category}
                            className='border-b border-(--main-text-color) p-2 text-sm outline-none bg-transparent uppercase tracking-widest'
                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                        />
                        <datalist id="category-list">
                            {categories.map((cat) => (
                                <option key={cat.category_id} value={cat.category_name}>
                                    {cat.category_name.toUpperCase()}
                                </option>
                            ))}
                        </datalist>
                    </div>

                    <div className='mt-2'>
                        <label className='text-[10px] uppercase font-bold mb-1 block opacity-60'>
                            {initialData ? 'Update Image (Optional)' : 'Product Image'}
                        </label>
                        <input 
                            type="file" 
                            required={!initialData} // Krävs bara vid ny produkt
                            className='text-xs file:bg-(--main-text-color) file:text-(--second-text-color) file:border-none file:px-3 file:py-1 cursor-pointer'
                            onChange={(e) => setFormData({...formData, image: e.target.files[0]})} 
                        />
                        {initialData && !(formData.image instanceof File) && (
                            <p className='text-[9px] opacity-50 mt-1 uppercase '>Current: {formData.image}</p>
                        )}
                    </div>

                    <div className='flex gap-2 mt-6'>
                        <button type="submit" className='flex-1 bg-(--main-text-color) text-(--second-text-color) py-3 text-xs font-bold uppercase hover:text-(--hover-color)'>
                            {initialData ? 'Save Changes' : 'Add to Inventory'}
                        </button>
                        <button type="button" onClick={onClose} className='px-6 py-3 text-xs text-(--second-text-color) font-bold uppercase bg-(--main-text-color) hover:text-(--hover-color)'>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;