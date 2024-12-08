import React, { useState } from "react";
import "../styles/RegisterPage.css";

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        // Frontend validation
        if (!username || !email || !password || !confirmPassword) {
            setError("All fields are required.");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Invalid email address.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await fetch("https://localhost:5173/api/Register/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                setSuccess(data.message);
                setUsername("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Registration failed. Please try again.");
            }
        } catch (err) {
            setError("An error occurred while registering. Please try again later.");
        }
    };

    return (
        <div className="register-page">
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleRegister}>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter your password"
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <button type="submit" className="register-button">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;
