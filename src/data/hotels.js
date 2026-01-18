export const hotels = [
  {
    id: 1,
    name: "Sea View Resort",
    city: "Goa",
    location: "Baga Beach, Goa",
    pricePerNight: 4500,
    rating: 4.6,
    reviews: 1240,
    type: "Resort",
    amenities: ["WiFi", "Pool", "AC", "Parking"],
    image:
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Skyline Premium Hotel",
    city: "Mumbai",
    location: "Andheri East, Mumbai",
    pricePerNight: 6200,
    rating: 4.4,
    reviews: 890,
    type: "Hotel",
    amenities: ["WiFi", "AC", "Parking"],
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Royal Heritage Stay",
    city: "Jaipur",
    location: "Pink City, Jaipur",
    pricePerNight: 5200,
    rating: 4.7,
    reviews: 1560,
    type: "Hotel",
    amenities: ["WiFi", "Pool", "AC"],
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Himalayan Retreat",
    city: "Manali",
    location: "Old Manali, Himachal",
    pricePerNight: 3800,
    rating: 4.5,
    reviews: 670,
    type: "Resort",
    amenities: ["WiFi", "Parking", "AC"],
    image:
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Lakeview Apartments",
    city: "Udaipur",
    location: "Fateh Sagar Lake, Udaipur",
    pricePerNight: 3000,
    rating: 4.2,
    reviews: 410,
    type: "Apartment",
    amenities: ["WiFi", "AC", "Parking"],
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
  },

  // ✅ Extended dataset for Infinite Scroll demo
  ...Array.from({ length: 40 }).map((_, i) => {
    const base = [
      {
        id: 1,
        name: "Sea View Resort",
        city: "Goa",
        location: "Baga Beach, Goa",
        pricePerNight: 4500,
        rating: 4.6,
        reviews: 1240,
        type: "Resort",
        amenities: ["WiFi", "Pool", "AC", "Parking"],
        image:
          "https://images.unsplash.com/photo-1501117716987-c8e1ecb2101f?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: 2,
        name: "Skyline Premium Hotel",
        city: "Mumbai",
        location: "Andheri East, Mumbai",
        pricePerNight: 6200,
        rating: 4.4,
        reviews: 890,
        type: "Hotel",
        amenities: ["WiFi", "AC", "Parking"],
        image:
          "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: 3,
        name: "Royal Heritage Stay",
        city: "Jaipur",
        location: "Pink City, Jaipur",
        pricePerNight: 5200,
        rating: 4.7,
        reviews: 1560,
        type: "Hotel",
        amenities: ["WiFi", "Pool", "AC"],
        image:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: 4,
        name: "Himalayan Retreat",
        city: "Manali",
        location: "Old Manali, Himachal",
        pricePerNight: 3800,
        rating: 4.5,
        reviews: 670,
        type: "Resort",
        amenities: ["WiFi", "Parking", "AC"],
        image:
          "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: 5,
        name: "Lakeview Apartments",
        city: "Udaipur",
        location: "Fateh Sagar Lake, Udaipur",
        pricePerNight: 3000,
        rating: 4.2,
        reviews: 410,
        type: "Apartment",
        amenities: ["WiFi", "AC", "Parking"],
        image:
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
      },
    ];

    const item = base[i % base.length];

    return {
      ...item,
      id: 100 + i, // ✅ unique id required
      name: `${item.name} ${i + 1}`,
      reviews: item.reviews + i * 7,
      pricePerNight: item.pricePerNight + (i % 6) * 150,
    };
  }),
];
