import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav style={styles.navbar}>
            <Link to="/home" style={styles.navItem}>
                Home
            </Link>
            <Link to="/postgame" style={styles.navItem}>
                Postgame
            </Link>
            <Link to="/findgame" style={styles.navItem}>
                FindGame
            </Link>
        </nav>
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
        zIndex: 1000,
    },
    navItem: {
        color: "#fff",
        textDecoration: "none",
        padding: "10px",
        fontSize: "16px",
    },
};

export default Navbar;
