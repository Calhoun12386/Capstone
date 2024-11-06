

/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */

import React from "react";
import { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';

// Import the CSS styles for this component
import '../index.css';
import { fetchSingleBook } from '../API/api';


// Define a new React component
const SingleBook = () => {
  const [singleBook, setSingleBook] = useState(null);
  const [error, setError] = useState(null);
  let { id } = useParams();

  
  useEffect(() => {
    async function fetchBook() {
        
        try {
            const booksData = await fetchSingleBook(id); 
            setSingleBook(booksData); 
        } catch (error) {
            setError(error.message); 
        }
      }
      fetchBook();
  }, []);


  // Show the fetched data after it has arrived
  return (
    <div className="singleBook">
      
          {/* {book.coverimage} alt="book.name" */}
          
          <div className="book-details">
            <h2> {singleBook?.title} </h2> 
            <p>  {singleBook?.author} </p> 
            <p> {singleBook?.description} </p>
          </div>
    </div>
  );
};

// Export the component so it can be imported and used in other files
export default  SingleBook;