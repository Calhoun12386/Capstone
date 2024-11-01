// components/Books.js
import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom"
import { fetchBooks } from '../API/api';


const Books = () => {
    const [books, setBooks] = useState([]); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const getBooks = async () => {
            try {
                const booksData = await fetchBooks(); 
                setBooks(booksData); 
            } catch (error) {
                setError(error.message); 
            }
        };

        getBooks(); 
    }, []); 

    if (error) {
        return <div>Error: {error}</div>; 
    }

    return (
        <div>
            <h1>Books List</h1>
            <ul>
                {books.map((book) => (
                    <li key={book.id}>
                        <Link to={`/Books/${book.id}`}> {/* Link to the SingleBook component */}
                            <h2>{book.title}</h2> 
                            <p>Author: {book.author}</p> 
                            {book.picture_url && (
                                <img
                                    src={book.picture_url}
                                    alt={book.title}
                                    style={{ width: '100px', height: '150px', cursor: 'pointer' }} // Add cursor pointer
                                />
                            )}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Books;