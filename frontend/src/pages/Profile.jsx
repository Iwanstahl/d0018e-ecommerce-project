import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const handleOrders = () => {
    navigate('/orders');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="pt-14 flex flex-col items-center text-(--main-text-color)">
      
      {/* Header */}
      <h1 className="text-3xl font-semibold uppercase mb-10">
        My Profile
      </h1>

      {/* Options */}
      <div className="w-full max-w-sm flex flex-col gap-6">

        {/* Orders */}
        <button
          onClick={handleOrders}
          className="border border-(--main-text-color) py-4 uppercase tracking-widest hover:bg-(--main-text-color) hover:text-(--second-text-color) transition-all"
        >
          My Orders
        </button>

        {/* Sign Out */}
        <button
          onClick={handleLogout}
          className="border border-red-500 text-red-500 py-4 uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
        >
          Sign Out
        </button>

      </div>
    </div>
  );
};

export default Profile;
