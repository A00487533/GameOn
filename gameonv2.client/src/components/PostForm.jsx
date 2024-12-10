import React, { useState } from "react";

const PostForm = ({ onSubmit, onCancel, initialData }) => {
    const [sportName, setSportName] = useState(initialData?.sportName || "");
    const [date, setDate] = useState(initialData?.date || "");
    const [fromTime, setFromTime] = useState(initialData?.fromTime || "");
    const [toTime, setToTime] = useState(initialData?.toTime || "");
    const [address, setAddress] = useState(initialData?.address || "");
    const [description, setDescription] = useState(
        initialData?.description || ""
    );
    const [location, setLocation] = useState(initialData?.location || ""); // New field

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation for time and date
        const currentDate = new Date().toISOString().split("T")[0];
        if (date < currentDate) {
            alert("The date cannot be in the past.");
            return;
        }
        if (toTime <= fromTime) {
            alert("The 'To Time' should be greater than 'From Time'.");
            return;
        }

        onSubmit({
            sportName,
            date,
            fromTime,
            toTime,
            address,
            description,
            location,
        });
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <h3>{initialData ? "Edit Post" : "Create New Post"}</h3>

            <label>Sport Name</label>
            <select
                value={sportName}
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
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            />

            <label>From Time</label>
            <input
                type="time"
                value={fromTime}
                onChange={(e) => setFromTime(e.target.value)}
                required
            />

            <label>To Time</label>
            <input
                type="time"
                value={toTime}
                onChange={(e) => setToTime(e.target.value)}
                required
            />

            <label>Location</label>
            <select
                value={location}
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
                value={description}
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
