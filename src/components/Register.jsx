import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../API/api"; 

export default function SignUp({ setToken }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const token = await registerUser(username, password);
            setToken(token); // Store the token after registration
            navigate("/"); // Navigate to the homepage or another page
        } catch (error) {
            setError(error.message || 'Something went wrong.');
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Username: 
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Password: 
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}