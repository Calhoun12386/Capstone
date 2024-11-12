import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {jwtDecode} from 'jwt-decode';
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import ReviewEdit from "./ReviewEdit";
import "../index.css";
import { fetchSingleBook, fetchSingleBookReview, updateReview, deleteReview } from "../API/api";


const SingleBook = ({ token }) => {
  const [singleBook, setSingleBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [editingReview, setEditingReview] = useState(null);
  let { id } = useParams();

  const [userId, setUserId] = useState(null);
  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);  // Use jwt_decode to decode the token
      //console.log(decodedToken)
      setUserId(decodedToken.id);  // Set the user ID from the decoded token
    }
  }, [token]);

  // Fetch book and reviews data on component mount or when id changes
  useEffect(() => {
    async function fetchData() {
      try {
        const bookData = await fetchSingleBook(id);
        const reviewsData = await fetchSingleBookReview(id);
        setSingleBook(bookData);
        setReviews(reviewsData);
      } catch (error) {
        setError(error.message || "Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [id]);

  const handleNewReview = async (newReview) => {
    try {
      setReviews((prevReviews) => [newReview, ...prevReviews]); // Optimistic update
      //console.log("New Review added:", newReview);  // Log the new review
  
      // Refetch the reviews
      //const reviewsData = await fetchSingleBookReview(id);
      //console.log("Fetched reviews:", reviewsData);  // Log the fetched reviews
      //setReviews(reviewsData);
    } catch (error) {
      setError("Failed to update reviews");
    }
  };

   // Function to handle the review update
   const handleUpdateReview = async (updatedReviewText, updatedRating) => {
    try {
      //console.log("handleUpdateReview called");
      // Call the API to update the review (pass rating and text)
      const updatedReview = await updateReview(
        editingReview.id,
        updatedRating,
        updatedReviewText,
        token
      );
      //console.log("Updated review:", updatedReview);
      // Optimistically update the state
      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review.id === editingReview.id
            ? { ...review, review_text: updatedReviewText, rating: updatedRating }
            : review
        )
      );

      // Reset the editing state after the update
      setEditingReview(null);
    } catch (error) {
      setError("Failed to update review");
    }
  };

  // Function to start editing a review
  const handleEditReview = (review) => {
    setEditingReview(review);
  }

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(reviewId, token);
      setReviews((prevReviews) => prevReviews.filter((review) => review.id !== reviewId));
      console.log("Review deleted successfully");
    } catch (error) {
      console.error("Failed to delete review:", error);
      setError("Could not delete review");
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="singleBook">
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="book-details">
        <h2>{singleBook?.title}</h2>
        <p>{singleBook?.author}</p>
        <p>{singleBook?.description}</p>
        {singleBook?.picture_url && (
          <img
            src={singleBook.picture_url}
            alt={`${singleBook.title} cover`}
            style={{
              width: "150px",
              height: "auto",
              borderRadius: "8px",
              marginTop: "10px",
            }}
          />
        )}
      </div>

      {/* Conditionally render the ReviewForm if token exists */}
      {token && <ReviewForm bookId={id} token={token} onNewReview={handleNewReview} />}

      {/* Render reviews list */}
      <ReviewList reviews={reviews} onEditReview={handleEditReview} onDeleteReview={handleDeleteReview} userId={userId}/>

       {/* Render the ReviewEditForm if a review is being edited */}
       {editingReview && (
        <ReviewEdit
          review={editingReview}
          onUpdate={handleUpdateReview}
          onCancel={() => setEditingReview(null)} // Clear the edit form
        />
      )}

    </div>
  );
};

export default SingleBook;