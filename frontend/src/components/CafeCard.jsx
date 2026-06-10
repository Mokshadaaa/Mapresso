function CafeCard({ name, rating, distance, mood, aestheticScore }) {
  return (
    <div className="cafe-card">
      <h3>{name}</h3>

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