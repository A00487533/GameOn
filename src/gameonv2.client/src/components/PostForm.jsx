import React, { useState } from "react";
import Cookies from "js-cookie"; // Import js-cookie library
import "../styles/postform.css";



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

    const formatTime = (timeString, dateString) => {
        const [hours, minutes] = timeString.split(':');
        const dateTime = new Date(`${dateString}T${timeString}`);

        // Ensure the time is in the correct format for the backend
        const formattedDate = dateTime.toISOString(); // This converts to 'YYYY-MM-DDTHH:mm:ss.sssZ'
        const formattedTime = formattedDate.slice(0, 19); // Remove the milliseconds and timezone part

        return formattedTime; // Returns time in 'YYYY-MM-DDTHH:mm:ss'
    };


    const [isSubmitting, setIsSubmitting] = useState(false);



    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

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

        const formattedFromTime = formatTime(FromTime, Datee);
        const formattedTillTime = formatTime(TillTime, Datee);

        const postData = {
            Description,
            Location,
            FromTime: formattedFromTime,
            TillTime: formattedTillTime,
            Date1: Datee,
            SportName,
            UserID,
        };

        try {
            const response = await fetch("https://localhost:7052/api/Posts/create/post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! Status: ${response.status} - ${errorText}`);
            }

            const responseData = await response.json();
            console.log("Post saved successfully:", responseData);

            alert("Post saved successfully!");
        } catch (error) {
            console.error("Error saving post:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            {<h3>{initialData ? "Edit Post" : "Create New Post"}</h3>}

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

            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : initialData ? "Update Post" : "Post"}
            </button>
            <button type="button" className="cancel-button" onClick={onCancel}>
                Cancel
            </button>
        </form>

        
    );
};

export default PostForm;
