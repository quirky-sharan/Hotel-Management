import { useEffect, useMemo, useState } from "react";
import { hotels } from "../data/hotels";
import HotelCard from "../components/HotelCard";
import HotelCardSkeleton from "../components/HotelCardSkeleton";
import { getRecentlyViewed } from "../utils/recentlyViewed";

const AMENITIES = ["WiFi", "Pool", "Parking", "AC"];
const TYPES = ["Hotel", "Resort", "Apartment"];

function Hotels() {
  const [view, setView] = useState("grid");

  // Recently viewed
  const [recentHotels, setRecentHotels] = useState([]);

  // Search (debounced)
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Filters
  const [maxPrice, setMaxPrice] = useState(7000);
  const [minRating, setMinRating] = useState(0);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [propertyType, setPropertyType] = useState("All");

  // Sorting
  const [sort, setSort] = useState("popularity");

  // Skeleton loading
  const [loading, setLoading] = useState(true);

  // Manual load more
  const [visibleCount, setVisibleCount] = useState(9);

  // Mobile drawer toggle
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Load recently viewed ONCE
  useEffect(() => {
    setRecentHotels(getRecentlyViewed());
  }, []);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  // Skeleton loader trigger on filters/search changes
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, [debouncedSearch, maxPrice, minRating, selectedAmenities, propertyType, sort]);

  // Reset visible count on filter changes
  useEffect(() => {
    setVisibleCount(9);
  }, [debouncedSearch, maxPrice, minRating, selectedAmenities, propertyType, sort]);

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) => {
      if (prev.includes(amenity)) return prev.filter((a) => a !== amenity);
      return [...prev, amenity];
    });
  };

  const resetFilters = () => {
    setMaxPrice(7000);
    setMinRating(0);
    setSelectedAmenities([]);
    setPropertyType("All");
    setSort("popularity");
    setSearch("");
  };

  const filteredHotels = useMemo(() => {
    let list = [...hotels];

    // Search
    if (debouncedSearch.trim()) {
      list = list.filter(
        (h) =>
          h.city.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          h.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    // Max Price
    list = list.filter((h) => h.pricePerNight <= maxPrice);

    // Rating
    list = list.filter((h) => h.rating >= minRating);

    // Type
    if (propertyType !== "All") {
      list = list.filter((h) => h.type === propertyType);
    }

    // Amenities
    if (selectedAmenities.length > 0) {
      list = list.filter((h) =>
        selectedAmenities.every((a) => h.amenities.includes(a))
      );
    }

    // Sorting
    if (sort === "priceLow") {
      list.sort((a, b) => a.pricePerNight - b.pricePerNight);
    } else if (sort === "priceHigh") {
      list.sort((a, b) => b.pricePerNight - a.pricePerNight);
    } else if (sort === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    } else {
      list.sort((a, b) => b.reviews - a.reviews); // popularity
    }

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
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Hotels</h1>
          <p className="text-gray-500 mt-1">
            Search, filter and book stays easily.
          </p>
        </div>

        {/* Search + View toggle */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <input
            type="text"
            placeholder="Search by city or hotel name..."
            className="border p-3 rounded-lg w-full sm:w-80"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Mobile Filters Button */}
          <button
            onClick={() => setFiltersOpen(true)}
            className="md:hidden border px-4 py-3 rounded-lg bg-white"
          >
            Filters ⚙️
          </button>

          {/* ✅ Better Grid/List Toggle */}
          <div className="flex gap-2">
            <button
              className={`px-4 py-3 rounded-lg border font-medium transition ${
                view === "grid"
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200"
              }`}
              onClick={() => setView("grid")}
            >
              Grid
            </button>

            <button
              className={`px-4 py-3 rounded-lg border font-medium transition ${
                view === "list"
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200"
              }`}
              onClick={() => setView("list")}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Mobile Filters Drawer */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setFiltersOpen(false)}
          />

          <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-xl p-5 overflow-y-auto text-gray-900">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Filters</h2>
              <button
                className="text-gray-600 text-xl"
                onClick={() => setFiltersOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {/* Price */}
              <div>
                <p className="font-semibold mb-2">Max Price (₹)</p>
                <input
                  type="range"
                  min="2000"
                  max="8000"
                  step="200"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full"
                />
                <p className="text-sm text-gray-600 mt-1">Up to ₹{maxPrice}</p>
              </div>

              {/* Rating */}
              <div>
                <p className="font-semibold mb-2">Minimum Rating</p>
                <select
                  className="w-full border p-3 rounded-lg"
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                >
                  <option value={0}>All</option>
                  <option value={4}>4+</option>
                  <option value={4.5}>4.5+</option>
                  <option value={4.7}>4.7+</option>
                </select>
              </div>

              {/* Type */}
              <div>
                <p className="font-semibold mb-2">Property Type</p>
                <select
                  className="w-full border p-3 rounded-lg"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                >
                  <option value="All">All</option>
                  {TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Amenities */}
              <div>
                <p className="font-semibold mb-3">Amenities</p>
                <div className="space-y-2">
                  {AMENITIES.map((a) => (
                    <label key={a} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={selectedAmenities.includes(a)}
                        onChange={() => toggleAmenity(a)}
                      />
                      <span>{a}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sorting */}
              <div>
                <p className="font-semibold mb-2">Sort By</p>
                <select
                  className="w-full border p-3 rounded-lg"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="popularity">Popularity</option>
                  <option value="rating">Rating</option>
                  <option value="priceLow">Price: Low → High</option>
                  <option value="priceHigh">Price: High → Low</option>
                </select>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={resetFilters}
                  className="w-1/2 border px-4 py-3 rounded-lg"
                >
                  Reset
                </button>

                <button
                  onClick={() => setFiltersOpen(false)}
                  className="w-1/2 bg-gray-900 text-white px-4 py-3 rounded-lg hover:bg-black transition"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recently Viewed */}
      {recentHotels.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4">Recently Viewed</h2>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {recentHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} view="grid" />
            ))}
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Filters Sidebar Desktop Only */}
        <aside className="hidden lg:block lg:col-span-1 bg-white border rounded-xl p-5 h-fit sticky top-6 text-gray-900">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Filters</h2>
            <button
              onClick={resetFilters}
              className="text-sm text-blue-600 hover:underline font-medium"
            >
              Reset
            </button>
          </div>

          <div className="mb-6">
            <p className="font-semibold mb-2">Max Price (₹)</p>
            <input
              type="range"
              min="2000"
              max="8000"
              step="200"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full"
            />
            <p className="text-sm text-gray-600 mt-1">Up to ₹{maxPrice}</p>
          </div>

          <div className="mb-6">
            <p className="font-semibold mb-2">Minimum Rating</p>
            <select
              className="w-full border p-3 rounded-lg"
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
            >
              <option value={0}>All</option>
              <option value={4}>4+</option>
              <option value={4.5}>4.5+</option>
              <option value={4.7}>4.7+</option>
            </select>
          </div>

          <div className="mb-6">
            <p className="font-semibold mb-2">Property Type</p>
            <select
              className="w-full border p-3 rounded-lg"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            >
              <option value="All">All</option>
              {TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <p className="font-semibold mb-3">Amenities</p>
            <div className="space-y-2">
              {AMENITIES.map((a) => (
                <label key={a} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(a)}
                    onChange={() => toggleAmenity(a)}
                  />
                  <span>{a}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="font-semibold mb-2">Sort By</p>
            <select
              className="w-full border p-3 rounded-lg"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="popularity">Popularity</option>
              <option value="rating">Rating</option>
              <option value="priceLow">Price: Low → High</option>
              <option value="priceHigh">Price: High → Low</option>
            </select>
          </div>
        </aside>

        {/* Results */}
        <section className="lg:col-span-3">
          <p className="text-xs text-gray-400 mb-2">
            Showing {Math.min(visibleCount, filteredHotels.length)} /{" "}
            {filteredHotels.length}
          </p>

          <div
            className={`grid gap-6 ${
              view === "grid"
                ? "md:grid-cols-2 xl:grid-cols-3"
                : "grid-cols-1"
            }`}
          >
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <HotelCardSkeleton key={i} view={view} />
                ))
              : filteredHotels.slice(0, visibleCount).map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} view={view} />
                ))}
          </div>

          {!loading && filteredHotels.length === 0 && (
            <div className="mt-10 text-center text-gray-500">
              No hotels match your filters.
            </div>
          )}

          {!loading && visibleCount < filteredHotels.length && (
            <div className="mt-10 flex justify-center">
              <button
                onClick={() => setVisibleCount((prev) => prev + 9)}
                className="bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-black transition"
              >
                Load More
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Hotels;
