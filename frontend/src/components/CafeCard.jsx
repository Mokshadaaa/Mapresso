function CafeCard({
  name,
  rating,
  distance,
  mood,
  aestheticScore,
  onClick,
}) {
  return (
    <div
      className="cafe-card"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <h2>{name}</h2>

      <p>⭐ {rating}</p>

      <p>📍 {distance}</p>

      <p>☕ {mood}</p>

      <p>📸 Score: {aestheticScore}/10</p>

      <button>
        View on Map
      </button>
    </div>
  );
}

export default CafeCard;