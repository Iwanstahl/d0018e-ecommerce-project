const API_URL = "http://localhost:8000";

export const productService = {
    // Get products
    getProducts: async () => {
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) {
            throw new Error("Failed to fetch products.");
        }
        const data = await response.json();

        // Format data
        return data.map(item => ({
            ...item,
            stock: item.inventory ? item.inventory.stock : 0
        }));
    },

    // Get specific product
    getProductById: async (productId) => {
        const response = await fetch(`${API_URL}/products/${productId}`);
        if (!response.ok) {
            throw new Error("Product not found");
        }
        return await response.json();
    },

    // ADMIN: Get all products, with stock
    getAdminProducts: async () => {
        const token = localStorage.getItem('token');

        const response = await fetch(`${API_URL}/admin/products`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error("Coult not fetch product info.");
        }
        return await response.json();
    },

    // ADMIN: add new product
    addProduct: async () => {
        const token = localStorage.getItem('token');

        const response = await fetch(`${API_URL}/admin/add-products`, {
            metod: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(productData)
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || "Failed to add product");
        }
        return await response.json();
    },

    // Image handeling 
    formatImagePath: (imageName) => {
        if (!imageName) { 
            return 'https://placehold.co/300x300/png';
        } else {
            return `/assets/productImages${imageName}`;
        }
        
    }

}