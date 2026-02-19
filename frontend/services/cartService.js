const BASE_URL = 'http://localhost:8000';
const CART_URL = `${BASE_URL}/cart`

export const cartService = {

    // add to cart (Purchase button)
    addToCart: async (productId, quantity = 1) => {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error("Please log in to be able to add items to cart.");
        }

        const response = await fetch(`${CART_URL}/update-cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                product_id: productId,
                quantity: quantity
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Could not update cart")
        }
        return await response.json();
    },

    // remove item from cart (delete button)
    removeItem: async (productId, currentQuantity) => {
        const token = localStorage.getItem('token');
        if (!token) throw new Error("Not logged in");

        const response = await fetch(`${CART_URL}/update-cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                product_id: productId,
                quantity: -currentQuantity
            })
        });
        if (!response.ok) {
            throw new Error("Could not remove item.");
        }
        return await response.json();
    },

    // Get Cart
    getCart: async () => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${CART_URL}/get-cart`, {
            headers: {
                'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Coult not fetch cart.");
        }
        return await response.json();
    },

    checkout: async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error("No token found, Log in.");
        }

        const response = await fetch(`${BASE_URL}/orders/checkout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Checkout failed")
        }
        return await response.json();
    },
};