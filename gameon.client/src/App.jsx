import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostgamePage from "./pages/PostgamePage";
import FindGamePage from "./pages/FindGamePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PaymentPage from "./pages/PaymentPage";
import Navbar from "./components/Navbar";


function App() {
    return (
        <Router>
            <AppWithNavbar />
        </Router>
    );
}

function AppWithNavbar() {
    const location = useLocation();

    // List of routes where the Navbar should be shown
    const showNavbarRoutes = ['/home', '/postgame','/findgame'];

    return (
        <div>
            {/* Render Navbar only for specific routes */}
            {showNavbarRoutes.includes(location.pathname) && <Navbar />}

            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/Postgame" element={<PostgamePage />} />
                <Route path="/findgame" element={<FindGamePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/payment" element={<PaymentPage />} />
            </Routes>
        </div>
    );
}




export default App;
