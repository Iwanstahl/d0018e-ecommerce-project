import React from 'react'

const AdminProducts = () => {
  return (
    <div>
      <div>
        <h2 className='text-2xl font-bold uppercase mb-6 text-(--main-text-color)'>
          Inventory Management
        </h2>
        <button className='bg-(--main-text-color) text-(--second-text-color) px-4 py-2 text-xs font-bold uppercase mb- hover:text-(--highlight-color)'>
          + Add New Product
        </button>
      </div>
    </div>
  )
}

export default AdminProducts
