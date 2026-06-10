import { useState } from "react";
import CafeCard from "./components/CafeCard";
import Map from "./components/Map";
import "./App.css";

function App() {
  const [cafes, setCafes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCafes = cafes.filter((cafe) =>
    cafe.name.toLowerCase().includes(
      searchTerm.toLowerCase()
    )
  );

  return (
    <div className="app">
      <header className="navbar">
        <h1>☕ Mapresso</h1>
      </header>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search cafes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="content">

        <div className="sidebar">

          {cafes.length === 0 ? (
            <p style={{ padding: "20px" }}>
              Searching nearby cafes...
            </p>
          ) : filteredCafes.length === 0 ? (
            <p style={{ padding: "20px" }}>
              No cafes found ☕
            </p>
          ) : (
            filteredCafes.map((cafe, index) => (
              <CafeCard
                key={index}
                name={cafe.name}
                rating={cafe.rating || "N/A"}
                distance={`${cafe.distance} km`}
                mood={
                  index % 4 === 0
                    ? "Study Friendly"
                    : index % 4 === 1
                    ? "Date Spot"
                    : index % 4 === 2
                    ? "Work Friendly"
                    : "Friends Hangout"
                }
                aestheticScore={cafe.aestheticScore}
              />
            ))
          )}

        </div>

        <div className="map-container">
          <Map setCafes={setCafes} />
        </div>

      </div>
    </div>
  );
}

export default App;