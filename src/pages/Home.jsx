import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Home() {
  const navigate = useNavigate();

  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  const trending = [
    {
      name: "Goa",
      img: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Jaipur",
      img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Mumbai",
      img: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Manali",
      img: "https://images.unsplash.com/photo-1529921879218-f99546d03a9d?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  const handleSearch = () => {
    const query = destination
      ? `?city=${encodeURIComponent(destination)}`
      : "";
    navigate(`/hotels${query}`);
  };

  return (
    <div className="w-full">
      {/* HERO */}
      <section className="relative min-h-[78vh] flex items-center">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-black/55" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="max-w-3xl">
            <p className="inline-block bg-white/10 text-white px-4 py-2 rounded-full text-sm backdrop-blur">
              ✨ Premium stays · Instant booking · Best prices
            </p>

            <h1 className="mt-6 text-4xl md:text-6xl font-extrabold text-white leading-tight">
              Book your perfect stay with{" "}
              <span className="text-blue-400">StayEase</span>
            </h1>

            <p className="mt-5 text-white/80 text-lg">
              Discover hotels, resorts and apartments with smart filters and
              seamless booking.
            </p>

            {/* 🔧 FIXED SEARCH BOX */}
            <div className="mt-10 bg-white rounded-2xl shadow-xl p-4 md:p-5 text-gray-900">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <input
                  className="border p-3 rounded-xl outline-none text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
                  placeholder="Destination (Goa, Mumbai...)"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />

                <input
                  type="date"
                  className="border p-3 rounded-xl outline-none text-gray-900 focus:ring-2 focus:ring-blue-500"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />

                <input
                  type="date"
                  className="border p-3 rounded-xl outline-none text-gray-900 focus:ring-2 focus:ring-blue-500"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />

                <div className="flex gap-2">
                  <input
                    type="number"
                    min="1"
                    max="10"
                    className="border p-3 rounded-xl w-28 outline-none text-gray-900 focus:ring-2 focus:ring-blue-500"
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                  />

                  <button
                    onClick={handleSearch}
                    className="flex-1 bg-blue-600 text-white font-semibold px-4 py-3 rounded-xl hover:bg-blue-700 active:scale-[0.98] transition"
                  >
                    Search
                  </button>
                </div>
              </div>

              <p className="text-xs text-gray-500 mt-3">
                Tip: Try searching “Goa” and use filters for amenities and
                rating.
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex gap-4 flex-wrap">
              <button
                onClick={() => navigate("/hotels")}
                className="bg-white text-gray-900 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition"
              >
                Explore Hotels
              </button>

              <button
                onClick={() => navigate("/favorites")}
                className="bg-white/10 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/15 backdrop-blur transition"
              >
                View Wishlist ❤️
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* TRENDING */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Trending destinations
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trending.map((t) => (
            <div
              key={t.name}
              onClick={() =>
                navigate(`/hotels?city=${encodeURIComponent(t.name)}`)
              }
              className="group cursor-pointer rounded-2xl overflow-hidden relative shadow-sm hover:shadow-lg transition"
            >
              <img
                src={t.img}
                alt={t.name}
                className="h-56 w-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-xl font-bold">{t.name}</p>
                <p className="text-sm text-white/80">Tap to explore</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
