import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { ShopContext } from '../context/ShopContext';

const token = localStorage.getItem("token");

let isAdmin = false;

if (token) {
  const decoded = jwtDecode(token);
  isAdmin = decoded.is_admin;
}

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(ShopContext);

  const handleOrders = () => {
    navigate('/orders');
  };

  const handleLogout = () => {
    logout();
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

        {/* Admin Panel */}
        {user?.is_admin && (
          <button
            onClick={() => navigate('/admin')}
            className="border border-(--main-text-color) py-4 uppercase tracking-widest hover:bg-(--main-text-color) hover:text-(--second-text-color) transition-all"
          >
            Admin Panel
          </button>
        )}

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
