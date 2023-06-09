import React, { useState } from "react";
import "./App.css";
import Footer from "./Footer";

function App() {
  const [showInput, setShowInput] = useState("");
  const [recommendedShows, setRecommendedShows] = useState([]);
  const [loading, setLoading] = useState(false);

  function titleCase(str) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formattedShowInput = titleCase(showInput.trim());
      const res = await fetch(
        "https://tvrecmodel.azurewebsites.net/recommend",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ shows: [formattedShowInput] }),
        }
      );
      const data = await res.json();
      setRecommendedShows(data.recommended_shows);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header>
        <h1 className="title">
          Television<span className="accentuate-ai">AI</span>ry
        </h1>
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
        {loading && <div className="loader"></div>}
        {recommendedShows.length > 0 && (
          <div className="recommended-shows">
            <h2>Recommended Shows:</h2>
            <ul>
              {recommendedShows.map((show) => (
                <li key={show.title}>
                  <div className="show-title">{show.title}</div>
                  <div className="show-platforms">
                    Available on: {show.available_on.join(", ")}
                  </div>
                </li>
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
