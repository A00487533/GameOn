import React, { useState, useEffect } from "react";
import "../styles/FindGame.css";

const FindGame = () => {
    const [sport, setSport] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [posts, setPosts] = useState([]);
    const [originalPosts, setOriginalPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch("https://localhost:7052/api/Posts");
                const data = await response.json();
                setPosts(data);
                setOriginalPosts(data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, []);

    const applyFilter = () => {
        const filtered = originalPosts.filter((post) => {
            return (
                (sport === "" || post.sportName === sport) &&
                (date === "" || new Date(post.date1).toISOString().split('T')[0] === date) &&
                (location === "" || post.location === location)
            );
        });
        setPosts(filtered);
    };

    const clearFilter = () => {
        setSport("");
        setDate("");
        setLocation("");
        setPosts(originalPosts);
    };

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const formatTime = (timeString) => {
        return new Date(timeString).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
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
                {posts.length > 0 ? (
                    posts.map((post, index) => (
                        <div key={index} className="post-tile">
                            <h3>{post.sportName}</h3>
                            <p>
                                <strong>Date:</strong> {formatDate(post.date1)}
                            </p>
                            <p>
                                <strong>Time:</strong> {formatTime(post.fromTime)} - {formatTime(post.tillTime)}
                            </p>
                            <p>
                                <strong>Location:</strong> {post.location}
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
