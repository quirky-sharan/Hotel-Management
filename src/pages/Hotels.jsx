import { useEffect, useMemo, useRef, useState } from "react";
import { hotels } from "../data/hotels";
import HotelCard from "../components/HotelCard";
import HotelCardSkeleton from "../components/HotelCardSkeleton";
import { getRecentlyViewed } from "../utils/recentlyViewed";

const AMENITIES = ["WiFi", "Pool", "Parking", "AC"];
const TYPES = ["Hotel", "Resort", "Apartment"];

function Hotels() {
  const [recentHotels, setRecentHotels] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [maxPrice, setMaxPrice] = useState(7000);
  const [minRating, setMinRating] = useState(0);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [propertyType, setPropertyType] = useState("All");

  const [sort, setSort] = useState("popularity");
  const [sortOpen, setSortOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(9);

  const [filtersOpen, setFiltersOpen] = useState(false);

  /* ------------------ INIT ------------------ */
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

  /* ------------------ FILTER LOGIC ------------------ */
  const filteredHotels = useMemo(() => {
    let list = [...hotels];

    if (debouncedSearch) {
      list = list.filter(
        (h) =>
          h.city.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          h.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    list = list.filter((h) => h.pricePerNight <= maxPrice);
    list = list.filter((h) => h.rating >= minRating);

    if (propertyType !== "All") {
      list = list.filter((h) => h.type === propertyType);
    }

    if (selectedAmenities.length) {
      list = list.filter((h) =>
        selectedAmenities.every((a) => h.amenities.includes(a))
      );
    }

    if (sort === "priceLow") list.sort((a, b) => a.pricePerNight - b.pricePerNight);
    else if (sort === "priceHigh") list.sort((a, b) => b.pricePerNight - a.pricePerNight);
    else if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    else list.sort((a, b) => b.reviews - a.reviews);

    return list;
  }, [debouncedSearch, maxPrice, minRating, selectedAmenities, propertyType, sort]);

  /* ------------------ RECOMMENDED ------------------ */
  const recommended = useMemo(() => {
    if (!recentHotels.length) return hotels.slice(0, 3);
    const ref = recentHotels[0];

    return hotels
      .filter((h) => h.id !== ref.id && (h.city === ref.city || h.type === ref.type))
      .slice(0, 3);
  }, [recentHotels]);

  /* ------------------ REVEAL ANIMATION ------------------ */
  const revealRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("reveal-show");
        }),
      { threshold: 0.1 }
    );

    revealRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [loading]);

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* HEADER */}
        <div className="mb-16">
          <h1 className="text-4xl font-semibold">Curated Stays</h1>
          <p className="text-white/55 mt-3 max-w-xl">
            Luxury hotels selected for comfort, privacy and refined living.
          </p>
        </div>

        {/* RECOMMENDED */}
        <div className="mb-24">
          <h2 className="text-xl font-semibold mb-8">Recommended for you</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {recommended.map((h, i) => (
              <div
                key={h.id}
                ref={(el) => (revealRef.current[i] = el)}
                className="reveal"
              >
                <HotelCard hotel={h} />
              </div>
            ))}
          </div>
        </div>

        {/* SORT */}
        <div className="flex justify-between items-center mb-10">
          <div className="relative z-[100]">
            <button
              onClick={() => setSortOpen((p) => !p)}
              className="px-5 py-2 rounded-full bg-white/10 border border-white/15"
            >
              Sort
            </button>

            {sortOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-black/80 backdrop-blur-xl border border-white/15 rounded-2xl overflow-hidden z-[110]">
                {[
                  ["popularity", "Popularity"],
                  ["rating", "Rating"],
                  ["priceLow", "Price ↑"],
                  ["priceHigh", "Price ↓"],
                ].map(([v, l]) => (
                  <button
                    key={v}
                    onClick={() => {
                      setSort(v);
                      setSortOpen(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-white/10"
                  >
                    {l}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RESULTS */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <HotelCardSkeleton key={i} />
              ))
            : filteredHotels.slice(0, visibleCount).map((h, i) => (
                <div
                  key={h.id}
                  ref={(el) => (revealRef.current[i + 5] = el)}
                  className="reveal reveal-show"
                >
                  <HotelCard hotel={h} />
                </div>
              ))}
        </div>

        {!loading && visibleCount < filteredHotels.length && (
          <div className="mt-20 flex justify-center">
            <button
              onClick={() => setVisibleCount((p) => p + 9)}
              className="px-12 py-3 rounded-full bg-[#bfa76f] text-black hover:bg-[#d6c28a]"
            >
              Load More
            </button>
          </div>
        )}
      </div>

      {/* REVEAL STYLES */}
      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.7s ease;
        }
        .reveal-show {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}

export default Hotels;
