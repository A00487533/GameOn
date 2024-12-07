// LoginPage.js
import React from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleLogin = () => {
        // Simulate login success
        onLoginSuccess();
        navigate("/home");
    };

    return (
        <div>
            <h1>Login</h1>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginPage;
