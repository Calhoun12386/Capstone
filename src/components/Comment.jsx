import {Link} from "react-router-dom"
import {useState, useEffect} from "react"
import { fetchCheckedOutBooks, returnBook, fetchUserDetails } from "../API/api"


export default function Account({token}){
//console.log(token)

const [comment, setComment] = useState([])

useEffect(() => {
    async function getComments() {
      if (token) {
const userDetails = await fetchUserDetails(token)
setUser(userDetails)
        //const checkedOutBooks = await fetchCheckedOutBooks(token); // Call the API function
        //setBooks(checkedOutBooks.reservation);
        //console.log(checkedOutBooks)
      }
    }

    getComments();
  }, [token]);

  async function handleComments(commentId) {
    try {
        const result = await returnBook(token, reservationId);
        //console.log('handle return result:', result);
        
        // After returning, fetch the updated list of checked-out books
        const updatedComments = await fetchCheckedOutBooks(token);
        setReviews(updatedComments.comment);
    } catch (error) {
        console.error('Error updating the comment:', error);
        
    }
}


if(token===null){
    return(<div><h1>Please Log in</h1>
        <Link to="/login">already have an account?</Link>
        <br></br>
        <Link to="/register">Sign up</Link>
        </div>
    )
}

    return( <div>
        <h1>Welcome to your account</h1>
        <p>{user.email}</p>
    
        <div>
          <h1>Comment on Review</h1>
          {books.length > 0 ? (
            <div className="review-container">
              {comments.map((comment) => (
                <div key={comment.id} className="comment-card">
                  
                  <div className="comment-details">
                    <h2>{book.title}</h2>
                    <p>Author: {book.author}</p>
                    <button onClick={() => handleComment(comment.id)}>
                    Update Comment
                  </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No comment on book</p>
          )}
        </div>
      </div>
    );
}