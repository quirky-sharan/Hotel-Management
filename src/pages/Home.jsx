import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();

  const [destination, setDestination] = useState("");
  const [guests, setGuests] = useState(2);
  const [isNavigating, setIsNavigating] = useState(false);

  const destinations = [
    { name: "Goa", img: "https://picsum.photos/id/1018/600/900" },
    { name: "Jaipur", img: "https://picsum.photos/id/1025/600/900" },
    { name: "Mumbai", img: "https://picsum.photos/id/1011/600/900" },
    { name: "Manali", img: "https://picsum.photos/id/1002/600/900" },
    { name: "Udaipur", img: "https://picsum.photos/id/1036/600/900" },
    { name: "Rishikesh", img: "https://picsum.photos/id/1043/600/900" },
    { name: "Kerala", img: "https://picsum.photos/id/1040/600/900" },
    { name: "Delhi", img: "https://picsum.photos/id/1050/600/900" },
  ];

  useEffect(() => {
    const heroImg = new Image();
    heroImg.src = "https://picsum.photos/id/1015/1920/1080";
  }, []);

  const handleSearch = () => {
    if (isNavigating) return;
    setIsNavigating(true);

    const params = new URLSearchParams();
    if (destination) params.append("city", destination);
    navigate(`/hotels?${params.toString()}`);
  };

  return (
    <div className="w-full bg-[#0e0e11] overflow-hidden text-white">

      {/* ================= HERO ================= */}
      <section className="relative h-screen flex items-center justify-center px-6 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: "url('https://picsum.photos/id/1015/1920/1080')" }}
        />
        <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" />

        <div className="relative z-10 max-w-5xl w-full glass rounded-[2.5rem] px-12 py-20 text-center shadow-[0_60px_100px_-30px_rgba(0,0,0,0.9)]">
          <p className="uppercase tracking-[0.35em] text-xs text-white/60">
            Curated Luxury Experiences
          </p>

          <h1 className="mt-6 text-5xl md:text-6xl font-semibold tracking-tight">
            Find Your <span className="text-gold-400">Perfect Stay</span>
          </h1>

          <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto">
            Premium hotels, refined comfort, and effortless booking.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-5 gap-4">
            <input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Destination"
              className="md:col-span-2 glass-input"
            />
            <input type="date" className="glass-input" />
            <input type="date" className="glass-input" />
            <div className="flex gap-3">
              <input
                type="number"
                min="1"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-24 glass-input"
              />
              <button
                onClick={handleSearch}
                disabled={isNavigating}
                className="flex-1 bg-gold-400 text-white font-semibold rounded-2xl
                hover:bg-gold-500 hover:scale-[1.04] transition disabled:opacity-70"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DESTINATION MARQUEE ================= */}
      <section className="py-24">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-semibold">Featured Destinations</h2>
          <p className="mt-4 text-white/60">
            A continuous stream of places worth exploring.
          </p>
        </div>

        <div className="overflow-hidden">
          <div className="marquee-track">
            {[...destinations, ...destinations].map((d, i) => (
              <div
                key={i}
                onClick={() => navigate(`/hotels?city=${encodeURIComponent(d.name)}`)}
                className="marquee-card"
                style={{ backgroundImage: `url(${d.img})` }}
              >
                <div className="absolute bottom-6 left-6">
                  <p className="text-2xl font-semibold">{d.name}</p>
                  <p className="text-sm text-white/80">Luxury stays →</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= POWERUP 1: SEASONAL OFFERS ================= */}
      <section className="py-24 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-semibold mb-12 text-center">
            Seasonal Offers
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {["Winter Escapes", "Monsoon Retreats", "Festive Specials"].map((o) => (
              <div
                key={o}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8
                hover:-translate-y-2 transition"
              >
                <h3 className="text-xl font-semibold mb-3">{o}</h3>
                <p className="text-white/60">
                  Limited-time luxury deals curated for you.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= POWERUP 2: TRAVEL GUIDES ================= */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold mb-12">Travel Inspiration</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {["Hidden Beaches", "Mountain Escapes", "City Luxe"].map((g) => (
              <div
                key={g}
                className="bg-white/5 border border-white/10 rounded-2xl p-8
                hover:bg-white/10 transition"
              >
                <h3 className="text-lg font-medium">{g}</h3>
                <p className="text-white/60 mt-2">
                  Discover experiences beyond hotels.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= POWERUP 3: TESTIMONIALS ================= */}
      <section className="py-24 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold mb-12">
            Loved by Travelers
          </h2>
          <div className="space-y-8">
            {[
              "“Coco feels premium and effortless.”",
              "“Best hotel booking experience I’ve used.”",
              "“Clean UI. No clutter. Just luxury.”",
            ].map((t, i) => (
              <p key={i} className="text-white/70 text-lg italic">
                {t}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ================= POWERUP 4: TRUST STRIP ================= */}
      <section className="py-24 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">
          {[
            ["500+", "Cities Covered"],
            ["10k+", "Luxury Properties"],
            ["1M+", "Happy Guests"],
          ].map(([num, label]) => (
            <div key={label}>
              <p className="text-4xl font-semibold text-gold-400">{num}</p>
              <p className="text-white/60 mt-2">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        .glass-input {
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.2);
          padding: 1rem;
          border-radius: 1rem;
          color: white;
          outline: none;
        }
        .marquee-track {
          display: flex;
          gap: 2rem;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
        .marquee-card {
          min-width: 320px;
          height: 420px;
          border-radius: 2rem;
          background-size: cover;
          background-position: center;
          position: relative;
          box-shadow: 0 30px 60px -25px rgba(25,25,25,0.8);
          cursor: pointer;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
