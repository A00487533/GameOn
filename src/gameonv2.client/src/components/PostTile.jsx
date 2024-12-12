import React, { useState } from "react";

const sportImages = {
    Basketball: "/Images/Basketball.jpg",
    Soccer: "/Images/Soccer.jpg",
    Tennis: "/Images/Tennis.jpg",
    Badminton: "/Images/Badminton.jpg",
    Cricket: "/Images/Cricket.jpg",
    Pickleball: "/Images/Pickleball.jpg",
    Baseball: "/Images/Baseball.jpg",
    Golf: "/Images/Golf.jpg",
};

const PostTile = ({ post, onEdit, onDelete }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const handleMenuToggle = () => {
        setShowMenu(!showMenu);
    };

    const handleDelete = () => {
        onDelete(post.id);
        setShowDeleteConfirmation(false);
    };

    // Function to subtract 4 hours from a given date string
    const adjustTime = (timeString) => {
        const date = new Date(timeString);
        date.setHours(date.getHours() - 4); // Subtract 4 hours
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // Function to format the date properly
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div
            style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "1rem",
                width: "300px",
                position: "relative",
            }}
        >
            {/* Display Sport Image */}
            <img
                src={sportImages[post.sportName]}
                alt={post.sportName}
                style={{
                    width: "100%",
                    height: "150px",
                    borderRadius: "8px",
                    objectFit: "cover",
                }}
            />

            {/* Three dots menu */}
            <button
                onClick={handleMenuToggle}
                style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "20px",
                }}
            >
                ...
            </button>

            {showMenu && (
                <div
                    style={{
                        position: "absolute",
                        top: "40px",
                        right: "10px",
                        background: "white",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        zIndex: 10,
                    }}
                >
                    <button onClick={onEdit}>Edit</button>
                    <button onClick={() => setShowDeleteConfirmation(true)}>
                        Delete
                    </button>
                </div>
            )}

            {/* Delete confirmation dialog */}
            {showDeleteConfirmation && (
                <div
                    style={{
                        position: "absolute",
                        top: "40px",
                        right: "10px",
                        background: "white",
                        border: "1px solid red",
                        padding: "1rem",
                        borderRadius: "5px",
                        zIndex: 20,
                    }}
                >
                    <p>Are you sure you want to delete?</p>
                    <button onClick={handleDelete} style={{ color: "red" }}>
                        Delete
                    </button>
                    <button onClick={() => setShowDeleteConfirmation(false)}>
                        Cancel
                    </button>
                </div>
            )}

            {/* Post content */}
            <h3>{post.sportName}</h3>
            <p>
                <strong>Date:</strong> {formatDate(post.date1)}
            </p>
            <p>
                <strong>Time:</strong> {adjustTime(post.fromTime)} - {adjustTime(post.tillTime)}
            </p>
            <p>
                <strong>Location:</strong> {post.location}
            </p>
            <p>
                <strong>Description:</strong> {post.description}
            </p>
        </div>
    );
};

export default PostTile;
