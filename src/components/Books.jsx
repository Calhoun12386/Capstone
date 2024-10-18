// components/Books.js
import React, { useEffect, useState } from 'react';
import { fetchBooks } from '../API/api'; // Import the API call

const Books = () => {
    const [books, setBooks] = useState([]); // State to store books
    const [error, setError] = useState(null); // State to handle errors

    useEffect(() => {
        const getBooks = async () => {
            try {
                const booksData = await fetchBooks(); // Call the fetchBooks API
                setBooks(booksData); // Update state with fetched books
            } catch (error) {
                setError(error.message); // Set error if fetching fails
            }
        };

        getBooks(); // Call the function to fetch books
    }, []); // Empty dependency array to run on component mount

    if (error) {
        return <div>Error: {error}</div>; // Render error message if any
    }

    return (
        <div>
            <h1>Books List</h1>
            <ul>
                {books.map((book) => (
                    <li key={book.id}>{book.title}</li> // Render list of book titles
                ))}
            </ul>
        </div>
    );
};

export default Books;