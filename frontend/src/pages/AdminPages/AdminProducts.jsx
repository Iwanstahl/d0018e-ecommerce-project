import React, { useEffect, useState } from 'react'
import { productService } from '../../../services/productService'

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await productService.getAdminProducts();
        setProducts(data);
      } catch (error) {
        console.error("Access denied/Server error", error);
        alert("Couldnt get data, are logged in as admin?");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [])


  return (
    <div>
      <div>
        <h2 className='text-2xl font-bold uppercase mb-6 text-(--main-text-color)'>
          Inventory Management
        </h2>
        <button className='bg-(--main-text-color) text-(--second-text-color) px-4 py-2 text-xs font-bold uppercase mb-6 hover:text-(--highlight-color)'>
          + Add New Product
        </button>
      </div>

      {/* LOADING ICON */}
      {loading ? (
        <div className='flex justify-center py-20'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-(--main-text-color)'></div>
        </div>
      ) : (
      <div className='flex flex-col gap-3'>
          {products.map((p) => (
            <div 
              key={p.product_id} 
              className='bg-(--main-text-color) text-(--second-text-color) p-4 flex items-center justify-between border border-(--second-text-color) shadow-lg'
            >
              {/* Vänster sida: Bild och Info */}
              <div className='flex items-center gap-6'>
                <div className='w-16 h-16 bg-white/10 flex items-center justify-center overflow-hidden'>
                   <img 
                    src={productService.formatImagePath(p.image)} 
                    alt={p.name} 
                    className='w-12 h-12 object-contain'
                  />
                </div>
                
                <div>
                  <h3 className='font-bold uppercase tracking-wider text-sm'>{p.name}</h3>
                  <p className='text-[10px] opacity-70 uppercase tracking-widest'>Price: {p.price} SEK</p>
                </div>
              </div>

              {/* Left Side: Stock + buttons */}
              <div className='flex items-center gap-8'>
                <div className='text-right'>
                  <p className='text-[10px] uppercase opacity-50 mb-1'>Stock Level</p>
                  <p className='font-mono font-bold text-lg'>{p.inventory?.stock ?? 0}</p>
                </div>
                
                <div className='flex flex-col gap-1'>
                  <button className='text-[9px] font-bold uppercase border border-(--second-text-color) px-3 py-1 hover:bg-(--second-text-color) hover:text-(--main-text-color) transition-all'>
                    Edit
                  </button>
                  <button className='text-[9px] font-bold uppercase bg-red-900/50 text-(--second-text-color) px-3 py-1 hover:bg-red-600 hover:text-(--second-text-color) transition-all'>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
