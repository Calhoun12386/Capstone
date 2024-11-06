/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */
import {Link} from "react-router-dom"
import {useState, useEffect} from "react"
import { fetchCheckedOutBooks, returnBook, fetchUserDetails } from "../API/api"


export default function Account({token}){
//console.log(token)

const [books, setBooks] = useState([])
const [user, setUser] = useState([])

useEffect(() => {
    async function getBooks() {
      if (token) {
const userDetails = await fetchUserDetails(token)
setUser(userDetails)


        const checkedOutBooks = await fetchCheckedOutBooks(token); // Call the API function
        setBooks(checkedOutBooks.reservation);
        //console.log(checkedOutBooks)
      }
    }

    getBooks();
  }, [token]);

  async function handleReturn(reservationId) {
    try {
        const result = await returnBook(token, reservationId);
        //console.log('handle return result:', result);
        
        // After returning, fetch the updated list of checked-out books
        const updatedBooks = await fetchCheckedOutBooks(token);
        setBooks(updatedBooks.reservation);
    } catch (error) {
        console.error('Error returning the book:', error);
        
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
          <h1>Checked-Out Books</h1>
          {books.length > 0 ? (
            <div className="books-container">
              {books.map((book) => (
                <div key={book.id} className="book-card">
                  <div className="book-image-container">
                    <img src={book.coverimage} alt={book.title} className="book-image" />
                  </div>
                  <div className="book-details">
                    <h2>{book.title}</h2>
                    <p>Author: {book.author}</p>
                    <button onClick={() => handleReturn(book.id)}>
                    Return Book
                  </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No books checked out.</p>
          )}
        </div>
      </div>
    );
}


//TO DO : fetch all comments the user has written 
//TO DO: fetch all review user added/updated 