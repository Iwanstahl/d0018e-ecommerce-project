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
            image: data.image,
            stock: item.inventory ? item.inventory.stock : 0,
            average_raiting: item.average_raiting || 0,
            rating_count: item.rating_count || 0
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

    getCategories: async () => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/admin/get-categories`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error("Failed to fetch categories");
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

    uploadImage: async (file) => {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('image', file); 

        const respone = await fetch(`${API_URL}/admin/upload-image`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        if (!respone.ok) {
            throw new Error("Couldn't upload image");
        }
        return await respone.json();
    },

    // ADMIN: add new product
    addProduct: async (productData) => {
        const token = localStorage.getItem('token');

        const data = {
            name: productData.name,
            description: productData.description,
            price: parseFloat(productData.price),
            category: productData.category,
            stock: parseInt(productData.stock),
            image: productData.image
        }

        const response = await fetch(`${API_URL}/admin/add-product`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || "Failed to add product");
        }
        return await response.json();
    },

    // ADMIN: Delete product
    deleteProduct: async (productId) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/admin/delete-product/${productId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) throw new Error("Could not delete product");
        return await response.json();
    },

    // Image handeling 
    formatImagePath: (imageName) => {
        if (!imageName) { 
            return 'https://placehold.co/300x300/png';
        } else {
            return `/${imageName}`;
        }   
    }

}