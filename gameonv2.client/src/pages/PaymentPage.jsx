import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PaymentPage.css";

const PaymentPage = () => {
    const navigate = useNavigate();
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        cardHolderName: "",
    });
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        setError("");

        // Simulate backend API call
        try {
            const response = await fetch("https://localhost:7052/api/Payment/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(paymentDetails),
            });

            if (response.ok) {
                alert("Payment successful!");
                navigate("/home"); // Redirect to home page
            } else {
                const data = await response.json();
                setError(data.message || "Payment failed. Please try again.");
            }
        } catch (error) {
            setError("An error occurred. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="payment-page">
            <h2>Complete Your Payment</h2>
            <form onSubmit={handlePayment} className="payment-form">
                <div className="form-group">
                    <label htmlFor="cardHolderName">Cardholder Name</label>
                    <input
                        type="text"
                        id="cardHolderName"
                        name="cardHolderName"
                        value={paymentDetails.cardHolderName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cardNumber">Card Number</label>
                    <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={paymentDetails.cardNumber}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="expiryDate">Expiry Date (MM/YY)</label>
                    <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={paymentDetails.expiryDate}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cvv">CVV</label>
                    <input
                        type="password"
                        id="cvv"
                        name="cvv"
                        value={paymentDetails.cvv}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="pay-button" disabled={isProcessing}>
                    {isProcessing ? "Processing..." : "Pay Now"}
                </button>
            </form>
        </div>
    );
};

export default PaymentPage;
