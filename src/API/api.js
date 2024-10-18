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