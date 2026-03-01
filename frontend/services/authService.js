import { BASE_URL } from './urlConfig';


export const authService = {
    // LOGIN (uses x-www-form-urlencoded)
    login: async (email, password) => {
        const details = new URLSearchParams();
        details.append('username', email); // OAuth2 usually expects username key
        details.append('password', password);

        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: details,
        });

        const data = await response.json();

        if (!response.ok) {
            // Handle FastAPI details errors
            const errorMsg = Array.isArray(data.detail)
                ? data.detail[0].msh
                : (data.detail || "Login failed");
            throw new Error(errorMsg); 
        }

        return data; // contains access_token
    },

    // REGISTER (JSON)
    register: async (username, email, password) => {
        const response = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                is_admin: false
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            const errorMsg = Array.isArray(data.detail)
                ? data.detail[0].msg
                : (data.detail || "Registration failed");
            throw new Error(errorMsg);
        }
        
        return data; 
    },
};


