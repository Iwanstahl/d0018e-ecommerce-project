import React from 'react'

const AdminOrders = () => {
  return (
    <div>
      <div>
          <h2 className='text-2xl font-bold uppercase mb-6 text-(--main-text-color)'>
            Customer Orders
          </h2>
          {/* MAP ALL ORDERS */}
          <div className='bg-(--second-text-color) border border-(--main-text-color) p-4 shadow-sm'>
            <p className='text-(--main-text-color)'>Order list will be displayed here...</p>
          </div>
      </div>
    </div>
  )
}

export default AdminOrders
