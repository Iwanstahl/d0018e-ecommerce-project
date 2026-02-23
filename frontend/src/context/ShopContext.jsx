import { createContext, useState, useEffect } from "react";
import { productService } from "../../services/productService";

export const ShopContext = createContext();

export const ShopContextProvider = (props) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSearch, setShowSearch] = useState(false);

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
    }, []);
  
    const contextValue = { 
        products, 
        loading, 
        currency, 
        showSearch, 
        setShowSearch,
        fetchProducts
    };


  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;