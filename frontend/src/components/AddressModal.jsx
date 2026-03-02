import React, { useEffect, useState } from 'react';
import { cartService } from '../../services/cartService';

const AddressModal = ({ isOpen, onClose, onAddressAdded }) => {
    const [savedAddresses, setSavedAddresses] = useState([]);
    const [formData, setFormData] = useState({
        country: '',
        state: '',
        city: '',
        address: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            const fetchAddresses = async () => {
                try {
                    const addresses = await cartService.getAddresses();
                    setSavedAddresses(addresses);
                } catch (error) {
                    console.error("Couldn't fetch addresses:", error.message);
                }
        };
        fetchAddresses();
    }
    }, [isOpen]);

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

    if (!isOpen) return null; 

    // Handle choice of saved address
    const handleSelectSaved = (e) => {
        const selectedId = e.target.value;
        if (!selectedId) return;

        const addr = savedAddresses.find(a => a.address_id.toString() === selectedId);
        if (addr) {
            setFormData({
                country: addr.country,
                state: addr.state,
                city: addr.city,
                address: addr.address
            });
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-md">
            <div className="bg-(--second-text-color) w-full max-w-md p-8 flex flex-col gap-4 relative border border-(--main-text-color)">
                <button onClick={onClose} className="absolute top-4 right-4 text-xl text-(--main-text-color) hover:text-(--hover-color) transition-all">✕</button>
                
                <h2 className="text-2xl font-semibold uppercase tracking-tighter text-(--main-text-color)">Shipping Address</h2>
                
                {/* DROPDOWN TO SHOW SAVED ADDRESSES */}
                {savedAddresses.length > 0 && (
                    <div className="flex flex-col gap-1 mb-2">
                        <label className="text-[10px] uppercase tracking-widest text-(--main-text-color) opacity-60">Use saved address</label>
                        <select 
                            onChange={handleSelectSaved}
                            className="border p-3 outline-none border-(--main-text-color) text-(--main-text-color) bg-transparent cursor-pointer"
                        >
                            <option value="">SELECT AN ADDRESS</option>
                            {savedAddresses.map((addr) => (
                                <option key={addr.address_id} value={addr.address_id}>
                                    {addr.address}, {addr.city}
                                </option>
                            ))}
                        </select>
                        <div className="flex items-center gap-2 my-2">
                            <hr className="flex-1 border-(--main-text-color) opacity-20" />
                            <span className="text-[10px] uppercase text-(--main-text-color) opacity-40">Or enter new</span>
                            <hr className="flex-1 border-(--main-text-color) opacity-20" />
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input 
                        type="text" placeholder="Country" required
                        value={formData.country}
                        className="border p-3 outline-none border-(--main-text-color) text-(--main-text-color)"
                        onChange={(e) => setFormData({...formData, country: e.target.value})}
                    />
                    <input 
                        type="text" placeholder="State / Province" required
                        value={formData.state}
                        className="border p-3 outline-none border-(--main-text-color) text-(--main-text-color)"
                        onChange={(e) => setFormData({...formData, state: e.target.value})}
                    />
                    <input 
                        type="text" placeholder="City" required
                        value={formData.city}
                        className="border p-3 outline-none border-(--main-text-color) text-(--main-text-color)"
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                    />
                    <input 
                        type="text" placeholder="Street Address" required
                        value={formData.address}
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