import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Profile from './pages/Profile';
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from "./pages/AdminPages/AdminDashboard";
import AdminRoute from "./pages/AdminPages/AdminRoute";
import { useEffect } from "react";
import { getOrCreateSessionId } from "./utils/session";

const App = () => {
  useEffect(() => {
    getOrCreateSessionId();
  }, []);

  return (
    <div className="px-4 sm:px[5vw] md:px-[7vw] lg:px-[9vw]">
      <NavBar />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products/>} />
        <Route path="/about" element={<About />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      </Routes>
    </div>
  );
};

export default App;
