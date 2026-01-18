import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isFavorite, toggleFavorite } from "../utils/favorites";

function HotelCard({ hotel, view = "grid" }) {
  const navigate = useNavigate();
  const [fav, setFav] = useState(false);

  useEffect(() => {
    setFav(isFavorite(hotel.id));
  }, [hotel.id]);

  const handleToggleFav = (e) => {
    e.stopPropagation();
    toggleFavorite(hotel.id);
    setFav(isFavorite(hotel.id));
  };

  return (
    <div
      className={`relative rounded-xl shadow-sm overflow-hidden border hover:shadow-md transition cursor-pointer
      bg-white dark:bg-gray-900 dark:border-gray-800 ${
        view === "list" ? "flex" : ""
      }`}
      onClick={() => navigate(`/hotels/${hotel.id}`)}
    >
      {/* ❤️ Favorite */}
      <button
        onClick={handleToggleFav}
        className="absolute top-3 right-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur px-3 py-2 rounded-full shadow hover:scale-105 transition"
        title="Add to favorites"
      >
        <span className={fav ? "text-red-500" : "text-gray-600 dark:text-gray-300"}>
          {fav ? "❤️" : "🤍"}
        </span>
      </button>

      <img
      src={hotel.image}
      alt={hotel.name}
      className={`object-cover ${view === "list" ? "w-48 h-40" : "w-full h-48"}`}
      loading="lazy"
      onError={(e) => {
      e.currentTarget.src =
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80";
      }}
      />


      <div className="p-4 flex-1">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {hotel.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {hotel.location}
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400">Per night</p>
            <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
              ₹{hotel.pricePerNight}
            </p>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {hotel.amenities.map((a) => (
            <span
              key={a}
              className="text-xs px-2 py-1 rounded-full
              bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
            >
              {a}
            </span>
          ))}
        </div>

        <div className="mt-4 flex justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            ⭐ {hotel.rating} ({hotel.reviews} reviews)
          </p>

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/hotels/${hotel.id}`);
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default HotelCard;
