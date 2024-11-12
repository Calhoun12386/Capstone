// ReviewEdit.js
import React, { useState } from "react";

const ReviewEdit = ({ review, onUpdate, onCancel }) => {
  const [updatedReviewText, setUpdatedReviewText] = useState(review.review_text);
  const [updatedRating, setUpdatedRating] = useState(review.rating);

  const handleSubmit = (e) => {
    e.preventDefault();
    const rating = parseInt(updatedRating, 10);
   // console.log("Submitting updated review:", updatedReviewText, updatedRating); // Add a log to check the values
    onUpdate(updatedReviewText, rating); // Pass the updated values to the parent
  };

  return (
    <div>
      <h3>Edit Review</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={updatedReviewText}
          onChange={(e) => setUpdatedReviewText(e.target.value)}
          required
        />
        <br />
        <label>
          Rating:
          <select
            value={updatedRating}
            onChange={(e) => setUpdatedRating(e.target.value)}
            required
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <br />
        <button type="submit">Update Review</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default ReviewEdit;