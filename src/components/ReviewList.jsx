import React from 'react';


const ReviewList = ({ reviews, onEditReview, onDeleteReview, userId }) => {  // Accept onEditReview as prop
  //console.log(userId)
 // console.log(reviews[0])
  return (
    <div>
      
      <h3>Reviews</h3>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <strong>Rating:</strong> {review.rating} / 5
              <p>{review.review_text}</p>
              {/* Conditionally render Edit and Delete buttons based on ownership */}
              {review.user_id === userId && (
                <>
                  <button onClick={() => onEditReview(review)}>Edit</button>
                  <button onClick={() => onDeleteReview(review.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default ReviewList;