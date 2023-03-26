import React, { useState } from "react";
import "./App.css";
import Footer from "./Footer";

function App() {
  const [showInput, setShowInput] = useState("");
  const [recommendedShows, setRecommendedShows] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://tvrecmodel.azurewebsites.net/recommend",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ shows: [showInput] }),
        }
      );
      const data = await res.json();
      setRecommendedShows(data.recommended_shows);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <header>
        <h1>TelevisionAIry</h1>
      </header>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <label className="input-label">Enter your favorite show:</label>
          <input
            type="text"
            value={showInput}
            onChange={(e) => setShowInput(e.target.value)}
          />
          <button type="submit">Get Recommendations</button>
        </form>
        {recommendedShows.length > 0 && (
          <div className="recommended-shows">
            <h2>Recommended Shows:</h2>
            <ul>
              {recommendedShows.map((show) => (
                <li key={show}>{show}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;
