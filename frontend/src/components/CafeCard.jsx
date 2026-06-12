function CafeCard({
  name,
  rating,
  distance,
  mood,
  aestheticScore,
  onClick,
  isFavorite,
  toggleFavorite,
  lat,
  lon,
  userLocation,
}) {


  const openDirections = () => {
  if (!userLocation) return;

  window.open(
    `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lon}/${lat},${lon}`,
    "_blank"
  );
};

  return (
    <div
      className="cafe-card"
      onClick={onClick}
      style={{
        cursor: "pointer",
        position: "relative",
      }}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite();
        }}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          border: "none",
          background: "transparent",
          fontSize: "24px",
          cursor: "pointer",
        }}
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>

      <h2>{name}</h2>

      <p>⭐ {rating}</p>

      <p>📍 {distance}</p>

      <p>☕ {mood}</p>

      <p>📸 Score: {aestheticScore}/10</p>

      <button
        onClick={(e) => {
          e.stopPropagation();
          openDirections();
        }}
      >
        🗺️ Directions
      </button>
    </div>
  );
}

export default CafeCard;