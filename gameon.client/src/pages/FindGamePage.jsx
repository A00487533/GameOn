import React, { useState } from "react";
import "../styles/FindGame.css";

const FindGame = () => {
    const [sport, setSport] = useState("");
    const [date, setDate] = useState("");
    const [fromTime, setFromTime] = useState("");
    const [location, setLocation] = useState("");

    const [filteredPosts, setFilteredPosts] = useState([]);

    const dummyPosts = [
        {
            sportName: "Cricket",
            date: "2024-12-15",
            fromTime: "10:00",
            toTime: "12:00",
            location: "Halifax",
            address: "123 Main Street",
            description: "Friendly cricket match at the park.",
        },
        {
            sportName: "Basketball",
            date: "2024-12-16",
            fromTime: "14:00",
            toTime: "16:00",
            location: "Dartmouth",
            address: "456 Basketball Court",
            description: "Join us for a competitive game of basketball.",
        },
        {
            sportName: "Tennis",
            date: "2024-12-17",
            fromTime: "09:00",
            toTime: "11:00",
            location: "Clayton Park",
            address: "789 Tennis Arena",
            description: "Tennis practice for beginners and intermediates.",
        },
    ];

    const applyFilter = () => {
        const filtered = dummyPosts.filter((post) => {
            return (
                (sport === "" || post.sportName === sport) &&
                (date === "" || post.date === date) &&
                (fromTime === "" || post.fromTime >= fromTime) &&
                (location === "" || post.location === location)
            );
        });
        setFilteredPosts(filtered);
    };

    const clearFilter = () => {
        setSport("");
        setDate("");
        setFromTime("");
        setLocation("");
        setFilteredPosts(dummyPosts);
    };

    return (
        <div className="find-game-container">
            <h2>Find a Game</h2>
            <div className="filter-container">
                <select value={sport} onChange={(e) => setSport(e.target.value)}>
                    <option value="">Select Sport</option>
                    <option value="Cricket">Cricket</option>
                    <option value="Basketball">Basketball</option>
                    <option value="Tennis">Tennis</option>
                </select>

                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="Select Date"
                />

                <input
                    type="time"
                    value={fromTime}
                    onChange={(e) => setFromTime(e.target.value)}
                    placeholder="From Time"
                />

                <select value={location} onChange={(e) => setLocation(e.target.value)}>
                    <option value="">Select Location</option>
                    <option value="Halifax">Halifax</option>
                    <option value="Dartmouth">Dartmouth</option>
                    <option value="Clayton Park">Clayton Park</option>
                </select>

                <button onClick={applyFilter}>Apply Filter</button>
                <button onClick={clearFilter} className="clear-filter-button">
                    Clear Filter
                </button>
            </div>

            <div className="post-results">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post, index) => (
                        <div key={index} className="post-tile">
                            <h3>{post.sportName}</h3>
                            <p>
                                <strong>Date:</strong> {post.date}
                            </p>
                            <p>
                                <strong>Time:</strong> {post.fromTime} - {post.toTime}
                            </p>
                            <p>
                                <strong>Location:</strong> {post.location}
                            </p>
                            <p>
                                <strong>Address:</strong> {post.address}
                            </p>
                            <p>
                                <strong>Description:</strong> {post.description}
                            </p>
                        </div>
                    ))
                ) : (
                    <p>No games found. Use the filters to search for games.</p>
                )}
            </div>
        </div>
    );
};

export default FindGame;
