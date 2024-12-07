// RegisterPage.js
import React from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const navigate = useNavigate();

    const handleRegister = () => {
        // Simulate registration success
        navigate("/payment");
    };

    return (
        <div>
            <h1>Register</h1>
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default RegisterPage;
