import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import "../index.css";
import { fetchSingleBook, fetchSingleBookReview } from "../API/api";

const SingleBook = ({ token }) => {
  const [singleBook, setSingleBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  let { id } = useParams();

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
      <ReviewList reviews={reviews}  />
    </div>
  );
};

export default SingleBook;