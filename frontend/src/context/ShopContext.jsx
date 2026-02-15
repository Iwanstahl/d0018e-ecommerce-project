import { createContext, useState, useEffect } from "react";

export const ShopContext = createContext();

export const ShopContextProvider = (props) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSearch, setShowSearch] = useState(false);

    const currency = "SEK"

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch("http://localhost:8000/products/")
                if (!response.ok) {
                    throw new Error("Network error")
                }
                const data = await response.json();

                const formattedData = data.map(item => ({
                    ...item,
                    stock: item.inventory ? item.inventory.stock : 0 
                }));

                setProducts(formattedData);
            } catch(error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [])
  
    const contextValue = { 
        products, 
        loading, 
        currency, 
        showSearch, 
        setShowSearch 
    };


  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;