import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { productService } from "../../services/productService";

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSearch, setShowSearch] = useState(false);
    const [user, setUser] = useState(null);

    const currency = "SEK"

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const data = await productService.getProducts(); 
            setProducts(data);
        } catch(error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
        const token = localStorage.getItem("token");

        if (token) {
            const decoded = jwtDecode(token);
            setUser(decoded);
        }
    }, []);

    const login = (token) => {
        localStorage.setItem("token", token);
        const decoded = jwtDecode(token);
        setUser(decoded);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };
  
    const contextValue = { 
        products, 
        loading, 
        currency, 
        showSearch, 
        setShowSearch,
        fetchProducts
    };


  return (
    <ShopContext.Provider value={{...contextValue, user, login, logout}}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;