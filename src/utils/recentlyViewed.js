export function addRecentlyViewed(hotel) {
  const key = "recentlyViewedHotels";

  const existing = JSON.parse(localStorage.getItem(key) || "[]");

  // remove duplicates
  const filtered = existing.filter((h) => h.id !== hotel.id);

  // add hotel at top
  const updated = [hotel, ...filtered].slice(0, 5);

  localStorage.setItem(key, JSON.stringify(updated));
}

export function getRecentlyViewed() {
  const key = "recentlyViewedHotels";
  return JSON.parse(localStorage.getItem(key) || "[]");
}
