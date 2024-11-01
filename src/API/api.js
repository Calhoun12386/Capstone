const API_BASE_URL = 'http://localhost:3000/api'; 

// Function to fetch all books
export const fetchBooks = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/books`);
        if (!response.ok) {
            throw new Error('Failed to fetch books');
        }
        const data = await response.json();
        return data; // Return the array of books
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error; // Rethrow the error for handling in the component
    }
};

// Function to log in the user
export const loginUser = async (username, password) => {
    const postHelper = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    };

    const response = await fetch(`${API_BASE_URL}/auth/login`, postHelper);

    //if response is not OK
    if (!response.ok) {
        // Try to parse JSON response for an error message
        try {
            const result = await response.json();
            throw new Error(result.message || 'Invalid username or password_JSON');
        } catch (error) {
            // If parsing fails, throw a generic error
            throw new Error('Invalid username or password');
        }
    }

    // If the response is OK, return the token
    const result = await response.json();
    //console.log(result.token)
    return result.token; 
};

export const registerUser = async (username, password) => {
    const postHelper = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    };

    const response = await fetch(`${API_BASE_URL}/auth/register`, postHelper);

    if (!response.ok) {
        try {
            const result = await response.json();
            throw new Error(result.message || 'Registration failed');
        } catch (error) {
            throw new Error('Registration failed');
        }
    }

    const result = await response.json();
    return result.token; // Return the JWT token
};

