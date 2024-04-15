import React, { useState } from "react";
import Dashboard from "./Dashboard";
import LoadingSpinner from "./LoadingSpinner";
import tink from "../assets/tink.gif";

const containerStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "centre",
  alignItems: "center",
  height: "100vh",
  width: "100%",
  flexWrap: "wrap",
};

const buttonContainerStyle = {
  fontSize: "20px",
};

const logoContainerStyle = {};

const taskBoxStyle = {
  minWidth: "500px",
  padding: "30px",
  backgroundColor: "rgb(240, 240, 240)",
  borderRadius: "10px",
  minHeight: "400px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  border: "12px solid gray",
};

const buttonStyle = {
  backgroundColor: "#46703b",
  color: "#fff",
  border: "none",
  padding: "25px 25px",
  borderRadius: "25px",
  cursor: "pointer",
  width: "100%",
  fontSize: "25px",
};
const button = {
  backgroundColor: "#46703b",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  padding: "15px 20px",
  cursor: "pointer",
  marginTop: "20px",
};
const container = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "centre",
  alignItems: "centre",
  width: "100vw",
  height: "auto",
};

const HomePage = () => {
  const [showTaskBox, setShowTaskBox] = useState(false);
  const [task, setTask] = useState("");
  const [responseData, setResponseData] = useState({});
  const [loading, setLoading] = useState(false);
  const [contain, setContain] = useState(true);
  const [showdashboard, setDashboard] = useState(false);

  const handleButtonClick = () => {
    setShowTaskBox(true);
  };
  const handleInputChange = (event) => {
    setTask(event.target.value);
  };
  function getCSRFToken() {
    const cookieValue = document.cookie.match(/csrftoken=([^ ;]+)/);
    return cookieValue ? cookieValue[1] : null;
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (task === "") {
      alert("Fill something");
    }

    try {
      setContain(false);
      setLoading(true);
      // Making a POST request using fetch
      const response = await fetch("/api/outcome/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCSRFToken(),
        },
        body: JSON.stringify({ body: task }), // Sending data as JSON
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Parsing the response JSON data
      const responseD = await response.json();
      setResponseData(responseD);
      sessionStorage.setItem("responseData", JSON.stringify(responseD));
      setLoading(false);
      setDashboard(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={container}>
      {!showdashboard && contain && (
        <div
          style={{
            ...containerStyle,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={logoContainerStyle}>
            <img
              src={tink}
              alt="Robot Logo"
              width="auto"
              height="auto"
              style={{ maxWidth: "500px" }}
            />
          </div>
          <div style={buttonContainerStyle}>
            {!showTaskBox && (
              <button onClick={handleButtonClick} style={buttonStyle}>
                Spark your Self-Reflection Journey
              </button>
            )}
          </div>
          {showTaskBox && !showdashboard && (
            <div style={taskBoxStyle}>
              <h2>Hi Gorgeous, How was your day?</h2>
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  alignItems: "center",
                  // height: "3rem",
                  margin: "1rem",
                }}
              >
                <textarea
                  placeholder="How's your day..."
                  value={task}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    resize: "vertical",
                    minHeight: "300px", // Allow vertical resizing
                  }}
                />
                <button style={button}>Let's Connect</button>
              </form>
            </div>
          )}
        </div>
      )}
      {loading && !showdashboard && !contain ? (
        <LoadingSpinner />
      ) : (
        !loading && showdashboard && <Dashboard />
      )}
    </div>
  );
};

export default HomePage;
