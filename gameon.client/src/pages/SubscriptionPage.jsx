import React, { useState } from "react";
import "../styles/SubscriptionPage.css";

const SubscriptionPage = ({ history }) => {
    const [selectedPlan, setSelectedPlan] = useState("");

    const handleSelectPlan = (plan) => {
        setSelectedPlan(plan);
    };

    const handlePay = () => {
        if (!selectedPlan) {
            alert("Please select a subscription plan before proceeding.");
            return;
        }
        // Redirect to Payment Page
        history.push("/payment", { plan: selectedPlan });
    };

    return (
        <div className="subscription-page">
            <h2>Choose Your Subscription</h2>
            <div className="subscription-options">
                <div
                    className={`subscription-tile ${selectedPlan === "monthly" ? "selected" : ""}`}
                    onClick={() => handleSelectPlan("monthly")}
                >
                    <h3>Monthly Subscription</h3>
                    <p>$1.99 / month</p>
                </div>
                <div
                    className={`subscription-tile ${selectedPlan === "yearly" ? "selected" : ""}`}
                    onClick={() => handleSelectPlan("yearly")}
                >
                    <h3>Yearly Subscription</h3>
                    <p>$19.99 / year</p>
                </div>
            </div>
            <button className="pay-button" onClick={handlePay}>
                Pay
            </button>
        </div>
    );
};

export default SubscriptionPage;
    