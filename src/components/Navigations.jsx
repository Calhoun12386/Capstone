import { Link } from "react-router-dom";
import "../CSS/Navigations.css"; 

export default function Navigations() {
  return (
    <nav id="navbar">
      <div className="logo">
        <h1>Book Library</h1>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/Books" className="nav-link">All Books</Link>
        <Link to="/Login" className="nav-link">Login</Link>
        <Link to="/Register" className="nav-link">Sign Up</Link>
      </div>
    </nav>
  );
}
