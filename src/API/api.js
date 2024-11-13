const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

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

//TO DO - SS
export const fetchSingleBook = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/books/${id}`);
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


export const fetchSingleBookReview = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/books/${id}/reviews`);
        if (!response.ok) {
            throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        return data; // Return the array of reviews
    } catch (error) {
        console.error('Error fetching reviews:', error);
        throw error; // Rethrow the error for handling in the component
    }
};


export const createReview = async (bookId, rating, reviewText, token) => {
    try {
        //console.log(token)
      const response = await fetch(`${API_BASE_URL}/books/${bookId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':  token, // Add the token for authentication
        },
        body: JSON.stringify({ rating, reviewText }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create review');
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error creating review:', error);
      throw error;
    }
  };


export const updateReview = async (reviewId, rating, reviewText, token) => {
    const response = await fetch(`${API_BASE_URL}/reviews/${reviewId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
      body: JSON.stringify({ rating, reviewText }),
    });
    if (!response.ok) throw new Error("Failed to update review");
    return response.json();
  };

  export const deleteReview = async (reviewId, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {
          "Authorization": token,  // Send the token for authorization
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to delete review: ${response.statusText}`);
      }
  
      return response.status;  // Return the status for confirmation (204 if successful)
    } catch (error) {
      console.error("Error in deleteReview:", error);
      throw error;
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

