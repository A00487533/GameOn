import React, { useState } from "react";

const Payment = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    province: "",
    country: "Canada",
    postalCode: "",
    countryCode: "+1",
    phoneNumber: "",
    email: "",
    creditCardType: "",
    creditCardNumber: "",
    expirationDate: "",
    cardHolderName: "",
  });

  const [errors, setErrors] = useState({});
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear the error for the current field
    if (errors[name]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const charBlacklist = /[;:!@#$%^*+?\\/<>1234567890]/;
    const canadianPostalCode = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    const usZipCode = /^\d{5}(-\d{4})?$/;
    const phoneNumberPattern = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/; // Valid 10-digit number
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const creditCardPattern = /^\d+$/;
    const expirationDatePattern =
      /^(0[1-9]|1[0-2])\/(201[6-9]|202[0-9]|2030|2031)$/;

    // Required fields
    Object.keys(formData).forEach((field) => {
      if (!formData[field] && field !== "countryCode") {
        newErrors[field] = "This field is required.";
      }
    });

    // Character blacklist validation
    ["firstName", "lastName", "city", "province", "cardHolderName"].forEach(
      (field) => {
        if (formData[field] && charBlacklist.test(formData[field])) {
          newErrors[field] = "Invalid characters are not allowed.";
        }
      }
    );

    // Country-specific validations
    if (
      formData.country === "Canada" &&
      !canadianPostalCode.test(formData.postalCode)
    ) {
      newErrors.postalCode = "Invalid Canadian postal code.";
    }

    if (formData.country === "US" && !usZipCode.test(formData.postalCode)) {
      newErrors.postalCode = "Invalid US zip code.";
    }

    if (
      formData.phoneNumber &&
      !phoneNumberPattern.test(formData.phoneNumber)
    ) {
      newErrors.phoneNumber = "Invalid phone number. Must be 10 digits.";
    }

    // Validate country code
    if (formData.countryCode !== "+1") {
      newErrors.phoneNumber = "Invalid country code.";
    }

    // Email validation
    if (formData.email && !emailPattern.test(formData.email)) {
      newErrors.email = "Invalid email address.";
    }

    // Credit card type and number validation
    if (!formData.creditCardType) {
      newErrors.creditCardType = "Credit card type is required.";
    }

    if (
      formData.creditCardNumber &&
      !creditCardPattern.test(formData.creditCardNumber)
    ) {
      newErrors.creditCardNumber =
        "Credit card number must contain only digits.";
    } else {
      const cardNumber = formData.creditCardNumber;
      if (
        formData.creditCardType === "MasterCard" &&
        !/^5[1-5]/.test(cardNumber)
      ) {
        newErrors.creditCardNumber = "Invalid MasterCard number.";
      } else if (formData.creditCardType === "Visa" && !/^4/.test(cardNumber)) {
        newErrors.creditCardNumber = "Invalid Visa card number.";
      } else if (
        formData.creditCardType === "American Express" &&
        !/^3[47]/.test(cardNumber)
      ) {
        newErrors.creditCardNumber = "Invalid American Express card number.";
      }
    }

    // Expiration date validation
    if (
      formData.expirationDate &&
      !expirationDatePattern.test(formData.expirationDate)
    ) {
      newErrors.expirationDate =
        "Expiration date must be in MM/YYYY format and valid.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmissionSuccess(true);
      setTimeout(() => setSubmissionSuccess(false), 3000);
    }
  };

  return (
    <div style={{ margin: "20px auto", maxWidth: "500px" }}>
      <h2>Payment Page</h2>
      {submissionSuccess && (
        <div style={{ color: "green", marginBottom: "10px" }}>
          Payment submitted successfully!
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
          {errors.firstName && (
            <p style={{ color: "red" }}>{errors.firstName}</p>
          )}
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
          {errors.lastName && <p style={{ color: "red" }}>{errors.lastName}</p>}
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
          {errors.address && <p style={{ color: "red" }}>{errors.address}</p>}
        </div>
        <div>
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          />
          {errors.city && <p style={{ color: "red" }}>{errors.city}</p>}
        </div>
        <div>
          <label>Province:</label>
          <input
            type="text"
            name="province"
            value={formData.province}
            onChange={handleInputChange}
          />
          {errors.province && <p style={{ color: "red" }}>{errors.province}</p>}
        </div>
        <div>
          <label>Postal Code:</label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleInputChange}
          />
          {errors.postalCode && (
            <p style={{ color: "red" }}>{errors.postalCode}</p>
          )}
        </div>
        <div>
          <label>Country:</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleInputChange}
          >
            <option value="Canada">Canada</option>
            <option value="US">US</option>
          </select>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>
            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={handleInputChange}
            >
              <option value="+1">+1</option>
              <option value="+44">+44</option>
              <option value="+91">+91</option>
              <option value="+61">+61</option>
            </select>
          </div>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
          {errors.phoneNumber && (
            <p style={{ color: "red" }}>{errors.phoneNumber}</p>
          )}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>
        <div>
          <label>Credit Card Type:</label>
          <select
            name="creditCardType"
            value={formData.creditCardType}
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            <option value="Visa">Visa</option>
            <option value="MasterCard">MasterCard</option>
            <option value="American Express">American Express</option>
          </select>
          {errors.creditCardType && (
            <p style={{ color: "red" }}>{errors.creditCardType}</p>
          )}
        </div>
        <div>
          <label>Credit Card Number:</label>
          <input
            type="text"
            name="creditCardNumber"
            value={formData.creditCardNumber}
            onChange={handleInputChange}
          />
          {errors.creditCardNumber && (
            <p style={{ color: "red" }}>{errors.creditCardNumber}</p>
          )}
        </div>
        <div>
          <label>Expiration Date:</label>
          <input
            type="text"
            name="expirationDate"
            placeholder="MM/YYYY"
            value={formData.expirationDate}
            onChange={handleInputChange}
          />
          {errors.expirationDate && (
            <p style={{ color: "red" }}>{errors.expirationDate}</p>
          )}
        </div>
        <div>
          <label>Card Holder Name:</label>
          <input
            type="text"
            name="cardHolderName"
            value={formData.cardHolderName}
            onChange={handleInputChange}
          />
          {errors.cardHolderName && (
            <p style={{ color: "red" }}>{errors.cardHolderName}</p>
          )}
        </div>
        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
};

export default Payment;
