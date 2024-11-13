import Books from "../components/Books"
import "../css/Home.css";  

export default function Home() {
  
  const books = [

    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      picture_url: "https://www.jdandj.com/uploads/8/0/0/8/80083458/s611371146998849390_p329_i1_w1600.jpeg",
    },
    {
      title: "1984",
      author: "George Orwell",
      picture_url: "https://www.jdandj.com/uploads/8/0/0/8/80083458/s611371146998849390_p329_i1_w1600.jpeg",
    },
    {
      title: "Pride and Prejudice",
      author: "Jane Austen",
      picture_url: "https://www.jdandj.com/uploads/8/0/0/8/80083458/s611371146998849390_p329_i1_w1600.jpeg",
    },
    {
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      picture_url: "https://www.jdandj.com/uploads/8/0/0/8/80083458/s611371146998849390_p329_i1_w1600.jpeg",
    },
  ];

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to the Book Library</h1>
      <p className="home-description">
        Discover a variety of books and explore new titles, authors, and reviews. Browse through our collection and find your next read.
      </p>

      <div className="books-grid">
        {books.map((book, index) => (
          <div className="book-card" key={index}>
            <img src={book.picture_url} alt={book.title} className="book-cover" />
            <div className="book-info">
              <h2 className="book-title">{book.title}</h2>
              <p className="book-author">{book.author}</p>
            </div>
          </div>
        ))}
      </div>

      <footer className="home-footer">
        <p>&copy; 2024 Book Library. All Rights Reserved.</p>
      </footer>
    </div>
  );
}