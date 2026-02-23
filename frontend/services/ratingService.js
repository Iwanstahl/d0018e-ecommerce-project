const API_URL = "http://localhost:8000";

const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
});

export const ratingService = {
    // Create a new review
    addRating: async (ProductId, score) => {
        const response = await fetch(`${API_URL}/rating/add-rating`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({ product_id: ProductId, score: score })
        });
        if (!response.ok) {
            throw new Error("Couldn't save rating");
        }
        return await response.json();
    },

};