/* TODO - add your code to create a functional React component that renders reviews for a single book. Fetch the review data from the provided API. You may consider conditionally rendering a 'Add/update' button for logged in users. */

import React from "react";
import { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';

// Import the CSS styles for this component
import '../index.css';
import { fetchSingleBookReview, createSingleBookReview, updateSingleBookReview, deleteSingleBookReview} from '../API/api';


// Define a new React component
const Reviews = () => {
  const [singleBookReviews, setSingleBookReview] = useState(null);
  const [createBookReview, setCreateBookReview] = useState(null);
  const [updateBookReview, setUpdateBookReview] = useState(null);
  const [deleteBookReview, setDeleteBookReview] = useState(null);

  const [error, setError] = useState(null);
  let { id } = useParams();

  
  useEffect(() => {
    async function fetchBookReview() {
        
        try {
            const reviewsData = await fetchSingleBookReview(id); 
            setSingleBookReview(reviewsData); 
        } catch (error) {
            setError(error.message); 
        }
      }
      fetchBookReview();
  }, []);



  useEffect(() => {
    async function createBookReview() {
        
        try {
            const reviewsData = await createSingleBookReview(id); 
            setCreateBookReview(reviewsData); 
        } catch (error) {
            setError(error.message); 
        }
      }
      createBookReview();
  }, []);


  useEffect(() => {
    async function updateBookReview() {
        
        try {
            const reviewsData = await updateSingleBookReview(id); 
            setUpdateBookReview(reviewsData); 
        } catch (error) {
            setError(error.message); 
        }
      }
      updateBookReview();
  }, []);


  useEffect(() => {
    async function deleteBookReview() {
        
        try {
            const reviewsData = await deleteSingleBookReview(id); 
            setDeleteBookReview(reviewsData); 
        } catch (error) {
            setError(error.message); 
        }
      }
      deleteBookReview();
  }, []);


  // Show the fetched data after it has arrived
  return (
    <div className="reviews">
              <h1>Review List</h1>
          <div className="review-details">
            <h2> {review?.id} </h2> 
            <p>  {review?.review_text} </p> 
            <p> {review?.rating} </p>
          </div>
    </div>
  );
};

  if (error) {
    return <div>Error: {error}</div>; 
}

// Export the component so it can be imported and used in other files
export default Reviews;