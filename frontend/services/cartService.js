import { BASE_URL } from './urlConfig';
const CART_URL = `${BASE_URL}/cart`;

export const cartService = {

    addToCart: async (productId, quantity = 1) => {
    const token = localStorage.getItem('token');
    const session = localStorage.getItem('session_id');

    let url = `${CART_URL}/update-cart`;
    const headers = {
        'Content-Type': 'application/json',
    };

    // Logged in user
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    } 
    // Guest user
    else if (session) {
        url += `?session_id=${session}`;
    } 
    else {
        throw new Error("No session or token available.");
    }

    const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            product_id: productId,
            quantity: quantity
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Could not update cart");
    }

    return await response.json();
},


// Get Cart
    getCart: async () => {
    const token = localStorage.getItem('token');
    const session = localStorage.getItem('session_id');

    let url = `${CART_URL}/get-cart`;
    const headers = {};

    // Logged in user
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    } 
    // Guest user
    else if (session) {
        url += `?session_id=${session}`;
    } 
    else {
        throw new Error("No session or token available.");
    }

    const response = await fetch(url, {
        method: 'GET',
        headers
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Could not fetch cart.");
    }

    return await response.json();
},

 // remove item from cart (delete button)
    removeItem: async (productId, currentQuantity) => {
    const token = localStorage.getItem('token');
    const session = localStorage.getItem('session_id');

    let url = `${CART_URL}/update-cart`;
    const headers = {
        'Content-Type': 'application/json',
    };

    // Logged in user
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    } 
    // Guest user
    else if (session) {
        url += `?session_id=${session}`;
    } 
    else {
        throw new Error("No session or token available.");
    }

    const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            product_id: productId,
            quantity: -currentQuantity
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Could not remove item.");
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

    // Address management

    getAddresses: async (addressData) => {
        const response = await fetch(`${BASE_URL}/addresses/`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || "Couldn't fetch address");
        }
        return await response.json();
    },

    addAddress: async (addressData) => {
        const response = await fetch(`${BASE_URL}/addresses/add-address`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(addressData)
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || "Couldn't save address");
        }
        return await response.json();
    },
};