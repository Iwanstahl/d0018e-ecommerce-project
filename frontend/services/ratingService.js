const API_URL = "http://localhost:8000";

const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
});

export const ratingService = {
    // Create a new review
    addRating: async (ProductId, score, comment = null) => {
        const CleanComment = comment && comment.trim() !== "" ? comment : null;

        const response = await fetch(`${API_URL}/rating/add-rating`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({ 
                product_id: ProductId, 
                score: score,
                comment: CleanComment 
            })
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detai || "Couldn't save rating");
        }
        return await response.json();
    },

    getProductComments: async (productId) => {
        const response = await fetch(`${API_URL}/products/${productId}/ratings`);
        if (!response.ok) {
            return []; //Empty list if anything goes wrong
        }
        return await response.json();
    },

};