import React, { useState } from "react";

const HomePage = () => {
    const [selectedEvent, setSelectedEvent] = useState(null);

    const events = [
        {
            id: 1,
            title: "Basketball Championship",
            image: "/Images/BBT.jpg",
            shortDescription: "Join us for an exciting basketball championship!",
            fullDescription:
                "Experience the thrill of competitive Basketball Championship. With top-notch teams, exciting matches, and a festive atmosphere, this is an event you won't want to miss. Register your team today and be part of the action. Limited spots available!",
            registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLSdfQ7pe2oD1kdyqYordRFfpFKe7jd6VdsntSv7BFqfm1UN7Hg/viewform?usp=header",
        },
        {
            id: 2,
            title: "Soccer Tournament",
            image: "/Images/Soccer_tournament.jpg",
            shortDescription: "Experience the thrill of the soccer tournament!",
            fullDescription:
                "Experience the thrill of competitive soccer at our annual tournament. With top-notch teams, exciting matches, and a festive atmosphere, this is an event you won't want to miss. Register your team today and be part of the action. Limited spots available!",
            registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLSdfQ7pe2oD1kdyqYordRFfpFKe7jd6VdsntSv7BFqfm1UN7Hg/viewform?usp=header",
        },
        {
            id: 3,
            title: "Tennis Open",
            image: "/Images/Tennis_Open.jpg",
            shortDescription: "Catch the excitement at the Tennis Open!",
            fullDescription:
                "This open event welcomes players of all levels. Spectators are guaranteed an amazing experience.",
            registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLSdfQ7pe2oD1kdyqYordRFfpFKe7jd6VdsntSv7BFqfm1UN7Hg/viewform?usp=header",
        },
        {
            id: 4,
            title: "Cricket Tournament",
            image: "/Images/CT.jpg",
            shortDescription: "Catch the excitement at the Tennis Open!",
            fullDescription:
                "Experience the thrill of competitive soccer at our annual tournament. With top-notch teams, exciting matches, and a festive atmosphere, this is an event you won't want to miss. Register your team today and be part of the action. Limited spots available!",
            registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLSdfQ7pe2oD1kdyqYordRFfpFKe7jd6VdsntSv7BFqfm1UN7Hg/viewform?usp=header",
        },
        {
            id: 5,
            title: "Badminton Championship",
            image: "/Images/BT.jpg",
            shortDescription: "Experience the thrill of the soccer tournament!",
            fullDescription:
                "Experience the thrill of competitive soccer at our annual tournament. With top-notch teams, exciting matches, and a festive atmosphere, this is an event you won't want to miss. Register your team today and be part of the action. Limited spots available!",
            registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLSdfQ7pe2oD1kdyqYordRFfpFKe7jd6VdsntSv7BFqfm1UN7Hg/viewform?usp=header",
        },
        {
            id: 6,
            title: "Virtual Cricket Tournament",
            image: "/Images/VCT.jpg",
            shortDescription: "Experience the thrill of the soccer tournament!",
            fullDescription:
                "Experience the thrill of competitive soccer at our annual tournament. With top-notch teams, exciting matches, and a festive atmosphere, this is an event you won't want to miss. Register your team today and be part of the action. Limited spots available!",
            registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLSdfQ7pe2oD1kdyqYordRFfpFKe7jd6VdsntSv7BFqfm1UN7Hg/viewform?usp=header",
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
        height: "250px",
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
