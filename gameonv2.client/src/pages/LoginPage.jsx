import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie library
import "../styles/LoginPage.css";


const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors


        try {
            const response = await fetch("https://localhost:7052/api/User/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json(); // Parse the response JSON

                // Save UserID to a cookie
                Cookies.set("UserID", data.UserID, { expires: 7 }); // Cookie expires in 7 days

                navigate("/home"); // Redirect to the home page
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Login failed. Please try again.");
            }
        } catch (error) {
            setError("An error occurred while logging in. Please try again later.");
        }
    };
    const handleRegister = () => {
        navigate("/register");
    };
    
    return (
        <div className="login-page">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="login-button">
                    Login
                </button>
            </form>
            <div className="register-section">
                <p>If you don't have an account, click <br></br>
                <a className="register-button2" onClick={handleRegister}>
                    Register
                </a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
