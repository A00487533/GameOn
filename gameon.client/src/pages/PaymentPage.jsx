// PaymentPage.js
import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentPage = ({ onPaymentSuccess }) => {
    const navigate = useNavigate();

    const handlePayment = () => {
        // Simulate payment success
        onPaymentSuccess();
        navigate("/home");
    };

    return (
        <div>
            <h1>Payment</h1>
            <button onClick={handlePayment}>Pay Now</button>
        </div>
    );
};

export default PaymentPage;
