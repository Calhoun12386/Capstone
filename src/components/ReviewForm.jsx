import React, { useState } from "react";
import { createReview } from "../API/api"; // Import the createReview function

const ReviewForm = ({ bookId, token, onNewReview }) => {
  const [rating, setRating] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !reviewText) {
      setError("Please provide both a rating and a review");
      return;
    }

    try {
      const review = await createReview(bookId, rating, reviewText, token);
      setSuccessMessage("Review submitted successfully!");
      setRating("");
      setReviewText("");
      onNewReview(review);  // Call the onNewReview prop to update reviews in parent
    } catch (error) {
      setError("There was an error submitting your review. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Write a Review</h2>
      <div>
        <label>
          Rating:
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="5"
            required
          />
        </label>
      </div>
      <div>
        <label>
          Review:
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
          />
        </label>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;