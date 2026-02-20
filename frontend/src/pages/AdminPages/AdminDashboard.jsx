import React, { useState } from 'react'
import AdminOrders from './AdminOrders'     
import AdminProducts from './AdminProducts'
import AdminUsers from './AdminUsers'

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('orders') //First page is orders

  return (
    <div className='flex min-h-[80vh] -mx-[4vw] sm:-mx-[5vw] md:-mx-[7vw] lg:-mx-[9vw]'>      
        {/* SIDEBAR */}
        <div className=' ml-8 w-48 sm:w-64 bg-(--main-text-color) text-(--second-text-color) p-6'>
            <h2 className='text-xl font-bold uppercase mb-10 tracking-tighter'>
                Admin Panel
            </h2>
            {/* NAVIGATION SECTION */}
            <nav className='flex flex-col gap-4 text-sm font-medium'>
            <button 
                onClick={() => setActiveTab('orders')}
                className={`text-left uppercase tracking-widest hover:text-(--highlight-color) transition-all ${activeTab === 'orders' ? 'text-(--highlight-color) border-r-2 border-(--highlight-color)' : ''}`}>
                All Orders
            </button>
        
            <button 
                onClick={() => setActiveTab('products')}
                className={`text-left uppercase tracking-widest hover:text-(--highlight-color) transition-all ${activeTab === 'products' ? 'text-(--highlight-color) border-r-2 border-(--highlight-color)' : ''}`}>
                Manage Products
            </button>

            <button 
                onClick={() => setActiveTab('users')}
                className={`text-left uppercase tracking-widest hover:text-(--highlight-color) transition-all ${activeTab === 'users' ? 'text-(--highlight-color) border-r-2 border-(--highlight-color)' : ''}`}>
                Customers
            </button>
            </nav>
        </div>

        {/* CONTENT AREA, RIGHT SIDE OF SIDEBAR, USES AdminPages */}
        <div className='flex-1 p-8 bg-(--second-text-color)'>
            {activeTab === 'orders' && <AdminOrders />}
            {activeTab === 'products' && <AdminProducts />}
            {activeTab === 'users' && <AdminUsers />}
        </div>
    </div>
  )
};

export default AdminDashboard;
