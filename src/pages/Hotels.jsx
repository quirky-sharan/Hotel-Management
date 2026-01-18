import { useEffect, useMemo, useState } from "react";
import { hotels } from "../data/hotels";
import HotelCard from "../components/HotelCard";
import HotelCardSkeleton from "../components/HotelCardSkeleton";
import { getRecentlyViewed } from "../utils/recentlyViewed";

const AMENITIES = ["WiFi", "Pool", "Parking", "AC"];
const TYPES = ["Hotel", "Resort", "Apartment"];

function Hotels() {
  const [view, setView] = useState("grid");
  const [recentHotels, setRecentHotels] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(7000);
  const [minRating, setMinRating] = useState(0);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [propertyType, setPropertyType] = useState("All");
  const [sort, setSort] = useState("popularity");
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(9);

  useEffect(() => {
    setRecentHotels(getRecentlyViewed());
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, [debouncedSearch, maxPrice, minRating, selectedAmenities, propertyType, sort]);

  useEffect(() => setVisibleCount(9), [
    debouncedSearch,
    maxPrice,
    minRating,
    selectedAmenities,
    propertyType,
    sort,
  ]);

  const toggleAmenity = (a) =>
    setSelectedAmenities((p) =>
      p.includes(a) ? p.filter((x) => x !== a) : [...p, a]
    );

  const resetFilters = () => {
    setSearch("");
    setMaxPrice(7000);
    setMinRating(0);
    setSelectedAmenities([]);
    setPropertyType("All");
    setSort("popularity");
  };

  const filteredHotels = useMemo(() => {
    let list = [...hotels];

    if (debouncedSearch)
      list = list.filter(
        (h) =>
          h.city.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          h.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      );

    list = list.filter((h) => h.pricePerNight <= maxPrice);
    list = list.filter((h) => h.rating >= minRating);
    if (propertyType !== "All")
      list = list.filter((h) => h.type === propertyType);
    if (selectedAmenities.length)
      list = list.filter((h) =>
        selectedAmenities.every((a) => h.amenities.includes(a))
      );

    if (sort === "priceLow") list.sort((a, b) => a.pricePerNight - b.pricePerNight);
    else if (sort === "priceHigh") list.sort((a, b) => b.pricePerNight - a.pricePerNight);
    else if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    else list.sort((a, b) => b.reviews - a.reviews);

    return list;
  }, [
    debouncedSearch,
    maxPrice,
    minRating,
    selectedAmenities,
    propertyType,
    sort,
  ]);

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white">
      <div className="max-w-7xl mx-auto px-6 py-14">
        {/* HEADER */}
        <div className="mb-16">
          <h1 className="text-4xl font-semibold tracking-tight">
            Curated Stays
          </h1>
          <p className="text-white/55 mt-3 max-w-xl">
            Thoughtfully selected hotels designed for comfort, privacy and elegance.
          </p>
        </div>

        {/* RECENTLY VIEWED */}
        {recentHotels.length > 0 && (
          <div className="mb-20">
            <h2 className="text-xl font-semibold mb-6">Recently Viewed</h2>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {recentHotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} view="grid" />
              ))}
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-4 gap-10">
          {/* FILTERS */}
          <aside className="hidden lg:block bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl p-6 h-fit sticky top-8">
            <div className="flex justify-between mb-6">
              <h2 className="font-medium tracking-wide">Filters</h2>
              <button
                onClick={resetFilters}
                className="text-sm text-gold-400 hover:underline"
              >
                Reset
              </button>
            </div>

            <div className="space-y-7 text-sm">
              <div>
                <p className="mb-2 text-white/70">Max Price</p>
                <input
                  type="range"
                  min="2000"
                  max="8000"
                  step="200"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(+e.target.value)}
                  className="w-full accent-[#bfa76f]"
                />
                <p className="text-white/50 mt-1">₹{maxPrice}</p>
              </div>

              <div>
                <p className="mb-2 text-white/70">Rating</p>
                <select
                  className="w-full bg-white/10 border border-white/20 p-3 rounded-xl text-white"
                  value={minRating}
                  onChange={(e) => setMinRating(+e.target.value)}
                >
                  <option value={0}>All</option>
                  <option value={4}>4+</option>
                  <option value={4.5}>4.5+</option>
                </select>
              </div>

              <div>
                <p className="mb-2 text-white/70">Property</p>
                <select
                  className="w-full bg-white/10 border border-white/20 p-3 rounded-xl text-white"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                >
                  <option value="All">All</option>
                  {TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <p className="mb-3 text-white/70">Amenities</p>
                <div className="space-y-2">
                  {AMENITIES.map((a) => (
                    <label key={a} className="flex gap-2 items-center text-white/80">
                      <input
                        type="checkbox"
                        checked={selectedAmenities.includes(a)}
                        onChange={() => toggleAmenity(a)}
                      />
                      {a}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* RESULTS */}
          <section className="lg:col-span-3">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {loading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <HotelCardSkeleton key={i} />
                  ))
                : filteredHotels
                    .slice(0, visibleCount)
                    .map((h) => <HotelCard key={h.id} hotel={h} />)}
            </div>

            {!loading && visibleCount < filteredHotels.length && (
              <div className="mt-16 flex justify-center">
                <button
                  onClick={() => setVisibleCount((p) => p + 9)}
                  className="px-10 py-3 rounded-full bg-[#bfa76f] text-black
                    hover:bg-[#d6c28a] transition font-medium"
                >
                  Load More
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default Hotels;
