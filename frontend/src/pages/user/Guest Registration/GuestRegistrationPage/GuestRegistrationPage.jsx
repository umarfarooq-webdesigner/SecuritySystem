// GuestRegistrationPage.jsx
import React, { useState, useEffect } from "react";
import GuestRegistrationForm from "../../../../components/GuestRegistrationForm/GuestRegistrationForm";
import { FaSearch, FaIdCard, FaEnvelope, FaPhone, FaUserClock, FaPrint } from "react-icons/fa";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import "./GuestRegistrationPage.css";
import RefreshButton from "../../../../components/RefreshButton/RefreshButton";

const GuestRegistrationPage = () => {
  const [searchCnic, setSearchCnic] = useState("");
  const [guestData, setGuestData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [latestToken, setLatestToken] = useState("0000");

  const fetchLatestToken = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/guests/logs/latest-token");
      const data = await res.json();
      if (res.ok && data.token) {
        setLatestToken(data.token);
      }
    } catch (err) {
      console.error("Failed to fetch latest token", err);
    }
  };

  useEffect(() => {
    fetchLatestToken();
  }, []);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5001/api/guests/${searchCnic}`);
      const data = await response.json();
      if (response.ok) {
        setGuestData(data);
        setError("");
      } else {
        setGuestData(null);
        setError(data.error);
      }
    } catch (err) {
      setError("Server error: " + err.message);
      setGuestData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const generateNextToken = (tokenStr) => {
    const num = parseInt(tokenStr || "0000", 10);
    const nextNum = num + 1;
    return nextNum.toString().padStart(4, "0");
  };

  const handlePrintAndSave = async () => {
    if (!guestData) return;

    const nextToken = generateNextToken(latestToken);

    // Generate PDF
    const doc = new jsPDF();
    doc.text(`Guest Token: ${nextToken}`, 10, 10);
    doc.text(`Name: ${guestData.name}`, 10, 20);
    doc.text(`CNIC: ${guestData.cnic}`, 10, 30);
    doc.text(`Email: ${guestData.email}`, 10, 40);
    doc.text(`Phone: ${guestData.phone}`, 10, 50);
    doc.text(`Registered At: ${new Date(guestData.timestamp).toLocaleString()}`, 10, 60);
    doc.save(`${guestData.name}_info.pdf`);

    // Save to logs
    const logData = {
      name: guestData.name,
      cnic: guestData.cnic,
      email: guestData.email,
      phone: guestData.phone,
      idType: guestData.idType,
      guestId: guestData.guestId,
      token: nextToken,
      timestamp: new Date(),
    };

    try {
      const response = await fetch("http://localhost:5001/api/guests/logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logData),
      });
      const result = await response.json();
      if (response.ok) {
        setLatestToken(nextToken);
        alert("Guest data printed and saved with token " + nextToken);
      } else {
        alert(result.error);
      }
    } catch (err) {
      alert("Error saving to logs: " + err.message);
    }
  };

  return (
    <div className="guest-page-container">
      <div className="search-bar-section">
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="search-bar-wrapper"
        >
          <FaSearch className="search-icon" />
          <input
            type="text"
            value={searchCnic}
            onChange={(e) => setSearchCnic(e.target.value)}
            placeholder="Enter CNIC to search"
            className="search-input"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSearch}
            className="search-button"
          >
            <FaSearch /> Search
          </motion.button>
        </motion.div>
      </div>

      {guestData && (
        <motion.div
          className="guest-info-card"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="token-label">Token - {generateNextToken(latestToken)}</h3>
          <p><FaUserClock /> <strong>Name:</strong> {guestData.name}</p>
          <p><FaIdCard /> <strong>{guestData.idType.toUpperCase()}:</strong> {guestData.cnic}</p>
          <p><FaEnvelope /> <strong>Email:</strong> {guestData.email}</p>
          <p><FaPhone /> <strong>Phone:</strong> {guestData.phone}</p>
          <p><strong>Registered At:</strong> {new Date(guestData.timestamp).toLocaleString()}</p>

          <div className="button-group">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrintAndSave}
              className="print-button"
            >
              <FaPrint /> Print & Save
            </motion.button>
          </div>
        </motion.div>
      )}

      {error && (
        <motion.p className="error-message" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          ❌ {error}
        </motion.p>
      )}

      <GuestRegistrationForm />
      <RefreshButton />
    </div>
  );
};

export default GuestRegistrationPage;
