import React, { useState } from "react";
import Cookies from "js-cookie"; // Import js-cookie library



const PostForm = ({ onCancel, initialData }) => {
    const [SportName, setSportName] = useState(initialData?.SportName || "");
    const [Datee, setDate] = useState(initialData?.Datee || "");
    const [FromTime, setFromTime] = useState(initialData?.FromTime || "");
    const [TillTime, setTillTime] = useState(initialData?.TillTime || "");
    const [address, setAddress] = useState(initialData?.address || "");
    const [Description, setDescription] = useState(
        initialData?.Description || ""
    );
    const [Location, setLocation] = useState(initialData?.Location || ""); // New field

    const formatTime = (timeString, Date1) => {
        // Create a Date object with the user-entered time
        const date = new Date(`1970-01-01T${timeString}:00`);
        console.log(Date1);
        // Split the date string into year, month, and day parts
        const [year1, month1, day1] = Date1.split("-");

        // Get year, month, day, hours, minutes, seconds, and milliseconds
        const year = year1;
        const month = String(month1).padStart(2, '0'); // Pad month with leading zero
        const day = String(day1).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

        // Build the formatted string
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation for time and date
        const currentDate = new Date().toISOString().split("T")[0];
        if (Datee < currentDate) {
            alert("The date cannot be in the past.");
            return;
        }
        if (TillTime <= FromTime) {
            alert("The 'To Time' should be greater than 'From Time'.");
            return;
        }

        const UserID = Cookies.get("UserID");
        console.log("User ID " + UserID + " is logged in!");

        const formattedFromTime = formatTime(FromTime,Datee);
        const formattedTillTime = formatTime(TillTime,Datee);
        
        const postData = {
            SportName,
            Date1: Datee,
            FromTime: formattedFromTime,
            TillTime: formattedTillTime,
            Description,
            Location,
            UserID,
        };

        try {
            const response = await fetch("https://localhost:7052/api/Posts/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.error}`);
            }

            const responseData = await response.json();
            console.log("Post saved successfully:", responseData);

            // Optional: Notify parent component or redirect
            alert("Post saved successfully!");
        } catch (error) {
            console.error("Error saving post:", error);
            alert("Failed to save post. Please try again later.");
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <h3>{initialData ? "Edit Post" : "Create New Post"}</h3>

            <label>Sport Name</label>
            <select
                value={SportName}
                onChange={(e) => setSportName(e.target.value)}
                required
            >
                <option value="" disabled>
                    Select Sport
                </option>
                <option value="Cricket">Cricket</option>
                <option value="Soccer">Soccer</option>
                <option value="Basketball">Basketball</option>
                <option value="Tennis">Tennis</option>
                <option value="Golf">Golf</option>
                <option value="Baseball">Baseball</option>
                <option value="Pickleball">Pickleball</option>
                <option value="Badminton">Badminton</option>
            </select>

            <label>Date</label>
            <input
                type="date"
                value={Datee}
                onChange={(e) => setDate(e.target.value)}
                required
            />

            <label>From Time</label>
            <input
                type="time"
                value={FromTime}
                onChange={(e) => setFromTime(e.target.value)}
                required
            />

            <label>To Time</label>
            <input
                type="time"
                value={TillTime}
                onChange={(e) => setTillTime(e.target.value)}
                required
            />

            <label>Location</label>
            <select
                value={Location}
                onChange={(e) => setLocation(e.target.value)}
                required
            >
                <option value="" disabled>
                    Select Location
                </option>
                <option value="Halifax">Halifax</option>
                <option value="Dartmouth">Dartmouth</option>
                <option value="Clayton Park">Clayton Park</option>
                <option value="Bayer's Lake">Bayer's Lake</option>
                <option value="Spryfield">Spryfield</option>
                <option value="Bedford">Bedford</option>
            </select>

            <label>Address</label>
            <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter address"
                required
            />

            <label>Description</label>
            <textarea
                value={Description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                required
            />

            <button type="submit">{initialData ? "Update Post" : "Post"}</button>
            <button type="button" className="cancel-button" onClick={onCancel}>
                Cancel
            </button>
        </form>
    );
};

export default PostForm;
