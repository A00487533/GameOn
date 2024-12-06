import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login"; // Import the Login component
import Register from "./components/Register"; // Import the Register component
//import Home from "./components/Home"; // Example Home component, if applicable
import Payment from "./components/Payment";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} /> {/* Login page route */}
        <Route path="/register" element={<Register />} />{" "} 
        <Route path="/payment" element={<Payment />} />; 
        {/* Register page route */}
      </Routes>
    </Router>
  );
};

export default App;
