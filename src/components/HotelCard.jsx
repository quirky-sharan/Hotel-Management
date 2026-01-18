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
      onClick={() => navigate(`/hotels/${hotel.id}`)}
      className={`group relative overflow-hidden cursor-pointer
        rounded-2xl border border-white/10
        bg-white/5 backdrop-blur-xl
        shadow-[0_25px_60px_-30px_rgba(0,0,0,0.9)]
        hover:shadow-[0_40px_90px_-30px_rgba(0,0,0,1)]
        hover:-translate-y-1 transition-all duration-500
        ${view === "list" ? "flex" : ""}`}
    >
      {/* ❤️ Favorite */}
      <button
        onClick={handleToggleFav}
        title="Add to favorites"
        className="absolute z-10 top-4 right-4
          bg-black/40 backdrop-blur-md
          border border-white/15
          rounded-full px-3 py-2
          shadow-lg hover:scale-110 transition"
      >
        <span
          className={`text-lg ${
            fav ? "text-red-400" : "text-white/70"
          }`}
        >
          {fav ? "♥" : "♡"}
        </span>
      </button>

      {/* Image */}
      <img
        src={hotel.image}
        alt={hotel.name}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.src =
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80";
        }}
        className={`object-cover transition-transform duration-700
          group-hover:scale-105
          ${view === "list" ? "w-56 h-full" : "w-full h-56"}`}
      />

      {/* Content */}
      <div className="p-5 flex-1 text-white">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="text-lg font-semibold tracking-tight">
              {hotel.name}
            </h3>
            <p className="text-sm text-white/60">
              {hotel.location}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-white/50">Per night</p>
            <p className="text-xl font-semibold text-[#7fb6ff]">
              ₹{hotel.pricePerNight}
            </p>
          </div>
        </div>

        {/* Amenities */}
        <div className="mt-4 flex flex-wrap gap-2">
          {hotel.amenities.map((a) => (
            <span
              key={a}
              className="text-xs px-3 py-1 rounded-full
                bg-white/10 border border-white/15
                text-white/80"
            >
              {a}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-5 flex justify-between items-center">
          <p className="text-sm text-white/70">
            ⭐ {hotel.rating}{" "}
            <span className="text-white/40">
              ({hotel.reviews} reviews)
            </span>
          </p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/hotels/${hotel.id}`);
            }}
            className="px-5 py-2 rounded-xl
              bg-[#7fb6ff]/90 text-black font-medium
              hover:bg-[#9acbff]
              hover:shadow-[0_0_25px_rgba(127,182,255,0.5)]
              transition-all"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default HotelCard;
