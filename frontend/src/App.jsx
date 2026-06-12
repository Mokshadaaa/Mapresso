import { useState, useEffect } from "react";
import CafeCard from "./components/CafeCard";
import Map from "./components/Map";
import "./App.css";

function App() {
  const [cafes, setCafes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const savedFavorites =
      JSON.parse(
        localStorage.getItem("favorites")
      ) || [];

    setFavorites(savedFavorites);
  }, []);

  const toggleFavorite = (cafe) => {
    const exists = favorites.find(
      (fav) => fav.name === cafe.name
    );

    let updatedFavorites;

    if (exists) {
      updatedFavorites = favorites.filter(
        (fav) => fav.name !== cafe.name
      );
    } else {
      updatedFavorites = [
        ...favorites,
        cafe,
      ];
    }

    setFavorites(updatedFavorites);

    localStorage.setItem(
      "favorites",
      JSON.stringify(updatedFavorites)
    );
  };

  const filteredCafes = cafes.filter((cafe) =>
    cafe.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
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
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />
      </div>

      <div className="content">

        <div className="sidebar">
          
          {favorites.length > 0 && (
  <>
            <h2
              style={{
                textAlign: "center",
                marginTop: "15px",
              }}
            >
              ❤️ Favorites
            </h2>

            {favorites.map((cafe, index) => (
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
                onClick={() => setSelectedCafe(cafe)}
                isFavorite={favorites.some(
                  (fav) => fav.name === cafe.name
                )}
                toggleFavorite={() =>
                  toggleFavorite(cafe)
                }
                lat={cafe.lat}
                lon={cafe.lon}
                userLocation={userLocation}
              />
            ))}

            <hr />
          </>
        )}

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
                aestheticScore={
                  cafe.aestheticScore
                }
                onClick={() =>
                  setSelectedCafe(cafe)
                }
                isFavorite={favorites.some(
                  (fav) =>
                    fav.name === cafe.name
                )}
                toggleFavorite={() =>
                  toggleFavorite(cafe)
                }
              />
            ))
          )}

        </div>

        

        <div className="map-container">
          <Map
                     
            setCafes={setCafes}
            selectedCafe={selectedCafe}
            setUserLocation={setUserLocation}
          />
          
        </div>

      </div>
    </div>
  );
}

export default App;