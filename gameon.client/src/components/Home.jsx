import React, { useState } from "react";

const HomePage = () => {
    const [selectedEvent, setSelectedEvent] = useState(null);

    const events = [
        {
            id: 1,
            title: "Basketball Championship",
            image: "https://via.placeholder.com/150",
            shortDescription: "Join us for an exciting basketball championship!",
            fullDescription:
                "The championship will feature the best teams competing for the title. Don't miss the action-packed games!",
            registrationLink: "https://example.com/basketball-register",
        },
        {
            id: 2,
            title: "Soccer Tournament",
            image: "https://via.placeholder.com/150",
            shortDescription: "Experience the thrill of the soccer tournament!",
            fullDescription:
                "Watch top players battle it out in this highly competitive soccer event.",
            registrationLink: "https://example.com/soccer-register",
        },
        {
            id: 3,
            title: "Tennis Open",
            image: "https://via.placeholder.com/150",
            shortDescription: "Catch the excitement at the Tennis Open!",
            fullDescription:
                "This open event welcomes players of all levels. Spectators are guaranteed an amazing experience.",
            registrationLink: "https://example.com/tennis-register",
        },
    ];

    const handleEventClick = (event) => {
        setSelectedEvent(event);
    };

    const handleClose = () => {
        setSelectedEvent(null);
    };

    return (
        <div>
            {/* Navbar */}
            <nav style={styles.navbar}>
                <a href="#home" style={styles.navItem}>
                    Home
                </a>
                <a href="#postgame" style={styles.navItem}>
                    Postgame
                </a>
                <a href="#findgame" style={styles.navItem}>
                    FindGame
                </a>
            </nav>

            <div style={styles.container}>
                <h1>Welcome to the Sports Events Page</h1>

                <div style={styles.eventsContainer}>
                    {events.map((event) => (
                        <div
                            key={event.id}
                            style={styles.eventBox}
                            onClick={() => handleEventClick(event)}
                        >
                            <img
                                src={event.image}
                                alt={event.title}
                                style={styles.eventImage}
                            />
                            <h3>{event.title}</h3>
                            <p>{event.shortDescription}</p>
                        </div>
                    ))}
                </div>

                {/* Event Details Popup */}
                {selectedEvent && (
                    <div style={styles.popup}>
                        <div style={styles.popupContent}>
                            <button onClick={handleClose} style={styles.closeButton}>
                                Close
                            </button>
                            <h2>{selectedEvent.title}</h2>
                            <img
                                src={selectedEvent.image}
                                alt={selectedEvent.title}
                                style={styles.popupImage}
                            />
                            <p>{selectedEvent.fullDescription}</p>
                            <a
                                href={selectedEvent.registrationLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={styles.registerButton}
                            >
                                Register
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    navbar: {
        display: "flex",
        justifyContent: "space-around",
        padding: "10px 0",
        background: "#333",
        color: "#fff",
        position: "sticky",
        top: 0,
    },
    navItem: {
        color: "#fff",
        textDecoration: "none",
        padding: "10px",
    },
    container: {
        padding: "20px",
        textAlign: "center",
    },
    eventsContainer: {
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    eventBox: {
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "10px",
        width: "250px",
        textAlign: "center",
        cursor: "pointer",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s",
    },
    eventBoxHover: {
        transform: "scale(1.05)",
    },
    eventImage: {
        width: "100%",
        height: "150px",
        objectFit: "cover",
        borderRadius: "10px",
    },
    popup: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    popupContent: {
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        maxWidth: "500px",
        width: "90%",
        textAlign: "center",
    },
    closeButton: {
        background: "red",
        color: "#fff",
        border: "none",
        padding: "10px",
        cursor: "pointer",
        marginBottom: "10px",
        borderRadius: "5px",
    },
    popupImage: {
        width: "100%",
        height: "200px",
        objectFit: "cover",
        borderRadius: "10px",
        margin: "10px 0",
    },
    registerButton: {
        display: "inline-block",
        padding: "10px 20px",
        background: "blue",
        color: "#fff",
        textDecoration: "none",
        borderRadius: "5px",
        marginTop: "10px",
    },
};

export default HomePage;
