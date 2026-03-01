import React, { useState } from 'react';
import { cartService } from '../../services/cartService';

const AddressModal = ({ isOpen, onClose, onAddressAdded }) => {
    const [formData, setFormData] = useState({
        country: '',
        state: '',
        city: '',
        address: ''
    });
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const newAddress = await cartService.addAddress(formData);
            onAddressAdded(newAddress); // Tell parent component we are done
            onClose(); // Close modal
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-md">
            <div className="bg-(--second-text-color) w-full max-w-md p-8 flex flex-col gap-4 relative border border-(--main-text-color)">
                <button onClick={onClose} className="absolute top-4 right-4 text-xl text-(--main-text-color) hover:text-(--hover-color) transition-all">✕</button>
                
                <h2 className="text-2xl font-semibold uppercase tracking-tighter text-(--main-text-color)">Shipping Address</h2>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input 
                        type="text" placeholder="Country" required
                        className="border p-3 outline-none border-(--main-text-color) text-(--main-text-color)"
                        onChange={(e) => setFormData({...formData, country: e.target.value})}
                    />
                    <input 
                        type="text" placeholder="State / Province" required
                        className="border p-3 outline-none border-(--main-text-color) text-(--main-text-color)"
                        onChange={(e) => setFormData({...formData, state: e.target.value})}
                    />
                    <input 
                        type="text" placeholder="City" required
                        className="border p-3 outline-none border-(--main-text-color) text-(--main-text-color)"
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                    />
                    <input 
                        type="text" placeholder="Street Address" required
                        className="border p-3 outline-none border-(--main-text-color) text-(--main-text-color)"
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                    />
                    
                    <button 
                        disabled={loading}
                        className="bg-(--main-text-color) text-(--second-text-color) py-4 uppercase font-bold hover:text-(--hover-color) transition-all"
                    >
                        {loading ? 'Saving...' : 'Confirm & Proceed'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddressModal;