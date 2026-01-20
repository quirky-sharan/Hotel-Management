import { useEffect, useState } from "react";
import { hotels } from "../data/hotels";
import HotelCard from "../components/HotelCard";
import { getFavorites } from "../utils/favorites";

function Favorites() {
  const [favHotels, setFavHotels] = useState([]);

  useEffect(() => {
    const favIds = getFavorites();
    const list = hotels.filter((h) => favIds.includes(h.id));
    setFavHotels(list);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">Liked</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        Hotels you are intrested in are ❤️
      </p>

      {favHotels.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No favorites yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {favHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} view="grid" />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
