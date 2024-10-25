import {Link} from "react-router-dom";
import "../index.css"

export default function Navigations(){
    return(
        <div id="navbar">

            <Link to="/">Home</Link>
            <Link to="/Books">All Books</Link>
            <Link to="/Login">Login</Link>
            <Link to="/Register">Sign up</Link>

        </div>
    )
};
